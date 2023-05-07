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

    </header>
    <main>

        <div id="container-buttons" class="container">
            <button class="btn btn-primary btn-principal" onclick="window.location.assign('/user-register')">Registro</button>
            <button class="btn btn-primary btn-return" onclick="window.location.assign('/')">Volver</button>
            <button class="btn btn-primary btn-principal" onclick="window.location.assign('/user-login')">Login</button>
        </div>

        <!-- Hay que testearlo -->
        <!-- <div class="col-12 col-md-8 container"> 
            @if ($errors->any())
            <div class="alert alert-danger">
                <strong>Error fatal</strong><br>
                <ul>
                    @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
            @endif
        </div> -->

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

        <div class="col-12 col-md-8 container">
            @yield('content')
        </div>

    </main>
    <footer>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>
    <script src="{{url('js/validation.js')}}" type="module"></script>
    <!-- <script src="{{url('js/access.js')}}"></script> -->
    <!-- JQuery -->
     <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script> -->

</body>

</html>