//factoria que controla la autentificación, devuelve un objeto
//$cookies para crear cookies
//$cookieStore para actualizar o eliminar
//$location para cargar otras rutas

angular.module('minervaApp').factory("auth", auth);

function auth($cookies, $http, $location, COOKIE) {
    return {
        login: login,
        logout: logout,
        checkStatus: checkStatus,
        in_array: in_array,
        get_user: get_user,
        setToken: setToken,
        getToken: getToken,
        setDefaultAuthHeader:setDefaultAuthHeader
        
    };


    function login(user) {
        user.password = null;
        setUserCookie(user);
    }

    function setUserCookie(user) {
        var now = new Date();
        var expiration = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        var options = {
            expires: expiration
        };
        $cookies.putObject(COOKIE.USER, user, options);
    }

    function logout() {
        $cookies.remove(COOKIE.USER);
        $cookies.remove(COOKIE.TOKEN);
        $location.path("/login");
    }

    function checkStatus() {

        var rutasPrivadas = ["/", "/main", "/opcions", "/prestamo-listaxe", "/prestamo-novo", "/xestion-accesos", "xestion-biblioteca", "xestion-usuarios"];

        if (this.in_array($location.path(), rutasPrivadas) && typeof ($cookies.getObject(COOKIE.USER)) === "undefined") {
            $location.path("/login");
        }

        if ("/login" === $location.path() && typeof ($cookies.getObject(COOKIE.USER)) !== "undefined") {
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

    function get_user() {
        return $cookies.getObject(COOKIE.USER);
    }
    
    function setToken(token){
        var now = new Date();
        var expiration = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        var options = {
            expires: expiration
        };
        $cookies.putObject(COOKIE.TOKEN, token, options);
        setDefaultAuthHeader(token); 
    }
    
    function getToken(){
        return $cookies.getObject(COOKIE.TOKEN);
    }
    
    function setDefaultAuthHeader(token){
        $http.defaults.headers.common.Authorization='Bearer '+ token;
    }
    
}

