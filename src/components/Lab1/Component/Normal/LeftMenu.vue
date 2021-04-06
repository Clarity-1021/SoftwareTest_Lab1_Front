<template>
    <div>
        <transition name="el-fade-in-linear" mode="out-in">
            <v-main style="width: 220px;border-right: #cccccc solid 1px; height: 100%" v-if="nagDrawer" height="100%" width="220">
                <v-list>
                    <v-list-group :value="vListVals[0]" :color="itemColor" :prepend-icon="listItems[0].icon">
                        <template v-slot:activator>
                            <v-list-item-title>{{ listItems[0].title }}</v-list-item-title>
                        </template>

                        <v-list-item-group v-model="vListLinks[0]">
                            <v-list-item disabled v-for="(subItem, subIndex) in listItems[0].subItems" :key="subIndex" href="/runningtab">
                                <v-list-item-title>{{ subItem }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="selectMenuItem('交易流水查询')" link>
                                <v-list-item-title>交易流水查询</v-list-item-title>
                            </v-list-item>
                            <v-list-item disabled link>
                                <v-list-item-title>客户管理</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                    <v-list-group :value="vListVals[1]" :color="itemColor" :prepend-icon="listItems[1].icon">
                        <template v-slot:activator>
                            <v-list-item-title>{{ listItems[1].title }}</v-list-item-title>
                        </template>

                        <v-list-item-group v-model="vListLinks[1]">
                            <v-list-item disabled v-for="(subItem, subIndex) in listItems[1].subItems" :key="subIndex" link>
                                <v-list-item-title>{{ subItem }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="selectMenuItem('购买产品')" link>
                                <v-list-item-title>购买产品</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="selectMenuItem('产品支取')" link>
                                <v-list-item-title>产品支取</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                    <v-list-group :value="vListVals[2]" :color="itemColor" :prepend-icon="listItems[2].icon">
                        <template v-slot:activator>
                            <v-list-item-title>{{ listItems[2].title }}</v-list-item-title>
                        </template>
                        <v-list-item-group v-model="vListLinks[2]">
                            <v-list-item disabled v-for="(item, subIndex) in listItems[2].subItems" :key="subIndex" link>
                                <v-list-item-title>{{ item }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="selectMenuItem('贷款账户管理')" link>
                                <v-list-item-title>贷款账户管理</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="selectMenuItem('贷款日终批量')" link>
                                <v-list-item-title>贷款日终批量</v-list-item-title>
                            </v-list-item>
                            <v-list-item disabled link>
                                <v-list-item-title>贷款核销</v-list-item-title>
                            </v-list-item>
                            <v-list-item disabled link>
                                <v-list-item-title>贷款计提</v-list-item-title>
                            </v-list-item>
                            <v-list-item disabled link>
                                <v-list-item-title>贷款产品</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                    <v-list-group :value="vListVals[3]" :color="itemColor" :prepend-icon="listItems[3].icon">
                        <template v-slot:activator>
                            <v-list-item-title>{{ listItems[3].title }}</v-list-item-title>
                        </template>

                        <v-list-item-group v-model="vListLinks[3]">
                            <v-list-item disabled v-for="(subItem, subIndex) in listItems[3].subItems" :key="subIndex" link>
                                <v-list-item-title>{{ subItem }}</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list-group>
                </v-list>
    <!--            {{ vListLinks }}-->
    <!--            <br/>-->
    <!--            {{ vListVals }}-->
    <!--            <br/>-->
            </v-main>
            <v-main style="width: 60px;border-right: #cccccc solid 1px; height: 100%" v-else class="d-flex flex-column align-center justify-start px-3">
                <v-menu offset-x>
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn icon :color="itemColor" class="my-1" v-bind="attrs" v-on="on">
                            <v-icon>{{ listItems[0].icon }}</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item disabled v-for="(subItem, subIndex) in listItems[0].subItems" :key="subIndex" link>
                            <v-list-item-title>{{ subItem }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="selectMenuItem('交易流水查询')" link>
                            <v-list-item-title>交易流水查询</v-list-item-title>
                        </v-list-item>
                        <v-list-item disabled link>
                            <v-list-item-title>客户管理</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu offset-x>
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn icon :color="itemColor" class="my-1" v-bind="attrs" v-on="on">
                            <v-icon>{{ listItems[1].icon }}</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item disabled v-for="(subItem, subIndex) in listItems[1].subItems" :key="subIndex" link>
                            <v-list-item-title>{{ subItem }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="selectMenuItem('购买产品')" link>
                            <v-list-item-title>购买产品</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="selectMenuItem('产品支取')" link>
                            <v-list-item-title>产品支取</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu offset-x>
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn icon :color="itemColor" class="my-1" v-bind="attrs" v-on="on">
                            <v-icon>{{ listItems[2].icon }}</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item disabled v-for="(item, subIndex) in listItems[2].subItems" :key="subIndex" link>
                            <v-list-item-title>{{ item }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="selectMenuItem('贷款账户管理')" link>
                            <v-list-item-title>贷款账户管理</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="selectMenuItem('贷款日终批量')" link>
                            <v-list-item-title>贷款日终批量</v-list-item-title>
                        </v-list-item>
                        <v-list-item disabled link>
                            <v-list-item-title>贷款核销</v-list-item-title>
                        </v-list-item>
                        <v-list-item disabled link>
                            <v-list-item-title>贷款计提</v-list-item-title>
                        </v-list-item>
                        <v-list-item disabled link>
                            <v-list-item-title>贷款产品</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-menu offset-x>
                    <template v-slot:activator="{ attrs, on }">
                        <v-btn icon :color="itemColor" class="my-1" v-bind="attrs" v-on="on">
                            <v-icon>{{ listItems[3].icon }}</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item disabled v-for="(item, subIndex) in listItems[3].subItems" :key="subIndex" link>
                            <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-main>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "LeftMenu",
        props: {
            nagDrawer: {
                type: Boolean,
                default: true,
            },
            selected: {
                type: String,
                default: 'nmd'
            }
        },
        created() {
            this.getInfo()
        },
        data: () => ({
            // sharedState: this.$store.state,
            // nagDrawer: true,
            itemColor: 'green darken-3',
            vListVals: [false,false,false,false],
            vListLinks: ['', '', '', ''],
            itemToNum: {
                '交易流水查询': [0, 6, 'RunningTab'],
                '购买产品': [1, 7, 'BuyProducts'],
                '产品支取': [1, 8, 'WithdrawInAdvance'],
                '贷款账户管理': [2, 2, 'Bill'],
                '贷款日终批量': [2, 3, 'DayEndBatch']
            },
            listItems: [
                {
                    title: '公共业务',
                    icon: 'mdi-file-outline',
                    subItems: [
                        '交易代码管理',
                        '币种管理',
                        '会计科目管理',
                        '报表管理',
                        '利率管理',
                        '柜员尾箱',
                    ]
                },
                {
                    title: '存款业务',
                    icon: 'mdi-cash-100',
                    subItems: [
                        '账户管理',
                        '存款',
                        '取款',
                        '转账',
                        '挂失',
                        '冻结',
                        '存款产品',
                    ]
                },
                {
                    title: '贷款业务',
                    icon: 'mdi-cash-multiple',
                    subItems: [
                        '借据录入',
                        '贷款发放',
                    ]
                },
                {
                    title: '结算业务',
                    icon: 'mdi-cogs',
                    subItems: [
                        '汇票管理',
                        '本票签发',
                        '支票管理',
                        '承兑汇票',
                        '托收委托',
                        '大额支付',
                        '贴现',
                        '票据退回'
                    ]
                }
            ],
        }),
        methods: {
            selectMenuItem(item) {
                if (item === this.selected) {
                    this.$router.go(0);
                }
                else {
                    this.$router.push({
                        name: this.itemToNum[item][2],
                        params: { nagDrawer: this.nagDrawer }
                    })
                }
            },
            getInfo() {
                if (this.selected !== 'nmd') {
                    this.vListVals[this.itemToNum[this.selected][0]] = true;
                    this.vListLinks[this.itemToNum[this.selected][0]] = this.itemToNum[this.selected][1];
                }
            },
        }
    }
</script>

<style scoped>

</style>
