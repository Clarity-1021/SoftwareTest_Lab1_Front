<template>
    <div class="d-flex flex-row">
        <v-card height="100vH" width="233">
            <v-navigation-drawer absolute color="grey lighten-4" width="100%" permanent>
                <v-list>
                    <v-list-group no-action v-for="(listItem, index) in listItems" :key="index" :prepend-icon="listItem.icon">

                        <template v-slot:activator>
                            <v-list-item-title>{{ listItem.title }}</v-list-item-title>
                        </template>

                        <v-list-item v-for="(subItem, subIndex) in listItem.subItems" :key="subIndex" link>
                            <v-list-item-title>{{ subItem }}</v-list-item-title>
                        </v-list-item>

                    </v-list-group>
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "Home",

        data: () => ({
            listItems: [
                {
                    title: '公共业务',
                    icon: 'mdi-file-outline',
                    subItems: [
                        '机构管理',
                        '交易代码管理',
                        '币种管理',
                        '会计科目管理',
                        '报表管理',
                        '利率管理',
                        '尾箱管理',
                        '交易流水查询',
                        '客户管理'
                    ]
                },
                {
                    title: '存款业务',
                    icon: 'mdi-cash-100',
                    subItems: [
                        '账户管理',
                        '存款产品'
                    ]
                },
                {
                    title: '系统管理',
                    icon: 'mdi-cogs',
                    subItems: [
                        '柜员管理',
                        '公告日志',
                        '日志查询'
                    ]
                }
            ],
            items: [
                ['mdi-clock-start', '柜面归还贷款'],
                ['mdi-clock-start', 'Clock-in'],
                ['mdi-clock-start', 'Clock-in'],
                ['mdi-clock-start', 'Clock-in'],
                ['mdi-clock-start', 'Clock-in'],
            ],
            admins: [
                ['Management', 'mdi-account-multiple-outline'],
                ['Settings', 'mdi-cog-outline'],
            ],
            cruds: [
                ['Create', 'mdi-plus-outline'],
                ['Read', 'mdi-file-outline'],
                ['Update', 'mdi-update'],
                ['Delete', 'mdi-delete'],
            ],

        }),
    }
</script>

<style scoped>

</style>
