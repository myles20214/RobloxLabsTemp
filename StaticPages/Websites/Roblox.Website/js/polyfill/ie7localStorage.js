if (typeof window.localStorage === 'undefined' || typeof window.sessionStorage === 'undefined') (function () {
    var Storage = function (type) {
        var bUnloadListenerApplied = false,
            cookieName = "localStorage";

        function readCookie() {
            var nameEq = cookieName + "=",
                ca = document.cookie.split(';'),
                i, c;

            for (i = 0; i < ca.length; i++) {
                c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1, c.length);
                }

                if (c.indexOf(nameEq) === 0) {
                    return c.substring(nameEq.length, c.length);
                }
            }
            return null;
        }

        function setData(data) {
            data = data.length ? JSON.stringify(data) : '';
            if (type == 'session') {
                window.name = data;
                if (!bUnloadListenerApplied) {      // IE7 windows as named targets only keep writes on unload.
                    if (window.addEventListener) window.addEventListener("unload", setData, false);
                    else if (window.attachEvent) window.attachEvent("onunload", setData);
                    bUnloadListenerApplied = true;
                }
            } else {
                var date = new Date();
                date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
                document.cookie = cookieName + "=" + data + "; expires=" + date.toGMTString() + "; path=/";
            }
        }

        // initialise if there's already data
        var data = type == 'session' ? window.name : readCookie();
        data = data ? JSON.parse(data) : {};

        return {
            clear: function () {
                data = {};
                setData('');
            },
            getItem: function (key) {
                return data[key] === undefined ? null : data[key];
            },
            key: function (i) {
                // not perfect, but works
                var ctr = 0;
                for (var k in data) {
                    if (ctr == i) return k;
                    else ctr++;
                }
                return null;
            },
            removeItem: function (key) {
                delete data[key];
                setData(data);
            },
            setItem: function (key, value) {
                data[key] = value + ''; // forces the value to a string
                setData(data);
            }
        };
    };

    if (typeof window.localStorage == 'undefined') window.localStorage = new Storage('local');
    if (typeof window.sessionStorage == 'undefined') window.sessionStorage = new Storage('session');
})();

}
