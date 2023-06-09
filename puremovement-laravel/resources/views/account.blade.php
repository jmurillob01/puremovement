<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Puremovement</title>

    <!-- links -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css" integrity="sha384-b6lVK+yci+bfDmaY1u0zE8YYJt0TZxLEAFyYSLHId4xoVvsrQu3INevFKo+Xir8e" crossorigin="anonymous">
    <!-- css No se si los usaré aquí -->
    <link rel="stylesheet" href="{{url('css/access.css')}}"> <!-- Importo la de acceso para el formulario-->
    <link rel="stylesheet" href="{{url('css/principal.css')}}">
</head>

<body>
    <!-- Header -->
    <header>
        <!-- Modal -->
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
                    <div class="modal-footer"></div>
                </div>
            </div>
        </div>
        <!-- Nav -->
        <nav id="navbar-navbar" class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <button class="navbar-brand navbar-buttom" onclick="window.location.assign('/')">Puremovement</button>
                <!-- Crear lista desplegable con opciones de cuenta, solo con sesión iniciada -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul id="navbar-nav" class="navbar-nav">
                        <!-- Ya sea iniciar como cerrar sesión -->
                        <li class="nav-item">
                            <a class="nav-link" href="#">Sesión</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>

    <!-- Main -->
    <main>
        
    </main>
    <footer>

    </footer>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js" integrity="sha384-zYPOMqeu1DAVkHiLqWBUTcbYfZ8osu1Nd6Z89ify25QV9guujx43ITvfi12/QExE" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js" integrity="sha384-Y4oOpwW3duJdCWv5ly8SCFYWqFDsfob/3GkgExXKV4idmbt98QcxXYs9UoXAB7BZ" crossorigin="anonymous"></script>
    <script src="{{url('js/utils.js')}}"></script>
    <script src="{{url('js/account.js')}}"></script>

    <!-- <script src="{{url('js/principal.js')}}" type="module"></script>  -->

</body>

</html>