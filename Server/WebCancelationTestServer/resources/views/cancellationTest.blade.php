<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Scripts -->
        
        <script src="https://code.createjs.com/1.0.0/easeljs.min.js"></script>
        <script src="{{ asset('js/cell.js') }}"></script>
        <script src="{{ asset('js/randomGrid.js') }}"></script>
        <script src="{{ asset('js/icon.js') }}"></script>
        <script src="{{ asset('js/render.js') }}"></script>
        <script src="{{ asset('js/baseFunctions.js') }}"></script>
        <script src="{{ asset('js/testControl.js') }}"></script>
        <script src="{{ asset('js/app.js') }}" ></script>
        <script src="{{ asset('js/cancellationTest.js') }}"></script>
        <script src="{{ asset('js/boardGenerator.js') }}"></script>

        <script>
            setTestGroupData({!! json_encode($testGroup) !!});
            console.log(testData.testGroup);
            

            testData.interfaceStr = [];
            testData.interfaceStr["thirtySeconds"] = '{{__("interface.thirtySeconds")}}'; 
            testData.interfaceStr["oneMinute"] = '{{__("interface.oneMinute")}}'; 
            testData.interfaceStr["twoMinutes"] = '{{__("interface.twoMinutes")}}'; 
            testData.interfaceStr["threeMinutes"] = '{{__("interface.threeMinutes")}}'; 
            testData.interfaceStr["fiveMinutes"] = '{{__("interface.fiveMinutes")}}'; 
            testData.interfaceStr["TenMinutes"] = '{{__("interface.TenMinutes")}}'; 
            testData.interfaceStr["thirtyMinutes"] = '{{__("interface.thirtyMinutes")}}'; 
            testData.interfaceStr["oneHour"] = '{{__("interface.oneHour")}}'; 

            testData.imgs_url = [
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
        </script>
        
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
             html, body {
              width: 100%;
              height: 100%;
              margin: 0px;
              border: 0;
              display: block;  /* No floating content on sides */
            } 
    
             canvas {
                cursor: pointer;
                width: 90%;
                height:  90%;
                margin-left: 5%;
                margin-right: 5%;
                margin-top: 2%;
                position: relative;
                align-self: center;
            } 
            .carousel-control-prev-icon,
            .carousel-control-next-icon {
              height: 100px;
              width: 100px;
              outline: black;
              background-size: 100%, 100%;
              border-radius: 50%;
              border: 2px solid black;
              background-image: none;
            }

            .carousel-control-next-icon:after
            {
              content: '>';
              font-size: 55px;
              color: black;
            }

            .carousel-control-prev-icon:after {
              content: '<';
              font-size: 55px;
              color: black;
            }
            </style>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cancellation Test</title>
    </head>
    <body>
        <div class="row text-center">
            <div class="col" id="logo">
              <img style="height: 50px" src="{{ asset('assets/web-imgs/logo.png') }}" />
            </div>
        </div>
        <!-- logo -->
        <div id="loaderSpinner" class="d-none">
          <div  class="d-flex justify-content-center">
              <div class="spinner-border" style="width: 5rem; height: 5rem; margin-top: 5em" role="status">
              <span class="sr-only">Loading...</span>
              </div>
          </div>
        </div>
        <div id="formContent" class="d-block container body-content">
            <!-- insert name -->
            <div id="formInsertName" class="d-none row align-items-center">
                <div class="col" style="margin-top: 5em">
                    <div class="row" style="padding: 2em">
                        <p class="h1" style="font-size: 60px;">{{__("test.formName")}}</p>
                    </div>
                    <div class="row">
                        <div class="col">
                        <input class="form-control" style="font-size: 30px" list="nomeListOptions" id="nomeDataList" placeholder="{{__("test.tooltipName")}}">
                        <datalist id="nomeListOptions">
                            <option value="">
                        </datalist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button id="checkNameButton" style="margin-top: 5em" class="btn btn-lg btn-outline-primary pull-right" type="button">{{__("test.btnNext")}} </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- student form -->
            <div id="formStudent" class="d-none row align-items-center">
                <div class="col" style="margin-top: 5em">
                    <div class="row" style="padding: 2em">
                        <p class="h1" style="font-size: 60px;">{{__("test.formJoin")}}</p>
                    </div>
                    <div class="row" style="padding-top: 2em">
                        <div class="col">
                            <form>
                                <div class="mb-3">
                                    <input hidden readonly class="form-control-plaintext" style="font-size: 30px" id="studentName" >
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" style="font-size: 30px" for="studentDateOfBirth">{{__("test.formDateOfBirth")}}</label>
                                    <input class="form-control" type="date" style="font-size: 30px" id="studentBirthDate" placeholder="01/06/1970">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button id="saveStudentButton" style="margin-top: 2em" class="btn btn-lg btn-outline-primary pull-right" type="button">{{__("test.btnReady")}}</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- presenting target and time -->
            <div id="showTargetAndTime" class="d-none row">
              <div class="col" style="margin-top: 5em">
                <div class="row" style="padding: 2em">
                    <p class="h1" style="font-size: 60px;">{{__("test.formTarget")}}</p>
                </div>
                <div class="row" style="padding-top: 2em">
                  <div class="col">
                    <img id="targetImg" class="mx-auto d-block">
                  </div>
                </div>
                <div class="row" style="padding: 2em">
                  <p class="h1" style="font-size: 60px;">{{__("test.formTime")}}</p>
                </div>
                <div class="row" style="padding-top: 2em">
                  <div class="col text-center">
                    <p class="h1" id="TestTimeSpan"></p>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                    <button id="showDistractors" style="margin-top: 2em" class="btn btn-lg btn-outline-primary pull-right" type="button">{{__("test.btnUnderstood")}}</button>
                </div>
              </div>
            </div>

            <!-- presenting figures -->
            <div id="showFigures" class="d-none row">
                <div class="col" style="margin-top: 5em">
                    <div class="row" style="padding: 2em">
                        <p class="h1" style="font-size: 60px;">{{__("test.formIcons")}}</p>
                    </div>
                    <div class="row" style="padding-top: 2em">
                        <div class="col">
                            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                                <div class="carousel-inner">
                                  <div class="carousel-item active">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/carro.png')}} " alt="First slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/casa.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/arvore.png')}} " alt="Second slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/bule.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/sol.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/galinha.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/coelho.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/gato.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/flor.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/peixe.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/estrela.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/aviao.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                  <div class="carousel-item">
                                    <div class="text-center">
                                    <img class="" src="{{ asset('assets/icons/barco.png')}} " alt="Third slide">
                                    </div>
                                  </div>
                                </div>
                                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                  <span class="sr-only">Previous</span>
                                </a>
                                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span class="sr-only">Next</span>
                                </a>
                              </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <button id="startTest" style="margin-top: 2em" class="btn btn-lg btn-outline-primary pull-right" type="button">{{__("test.btnUnderstood")}}</button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- finish message -->
            <div id="showResult" class="d-none row">
                <div class="col" style="margin-top: 5em">
                    <div class="row" style="padding: 2em;">
                        <p class="h1" style="font-size: 60px;">{{__("test.endMessage")}}</p>
                    </div>
                </div>
            </div>

            <div id="messages" >
            </div>
        </div>
        <canvas class="d-none canvas" id="testCanvas" width="1920" height="1080"></canvas>
    </body>
</html>