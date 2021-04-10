<!--定期都可购买-->
<template>
  <el-form class="form" ref="form" :model="form">
    <el-form-item label="请选择定期类型">
      <el-select v-model="form.product1" placeholder="请选择产品" clearable>
        <el-option label="定期一" value="shanghai"></el-option>
        <el-option label="定期二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="请选择购买时间">
       <el-date-picker
              type="datetime"
              value-format="yyyy-MM-dd"
              v-model="form.endDate"
              style="width: 100%"
            ></el-date-picker>
    </el-form-item>
    <el-button class="button">确认购买</el-button>
  </el-form>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {},
    };
  },

  mounted() {
    //this.post();
  },
  methods: {
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
