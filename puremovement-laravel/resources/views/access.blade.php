<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Access - @yield('title')</title>
    <link rel="icon" type="image/jpg" href="{{url('src/logo.png')}}"/>

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
        <nav id="navbar-navbar" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <!-- Icono temporal de la página class="navbar-brand -->
                <div class="navbar-brand">
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

        <div class="col-10 col-md-6 container mt-3">
            @if (Session::get('error'))
            <div class="alert alert-danger">
                <strong>{{Session::get('error')}}</strong><br>
            </div>
            @endif
        </div>

        <div class="col-10 col-md-6 container  mt-3">
            @if (Session::get('success'))
            <div class="alert alert-success">
                <strong>{{Session::get('success')}}</strong><br>
            </div>
            @endif
        </div>

        <div class="col-12 col-md-6 container">
            @yield('content')
        </div>

    </main>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>
    <script src="{{url('js/validation.js')}}" type="module"></script>
    <script src="{{url('js/access.js')}}"></script>
    <!-- JQuery -->
    <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>

</body>

</html>