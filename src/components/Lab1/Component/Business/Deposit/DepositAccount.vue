<template>
  <v-main>
    <div >
      <el-form
        class="form"
        ref="form"
        :model="form"
        :rules="rules"
        label-position="left"
        style="width: 500px"
      >
        <el-form-item prop="idNum" label="客户身份证号:">
          <el-input v-model="form.idNum" style="width: 300px"></el-input>
        </el-form-item>
        <el-button class="button" @click="submitForm('form')">查询</el-button>
      </el-form>
    </div>
    <el-table :data="table" style="width: 100%" height="400">
      <el-table-column prop="productId" label="产品编号"></el-table-column>
      <el-table-column prop="productName" label="产品名"></el-table-column>
      <el-table-column prop="principal" label="本金"></el-table-column>
      <el-table-column prop="increaseRate" label="增长率"> </el-table-column>
      <el-table-column prop="profit" label="收益"></el-table-column>
    </el-table>
  </v-main>
</template>

<script>
export default {
  name: "DepositAccount",
  data() {
    return {
      rank: "",
      rules: {
        idNum: [{ required: true, message: "必填", trigger: "blur" }],
      },
      form: {
        idNum: "",
      },
      table: [{}],
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        var url = "/order/profit?IDNumber=" + this.idNum;
        this.$axios
          .post(url)
          .then((response) => {
            if (response.data.operate == "failed")
              return this.$message.error("获取失败");

            var records = response.data.data.result;
            this.table = records;
          })
          .catch((error) => alert(error));
      });
    },
  },
};
</script>

<style scoped>
div{
    border: 100px;
}
</style>
