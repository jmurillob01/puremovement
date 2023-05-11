console.log("test")

if(window.sessionStorage){ // Soporta almacenamiento de sesión
    if (sessionStorage.getItem("nombre")) {
        console.log("Tenemos sesión, hola" , sessionStorage.getItem("nombre"));
        sessionStorage.removeItem("nombre");
    }else{
        console.log("No tenemos sesión")
        sessionStorage.setItem("nombre", "javi")
    }
    
}else{ // no soporta
    
}
