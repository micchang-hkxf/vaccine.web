<template>
    <div></div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        // router,
        data: () => ({
        }),
        computed: {
        },
        created: function () {
            var error = this.$cookies.get('error');
            if (error) {
                window.location.href = this.$route.query.redirect;
                return;
            }
            window.sessionStorage.getItem('activityApply', this.$cookies.get('activityApply'));
            var token = this.$cookies.get('x-token');
            if (!token) return;
            this.loadUserInfo(token).then(() => {
                this.$cookies.remove('x-token');
                window.location.href = this.$route.query.redirect ;
            });
        },
        methods: {
            ...mapActions('regist', ['loadUserInfo']),
        },
        components: {
        }
    }
</script>

