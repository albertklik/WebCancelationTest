{{ view('base.header') }}

{{ view('base.menu') }}

<div class="container">
    <div class="row">
        <div class="col-md-auto">
            {{ view('base.sideMenu') }}
        </div>
        <div class="col">
            
            <div class="jumbotron junbotron-fluid">
                <div class="container">
                    <h1 class="display-6">{{__("interface.testGroups")}}</h1>
                    <p class="lead">{{__("interface.testGroupsDescription")}}</p>
                    
                </div>
            </div>

            <div class="content">
                <div id="msg">
                </div>
                <div class="card">
                    <div class="card-body">
                        <button class="btn btn-success" onclick="modal(true,'insertEditTestGroupsModal')" ><i class="fas fa-plus"></i> {{__("interface.btnNewTestGroup")}}</a>
                    </div>
                </div>
            </div>
            <br>


            <div id="content-model">
                <div class="card">
                    <div class="card-header">
                      #0
                      <div class="float-right">
                        <a href="#" class="btn btn-light btn-sm"> <i class="fas fa-edit"></i></a>
                        <a href="#" class="btn btn-danger btn-sm"> <i class="fas fa-trash"></i></a>
                      </div>
                    </div>
                    <div class="card-body">
                      <div class="card-title"><b>Titulo do grupo de teste</b></div>
                      <small>
                      <table class="table table-borderless table-sm">
                          <tbody>
                            <tr>
                                <th scope="row">{{__("interface.goals")}}</th>
                                <td>3</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.distractors")}}</th>
                                <td>5</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.goalSymbol")}}</td>
                                <td>1</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.timeDesc")}}</th>
                                <td>60</td>
                            </tr>
                            <tr>
                                <th scope="row">{{__("interface.align")}}</th>
                                <td>Desativado</td>
                            </tr>
                        </tbody>
                      </table></small>
                    </div>
                    <div class="card-footer">
                        <button onclick="" class="btn btn-primary btn-sm"> <i class="fas fa-list"></i> Listar Testes</button>
                        <button onclick="playTest(1)" class="btn btn-secondary btn-sm"> <i class="fas fa-play"></i> Realizar teste</button>
                        <button onclick="shareLink(1)" class="btn btn-secondary btn-sm"> <i class="fas fa-share"></i> compartilhar Link</button>
                    </div>
                </div>
                <br>
            </div>
            <div id="content">
            </div>
            <div id="paginator">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

 $(function() {
    setupForm();
    loadTestGroups();
 });

 function setupForm() {
    $('#automaticDistractors').prop( "checked",true);
    $('#distractors').prop( "disabled",true);

    $('#automaticDistractors').change(function() {
        $('#distractors').prop( "disabled",this.checked);
        $('#automaticDistractors').val(this.checked);        
    });
 }

 function saveTestGroup() {
    loadingModal(true,'insertEditTestGroupsModal');
     var data = serializeFormData('insertEditTestGroupsForm');
     console.log(data);
     saveTestGroups(data,
        function (data) {
           console.log(data);
           modal(false,'insertEditTestGroupsModal');
           $('#msg').html(getMsg('success','{{__("interface.successTitle")}}','{{__("interface.successMsg")}}'));
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


 function loadTestGroups(p = 1) {
     loading(true);
     getTestGroups({
        pag: p,
        elements_per_pag: 10
     }, function(data) {
         console.log(data);
         $('#content').html('')
         data.data.forEach(item => {
            $('#content').append(getTestGroupItem(item));
         });
         $('#paginator').html('')
         $('#paginator').append(getPaginatorItem(data))
     }, function(error) {
         console.log(error);
         $('#msg').html(getMsg('danger','Error','Error on load test Groups list'));
     }, function() {
         console.log("request complete");
         loading(false);
     });
}

function editTestGroup(id) {

}

function deleteTestGroup(id) {
    
}

function listTests(id) {

}

function playTest(id) {
    window.open("{{ route('doTheTest') }}?id=" + id, '_blank');
}

function shareLink(id) {
    copyToClipboard("{{ route('doTheTest') }}?id=" + id);
    $('#msg').html(getMsg('success','{{__("interface.shareTestTitle")}}','{{__("interface.shareTestMsg")}}'));
}


</script>



<!-- content  -->

{{ view('modal.insertEditTestGroupsModal') }}
{{ view('base.footer') }}