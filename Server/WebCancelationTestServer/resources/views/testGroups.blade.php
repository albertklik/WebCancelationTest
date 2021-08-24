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
                    <div class="card-header">
                      Featured
                    </div>
                    <div class="card-body">
                      <h5 class="card-title">Special title treatment</h5>
                      <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                      <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<!-- content  -->


{{ view('base.footer') }}