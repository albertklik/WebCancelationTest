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
                      #ADF34GT
                      <div class="float-right">
                        <a href="#" class="btn btn-light btn-sm"> <i class="fas fa-edit"></i></a>
                        <a href="#" class="btn btn-danger btn-sm"> <i class="fas fa-trash"></i></a>
                      </div>
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">Titulo do grupo de teste</h5>
                      <p class="card-text">Descrição do grupo de teste</p>
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
                      </table>
                    </div>
                </div>
            </div>
            <div id="content">
                




            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

 $(function() {
//  getData();
    //loading(true);
 });


// function getData() {
//     getTestGroups({
//        pag: 1,
//        elements_per_pag: 10
//     }, function(data) {
//         console.log(data);
//     }, function(error) {
//         console.log(error);
//     }, function() {
//         console.log("request complete");
//     });
// }

// function getTestGroups(data,success,error,complete) {
//     $.ajax({
//         type: "GET",
//         url: "api/testGroup/list",
//         data: data,
//         success: success,
//         error: error,
//         complete: complete
//     });
// }

</script>



<!-- content  -->

{{ view('insertEditTestGroupsModal') }}
{{ view('base.footer') }}