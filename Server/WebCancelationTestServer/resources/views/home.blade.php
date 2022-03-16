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
                    <h1 class="display-6">{{__("interface.welcoming",["name" => "user"])}}</h1>
                    <p class="lead">{{__("interface.welcomingDesc")}}</p>
                </div>
            </div>

            <div class="content">
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <p><i class="fas fa-book"></i> 1 pesquisa</p>
                                <a href="{{ route('researches') }}">ver</a>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                        <div class="card-body">
                            <p><i class="fas fa-vials"></i> 24 Grupos de teste</p>
                            <a href="{{ route('testGroups') }}">ver</a>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
                        <div class="card-body">
                            <p><i class="fas fa-vial"></i> 56 Testes Realizados</p>
                            <a href="#">ver</a>
                        </div>
                        </div>
                    </div>
                </div>
                <br>
                <div class="row">
                    <div class="col">
                        <div class="card">
                        <div class="card-body">
                            <p><i class="fas fa-table"></i> 4 relatorios processados</p>
                            <a href="#">ver</a>
                        </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card">
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

{{ view('base.footer') }}