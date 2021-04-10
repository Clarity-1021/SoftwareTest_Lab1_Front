<template>
    <v-container class="d-flex flex-column justify-start align-center" fluid>
        <transition name="el-fade-in" mode="out-in">
            <!--账户管理-->
            <v-container v-if="!detailShow" class="d-flex flex-column justify-start align-center" fluid style="">
<!--            <v-container class="d-flex flex-column justify-start align-center" fluid style="">-->
                <v-row style="width: 100%">
                    <v-col xs="12" sm="4" md="4" lg="3" cols="12">
                        <v-text-field color="green darken-3" dense outlined clearable label="客户证件号" v-model="form.khh"></v-text-field>
                    </v-col>
                    <v-col xs="12" sm="4" md="4" lg="3" cols="12">
                        <v-select clearable menu-props="auto" color="green darken-3" outlined item-text="state" item-value="num" :items="items" label="账单情况" v-model="form.dkzt" dense></v-select>
                    </v-col>
                    <v-col xs="12" sm="4" md="4" lg="3" cols="12">
                        <v-btn @click="searchAccount" :loading="progressSearch" dark color="green darken-3">搜索</v-btn>
                    </v-col>
                </v-row>

                <div style="width: 100%; min-width: 950px">
                    <v-progress-linear :active="progressSearch" dark color="green" indeterminate height="5"></v-progress-linear>
                    <v-data-table sort-by="loanDate" sort-desc :headers="headers" :items="tableData" :page.sync="page" :items-per-page="itemsPerPage" hide-default-footer class="elevation-1" @page-count="pageCount = $event">
                        <!--操作栏-->
                        <template v-slot:item.cz="{ item }">
                            <v-icon title="查看账单" color="green darken-3" small class="mx-1" @click="checkBillDetail(item)">mdi-clipboard-text-search-outline</v-icon>
<!--                            <v-icon small title="贷款详情" color="green darken-3" class="mx-1" @click="checkLoanDetail(item)">mdi-clipboard-text-outline</v-icon>-->
                            <v-icon :disabled="item.loanStatus === '未发放' || item.loanSettleStatus === 2" small title="提前还款" color="green darken-3" class="mx-1" @click="repayAll(item)">mdi-clipboard-check-multiple-outline</v-icon>
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
            <LoanBillDetail @penaltyChange="searchAccount" @sendShow="getShow" :detailShow="detailShow" v-else :currentItem="currentBillItem" />
        </transition>



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
<!--{{this.tableData}}-->
        <!--贷款详情弹窗-->
<!--        <v-dialog transition="dialog-bottom-transition" v-model="dialogLoanDetail" max-width="900px">-->
<!--            <v-card>-->
<!--                <v-toolbar class="headline d-flex flex-row justify-center" color="green" dark><div>贷款详情</div></v-toolbar>-->

<!--                <v-row style="margin: 0">-->
<!--                    <v-col cols="12" xs="6" sm="6" md="6" lg="6" class="px-5 pt-5 d-flex flex-row" style="" v-for="(item, index) in loanDetails" :key="index">-->
<!--                        <div class="text-center" style="width: 45%; color: #777777">{{item.text}}</div>-->
<!--                        <div style="width: 55%">{{currentLoanItem[item.value]}}</div>-->
<!--                    </v-col>-->
<!--                </v-row>-->


<!--                <v-card-actions>-->
<!--                    <v-spacer></v-spacer>-->
<!--                    <v-btn color="green darken-3" text @click="dialogLoanDetail = false">关闭</v-btn>-->
<!--                </v-card-actions>-->
<!--            </v-card>-->
<!--        </v-dialog>-->

    </v-container>
</template>

<script>
    import LoanBillDetail from "./components/LoanBillDetail";
    export default {
        name: "LoanAccount",
        components: {LoanBillDetail},
        watch: {
            payProgress (val) {
                if (val) {
                    setTimeout(() => (this.payProgress = false), 2000)
                }
            },
        },
        data() {
            return {
                payProgress: false,
                progressSearch: false,

                currentBillItem: '',
                currentLoanItem: '',
                currentRepayItem: '',
                detailShow: false,
                // dialogLoanDetail: false,
                dialogRepay: false,
                repayValid: false,

                page: 1,
                pageCount: 0,
                itemsPerPage: 10,
                flag: true,

                items: [
                    { state: '未还', num: 1, },
                    { state: '已还', num: 2, },
                ],
                numToLoanStatus: {
                    "1": "未发放",
                    "2": "正常",
                    "3": "损失",
                    "4": "异常",
                },

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
                headers: [
                    { text: '借据号', value: 'iouNum', sortable: false, align: 'center' },
                    { text: '客户号', value: 'customerCode', sortable: false, align: 'center' },
                    { text: '客户名', value: 'customerName', sortable: false, align: 'center' },
                    { text: '贷款状态', value: 'loanStatus', sortable: false, align: 'center' },
                    { text: '贷款产品', value: 'productName', sortable: false, align: 'center' },
                    { text: '贷款产品编号', value: 'productCode', sortable: false, align: 'center' },
                    { text: '逾期金额（元）', value: 'overdueBalance', sortable: false, align: 'center' },
                    { text: '发放日期', value: 'loanDate', align: 'center' },
                    { text: '操作', value: 'cz', sortable: false, align: 'center' },
                ],
            };

        },
        computed: {

        },
        created () {
            this.initialize();
        },
        methods: {
            initialize () {
                this.search("", "");
            },
            setUrl (id, status, url) {
                if ((id === "" || id === null) && (status === "" || status === null)) return url;
                url += "?";
                if ((id === "" || id === null)) url += "IDNumber=" + id;
                if ((status === "" || status === null)) {
                    if (id !== "") { url += "&" }
                    url += "loanSettleStatus=" + status;
                }
                return url;
            },

            search (id, status) {
                this.progressSearch = true;
                // let url = this.setUrl(id, status, '/loan/bill');
                this.$axios.post(
                    // url
                    '/loan/bill',
                    // {},
                    {
                        params:{
                            IDNumber: id,
                            loanSettleStatus: status
                        }
                    }
                )
                    .then(resp => {
                        if (resp.data.code === "200") {
                            console.log(id)
                            console.log(status)
                            // this.tableData = resp;
                            this.tableData = resp.data.data.result.map((item) => {
                                item.loanStatus = this.numToLoanStatus[item.loanStatus];
                                return item;

                            });
                        }
                        else {
                            console.log("error")
                        }
                        this.progressSearch = false;
                    })
                    .catch(error => {
                        console.log(error);
                    });

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

            // 搜索提交
            searchAccount () {
                this.search(this.form.khh, this.form.dkzt);
            },
        }
    }
</script>

<style scoped>

</style>
