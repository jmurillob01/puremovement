(function () {
    checkUrlAccessAdmin();
})()

function checkUrlAccessAdmin() {
    try {
        let userId = document.getElementById("user-recipes").innerHTML;

        let searchData = new FormData();
        searchData.append('id', userId);

        // Fetch para obtener los ingredientes de la receta
        fetch('/getUserById', {
            method: 'post',
            headers: {
                'url': '/getUserById',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: searchData,
        }).then((response) => {
            return response.json();
        }).then((response) => {
            if (response[0].id_rol ==2) {
                window.location.assign("/");
            }
        }).catch((error) => {
            // No muestra nada
        })
    } catch (error) {
        window.location.assign("/");
    }
}