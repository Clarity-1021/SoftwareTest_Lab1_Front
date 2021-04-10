<template>
  <el-main>
    <h3>交易机构分布</h3>

    <ve-pie  :data="chartData" :extend="chartExtend"></ve-pie>
  </el-main>
</template>

<script>
export default {
  props: ["table"],
  data() {
    return {
     
      chartData: {
        columns: ["机构名称", "数量"],
        rows: [],
      },
      chartExtend: {

      },
    };
  },
  mounted() {
    this.getChartData(this.table);
  },
  methods: {
    getChartData(table) {
      var tableData = eval(table);
      var Data = {};

      for (var i in tableData) {
        var name = tableData[i].branchName;

        if (Data[name] == null) {
          Data[name] = 1;
        } else Data[name]++;
      }

      var key0 = this.chartData.columns[0];
      var key1 = this.chartData.columns[1];
      for (var key in Data) {
        var temp = {};
        temp[key0] = key;
        temp[key1] = Data[key];
        this.chartData.rows.push(temp);
      }
    },
  },
};
</script>
