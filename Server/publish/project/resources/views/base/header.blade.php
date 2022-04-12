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
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Home</title>
    </head>
    <body>