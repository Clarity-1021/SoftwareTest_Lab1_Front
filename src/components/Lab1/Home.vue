<template>
    <div class="d-flex flex-column" style="height: 100%">
        <TopToolBar @sendNagDrawer="getNagDrawer" :nagDrawer="nagDrawer" />

        <div style="width: 100%" class="d-flex flex-row flex-fill">
            <LeftMenu :nagDrawer="nagDrawer" :selected="selected" />

            <v-main style="" class="flex-fill">
                {{ selected }}
                {{ nagDrawer }}
                <AccountManagement v-if="selected === '账户管理'" />
                <LoanProducts v-if="selected === '贷款产品'" />
            </v-main>
        </div>

    </div>

</template>

<script>
    export default {
        name: "Home",

        data: () => ({
            nagDrawer: true,
            selected: 'nmd',
        }),
        methods: {
            getNagDrawer(message) {
                this.nagDrawer = message;
            },
            logout() {
                // this.$store.commit("logout");
                this.$router.replace({path: './Login'});
            },
            // 注销弹窗，确认取消
            // logoutCheck() {
            //     this.$confirm('确定要注销吗？', '确认信息', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //     }).then(() => {
            //         this.$store.commit("logout");
            //
            //         //注销成功通知
            //         this.$notify({
            //             title: '注销成功！',
            //             type: 'success'
            //         });
            //         //跳转登录
            //         this.$router.push({path: './login'});
            //     }).catch(() => {
            //         //取消注销消息提示
            //         this.$message({
            //             showClose: true,
            //             message: '已取消注销~',
            //             type: 'success'
            //         });
            //     });
            // },
        }
    }
</script>

<style scoped>

</style>
