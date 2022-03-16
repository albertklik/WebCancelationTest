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
                    <h1 class="display-6">{{__("interface.researches")}}</h1>
                    <p class="lead">{{__("interface.researchesDescription")}}</p>
                </div>
            </div>

            <div class="content">
                <div id="msg">
                </div>
                <div class="card">
                    <div class="card-body">
                        <button class="btn btn-success btn-sm" onclick="newResearch()" ><i class="fas fa-plus"></i>{{__("interface.btnNewResearch")}}</a>
                    </div>
                </div> 
            </div>
            <br>
            <div class="row align-middle">
                <div class="col-sm-3" style="margin-bottom: 1em">
                    <div class="card">
                        <div class="card-header" style="background-color: darkcyan">
                            <div class="float-right">
                                <button onclick="editResearch('+ data.id +');" class="btn btn-light btn-sm mr-1"> <i class="fas fa-edit"></i></button>
                                <button onclick="deleteResearch(\''+data.id+'\')" class="btn btn-light btn-sm mr-1"> <i class="fas fa-trash"></i></button>
                            </div>
                            <div class="float-left" style="margin-bottom: -25px; margin-top: 25px">
                                <img style="background-color: darkcyan; width:50px; height:50px; border-width:5px" alt="..." class="img-thumbnail rounded-circle">
                            </div>
                        </div>
                        <div class="card-body">
                            <h4 id="researchTitle">Titulo da pesquisa</h4>
                            <p><b>Orientador da pesquisa</b></p>
                            <small>Descrição da pesquisa, com todo o texto necessário</small>
                            <small><p><b>Palavras, chave, separados, por, vírgula</b></p></small>
                        </div>
                        <div class="card-footer">
                            <button class="btn fluid btn-success btn-sm btn-block" onclick="ListTestGroups(1)" ><i class="fas fa-document"></i>{{__("interface.btnGerenciarPesquisa")}}</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 align-middle">
                    <div class="card">
                        <div class="card-header" style="background-color: darkcyan">
                            <br>
                        </div>
                        <div class="card-body">
                            <button class="btn fluid btn-success btn-sm btn-block" onclick="newResearch()" ><i class="fas fa-plus"></i> Adicionar Novo</a>
                        </div>
                    </div>
                </div>
            </div>
                
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
langStr["eraseTestTitle"] = '{{__("interface.eraseTestTitle")}}'; 
langStr["eraseTestMsg"] = '{{__("interface.eraseTestMsg")}}'; 


var actualPage = 1    


 $(function() {
     setupForm();
     loadResearches();
 });

 function setupForm() {
    cleanResearchesForm();
    
 }

 function cleanResearchesForm() {
    $('input[name="id"]').val("-1");
    $('input[name="title"]').val("");
    $('textarea[name="description"]').html("");
    $('input[name="instructor_name"]').val("");
}

function newResearch() {
    cleanResearchesForm();
    clearMsg('insertEditResearchesModalMsg');
    loadingModal(false,'insertEditResearchesModal');
    modal(true,'insertEditResearchesModal');
}

 function loadResearch(id,callback) {
     loading(true);
     getResearch(
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

 function loadResearches() {
     loading(true);
     getResearches({
        page: actualPage,
        elements_per_pag: 10,
     }, function(data) {
         console.log(data);
         $('#content').html('');
         if (typeof data.data !== 'undefined' && data.data.length > 0) {
            data.data.forEach(item => {
                $('#content').append(getResearchItem(item,langStr));
            });
            $('#paginator').html(getPaginatorItem(data));
         } else {
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

function saveResearch() {
    loadingModal(true,'insertEditResearchesModal');
     var data = serializeFormData('insertEditResearchesForm');
     console.log(data);

    // if (data.id > 0) {
    //     updateTestGroup(data);
    //     return;
    // }
    
     saveResearches(data,
        function (data) {
           console.log(data);
           modal(false,'insertEditResearchesModal');
           loadResearches()
           showMsg('success','{{__("interface.successTitle")}}','{{__("interface.successMsg")}}');
        },
        function (error) {
           console.log(error);
           if (error.status == 422) {
                $('#insertEditResearchesModalMsg').html(getMessageErrors(error.responseJSON));
           }
        },
        function () {
            loadingModal(false,'insertEditResearchesModal');
        });
 }

function sendDeleteTest(id) {
    loading(true);
    deleteTest(
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

function loadResult(data) {

}
 

function goToPage(page = 1) {
    if (actualPage==page) return;
    actualPage = page;
    loadTests();
}


</script>
{{ view('modal.insertEditResearchesModal') }}
{{ view('modal.confirmationModal') }}
{{ view('base.footer') }}