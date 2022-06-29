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
                    <h1 class="display-6">{{__("interface.testsResult")}}</h1>
                    <p class="lead">{{__("interface.testsResultDescription")}}</p>
                </div>
            </div>

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="{{ route('home') }}">{{__("interface.home")}}</a></li>
                  <li class="breadcrumb-item"><a href="{{ route('researches') }}">{{__("interface.researches")}}</a></li>
                  <li class="breadcrumb-item"><a href="{{ route('testGroups') }}">{{__("interface.testGroups")}}</a></li>
                  <li class="breadcrumb-item"><a href="{{ route('tests',['testGroup_id' => $test->test_group_id]) }}">{{__("interface.tests")}}</a></li>
                  <li class="breadcrumb-item active" aria-current="page">{{__("interface.testResult")}}</li>
                </ol>
            </nav>

            <div class="content">
                <div id="msg">
                </div>
            </div>
            
            <div class="card border-light mb-2">
                <div class="card-body">
                    <div id="content">
                        <div class="card">
                            <div class="card-body">
                                <a class="btn btn-primary btn-sm" href="{{ route('tests',['testGroup_id' => $test->test_group_id]) }}" ><i class="fas fa-arrow-left"></i> {{ __('interface.btnBack') }}</a>
                                <button class="btn btn-success btn-sm" onclick="window.print()" ><i class="fas fa-print"></i> {{ __('interface.btnPrint') }}</button>
                                <button type="button" id="shareResultBtn" class="btn btn-secondary btn-sm" ><i class="fas fa-share"></i> {{ __('interface.btnShareResult') }}</button>
                                {{-- <a class="btn btn-primary btn-sm" href="{{ route('doTheTest',['id' => $testGroup->id ]) }}" target="_blank" ><i class="fas fa-play"></i> {{ __('interface.btnDoTheTest') }}</a> --}} 
                            </div>
                        </div> 
                        <br>
                        <div class="card" id="studentData">
                            <div class="card-header">
                              <h5>{{__('interface.testInfoTitle')}}<h5>
                            </div>
                            <div class="card-body">
                              <p><b>{{__('interface.studentName')}}: </b><span id="studentName"></span></p>
                              <p><b>{{__('interface.hits')}}: </b><span id="hits"></span><b>  {{__('interface.misses')}}: </b><span id="misses"></span></p>
                              <p><b>{{__('interface.realizedAt')}}: </b><span id="realizedAt"></span></p>
                            </div>
                          </div>
              
                          <br/>
                          <div class="card" id="studentData">
                            <div class="card-header">
                              <h5>{{__('interface.clicksTableTitle')}}<h5>
                            </div>
                            <div class="card-body">
                                <div id="testResultTable">
                                    <table class="table table-sm">
                                        <thead >
                                            <tr>
                                                <th>Nº</th>
                                                <th>{{__('interface.time')}}</th>
                                                <th>{{__('interface.section')}}</th>
                                                <th>{{__('interface.position')}}</th>
                                                <th>{{__('interface.icon')}}</th>
                                                <th>{{__('interface.iconName')}}</th>
                                                <th>{{__('interface.Hit')}}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div id="result-graph">
                            <div class="row">
                                <div class="col">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>{{__('interface.resultGraph')}}<h5>
                                        </div>
                                        <canvas id="showBoardCanvasResult" width="760" height="500"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br/>
                        <div id="result-graph2">
                            <div class="row">
                                <div class="col">
                                    <div class="card">
                                        <div class="card-header">
                                            <h5>{{__('interface.missesResultGraph')}}<h5>
                                        </div>
                                        <canvas id="showBoardCanvasMissesResult" width="760" height="500"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

 $(function() {
     setupTestControlResult();
     showResult("{{ $test->id }}"); 
 });

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

function showResult(id) {
    loadTest(id,function(data) {
        loadResult(data);
    });
}

function loadResult(data) {
    console.log(data);
    var resultData = JSON.parse(data.result)
    $('#testResultTable').find('tbody').html('')
    if (typeof resultData !== 'undefined' && resultData.length > 0) {
    resultData.forEach( (item,i) => {
        $('#testResultTable').find('tbody').append(getResultDataRow(item,i,iconImgsUrl));
    });
    } else {
        $('#testResultTable').find('table').hide();
        showMsg('info','','The requested list is empty','testResultTable');
    }
    $('#shareResultBtn').on('click',function () {
        var url = "{{ route('testResult') }}" + "?test_id=" + data.id;
        var title = "{{ __('interface.testsResult') }} " +  data.student.name;
        share(url,title,"{{ __('interface.testsResultDescription') }}");
    });
    $('#studentName').html(data.student.name);
    $('#hits').html(data.hits);
    $('#misses').html(data.misses);
    $('#realizedAt').html(convertDatetime(data.created_at));
    renderBoardResult(data);
}

function renderBoardResult(data) {
    console.log(data.board);
    testControlResult.changeBoard(JSON.parse(data.board));
    testControlResult.setResult(data);
    testControlResult.renderBoard();
    testControlResult.renderResult();
    
    testControlMissesResult.changeBoard(JSON.parse(data.board));
    testControlMissesResult.setResult(data);
    testControlMissesResult.renderBoard();
    testControlMissesResult.renderResult();
}

function setupTestControlResult() {
    var bData = {
        renderConfig: {
            showTargets: false,
            hideIcons: false,
            identifyCells: true,
            identifyIcons: true,
            iconTransp: true,
            showResultType: 2
        },
        resolution : {width : 912, height: 540},
        board : {},
        callbacks : {
            testFinished : function (result) {
            },
            error : function (ex) {
            }
        }
    };
    var bData2 = {
        renderConfig: {
            showTargets: false,
            hideIcons: false,
            identifyCells: true,
            identifyIcons: true,
            iconTransp: true,
            showResultType: 1
        },
        resolution : {width : 912, height: 540},
        board : {},
        callbacks : {
            testFinished : function (result) {
            },
            error : function (ex) {
            }
        }
    };
    testControlResult = new TestControl(bData,'showBoardCanvasResult',true);
    testControlMissesResult = new TestControl(bData2,'showBoardCanvasMissesResult',true);
}
</script>
{{ view('modal.testResultModal') }}
{{ view('modal.confirmationModal') }}
{{ view('base.footer') }}