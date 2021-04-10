<template>
  <el-main>
    <h3>每日总金额走向</h3>

    <ve-line :data="chartData"></ve-line>
  </el-main>
</template>

<script>
export default {
  props: ["table"],
  data() {
    return {
      chartData: {
        columns: ["日期", "当日总金额"],
        rows: [],
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
        var date = tableData[i].operatorTime.substring(0, 10);

        if (Data[date] == null) {
          if (tableData[i].amount == null) Data[date] = 0;
          else Data[date] = tableData[i].amount;
        } else Data[date] += tableData[i].amount;
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
