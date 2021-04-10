<template>
  <el-main>
    <h3>交易类型分布</h3>

    <!--  <ve-pie :data="chartData" :extend="chartExtend"></ve-pie>-->
    <ve-histogram :data="chartData" :extend="chartExtend"></ve-histogram>
  </el-main>
</template>

<script>
export default {
  props: ["table"],
  data() {
    return {
      chartData: {
        columns: ["交易类型", "数量"],
        rows: [],
      },
      chartExtend: {
        xAxis: {
          axisLabel: {
            interval: 0,
            formatter: function (value) {
              return value.split("").join("\n");
            },
          },
        },
        series: [
          {
      center: ['50%', '50%'],

            itemStyle: {
              normal: {
                color: (params)=> {
                  var colorList = [
                    "#65d186",
                    "#f67287",
                    "#f29e3c",
                    "#c05bdd",
                    "#f29e3c",
                    "#7a65f2",
                    "#65d186",
                    "#f67287",
                  ];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
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
        var type = tableData[i].transactionType;
        if (type == null) type = "其他";
        if (Data[type] == null) {
          Data[type] = 1;
        } else Data[type]++;
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
