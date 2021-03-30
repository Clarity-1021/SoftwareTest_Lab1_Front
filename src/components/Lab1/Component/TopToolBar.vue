<template>
    <v-card class="d-flex flex-row align-center px-2" width="100%" height="60">
        <v-app-bar-nav-icon @click="changeDrawer()" class="mx-3"></v-app-bar-nav-icon>

        <v-toolbar-title>Smart · T | BTS</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon>
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
            </template>

            <v-list>
                <v-list-item link @click="logout()">
                    <v-list-item-title>退出</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-card>
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
        }
    }
</script>

<style scoped>

</style>
