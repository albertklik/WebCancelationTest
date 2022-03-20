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
                    <h2 class="display-6">{{__("interface.welcoming",["name" => "user"])}}</h2>
                    <p class="lead">{{__("interface.welcomingDesc")}}</p>
                </div>
            </div>

            <div class="row">
                <div class="col">
                  <div class="card border-light mb-2">
                      <div class="card-body">
                          <h5 class="card-title">{{ __("interface.researchesHomeTitle") }}</h5>
                          <p class="card-text">{{ __("interface.researchesHomeDescription") }}</p>
                          <button class="btn btn-primary" onclick=""><i class="fas fa-list"></i>  {{ __("interface.btnListResearch") }}</button>
                      </div>
                  </div>
                </div>
              </div>


            <div class="row" id="researchesContent">
            </div>

            

            <br>

            <div class="row">
                <div class="col">
                  <div class="card border-light mb-3">
                      <div class="card-body">
                          <h5 class="card-title">{{ __("interface.numbersHomeTitle") }}</h5>
                          <p class="card-text">{{ __("interface.numbersHomeDescription") }}</p>
                      </div>
                  </div>
                </div>
              </div>

              <br>

            <div class="content">
                <div class="row">
                    <div class="col">
                        <div class="card text-center border-primary">
                            <div class="card-body">
                                <h5 class="card-title"><i class="fas fa-book"></i>  {{__('interface.researchesNumberHomeTitle')}}</h5>
                                <h1>{{$counts['researches']}}</h1>
                                <p class="card-text">{{__('interface.researchesNumberHomeDesc')}}</p>
                                <a class="btn btn-primary" href="{{ route('researches') }}">{{ __('interface.btnListResearches') }}</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card text-center border-primary">
                        <div class="card-body">
                            <h5 class="card-title"><i class="fas fa-book"></i>  {{__('interface.testGroupsNumberHomeTitle')}}</h5>
                            <h1>{{$counts['testGroups']}}</h1>
                            <p class="card-text">{{__('interface.testGroupsNumberHomeDesc')}}</p>
                            {{-- <a class="btn btn-primary" href="{{ route('testGroups') }}">{{ __('interface.btnListResearches') }}</a> --}}
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card border-primary">
                        <div class="card-body">
                            <h1>{{$counts['tests']}}</h1>
                            <p><i class="fas fa-vial"></i> 56 Testes Realizados</p>
                            <a href="#">ver</a>
                        </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <div class="card border-primary">
                        <div class="card-body">
                            <p><i class="fas fa-table"></i> 4 relatorios processados</p>
                            <a href="#">ver</a>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card border-primary">
                        <div class="card-body">
                            <p><i class="fas fa-table"></i> Pesquisa de formularios</p>
                            <a href="#">ver</a>
                        </div>
                        </div>
                    </div>
                    {{-- <div class="col">
                        <div class="card">
                        <div class="card-body">
                            <p><i class="fas fa-book"></i> 56 Testes Realizados</p>
                            <a href="#">ver</a>
                        </div>
                        </div>
                    </div> --}}
                </div>
            </div>
        </div>
    </div>
</div>

<script type="text/javascript">
var actualPage = 1  
var langStr = [];
langStr["btnListTests"] = '{{__("interface.btnListTests")}}'; 
langStr["eraseTestTitle"] = '{{__("interface.eraseTestTitle")}}'; 
langStr["eraseTestMsg"] = '{{__("interface.eraseTestMsg")}}'; 
langStr["btnManageResearch"] = '{{__("interface.btnManageResearch")}}';

$(function() {
     loadResearches();
 });

function loadResearches() {
     loading(true);
     getResearches({
        page: actualPage,
        elements_per_pag: 3,
     }, function(data) {
         console.log(data);
         $('#researchesContent').html('');
         if (typeof data.data !== 'undefined' && data.data.length > 0) {
            data.data.forEach(item => {
                $('#researchesContent').append(getResearchItem(item,langStr,true));
            });
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
</script>


{{ view('base.footer') }}