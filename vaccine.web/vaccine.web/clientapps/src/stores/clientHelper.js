export default {
    setCookie: function (cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    removeCookie: function (cname) {
        if (this.getCookie(cname)) {
            document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT";
        }
    },
    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    initLangType: function() {
        var tpwv_lang = this.getCookie('tpwv_lang');
        if (!tpwv_lang) tpwv_lang = 'tw';
        tpwv_lang = tpwv_lang.toLowerCase();
        if (tpwv_lang.indexOf('en')!=-1) tpwv_lang = 'en';
        else tpwv_lang = 'tw'

        window.sessionStorage.setItem('tpwv_lang', tpwv_lang);
        console.log(window.sessionStorage.getItem('tpwv_lang'));
    },
    getLangType: function () {
        if (this.getCookie('tpwv_lang').toLowerCase().indexOf('en')!=-1) return 'en'; 
        return 'tw';
    }

}
