export default {
    namespaced: true,
    actions: {
    },
    state: {
        moduleEnabled: 'vuex module 已啟用'
    },
    getters: {
        getSessionId: () => {
            return window.sessionStorage.getItem('sessionId');
        },
        getToken: () => {
            return window.sessionStorage.getItem('x_token');
        },
        getZones: () => {
            return JSON.parse(window.sessionStorage.getItem('zones'));
        },
        clear: () => {
            return window.sessionStorage.clear();
        }
    },
    mutations: {
        setSessionId: (state, sessionId) => {
            window.sessionStorage.setItem('sessionId', sessionId);
        },
        setToken: (state, token) => {
            window.sessionStorage.setItem('x_token', token);
        },
        setZones: (state, zones) => {
            window.sessionStorage.setItem('zones', JSON.stringify(zones));
        }
    },
    modules: {
    }
}