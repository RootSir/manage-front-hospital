<template>
  <BoxTwo class="box-container" :title="title">
    <div ref="bar" class="graphicsBox"></div>
  </BoxTwo>
</template>

<script>
export default {
  name: "leftOne",
  props: ["title"],
  data() {
    return {
      //
      timer: null,
      //
      tableData: [],
      //
      chartData: [],
      //
      year: null
    };
  },
  watch: {
    chartData(val) {
      this.chartData = val;
      this.setBar();
    }
  },
  created() {
    const date = new Date();
    this.year = date.getFullYear();
    this.getList(2, this.year);
  },
  mounted() {
    this.setBar();
    this.timer = setInterval(() => {
      this.getList(2, this.year);
    }, 300000);
  },
  methods: {
    /*  */
    getList(type, year) {
      this.$axios
        .post("/apis/visualizing/getAbnormalStatistics", {
          type: type,
          year: year
        })
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.tableData = rs.data.result;
          this.chartData = this.tableData.map(item => {
            if (type == 1 || type == 2) {
              return {
                name: item.day,
                value: item.number
              };
            } else if (type == 3) {
              return {
                name: "第" + parseInt(item.day) + "季度",
                value: item.number
              };
            }
          });
        })
        .catch(err => {});
    },
    /*  */
    setBar() {
      let chartDom = this.$refs.bar;
      let myChart = this.$echarts.init(chartDom);
      let option;
      const colorList = [
        "#115FEA",
        "#10EBE3",
        "#10A9EB",
        "#EB9C10",
        "#2E10EB",
        "#9B10EB",
        "rgb(33, 166, 161)",
        "rgb(102,113,209)",
        "rgb(230,144,78)",
        "rgb(38,185,211)",
        "rgb(82,125,12)",
        "rgb(35,70,209)"
      ];
      const sum = this.chartData.reduce((per, cur) => per + cur.value, 0);
      const gap = (1 * sum) / 100;
      const pieData1 = [];
      const pieData2 = [];
      const gapData = {
        name: "",
        value: gap,
        itemStyle: {
          color: "transparent"
        }
      };
      for (let i = 0; i < this.chartData.length; i++) {
        // 第一圈数据
        pieData1.push({
          ...this.chartData[i],
          itemStyle: {
            borderRadius: 10
          }
        });
        pieData1.push(gapData);

        // 第二圈数据
        pieData2.push({
          ...this.chartData[i],
          itemStyle: {
            color: colorList[i],
            opacity: 0.21
          }
        });
        pieData2.push(gapData);
      }

      option = {
        tooltip: {
          show: true,
          backgroundColor: "rgba(0, 0, 0,.8)",
          textStyle: {
            color: "#fff"
          }
        },
        legend: {
          show: true,
          right: "4%",
          top: "center",
          align: "left",
          itemGap: 15,
          // icon: 'rect',
          itemWidth: 13,
          itemHeight: 7,
          // symbolKeepAspect: false,
          textStyle: {
            color: "#D8DDE3",
            rich: {
              name: {
                verticalAlign: "right",
                align: "left",
                width: 90,
                fontSize: 14,
                color: "#D8DDE3"
              },
              percent: {
                padding: [0, 0, 0, 8],
                color: "#D8DDE3"
              }
            },
            borderWidth: 53 // 间距的宽度
          },
          formatter: name => {
            const item = this.chartData.find(i => {
              return i.name === name;
            });
            const p = ((item.value / sum) * 100).toFixed(1);
            return "{name|" + name + "}" + "{percent|" + p + "}" + "%";
          }
        },
        grid: {
          top: 35,
          right: 30,
          bottom: 20,
          left: 30
        },
        color: colorList,
        series: [
          {
            name: "",
            type: "pie",
            roundCap: true,
            radius: ["57%", "61%"],
            center: ["28%", "50%"],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            data: pieData1
          },
          {
            type: "pie",
            radius: ["57%", "45%"],
            center: ["28%", "50%"],
            gap: 1.71,
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            silent: true,
            data: pieData2
          },
          {
            type: "pie",
            center: ["28%", "50%"],
            radius: [0, "42.6%"],
            label: {
              show: false
            },
            labelLine: {
              show: false
            },
            itemStyle: {
              color: "rgba(75, 126, 203,.1)"
            },
            silent: true,
            data: [
              {
                value: 100,
                name: ""
              }
            ]
          }
        ]
      };

      myChart.setOption(option);
      window.addEventListener("resize", function() {
        myChart.resize();
      });
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function() {
          myChart.resize();
        });
      });
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
};
</script>

<style lang="less" scoped>
.box-container {
  width: 100%;
  height: 48%;
  .graphicsBox {
    width: 100%;
    height: 100%;
  }
}
</style>
