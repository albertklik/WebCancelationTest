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
                  <li class="breadcrumb-item"><a href="{{ route('tests') }}">{{__("interface.tests")}}</a></li>
                  <li class="breadcrumb-item active" aria-current="page">{{__("interface.testResult")}}</li>
                </ol>
            </nav>

            <div class="content">
                <div id="msg">
                </div>
                <div class="card">
                    <div class="card-body">
                        {{-- <button disabled class="btn btn-success btn-sm" onclick="" ><i class="fas fa-plus"></i> {{ __('interface.btnNewTest') }}</button>
                        <a class="btn btn-primary btn-sm" href="{{ route('doTheTest',['id' => $testGroup->id ]) }}" target="_blank" ><i class="fas fa-play"></i> {{ __('interface.btnDoTheTest') }}</a> --}}
                    </div>
                </div> 
            </div>
            <br>
            <div class="card border-light mb-2">
                <div class="card-body">
                    <div id="content">
                        <div class="card" id="studentData">
                            <div class="card-body">
                              <p class="card-title">{{__('interface.testInfoTitle')}}<p>
                              <p><b>{{__('interface.studentName')}}:</b><span id="studentName"></span></p>
                              <p><b>{{__('interface.hits')}}:</b><span id="hit"></span></p>
                              <p><b>{{__('interface.misses')}}:</b><span id="misses"></span></p>
                              <p><b>{{__('interface.realizedAt')}}:</b><span id="realizedAt"></span></p>
                            </div>
                          </div>
              
                          <div id="testResultTable">
                            <table class="table table-sm">
                              <thead>
                                <tr>
                                  <th>Nº</th>
                                  <th>Tempo</th>
                                  <th>posição</th>
                                  <th>Icone</th>
                                  <th>Nome</th>
                                  <th>acerto</th>
                                </tr>
                              </thead>
                              <tbody>
                              </tbody>
                            </table>
                          </div>
              
                          <div id="result-graph">
                            <div class="row">
                              <div class="col">
                                  <div class="card card-body">
                                    <canvas id="showBoardCanvasResult" width="760" height="500"></canvas>
                                  </div>
                              </div>
                            </div>
                          </div>
                    </div>
                </div>
            </div>
            <div class="card border-light mb-2">
                <div class="card-body">
            
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

var actualPage = 1    


 $(function() {
     //loadTests();
     //setupTestControlResult();
     loadResult(JSON.parse("{{ json_encode($test) }}"));
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

function showResult(id) {
    loadTest(id,function(data) {
        
        modal(true,'testResultModal');
    });
}

function loadResult(data) {
    console.log(data);
    var resultData = JSON.parse(data.result)
    $('#testResultTable').find('tbody').html('')
    resultData.forEach( (item,i) => {
        $('#testResultTable').find('tbody').append(getResultDataRow(item,i));
    });
    renderBoardResult(data);
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
            showTargets: false
        },
        resolution : {width : 760, height: 450},
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