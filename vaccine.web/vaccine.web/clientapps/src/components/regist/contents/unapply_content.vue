<template>
    <app-layout :app-bar="appBar" class="unapply-content">
        <template v-slot:regist-title>
            「新冠肺炎疫苗」選擇種接場次
        </template>
        <template v-slot:regist-content>
            <unapply-list :group-id="groupId"></unapply-list>
        </template>
    </app-layout>
</template>

<script>
    import appLayout from 'components/regist/regist_layout'
    import unapplyList from 'components/regist/forms/unapply_list'
    export default {
        // router,
        data: () => ({
            appBar: {
                elevation: 0,
                height: '144px'
            }
        }),
        computed: {
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
            appLayout, unapplyList
        }
    }
</script>
<style scoped>

</style>
