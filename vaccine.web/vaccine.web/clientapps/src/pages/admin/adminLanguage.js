import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 自訂語言檔
import en from 'languages/en'
import tw from 'languages/tw'

// 使用插件
Vue.use(VueI18n)


let messages = {  en, tw }

// 建立 VueI18n 實體
const i18n = new VueI18n({
    locales: { en, tw},
    locale: localStorage.getItem('locale') || 'tw',
    messages
});

export default i18n