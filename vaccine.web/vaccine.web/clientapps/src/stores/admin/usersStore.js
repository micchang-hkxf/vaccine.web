export default {
    namespaced: true,
    actions: {
    },
    state: {
        items: [
            {
                no: '1',
                sign: 15900,
                symbo: 6.0,
                date: 24,
                keynote: 4.0,
                delivery: '1%',
            },
            {
                no: '12',
                sign: 23700,
                symbo: 9.0,
                date: 37,
                keynote: 4.3,
                delivery: '1%',
            },
            {
                no: '1',
                sign: 26200,
                symbo: 16.0,
                date: 23,
                keynote: 6.0,
                delivery: '7%',
            },
        ]
    },
    getters: {
        getTableItems: state => state.items 
    },
    mutations: {
    },
    modules: {

    }
}

