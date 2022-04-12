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

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                  <li class="breadcrumb-item"><a href="{{ route('home') }}">{{__("interface.home")}}</a></li>
                  <li class="breadcrumb-item active" aria-current="page">{{__("interface.researches")}}</li>
                </ol>
            </nav>

            <div class="content">
                <div id="msg">
                </div>
                <div class="card">
                    <div class="card-body">
                        <button class="btn btn-success btn-sm" onclick="newResearch()" ><i class="fas fa-plus"></i> {{__("interface.btnNewResearch")}}</a>
                    </div>
                </div> 
            </div>
            <br>
            <div id="content" class="row">
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
langStr["btnManageResearch"] = '{{__("interface.btnManageResearch")}}';


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
    $('input[name="keywords"]').val("");
}

function loadResearchOnForm(data) {
    $('input[name="id"]').val(data.id);
    $('input[name="title"]').val(data.title);
    $('textarea[name="description"]').html(data.description);
    $('input[name="instructor_name"]').val(data.instructor_name);
    $('input[name="keywords"]').val(data.keywords);
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
        elements_per_pag: 9,
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

    if (data.id > 0) {
        updateResearch(data);
        return;
    }
    
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

 function updateResearch(data) {
     updateResearches(
        [data.id],
        data,
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

function sendDeleteResearch(id) {
    loading(true);
    deleteResearches(
        [id],
        function(data) {
         loadResearches()
     }, function(error) {
         console.log(error);
         showMsg('danger','Error','Error on erase test');
     }, function() {
         console.log("request complete");
         loading(false);
     });
}

function deleteResearch(id) {
    showConfirmationModal(
        "{{ __('interface.eraseResearchTitle') }}", 
        "{{ __('interface.eraseResearchMsg') }}",
        function() { 
            sendDeleteResearch(id); 
        }
    );
}

function editResearch(id) {
    loadResearch(id,
    function(data) {
        console.log(data);
        clearMsg('insertEditResearchesModalMsg');
        loadResearchOnForm(data);
        loadingModal(false,'insertEditResearchesModal');
        modal(true,'insertEditResearchesModal');
    });
}

function listTestGroups(id) {
    goToUrl("{{route('testGroups')}}?research_id="+id);
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