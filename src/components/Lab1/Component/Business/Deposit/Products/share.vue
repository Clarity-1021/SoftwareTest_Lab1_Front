<!--股票，等级2，3不可购买-->
<template>
  <el-form
    class="form"
    ref="form"
    :model="form"
    label-position="left"
    style="width:500px"
  >
    <el-form-item label="客户身份证号:">
      <el-input v-model="form.idNum" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="输入付款账户:">
      <el-input v-model="form.accountNum" style="width:300px"></el-input>
    </el-form-item>
     <el-form-item label="输入账户密码:">
      <el-input v-model="form.password" style="width:300px"></el-input>
    </el-form-item>
    <el-form-item label="选择股票类型:">
      <el-select v-model="form.type" placeholder="请选择产品" clearable>
        <el-option label="股票一 1000元" value="1"></el-option>
      <!--  <el-option label="股票二 2000元" value="product2"></el-option>-->
      </el-select>
    </el-form-item>
    <el-form-item label="选择股票数量:">
      <el-input-number
        v-model="form.num"
        :min="1"
        :max="999"
      ></el-input-number>
    </el-form-item>
    <el-button class="button" @click="getUserRank()">确认购买</el-button>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rank: "",
      form: {
        idNum: "",
        accountNum: "",
        password:"",
        type: "",
        num: "",
      },
    };
  },

  mounted() {
    //this.post();
  },
  methods: {
    getUserRank() {
      var url = "http://localhost:8080/user/assess?IDNumber=" + this.form.idNum;
      axios
        .post(url)
        .then((response) => {
          if (response.data.operate == "failed")
            return this.$message.error("获取失败");
          var rank = response.data.data.result;
          if (rank == 1) this.submitForm();
          else return this.$message.error("等级不足，无法购买");
        })
        .catch((error) => alert(error));
    },
    submitForm() {
      var url = "http://localhost:8080/user/assess?IDNumber=" + this.idNum;
      axios
        .post(url)
        .then((response) => {
          if (response.data.operate == "failed")
            return this.$message.error("获取失败");
          this.rank = response.data.data.result;
        })
        .catch((error) => alert(error));
    },
  },
};
</script>
<style scoped>
el-form-item{
    width:300px;
}
</style>

