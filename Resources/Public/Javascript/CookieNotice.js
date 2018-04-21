(function (window, document) {
    'use strict';

    /**
     * 
     */
    class CookieNotice {
        /**
         * 
         * @param {object} params 
         */
        constructor(params) {
            var settings = {
                cookieName: "CookieNotice",
                cookieLifetime: null, // seconds or nothing for year 2099
                uriStyles: 'Plugins/CookieNotice/styles.css',
                uriContent: 'Plugins/CookieNotice/Content.html',
                buttonQuerySelector: '#cookie-notice-confirmed',
                container: document.createElement("DIV"),
                onContentLoaded: function (self) {},
                onButtonClicked: function (self) {}
            };

            // overwrite default settings
            if (typeof params === "object") {
                for (var key in params) {
                    if (params.hasOwnProperty(key) && typeof settings[key] !== "undefined") {
                        settings[key] = params[key];
                    }
                }
            }

            var CN = this;

            /**
             * 
             */
            this.loadStyles = function () {
                if (!settings.uriStyles) {
                    return;
                }
                var f = document.createElement("link");
                f.setAttribute("rel", "stylesheet");
                f.setAttribute("type", "text/css");
                f.setAttribute("href", settings.uriStyles);
                document.querySelector("head").appendChild(f);
            };

            /**
             * Cookie: create, read, erase
             */
            this.cookie = {
                create: function () {
                    var expires = "";
                    if (settings.cookieLifetime) {
                        var date = new Date();
                        date.setTime(date.getTime() + (settings.cookieLifetime * 1000));
                        expires = "; expires=" + date.toUTCString();
                    } else {
                        expires = "; expires=Thu, 31 Dec 2099 23:59:59 UTC";
                    }
                    document.cookie = settings.cookieName + "=displayed" + expires + "; path=/";
                },
                read: function () {
                    var nameEQ = settings.cookieName + "=";
                    var ca = document.cookie.split(';');
                    for (var i = 0; i < ca.length; i++) {
                        var c = ca[i];
                        while (c.charAt(0) === ' ') {
                            c = c.substring(1, c.length);
                        }
                        if (c.indexOf(nameEQ) === 0) {
                            return c.substring(nameEQ.length, c.length);
                        }
                    }
                    return null;
                },
                erase: function () {
                    createCookie(settings.cookieName, "", -1);
                }
            };

            // do nothing, if notice was shown
            if (this.cookie.read()) {
                return;
            }

            // first load styles
            this.loadStyles();

            // load content
            var request = new XMLHttpRequest();
            request.open("GET", settings.uriContent);
            request.addEventListener('load', function (event) {
                if (request.status >= 200 && request.status < 300) {
                    settings.container.innerHTML += request.responseText;

                    if (typeof settings.onContentLoaded === "function") {
                        settings.onContentLoaded(CN);
                    }
                    
                    var btn = document.querySelector(settings.buttonQuerySelector);
                    if (btn) {
                        btn.addEventListener("click", function () {
                            CN.cookie.create();
                            settings.container.parentNode.removeChild(settings.container);

                            if (typeof settings.onButtonClicked === "function") {
                                settings.onButtonClicked(CN);
                            }
                        }, false);
                    }
                } else {
                    console.warn(request.statusText, request.responseText);
                }
            });
            request.send();
        }
    };

    if (typeof define === 'function' && define.amd) {
        define(function () {
            return CookieNotice;
        });
    } else {
        window.CookieNotice = CookieNotice;
    }

})(window, document);
