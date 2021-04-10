<template>
  <!--<v-main style="background: rebeccapurple"> 购买理财产品 </v-main>-->
  <el-main>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="股票" name="first"><share></share></el-tab-pane>

      <el-tab-pane label="基金" name="second"
        ><fund></fund
      ></el-tab-pane>

      <el-tab-pane label="定期" name="third"
        ><fixeddeposit></fixeddeposit
      ></el-tab-pane>
    </el-tabs>
  </el-main>
</template>

<script>
import share from "./Products/share";
import fund from "./Products/fund";
import fixeddeposit from "./Products/fixeddeposit";

export default {
  components: { share, fund, fixeddeposit },

  name: "DepositBuyProduct",

  data() {
    return {
      num: 1,


      form: {
        product1: "",
        product2: "",
        product3: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.getUserRank();
  },
  methods: {
    handleChange(value) {
      console.log(value);
    },
   
  },
};
</script>

<style scoped>
</style>
