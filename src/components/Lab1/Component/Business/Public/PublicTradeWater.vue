<template>
  <!-- <el-main style="background: #42b983"> 交易流水
      </el-main>-->
  <el-main>
    <el-form
      class="form"
      ref="form"
      :model="form"
      label-width="100px"
      label-position="left"
    >
      <el-row>
        <el-col span="12">
          <el-form-item prop="" label="流水号">
            <el-input v-model="form.transactionNum"></el-input
          ></el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="" label="交易账号">
            <el-input v-model="form.account"></el-input
          ></el-form-item>
        </el-col>
      </el-row>

      <el-row
        ><el-col span="12">
          <el-form-item prop="" label="办理机构">
            <el-input v-model="form.branchName"></el-input
          ></el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="" label="交易类型编号">
            <el-input v-model="form.transactionCode"></el-input
          ></el-form-item> </el-col
      ></el-row>

      <el-row
        ><el-col span="12">
          <el-form-item prop="date" label="开始日期">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd"
              v-model="form.beginDate"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col span="12">
          <el-form-item prop="date" label="结束日期">
            <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd"
              v-model="form.endDate"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button style="width: 100px" @click="post('form')">筛选</el-button>
      <el-button
        style="width: 100px"
        icon="el-icon-pie-chart"
        @click="seeChart1()"
        >可视化</el-button
      >
    </el-form>

    <el-table :data="table" style="width: 100%">
      <el-table-column prop="transactionNum" label="流水号"></el-table-column>
      <el-table-column prop="account" label="交易账号"></el-table-column>
      <el-table-column prop="amount" label="金额"> </el-table-column>
      <el-table-column prop="branchNum" label="办理机构代号"></el-table-column>
      <el-table-column prop="branchName" label="办理机构"></el-table-column>
      <el-table-column prop="operatorTime" label="日期"></el-table-column>
      <el-table-column
        prop="transactionCode"
        label="交易类型编号"
      ></el-table-column>
      <el-table-column
        prop="transactionType"
        label="交易类型"
      ></el-table-column>
    </el-table>

    <!--可视化-->
    <el-dialog :visible.sync="chart1Visible">
        <amountdate :table="this.table"></amountdate>
        <branchname :table="this.table"></branchname>
        <transtype :table="this.table"></transtype>
    </el-dialog>
  </el-main>
</template>

<script>
import axios from "axios";
import amountdate from "./charts/amountdate";
import branchname from "./charts/branchname";
import transtype from "./charts/transtype";

export default {
  components: { amountdate, branchname, transtype },
  name: "PublicTradeWater",

  data() {
    return {
      chart1Visible: false,

      form: {
        transactionNum: "",
        account: "",
        branchName: "",
        transactionCode: "",
        beginDate: "",
        endDate: "",
      },
      table: [{}],
    };
  },

  computed: {},
  mounted() {
    this.post();
  },
  methods: {
    seeChart1() {
      this.chart1Visible = true;
    },

    getUrl(count, str, value) {
      var url = "";
      if (count == 0) url += "?" + str + "=" + value;
      else url += "&" + str + "=" + value;
      return url;
    },

    post() {
      var url = "http://localhost:8080/transaction/detail";
      var count = 0;

      for (var key in this.form) {
        if (this.form[key] != "") {
          url += this.getUrl(count, key, this.form[key]);
          count++;
        }
      }
      // alert(url);
      axios
        .post(url)
        .then((response) => {
          if (response.data.operate == "failed")
            return this.$message.error(response.data.message);
          var records = response.data.data.result;
          this.table = records;
        })

        .catch((error) => alert(error));
    },
  },
};
</script>

<style scoped>
</style>
