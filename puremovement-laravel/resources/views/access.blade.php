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

        <div class="col-12 col-md-8 container">
            @yield('content')
        </div>

    </main>
    <footer>

    </footer>
</body>

</html>