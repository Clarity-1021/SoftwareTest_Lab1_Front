<template>
    <div style="height: 60px;width: 100%;color: white; background: #388E3C" class="d-flex flex-row align-center px-2">
        <v-app-bar-nav-icon style="color: white" @click="changeDrawer" class="mx-3"></v-app-bar-nav-icon>

        <v-toolbar-title>Smart · T | BTS</v-toolbar-title>

        <v-spacer></v-spacer>

<!--        <v-btn style="color: white" icon>-->
<!--            <v-icon>mdi-heart</v-icon>-->
<!--        </v-btn>-->

<!--        <v-btn style="color: white" icon>-->
<!--            <v-icon>mdi-magnify</v-icon>-->
<!--        </v-btn>-->

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn style="color: white" icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item link @click="logoutCheck()">
                    <v-list-item-title>退出</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </div>
</template>

<script>
    export default {
        name: "TopToolBar",
        props: {
            nagDrawer: {
                type: Boolean,
                default: true,
            },
        },
        data: () => ({

        }),
        methods: {
            changeDrawer: function () {
                this.nagDrawer = !this.nagDrawer;
                this.$emit('sendNagDrawer', this.nagDrawer);
            },
            // 注销弹窗，确认取消
            logoutCheck() {
                this.$confirm('确定要注销吗？', '确认信息', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(() => {
                    // this.$store.commit("logout");

                    //注销成功通知
                    this.$notify({
                        title: '注销成功！',
                        type: 'success'
                    });
                    //跳转登录
                    this.$router.push({path: '/Login'});
                }).catch(() => {
                    //取消注销消息提示
                    // this.$message({
                    //     showClose: true,
                    //     message: '已取消注销~',
                    //     type: 'success'
                    // });
                });
            },
        }
    }
</script>

<style scoped>

</style>
