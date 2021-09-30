<template>
    <app-layout :app-bar="appBar" class="unapply-content">
        <template v-slot:regist-title>
            「<span v-if="findVaccineGroup(groupId)">{{findVaccineGroup(groupId).groupName}}</span>疫苗」選擇接種場次
        </template>
        <template v-slot:regist-content>
            <unapply-list :group-id="groupId"></unapply-list>
        </template>
        <template v-slot:regist-footer>
            <app-footer></app-footer>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    import appFooter from 'components/regist/regist_footer'
    import unapplyList from 'components/regist/forms/unapply_list'
    import { mapGetters } from 'vuex'

    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '160px'
            },
            group :null 
        }),
        beforeRouteEnter: function beforeRouteEnter(to, from, next) {
            next(function (vm) {
                vm.$store.dispatch("regist/scrollToZero")
            });
        },
        computed: {
            ...mapGetters('regist', ['findVaccineGroup']),
            groupId: function () {
                if (this.$route.query) 
                    return this.$route.query.groupId;
                return null;
            } 
        },
        created: function () {

        },
        methods: {
        },
        components: {
            appLayout, appFooter, unapplyList
        }
    }
</script>
<style scoped>

</style>
