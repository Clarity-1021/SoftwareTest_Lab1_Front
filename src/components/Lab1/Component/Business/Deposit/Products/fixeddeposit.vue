<!--定期都可购买-->
<template>
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
    <el-form-item prop="accountNum" label="输入付款账户:">
      <el-input v-model="form.accountNum" style="width: 300px"></el-input>
    </el-form-item>
    <el-form-item prop="password" label="输入账户密码:">
      <el-input
        v-model="form.password"
        style="width: 300px"
        type="password"
      ></el-input>
    </el-form-item>
    <el-form-item prop="productId" label="选择定期类型:">
      <el-select v-model="form.productId" placeholder="请选择产品" clearable>
        <el-option label="定期一" value="3"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item prop="years" label="选择购买年限:">
      <el-input-number v-model="form.years" :min="1" :max="9"></el-input-number>
    </el-form-item>

    <el-button class="button" @click="getUserRank('form')">确认购买</el-button>
    <el-button class="button" @click="resetForm('form')">重置输入</el-button>
  </el-form>
</template>

<script>

export default {
  data() {
    return {
      rank: "",
      rules: {
        idNum: [{ required: true, message: "必填", trigger: "blur" }],
        accountNum: [{ required: true, message: "必填", trigger: "blur" }],
        password: [{ required: true, message: "必填", trigger: "blur" }],
        productId: [{ required: true, message: "必填", trigger: "blur" }],
        years: [{ required: true, message: "必填", trigger: "blur" }],
      },
      form: {
        idNum: "",
        accountNum: "",
        password: "",
        productId: "",
        count: "1",
        years: "0",
      },
    };
  },

  methods: {
    resetForm() {
      this.$refs.form.resetFields();
    },
    getUserRank() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return;
        var url =
          "/user/assess?IDNumber=" + this.form.idNum;
        this.$axios
        .post(url)
          .then((response) => {
            if (response.data.operate == "failed")
              return this.$message.error("获取失败");
            var rank = response.data.data.result;
            if (rank == 1 || rank == 2||rank==3) this.submitForm();
            else return this.$message.error("等级不足，无法购买");
          })
          .catch((error) => alert(error));
      });
    },
    submitForm() {
      var url =
        "http://localhost:8080/order/purchase?accountNum=" +
        this.form.accountNum +
        "&password=" +
        this.form.password +
        "&productId=" +
        this.form.productId +
        "&count=" +
        this.form.count +
        "&years=" +
        this.form.years;
      //alert(url);
      this.$axios
        .post(url)
        .then((response) => {
          if (response.data.operate == "failed")
            return this.$message.error("购买失败！");
          return this.$message.success("购买成功！");
        })
        .catch((error) => alert(error));
    },
  },
};
</script>