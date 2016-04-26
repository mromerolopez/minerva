//factoria que controla la autentificación, devuelve un objeto
//$cookies para crear cookies
//$cookieStore para actualizar o eliminar
//$location para cargar otras rutas

angular.module('minervaApp').factory("auth", auth);

function auth($cookies, $location, cookieConfig) {
    return {
        login: login,
        logout: logout,
        checkStatus: checkStatus,
        in_array: in_array,
        get_user: get_user
    };


    function login(user) {
        user.password = null;
        $cookies.putObject(cookieConfig.name, user);
        //$location.path("/panel");
    }

    function logout() {
        $cookies.remove(cookieConfig.name);
        $location.path("/login");
    }

    function checkStatus() {
        
        var rutasPrivadas = ["/", "/main", "/opcions", "/prestamo-listaxe", "/prestamo-novo", "/xestion-accesos", "xestion-biblioteca", "xestion-usuarios"];
        
        if (this.in_array($location.path(), rutasPrivadas) && typeof ($cookies.getObject(cookieConfig.name)) === "undefined") {
            $location.path("/login");
        }
        
        if ("/login" === $location.path() && typeof ($cookies.getObject(cookieConfig.name)) !== "undefined") {
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
    
    function get_user(){
        return $cookies.getObject(cookieConfig.name);
    }
}

