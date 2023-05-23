<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access - @yield('title')</title>

    <!-- links -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous">
    <!-- css -->
    <link rel="stylesheet" href="{{url('css/principal.css')}}">
    <link rel="stylesheet" href="{{url('css/access.css')}}">
</head>

<body>
    <header>
        <!-- Nav -->
        <!-- Nav -->
        <nav id="navbar-navbar" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <!-- Icono temporal de la página class="navbar-brand -->
                <div class="navbar-brand">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bezier" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                        <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z" />
                    </svg> -->
                    <img class="logo" src="{{url('src/logo.png')}}" alt="logo-puremovement">
                    <button class="navbar-buttom" onclick="window.location.assign('/')">Puremovement</button>
                </div>
            </div>
        </nav>
    </header>
    <main>
        <div id="container-buttons" class="container col-10 col-md-6">
            <button class="col-4 access-btn" onclick="window.location.assign('/user/register')">Registro</button>
            <button class="col-4 access-btn" onclick="window.location.assign('/')">Volver</button>
            <button class="col-4 access-btn" onclick="window.location.assign('/user/login')">Login</button>
        </div>

        <hr class="access-hr col-10 col-md-6">

        <div class="col-12 col-md-8 container">
            @if (Session::get('error'))
            <div class="alert alert-danger">
                <strong>{{Session::get('error')}}</strong><br>
            </div>
            @endif
        </div>

        <div class="col-12 col-md-8 container">
            @if (Session::get('success'))
            <div class="alert alert-success">
                <strong>{{Session::get('success')}}</strong><br>
            </div>
            @endif
        </div>

        <div class="col-8 col-md-6 container">
            @yield('content')
        </div>

    </main>
    <!-- <footer class="text-center text-lg-start bg-white text-muted"> -->
        <!-- Copyright
        <div class="footer-container copyright text-center p-4">
            © 2023 Copyright: 
            <a class="text-reset fw-bold"> Javier Murillo Burgos</a>
        </div> -->
    <!-- </footer> -->

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>
    <script src="{{url('js/validation.js')}}" type="module"></script>
    <!-- <script src="{{url('js/access.js')}}"></script> -->
    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script> -->

</body>

</html>