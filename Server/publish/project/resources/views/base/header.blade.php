<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <!-- Scripts -->
        <script src="{{ asset('js/easeljs.min.js') }}"></script>
        <script src="{{ asset('js/app.js') }}" ></script>
        <script src="{{ asset('js/baseFunctions.js') }}" ></script>
        <script src="{{ asset('js/cell.js') }}"></script>
        <script src="{{ asset('js/randomGrid.js') }}"></script>
        <script src="{{ asset('js/icon.js') }}"></script>
        <script src="{{ asset('js/render.js') }}"></script>
        <script src="{{ asset('js/testControl.js') }}"></script>
        <script src="{{ asset('js/boardGenerator.js') }}"></script>
        
        <!-- Styles -->
        <link href="{{ asset('css/app.css') }}" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            .form-group.required label:after {
                content:"*";
                color:red;
                }
        </style>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Home</title>
        <link rel="icon" type="image/x-icon" href="{{ asset('assets/web-imgs/favico.png') }}">
    </head>
    <body>