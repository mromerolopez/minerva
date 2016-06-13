'use strict';

app.directive('minervaHeader', function ($timeout) {

    return {
        restrict: 'E',
        templateUrl: 'components/minerva-header/minerva-header.html',
        scope: {
            user: '=',
            salir: '='
        },
        link: function (scope, elem, attrs) {
            
            $timeout(function () {
                $.AdminLTE.options = {
                    navbarMenuSlimscroll: true,
                    navbarMenuSlimscrollWidth: "3px",
                    navbarMenuHeight: "200px",
                    animationSpeed: 500,
                    sidebarToggleSelector: "[data-toggle='offcanvas']",
                    sidebarPushMenu: true,
                    sidebarSlimScroll: true,
                    sidebarExpandOnHover: false,
                    enableBoxRefresh: true,
                    enableBSToppltip: true,
                    BSTooltipSelector: "[data-toggle='tooltip']",
                    enableFastclick: true,
                    enableControlSidebar: true,
                    controlSidebarOptions: {
                        toggleBtnSelector: "[data-toggle='control-sidebar']",
                        selector: ".control-sidebar",
                        slide: true
                    },
                    colors: {
                        lightBlue: "#3c8dbc",
                        red: "#f56954",
                        green: "#00a65a",
                        aqua: "#00c0ef",
                        yellow: "#f39c12",
                        blue: "#0073b7",
                        navy: "#001F3F",
                        teal: "#39CCCC",
                        olive: "#3D9970",
                        lime: "#01FF70",
                        orange: "#FF851B",
                        fuchsia: "#F012BE",
                        purple: "#8E24AA",
                        maroon: "#D81B60",
                        black: "#222222",
                        gray: "#d2d6de"
                    },
                    screenSizes: {
                        xs: 480,
                        sm: 768,
                        md: 992,
                        lg: 1200
                    }
                };

                var o = $.AdminLTE.options;
                if (o.sidebarPushMenu) {
                    $.AdminLTE.pushMenu.activate(o.sidebarToggleSelector);
                }
            });
            
        }
    };
});