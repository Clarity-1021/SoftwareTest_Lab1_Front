<template>
    <div class="mx-3 mt-3" style="">
<!--        <el-row class="" style="background: #2E7D32">-->

            <el-form class="bordered" label-width="80px" size="mini">
                <el-col :xs="24" :sm="12" :md="12" :lg="7">
                    <el-form-item label="借据号">
                        <el-input v-model="form.jjh" placeholder="搜索借据号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="7">
                    <el-form-item label="客户号">
                        <el-input v-model="form.khh" placeholder="搜索客户号"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="7">
                    <el-form-item label="贷款状态">
                        <el-select style="width: 100%" v-model="form.dkzt" placeholder="选择贷款状态">
                            <el-option label="未发放" value="0"></el-option>
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="损失" value="2"></el-option>
                            <el-option label="异常" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="3">
                    <el-button class="ml-3" style="color: white;background: #2E7D32" size="mini" @click="onSubmit">搜索</el-button>
                </el-col>
            </el-form>
<!--        </el-row>-->

<!--        <el-row>-->
<!--            <el-table class="" size="mini" :data="tableData" border>-->
<!--                <el-table-column prop="date" label="日期"></el-table-column>-->
<!--                <el-table-column prop="name" label="姓名" width="100"></el-table-column>-->
<!--                <el-table-column prop="province" label="省份" width="100"></el-table-column>-->
<!--                <el-table-column prop="city" label="市区" width="100"></el-table-column>-->
<!--                <el-table-column prop="address" label="地址" width="100"></el-table-column>-->
<!--                <el-table-column prop="zip" label="邮编" width="100"></el-table-column>-->
<!--                <el-table-column label="操作" width="100">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
<!--                        <el-button type="text" size="small">编辑</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
<!--            </el-table>-->
<!--        </el-row>-->
    </div>
</template>

<script>
    export default {
        name: "LoanAccount",
        data() {
            return {
                form: {
                    jjh: '',
                    khh: '',
                    dkzt: ''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1518 弄',
                    zip: 200333
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1517 弄',
                    zip: 200333
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1519 弄',
                    zip: 200333
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    province: '上海',
                    city: '普陀区',
                    address: '上海市普陀区金沙江路 1516 弄',
                    zip: 200333
                }]
            };
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            },
            handleClick(row) {
                console.log(row);
            }
        }
    }
</script>

<style scoped>

</style>
