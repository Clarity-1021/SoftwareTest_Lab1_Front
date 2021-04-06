<template>
    <v-container class="d-flex flex-column justify-start align-center" fluid style="padding-left: 0;padding-right: 0">
        <v-row style="width: 100%">
            <div style="padding:10px;font-size: small;color: #2E7D32;cursor: pointer" @click="changeShow">返回借据</div>
        </v-row>

        <v-card style="width: 100%" class="mt-5">
            <v-tabs color="green darken-3" vertical>
                <v-tab v-for="(title, index) in tabTitles" :key="index">
<!--                    <v-icon left>mdi-account</v-icon>-->
                    {{ title }}
                </v-tab>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            1
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            2
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            3
                        </v-card-text>
                    </v-card>
                </v-tab-item>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            4
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>

        {{currentItem.jjh}}
    </v-container>
</template>

<script>
    export default {
        name: "LoanBillDetail",
        props: {
            currentItem: {
                type: Set,
                default: {
                    jjh: 'L2104021935051',
                    htbh: '23423423',
                    jgbh: 'fd11',
                    khh: 'fd11202103302',
                    dkzh: '6161677317895733644',
                    dkcpbh: '40001',
                    dkffrq: '2021-04-02',
                    dkhb: '人民币',
                    dkxgfy: '1元',
                    hkfs: '等额本息',
                    dkqx: '1',
                    nll: '4%',
                    htje: '10000',
                    yhze: '10033.33',
                    yhlx: '33.33',
                    yhlxx: '33.33',
                    sybj: '0',
                    yqbj: '0',
                    jqzt: '已结清',
                    hxzt: '未核销',
                    khm: '贺老师',
                    dkzt: '正常',
                    dkcp: '个体贡桑',
                    yqje: '0',
                    ghbj: '18363.6656',
                    ghzje: '20435.9328',
                },
            },
            detailShow: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                tabTitles:[
                    '已还款账单',
                    '当前待还账单',
                    '逾期未还账单',
                    '未还账单（还款计划）',
                ]
            }
        },
        methods: {
            changeShow: function () {
                this.detailShow = !this.detailShow;
                this.$emit('sendShow', this.detailShow);
            },
        },
    }
</script>

<style scoped>

</style>
