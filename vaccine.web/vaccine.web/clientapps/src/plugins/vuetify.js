import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import zhHant from 'vuetify/es5/locale/zh-Hant';
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify);

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)


//const messages = {
//    en: {
//        $vuetify: {
//            dataIterator: {
//                rowsPerPageText: 'Items per page:',
//                pageText: '{0}-{1} of {2}',
//            },
//        },
//    },
//    sv: {
//        $vuetify: {
//            dataIterator: {
//                rowsPerPageText: 'Element per sida:',
//                pageText: '{0}-{1} av {2}',
//            },
//        },
//    },
//}

//import en from 'languages/en'
//import tw from 'languages/tw'

//// ¨Ï¥Î???«Ø VueI18n ?¨Ò
//const i18n = new VueI18n({
//    locales: { en, tw },
//    locale: 'tw', // set locale
//    messages, // set locale messages
//})

export default new Vuetify({
    theme: {
        light:true ,
        dark: true,
      options: {
        customProperties: true,
      },
        themes: {
        dark: {
        },
      light: {
        primary: '#2EB6C7',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      },
    },
  },
    lang: {
        locales: { zhHant },
        current: 'zh-Hant',
    },
    icons: {
        iconfont:'fa'||'mdi'
    }
});
