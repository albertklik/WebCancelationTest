<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Scripts -->
        <script src="{{ asset('js/app.js') }}" defer></script>
        <script src="{{ asset('js/cancellationTest.js') }}" defer></script>
        
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cancellation Test</title>
    </head>
    <body>
        <div class="container body-content">
            <div class="row text-center">
                <div class="col">
                    <p>WEBCANCELLATION TEST</p>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col" style="margin-top: 5em">
                    <div class="row" style="padding: 2em">
                        <p class="h1" style="font-size: 60px;">Olá, <br> Qual o seu nome?</p>
                    </div>
                    <div class="row">
                        <div class="col">
                        <input class="form-control" style="font-size: 30px" list="nomeListOptions" id="nomeDataList" placeholder="Escreva o seu nome...">
                        <datalist id="nomeListOptions">
                            <option value="">
                        </datalist>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                                <button style="margin-top: 2em" class="btn btn-lg btn-outline-primary" type="button">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row align-items-center">
                <div class="col" style="margin-top: 5em">
                    <div class="row" style="padding: 2em">
                        <p class="h1" style="font-size: 60px;">Parece que você é novo por aqui.</p>
                    </div>
                    <div class="row" style="padding-top: 2em">
                        <div class="col">
                            <form>
                                <div class="mb-3">
                                    <label class="form-label" style="font-size: 30px" for="studentName">Insira o seu nome</label>
                                    <input class="form-control" style="font-size: 30px" id="studentName" placeholder="Luiz da silva">
                                </div>
                                <div class="mb-3">
                                    <label class="form-label" style="font-size: 30px" for="studentDateOfBirth">Insira a sua data de nascimento</label>
                                    <input class="form-control" type="date" style="font-size: 30px" id="studentDateOfBirth" placeholder="01/06/1970">
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                                <button style="margin-top: 2em" class="btn btn-lg btn-outline-primary" type="button">Continuar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </body>
</html>