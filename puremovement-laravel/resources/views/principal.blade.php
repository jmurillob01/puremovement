<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{csrf_token()}}" />
    <title>Puremovement</title>

    <!-- links -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous">
    <!-- css -->
    <link rel="stylesheet" href="{{url('css/access.css')}}"> <!-- Importo la de acceso para el formulario-->
    <link rel="stylesheet" href="{{url('css/principal.css')}}">
</head>

<body>
    <!-- Header -->
    <header>
        <!-- Modal warnings-->
        <div class="modal fade" id="warningModal" tabindex="-1" aria-labelledby="warningModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="warningModalLabel"></h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p id="warningModalContent"></p>
                    </div>
                    <div class="modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Nav -->
        <nav id="navbar-navbar" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Icono temporal de la página class="navbar-brand -->
                <div class="navbar-brand">
                    <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-bezier" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M0 10.5A1.5 1.5 0 0 1 1.5 9h1A1.5 1.5 0 0 1 4 10.5v1A1.5 1.5 0 0 1 2.5 13h-1A1.5 1.5 0 0 1 0 11.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zm10.5.5A1.5 1.5 0 0 1 13.5 9h1a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1-1.5 1.5h-1a1.5 1.5 0 0 1-1.5-1.5v-1zm1.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1zM6 4.5A1.5 1.5 0 0 1 7.5 3h1A1.5 1.5 0 0 1 10 4.5v1A1.5 1.5 0 0 1 8.5 7h-1A1.5 1.5 0 0 1 6 5.5v-1zM7.5 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z" />
                        <path d="M6 4.5H1.866a1 1 0 1 0 0 1h2.668A6.517 6.517 0 0 0 1.814 9H2.5c.123 0 .244.015.358.043a5.517 5.517 0 0 1 3.185-3.185A1.503 1.503 0 0 1 6 5.5v-1zm3.957 1.358A1.5 1.5 0 0 0 10 5.5v-1h4.134a1 1 0 1 1 0 1h-2.668a6.517 6.517 0 0 1 2.72 3.5H13.5c-.123 0-.243.015-.358.043a5.517 5.517 0 0 0-3.185-3.185z" />
                    </svg> -->
                    <img class="logo" src="{{url('src/logo.png')}}" alt="logo-puremovement">
                    <button tabindex="1" class="navbar-buttom" onclick="window.location.assign('/')">Puremovement</button>
                </div>

                <!-- Crear lista desplegable con opciones de cuenta, solo con sesión iniciada -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul id="navbar-nav" class="navbar-nav">
                        <!-- Ya sea iniciar como cerrar sesión -->
                        <!-- <li class="nav-item">
                            test
                        </li> -->
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <!-- Main -->
    <main>
        <div id="carouselExample" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="{{url('src/banner1.jpg')}}" class="d-block w-100" alt="...">
                </div>
            </div>
        </div>

        <div class="col-12 col-md-8 container mt-5">
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

        <!-- Por esto se ve mal en móvil. Si pongo container se arregla pero se fastidia la vista -->
        <div id="div-graphic-calculate-buttons" class="container"></div>
        <!-- 
        <div class="user-content row">
            <div id="canvas-container" class="canvas-container container col-12 col-md-6 p-5"> style="width: 600px; height:200px"
                <canvas id="myChart" width="400" height="100" class="myChart"></canvas>
            </div>
            <div id="user-data-form" class="col-12 col-md-4 p-5">
                dasdasd
            </div>
        </div> -->

        <!-- <div id="div-recipe-ranking" class="row container">
            <div id="div-ranking" class="col-12">
                <div class="container">
                    <h1 class="h3"></h1>
                </div>
            </div>
        </div> -->
    </main>
    <!-- Footer -->
    <footer class="text-center text-lg-start bg-white text-muted">
        <!-- Copyright -->
        <div class="footer-container copyright text-center p-4">
            © 2023 Copyright:
            <a class="text-reset fw-bold"> Javier Murillo Burgos</a>
        </div>
    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="{{url('js/utils.js')}}"></script>
    <script src="{{url('js/principal.js')}}" type="module"></script>

</body>

</html>