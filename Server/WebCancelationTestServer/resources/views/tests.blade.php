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
                    <h1 class="display-6">{{__("interface.tests")}}</h1>
                    <p class="lead">{{__("interface.testsDescription")}}</p>
                </div>
            </div>

            <div class="content">
                <div id="msg">
                </div>
                <div class="card">
                    <div class="card-body">
                        <button disabled class="btn btn-success btn-sm" onclick="" ><i class="fas fa-plus"></i> new Test</a>
                    </div>
                </div> 
            </div>
            <br>
            <div id="content">
               <table class="table table-sm">
               <thead>
                   <tr>
                        <th>Id</th>
                        <th>Student Name</th>
                        <th>Hits</th>
                        <th>Misses</th>
                        <th>Seconds</th>
                        <th>Realized at</th>
                        <th>actions</th>
                   </tr>
               </thead>
               <tbody> 
               </tbody>
               </table>
            </div>
            <div id="paginator">
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">

var langStr = [];
langStr["btnListTests"] = '{{__("interface.btnListTests")}}'; 


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

}
 


</script>

{{ view('modal.confirmationModal') }}
{{ view('base.footer') }}