{{ view('base.header') }}

{{ view('base.menu') }}

<div class="container">
    <div class="row">
        {{-- <div class="col-md-auto">
            {{ view('base.sideMenu') }}
        </div> --}}
        <div class="col">
            <div class="jumbotron junbotron-fluid">
                <div class="container">
                    <h1 class="display-6">{{__("interface.tests")}}</h1>
                    <p class="lead">{{__("interface.testsDescription")}}</p>
                </div>
            </div>

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="{{ route('home') }}">{{__("interface.home")}}</a></li>
                  <li class="breadcrumb-item"><a href="{{ route('researches') }}">{{__("interface.researches")}}</a></li>
                  <li class="breadcrumb-item"><a href="{{ route('testGroups',['research_id' => $testGroup->researches_id ]) }}">{{__("interface.testGroups")}}</a></li>
                  <li class="breadcrumb-item active" aria-current="page">{{__("interface.tests")}}</li>
                </ol>
            </nav>
            
            <div class="card border-light mb-2">
                <div class="card-body">
                    <div class="card">
                        <div class="card-body">
                            <button disabled class="btn btn-success btn-sm" onclick="" ><i class="fas fa-plus"></i> {{ __('interface.btnNewTest') }}</button>
                            <a class="btn btn-primary btn-sm" href="{{ route('doTheTest',['id' => $testGroup->id ]) }}" target="_blank" ><i class="fas fa-play"></i> {{ __('interface.btnDoTheTest') }}</a>
                        </div>
                    </div> 
                    <br>
                    <div id="content">
                        <div id="msg">
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h5>{{__('interface.testsTableTitle')}}<h5>
                            </div>
                            <div class="card-body">
                                <table class="table table-sm">
                                    <thead >
                                        <tr>
                                            <th>{{__('interface.id')}}</th>
                                            <th>{{__('interface.studentName')}}</th>
                                            <th>{{__('interface.hits')}}</th>
                                            <th>{{__('interface.misses')}}</th>
                                            <th>{{__('interface.time')}}</th>
                                            <th>{{__('interface.realizedAt')}}</th>
                                            <th>{{__('interface.actions')}}</th>
                                        </tr>
                                    </thead>
                                    <tbody> 
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="paginator">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

var langStr = [];
langStr["btnListTests"] = '{{__("interface.btnListTests")}}'; 
langStr["eraseTestTitle"] = '{{__("interface.eraseTestTitle")}}'; 
langStr["eraseTestMsg"] = '{{__("interface.eraseTestMsg")}}'; 


var iconImgsUrl = [
        { id : 1, url : "{{ asset('assets/icons/carro.png') }}" },
        { id : 2, url : "{{ asset('assets/icons/casa.png') }}" },
        { id : 3, url : "{{ asset('assets/icons/arvore.png') }}" },
        { id : 4, url : "{{ asset('assets/icons/bule.png') }}" },
        { id : 5, url : "{{ asset('assets/icons/sol.png') }}" },
        { id : 6, url : "{{ asset('assets/icons/galinha.png') }}" },
        { id : 7, url : "{{ asset('assets/icons/coelho.png') }}" },
        { id : 8, url : "{{ asset('assets/icons/gato.png') }}" },
        { id : 9, url : "{{ asset('assets/icons/flor.png') }}" },
        { id : 10, url : "{{ asset('assets/icons/peixe.png') }}" },
        { id : 11, url : "{{ asset('assets/icons/estrela.png') }}" },
        { id : 12, url : "{{ asset('assets/icons/aviao.png') }}" },
        { id : 13, url : "{{ asset('assets/icons/barco.png') }}" }
    ];

var actualPage = 1    


 $(function() {
     loadTests();
     setupTestControlResult();
 });

 function loadTest(id,callback) {
     loading(true);
     getTest(
         [id],
         callback,
         function(error) {
         console.log(error);
         showMsg('danger','Error','Error on load test');
     }, function() {
         console.log("request complete");
         loading(false);
     }
     );
 }

 function loadTests() {
     loading(true);
     getTests({
        page: actualPage,
        elements_per_pag: 10,
        test_group_id: {{ $testGroup->id }}
     }, function(data) {
         console.log(data);
         $('#content').find('tbody').html('');
         $('#content').find('table').show();
         if (typeof data.data !== 'undefined' && data.data.length > 0) {
            data.data.forEach(item => {
                $('#content').find('tbody').append(getTestItem(item,langStr,iconImgsUrl));
            });
            $('#paginator').html(getPaginatorItem(data));
         } else {
            $('#content').find('table').hide();
            showMsg('info','','The requested list is empty');
         }
         
     }, function(error) {
         console.log(error);
         showMsg('danger','Error','Error on load tests list');
     }, function() {
         console.log("request complete");
         loading(false);
     });
}

function sendDeleteTest(id) {
    loading(true);
    deleteTests(
        [id],
        function(data) {
         loadTests()
     }, function(error) {
         console.log(error);
         showMsg('danger','Error','Error on erase test');
     }, function() {
         console.log("request complete");
         loading(false);
     });
}

function deleteTest(id) {
    showConfirmationModal(
        "{{ __('interface.eraseTestTitle') }}", 
        "{{ __('interface.eraseTestMsg') }}",
        function() { 
            sendDeleteTest(id); 
        }
    );
}

function showResult(id) {
    loadTest(id,function(data) {
        loadResult(data);
        modal(true,'testResultModal');
    });
    
}

function gotToDetailsResult(id) {
    goToUrl("{{ route('testResult') }}" + "?test_id=" + id)
}

function loadResult(data) {
    console.log(data);
    // var resultData = JSON.parse(data.result)
    // $('#testResultTable').find('tbody').html('')
    // resultData.forEach( (item,i) => {
    //     $('#testResultTable').find('tbody').append(getResultDataRow(item,i));
    // });
    $('#studentName').html(data.student.name);
    $('#hits').html(data.hits);
    $('#misses').html(data.misses);
    $('#realizedAt').html(convertDatetime(data.created_at));
    $('#seeMoreBtn').on('click',function () {
        gotToDetailsResult(data.id);
    });
    $('#shareResultBtn').on('click',function () {
        var url = "{{ route('testResult') }}" + "?test_id=" + data.id;
        var title = "{{ __('interface.testsResult') }} " +  data.student.name;
        share(url,title,"{{ __('interface.testsResultDescription') }}");
    });
    renderBoardResult(data);
}
 

function goToPage(page = 1) {
    if (actualPage==page) return;
    actualPage = page;
    loadTests();
}

function renderBoardResult(data) {
    console.log(data.board);
    testControlResult.changeBoard(JSON.parse(data.board));
    testControlResult.setResult(data);
    testControlResult.renderBoard();
    testControlResult.renderResult();
}

function setupTestControlResult() {
    var bData = {
        renderConfig: {
            showTargets: false,
            hideIcons: false,
            identifyCells: false,
            identifyIcons: false,
            iconTransp: true,
            showResultType: 2
        },
        resolution : {width : 700, height: 450},
        board : {},
        callbacks : {
            testFinished : function (result) {
            },
            error : function (ex) {
            }
        }
    };
    testControlResult = new TestControl(bData,'showBoardCanvasResult',true);
}


</script>
{{ view('modal.testResultModal') }}
{{ view('modal.confirmationModal') }}
{{ view('base.footer') }}