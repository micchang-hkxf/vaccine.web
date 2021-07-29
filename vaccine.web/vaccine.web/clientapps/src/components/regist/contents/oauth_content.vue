<template>
    <div></div>
</template>

<script>
    import client from 'stores/clientHelper'
    import { mapActions } from 'vuex'
    export default {
        // router,
        data: () => ({
        }),
        computed: {
        },
        created: function () {
            var token = client.getCookie('x-token');
            if (!token) return;
            this.loadUserInfo(token).then(() => {
                client.setCookie('x-token', null);
                window.location.href = this.$route.query.redirect;
            });
        },
        methods: {
            ...mapActions('regist', ['loadUserInfo']),
        },
        components: {
        }
    }
</script>

