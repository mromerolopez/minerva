//factoria que controla la autentificación, devuelve un objeto
//$cookies para crear cookies
//$cookieStore para actualizar o eliminar
//$location para cargar otras rutas

app.factory("auth", auth);

function auth($cookies, $cookieStore, $location) {
    return {
        login: login,
        logout: logout,
        checkStatus: checkStatus,
        in_array: in_array
    };


    function login(user) {
        $cookies.putObject('minerva_dev_user', user);
        //$location.path("/panel");
    }

    function logout() {
        $cookies.remove('minerva_dev_user');
        $location.path("/login");
    }

    function checkStatus() {
        //creamos un array con las rutas que queremos controlar
//        console.log("check");
//        console.log($cookies.getObject('minerva_dev_user'));
        var rutasPrivadas = ["/", "/main", "/opcions", "/prestamo-listaxe", "/prestamo-novo", "/xestion-accesos", "xestion-biblioteca", "xestion-usuarios"];
        //console.log($location.path());
        
       // console.log($location.path());
        if (this.in_array($location.path(), rutasPrivadas) && typeof ($cookies.getObject('minerva_dev_user')) === "undefined") {
            $location.path("/login");
        }
        
        //en el caso de que intente acceder al login y ya haya iniciado sesión lo mandamos a la home
        if ("/login" === $location.path() && typeof ($cookies.getObject('minerva_dev_user')) !== "undefined") {
            $location.path("/");
        }
    }

    function in_array(needle, haystack) {
        var key = '';
        for (key in haystack) {
            if (haystack[key] === needle) {
                return true;
            }
        }
        return false;
    }
}

//mientras corre la aplicación, comprobamos si el usuario tiene acceso a la ruta a la que está accediendo
app.run(check);

function check($rootScope, auth, $timeout) {

    //al cambiar de rutas
    //se establece un timeout de 100 milisegundos porque si coincide con alguna llamada asíncrona no se produce la comprobación
    //de la cookie
    $timeout($rootScope.$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                //llamamos a checkStatus, el cual lo hemos definido en la factoria auth
                //la cuál hemos inyectado en la acción run de la aplicación
                auth.checkStatus();
            }), 100);
}