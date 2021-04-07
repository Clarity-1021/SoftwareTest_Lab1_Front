<template>
    <v-container class="d-flex flex-column justify-start align-center" fluid style="">
        <transition name="el-fade-in" mode="out-in">
            <!--账户管理-->
            <v-container v-if="!detailShow" class="d-flex flex-column justify-start align-center" fluid style="">
<!--            <v-container class="d-flex flex-column justify-start align-center" fluid style="">-->
                <v-row style="width: 100%">
                    <v-col xs="12" sm="6" md="6" lg="3" cols="12">
                        <v-text-field color="green darken-3" dense outlined clearable label="借据号" v-model="form.jjh"></v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6" md="6" lg="3" cols="12">
                        <v-text-field color="green darken-3" dense outlined clearable label="客户号" v-model="form.khh"></v-text-field>
                    </v-col>
                    <v-col xs="12" sm="6" md="6" lg="3" cols="12">
                        <v-select menu-props="auto" color="green darken-3" outlined item-text="state" item-value="num" :items="items" label="贷款状态" v-model="form.dkzt" dense></v-select>
                    </v-col>
                    <v-col xs="12" sm="6" md="6" lg="3" cols="12">
                        <v-btn @click="searchAccont" dark color="green darken-3">
                            <!--                    <v-icon left>mdi-magnify</v-icon>-->
                            搜索
                        </v-btn>
                    </v-col>
                </v-row>



                <div style="width: 100%">
                    <v-data-table hide-default-footer :headers="headers" :items="tableData" class="elevation-1">
                        <!--操作栏-->
                        <template v-slot:item.cz="{ item }">
                            <v-icon title="查看账单" color="green darken-3" small class="mx-1" @click="checkBillDetail(item)">mdi-clipboard-text-search-outline</v-icon>
                            <v-icon small title="贷款详情" color="green darken-3" class="mx-1" @click="checkLoanDetail(item)">mdi-clipboard-text-outline</v-icon>
                            <v-icon :disabled="flag" small title="提前还款" color="green darken-3" class="mx-1" @click="repayAll(item)">mdi-clipboard-check-multiple-outline</v-icon>
                        </template>
                    </v-data-table>
                </div>
                <div class="mt-3">
                    <v-pagination color="green darken-3" v-model="page" :length="pageCount" :total-visible="10"></v-pagination>
                </div>

<!--                {{flag}}{{dialogRepay}}-->
            </v-container>

            <!--账单详情-->
<!--            <LoanBillDetail @sendShow="getShow" :detailShow="detailShow" :currentItem="currentBillItem" />-->
            <LoanBillDetail @sendShow="getShow" :detailShow="detailShow" v-else :currentItem="currentBillItem" />
        </transition>


        <!--贷款详情弹窗-->
        <v-dialog transition="dialog-bottom-transition" v-model="dialogLoanDetail" max-width="900px">
            <v-card>
                <v-toolbar class="headline d-flex flex-row justify-center" color="green" dark><div>贷款详情</div></v-toolbar>

                <v-row style="margin: 0">
                    <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 pt-5 d-flex flex-row" style="" v-for="(item, index) in loanDetails" :key="index">
                        <div class="text-center" style="width: 45%; color: #777777">{{item.text}}</div>
                        <div style="width: 55%">{{currentLoanItem[item.value]}}</div>
                    </v-col>
                </v-row>


                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-3" text @click="dialogLoanDetail = false">关闭</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    <!--提前还款弹窗-->
    <v-form lazy-validation ref="repayForm" v-model="repayValid">
    <v-dialog transition="dialog-bottom-transition" v-model="dialogRepay" max-width="700px">
        <v-card>
            <v-toolbar class="headline d-flex flex-row justify-center" color="green" dark><div>提前还款</div></v-toolbar>

                <v-row class="pt-5" style="margin: 0">
                    <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row" style="" v-for="(item, index) in repayHeaders" :key="index">
                        <div class="text-center" style="width: 45%; color: #777777">{{item.text}}</div>
                        <div style="width: 55%">{{currentRepayItem[item.value]}}</div>
                    </v-col>

                    <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row">
                        <v-select menu-props="auto" :rules="repayFormRules.kkfs" color="green darken-3" outlined item-text="state" item-value="num" :items="repaySelectors.kkfs" label="扣款方式" v-model="repayForm.kkfs" dense></v-select>
                    </v-col>

                    <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 d-flex flex-row">
                        <v-select menu-props="auto" :rules="repayFormRules.jydm" color="green darken-3" outlined item-text="state" item-value="num" :items="repaySelectors.jydm" label="交易代码" v-model="repayForm.jydm" dense></v-select>
                    </v-col>
                </v-row>


                <v-card-actions>
                    <v-btn color="green darken-3" text @click="clearRepayForm">清空</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-3" text @click="dialogRepay = false">取消</v-btn>
                    <v-btn text :disabled="!repayValid" color="green darken-3" @click="repayHandler">还款</v-btn>
                </v-card-actions>

        </v-card>
    </v-dialog>
    </v-form>

    <!--还款等待条-->
    <v-dialog v-model="payProgress" hide-overlay persistent width="300">
        <v-card color="green darken-1" dark>
            <v-card-text>
                正在提交还款
                <v-progress-linear indeterminate color="white" class="mb-0"></v-progress-linear>
            </v-card-text>
        </v-card>
    </v-dialog>
    </v-container>
</template>

<script>
    import LoanBillDetail from "./components/LoanBillDetail";
    export default {
        name: "LoanAccount",
        components: {LoanBillDetail},
        watch: {
            page: function (val) {
                this.nextPage(val);
            },
            payProgress (val) {
                if (val) {
                    setTimeout(() => (this.payProgress = false), 2000)
                }
            },
        },
        data() {
            return {
                payProgress: false,

                currentBillItem: '',
                currentLoanItem: '',
                currentRepayItem: '',
                detailShow: false,
                dialogLoanDetail: false,
                dialogRepay: false,
                repayValid: false,

                page: 1,
                pageCount: 10,
                itemsPerPage: 10,
                flag: true,

                items: [
                    { state: '未发放', num: 0, },
                    { state: '正常', num: 1, },
                    { state: '损失', num: 2, },
                    { state: '异常', num: 3, },
                ],

                headers: [
                    { text: '借据号', value: 'jjh', sortable: false, align: 'center' },
                    { text: '客户号', value: 'khh', sortable: false, align: 'center' },
                    { text: '客户名', value: 'khm', sortable: false, align: 'center' },
                    { text: '贷款状态', value: 'dkzt', sortable: false, align: 'center' },
                    { text: '贷款产品', value: 'dkcp', sortable: false, align: 'center' },
                    { text: '贷款产品编号', value: 'dkcpbh', sortable: false, align: 'center' },
                    { text: '逾期金额（元）', value: 'yqje', sortable: false, align: 'center' },
                    { text: '发放日期', value: 'dkffrq', sortable: false, align: 'center' },
                    { text: '操作', value: 'cz', sortable: false, align: 'center' },
                ],
                loanDetails: [
                    { text: '借据号', value: 'jjh' },
                    { text: '合同编号', value: 'htbh' },
                    { text: '机构编号', value: 'jgbh' },
                    { text: '客户号', value: 'khh' },
                    { text: '贷款账号', value: 'dkzh' },
                    { text: '贷款产品', value: 'dkcpbh' },
                    { text: '贷款发放日期', value: 'dkffrq' },
                    { text: '贷款货币', value: 'dkhb' },
                    { text: '贷款相关费用', value: 'dkxgfy' },
                    { text: '贷款期限(月)', value: 'dkqx' },
                    { text: '年利率', value: 'nll' },
                    { text: '合同金额(元)', value: 'htje' },
                    { text: '应还总额(元)', value: 'yhze' },
                    { text: '应还利息(元)', value: 'yhlx' },
                    { text: '已还利息(元)', value: 'yhlxx' },
                    { text: '剩余本金(元)', value: 'sybj' },
                    { text: '结清状态', value: 'jqzt' },
                    { text: '核销状态', value: 'hxzt' },
                ],
                repayHeaders: [
                    { text: '归还本金(元)', value: 'ghbj' },
                    { text: '归还总金额(元)', value: 'ghzje' },
                ],
                repayForm: {
                    kkfs: '',
                    jydm: '',
                },
                repayFormRules: {
                    kkfs: [v => !!v || '请选择扣款方式'],
                    jydm: [v => !!v || '请选择交易代码'],
                },
                repaySelectors: {
                    kkfs:[
                        { state: '委托扣款', num: 1, },
                        { state: '现金', num: 2, },
                    ],
                    jydm:[
                        { state: '0001 银业单位开机作业', num: 1, },
                        { state: '0002 银业单位开机作业', num: 2, },
                        { state: '0003 银业单位开机作业', num: 3, },
                        { state: '0004 银业单位开机作业', num: 4, },
                        { state: '0005 银业单位开机作业', num: 5, },
                        { state: '0006 银业单位开机作业', num: 6, },
                        { state: '0020 银业单位开机作业', num: 20, },
                        { state: '0021 银业单位开机作业', num: 21, },
                        { state: '0032 银业单位开机作业', num: 32, },
                        { state: '0033 银业单位开机作业', num: 33, },
                    ],
                },
                tableData: [],

                form: {
                    jjh: '',
                    khh: '',
                    dkzt: ''
                },

                submittedForm: '',

            };
        },

        computed: {

        },

        created () {
            this.initialize()
        },

        methods: {
            initialize () {
                this.tableData = [
                    {
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
                    {
                        jjh: 'L1',
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
                ]
            },

            //Todo 换页
            nextPage (page) {
                console.log(page);
                this.flag = !this.flag;
            },

            //展示账单详情页
            checkBillDetail (item) {
                this.currentBillItem = item;
                this.detailShow = !this.detailShow;
            },

            //展示贷款详情对话框
            checkLoanDetail (item) {
                this.currentLoanItem = item;
                this.dialogLoanDetail = !this.dialogLoanDetail;
            },

            //展示提前还款对话框
            repayAll (item) {
                this.currentRepayItem = item;
                this.repayValid = false;
                this.$refs.repayForm.reset();
                this.dialogRepay = true;
            },

            //Todo 提前还款
            repayHandler () {
                if (this.$refs.repayForm.validate()) {
                    this.payProgress = true;

                  this.$notify({
                    title: '还款失败，请重试',
                    type: 'error'
                  });
                }
            },

            getShow(message) {
                this.detailShow = message;
            },

            clearRepayForm () {
                this.$refs.repayForm.reset();
            },

            //搜索提交
            searchAccount () {
                this.submittedForm = this.form;
                this.nextPage(1);
            },
        }
    }
</script>

<style scoped>

</style>
