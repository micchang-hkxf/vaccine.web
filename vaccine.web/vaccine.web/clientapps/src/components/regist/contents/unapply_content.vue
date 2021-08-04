<template>
    <app-layout :app-bar="appBar" class="unapply-content">
        <template v-slot:regist-title>
            「<span v-if="groupId=='influenza'">肺鏈、流感</span>
              <span v-if="groupId=='covid'">新冠肺炎</span>疫苗」選擇接種場次
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
