"use strict";

(function () { 
    if (sessionStorage.getItem("id")) {
        window.location.assign('/');
    }
})()