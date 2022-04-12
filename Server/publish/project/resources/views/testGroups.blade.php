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
                    <h1 class="display-6">{{__("interface.testGroups")}}</h1>
                    <p class="lead">{{__("interface.testGroupsDescription")}}</p>
                </div>
            </div>

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="{{ route('home') }}">{{__("interface.home")}}</a></li>
                  <li class="breadcrumb-item"><a href="{{ route('researches') }}">{{__("interface.researches")}}</a></li>
                  <li class="breadcrumb-item active" aria-current="page">{{__("interface.testGroups")}}</li>
                </ol>
            </nav>

            <div class="content">
                <div id="msg">
                </div>
                <div class="card">
                    <div class="card-body">
                        <button class="btn btn-success btn-sm" onclick="newTestGroup()" ><i class="fas fa-plus"></i> {{__("interface.btnNewTestGroup")}}</a>
                    </div>
                </div>
            </div>
            <br>
            <div id="content">
            </div>
            <div id="paginator">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

var langStr = [];
langStr["btnListTests"] = '{{__("interface.btnListTests")}}'; 
langStr["btnDoTheTest"] = '{{__("interface.btnDoTheTest")}}';
langStr["btnShareLink"] = '{{__("interface.btnShareLink")}}';
langStr["btnShowBoard"] = '{{__("interface.btnShowBoard")}}';
langStr["goals"] = '{{__("interface.goals")}}';
langStr["distractors"] = '{{__("interface.distractors")}}';
langStr["goalSymbol"] = '{{__("interface.goalSymbol")}}';
langStr["timeDesc"] = '{{__("interface.timeDesc")}}';
langStr["align"] = '{{__("interface.align")}}';
langStr["aligned"] = '{{__("interface.aligned")}}';
langStr["notAligned"] = '{{__("interface.notAligned")}}';
langStr["nTests"] = '{{__("interface.nTests")}}';


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
var generatedBoard = ""   
var testControlList = {}
var testControlInsertEdit = {}


 $(function() {
    setupForm();
    loadTestGroups();
    setupTestControlList();
 });

 function setupForm() {
    cleanTestGroupForm();
    setupTestControlInsertEdit();

    $('#automaticDistractors').change(function() {
        if (this.checked) $('#distractors').val('');
        $('#distractors').prop( "disabled",this.checked);
        $('#automaticDistractors').val(this.checked);        
    });
    $('input').on('change', function () {
        updateBoardInsertEdit();
    });
 }

 function saveTestGroup() {
    loadingModal(true,'insertEditTestGroupsModal');
     var data = serializeFormData('insertEditTestGroupsForm');
     data.researches_id = {{ $research->id ?? -1 }};
     data.aligned = $('#aligned').is( ":checked" ) ? 1 : 0
     data.distractors = $('#automaticDistractors').is( ":checked" ) ? 0 : data.distractors
     data.board = generatedBoard
     console.log(data);

    if (data.id > 0) {
        updateTestGroup(data);
        return;
    }
    
     saveTestGroups(data,
        function (data) {
           console.log(data);
           modal(false,'insertEditTestGroupsModal');
           loadTestGroups()
           showMsg('success','{{__("interface.successTitle")}}','{{__("interface.successMsg")}}');
        },
        function (error) {
           console.log(error);
           if (error.status == 422) {
                $('#insertEditTestGroupsMsg').html(getMessageErrors(error.responseJSON));
           }
        },
        function () {
            loadingModal(false,'insertEditTestGroupsModal');
        });
 }

 function updateTestGroup(data) {
     updateTestGroups(
        [data.id],
        data,
        function (data) {
           console.log(data);
           modal(false,'insertEditTestGroupsModal');
           loadTestGroups()
           showMsg('success','{{__("interface.successTitle")}}','{{__("interface.successMsg")}}');
        },
        function (error) {
           console.log(error);
           if (error.status == 422) {
                $('#insertEditTestGroupsMsg').html(getMessageErrors(error.responseJSON));
           }
        },
        function () {
            loadingModal(false,'insertEditTestGroupsModal');
        });  
 }


 function loadTestGroups() {
     loading(true);
     getTestGroups({
        page: actualPage,
        elements_per_pag: 10,
        research_id: {{ $research->id ?? -1 }}
     }, function(data) {
         console.log(data);
         $('#content').html('')
         data.data.forEach(item => {
            $('#content').append(getTestGroupItem(item,langStr,iconImgsUrl));
         });
         $('#paginator').html(getPaginatorItem(data))
     }, function(error) {
         console.log(error);
         showMsg('danger','Error','Error on load test Groups list');
     }, function() {
         console.log("request complete");
         loading(false);
     });
}

function loadTestGroup(id,callback) {
    loading(true);
    getTestGroup(
        [id],
        callback, 
        function(error) {
            console.log(error);
            showMsg('danger','Error','Error on load test Group');
        }, 
        function() {
            console.log("request complete");
            loading(false);
        });
}

function loadTestGroupDataOnForm(data) {
    $('input[name="id"]').val(data.id);
    $('input[name="name"]').val(data.name);
    $('input[name="aligned"]').prop("checked",(data.aligned != null && data.aligned == 1));
    $('input[name="targets"]').val(data.targets);
    if (data.distractors == null || data.distractors == 0) {
        $('#distractors').prop( "disabled",true);
        $('#automaticDistractors').val(1); 
        $('#automaticDistractors').prop("checked",true);
    } else {
        $('#distractors').prop( "disabled",false);
        $('#distractors').val(data.distractors);
        $('#automaticDistractors').val(0); 
        $('#automaticDistractors').prop("checked",false);
    }
    $('select[name="target_id"]').val(data.target_id).change();
    $('select[name="time_limit"]').val(data.time_limit).change();
}

function cleanTestGroupForm() {
    $('input[name="id"]').val("-1");
    $('input[name="name"]').val("");
    $('input[name="aligned"]').prop("checked",false);
    $('input[name="targets"]').val("");
    $('#distractors').prop( "disabled",true);
    $('#automaticDistractors').val(1); 
    $('#automaticDistractors').prop("checked",true);
    $('select[name="target_id"]').val(1).change();
    $('select[name="time_limit"]').val(30).change();
}

function sendDeleteTestGroup(id) {
    loading(true);
    deleteTestGroups(
        [id],
        function(data) {
         loadTestGroups()
     }, function(error) {
         console.log(error);
         showMsg('danger','Error','Error on erase test groups');
     }, function() {
         console.log("request complete");
         loading(false);
     });
}

function newTestGroup() {
    cleanTestGroupForm();
    updateBoardInsertEdit();
    clearMsg('insertEditTestGroupsMsg');
    loadingModal(false,'insertEditTestGroupsModal');
    modal(true,'insertEditTestGroupsModal');
}

function editTestGroup(id) {
    loadTestGroup(id,
    function(data) {
        console.log(data);
        clearMsg('insertEditTestGroupsMsg');
        loadTestGroupDataOnForm(data);
        loadingModal(false,'insertEditTestGroupsModal');
        modal(true,'insertEditTestGroupsModal');
        updateBoardInsertEdit();
    });
}

function deleteTestGroup(id) {
    showConfirmationModal(
        "{{ __('interface.eraseTestGroupTitle') }}", 
        "{{ __('interface.eraseTestGroupMsg') }}",
        function() { 
            sendDeleteTestGroup(id); 
        }
    );
}

function listTests(id) {
    goToUrl("{{ route('tests') }}?testGroup_id=" + id);
}

function playTest(id) {
    window.open("{{ route('doTheTest') }}?id=" + id, '_blank');
}

function shareLink(id) {
    copyToClipboard("{{ route('doTheTest') }}?id=" + id);
    showMsg('success','{{__("interface.shareTestTitle")}}','{{__("interface.shareTestMsg")}}');
}

function goToPage(page = 1) {
    if (actualPage==page) return;
    actualPage = page;
    loadTestGroups();
}

function showBoard(id) {
    loadTestGroup(id,
    function(data) {
        modal(true,'boardViewModal');
        renderBoard(data);
    });
}

function updateBoardInsertEdit() {
    var data = serializeFormData('insertEditTestGroupsForm');
    data.aligned = $('#aligned').is( ":checked" ) ? 1 : 0
    console.log(data);

    var boardData = {
        size: 3,
        resolution: {width: 760, height: 500 },
        nTargets: parseInt(data.targets),
        nDistractors: parseInt((data.distractors != null ? data.distractors : 0)),
        goalId: parseInt(data.target_id),
        aligned: (data.aligned == 1)
    }

    try {
        console.log(boardData);
        generatedBoard = JSON.stringify(new Board(boardData).generateRandom());
        var board = JSON.parse(generatedBoard);

        console.log(board);
        testControlInsertEdit.changeBoard(board);
        testControlInsertEdit.renderBoard();
    } catch(e) {
        console.log(e);
    }
}


function setupTestControlList() {
    var bData = {
        renderConfig: {
            showTargets: true
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
    testControlList = new TestControl(bData,'showBoardCanvas',true);
}

function setupTestControlInsertEdit() {
    var bData = {
        renderConfig: {
            showTargets: true
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
    testControlInsertEdit = new TestControl(bData,'showBoardCanvasInsertEdit',true);
}

function renderBoard(data) {
    console.log(data.board);
    testControlList.changeBoard(JSON.parse(data.board));
    testControlList.renderBoard();
}


</script>



<!-- content  -->
<div class="modal fade" id="boardViewModal" tabindex="-1" role="dialog" aria-labelledby="boardViewModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="boardViewModalTitle">{{__('interface.board')}}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
            <canvas id="showBoardCanvas" width="760" height="500"></canvas>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('interface.btnClose') }}</button>
        </div>
      </div>
    </div>
  </div>



{{ view('modal.insertEditTestGroupsModal') }}
{{ view('modal.confirmationModal') }}
{{ view('base.footer') }}