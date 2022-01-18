<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="#">WebCancellationTest</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">{{ __("interface.home") }} <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {{__("interface.language")}}
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item {{ session()->get('locale') == 'en' ? 'active' : '' }}" href="{{ route('changeLang',['lang' => 'en']) }}"><img style="width: 20px" src="{{ asset('assets/lang-imgs/en.png') }}" alt="Image"/>   {{__("interface.english")}}</a>
          <a class="dropdown-item {{ session()->get('locale') == 'pt' ? 'active' : '' }}" href="{{ route('changeLang',['lang' => 'pt']) }}"><img style="width: 20px" src="{{ asset('assets/lang-imgs/pt.png') }}" alt="Image"/>   {{__("interface.portuguese")}}</a>
          <a class="dropdown-item {{ session()->get('locale') == 'fr' ? 'active' : '' }}" href="{{ route('changeLang',['lang' => 'fr']) }}"><img style="width: 20px" src="{{ asset('assets/lang-imgs/fr.png') }}" alt="Image"/>   {{__("interface.french")}}</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" href="#">Disabled</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>