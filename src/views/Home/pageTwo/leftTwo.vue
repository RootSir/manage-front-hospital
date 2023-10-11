<template>
  <BoxTwo class="box-container" :title="title">
    <div ref="bar" class="graphicsBox"></div>
  </BoxTwo>
</template>

<script>
export default {
  name: "leftTwo",
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
      year: null,
      //
      count: 0
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
    this.generateTimer();
  },
  methods: {
    /*  */
    generateTimer() {
      this.timer = setInterval(() => {
        this.getList(2, this.year);
        this.count++;
        if (this.count === 5) {
          clearInterval(this.timer);
          this.count = 0;
          this.generateTimer(); // 重新定义定时器并循环执行
        }
      }, 5 * 60 * 1000);
    },
    getList(type, year) {
      this.$axios
        .post("/apis/visualizing/getApplyStatistics", {
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

    setBar() {
      if (
        this.myChart != null &&
        this.myChart != "" &&
        this.myChart != undefined
      ) {
        this.myChart.dispose(); //销毁
      }

      let chartDom = this.$refs.bar;
      this.myChart = this.$echarts.init(chartDom);
      let option;

      const data1 = [];
      const data2 = [];
      const colorIn = [
        "rgb(33, 166, 161)",
        "rgb(102,113,209)",
        "rgb(230,144,78)",
        "rgb(38,185,211)",
        "rgb(82,125,12)",
        "rgb(35,70,209)",
        "#115FEA",
        "#10EBE3",
        "#10A9EB",
        "#EB9C10",
        "#2E10EB",
        "#9B10EB"
      ];
      const colorOut = [
        "rgba(33, 166, 161, 0.5)",
        "rgba(102,113,209, 0.5)",
        "rgba(230,144,78, 0.5)",
        "rgba(38,185,211, 0.5)",
        "rgb(82,125,12,0.5)",
        "rgb(35,70,209,0.5)"
      ];
      for (let i = 0; i < this.chartData.length; i++) {
        data1.push({
          data: this.chartData[i].value,
          value: this.chartData[i].value,
          name: this.chartData[i].name,
          itemStyle: {
            normal: {
              // color: colorOut[i],
              borderWidth: 2,
              shadowBlur: 20,
              borderColor: colorIn[i],
              shadowColor: colorIn[i]
            }
          }
        });
        data2.push({
          data: this.chartData[i].value,
          value: this.chartData[i].value,
          name: this.chartData[i].name,
          itemStyle: {
            normal: {
              color: colorIn[i]
            }
          }
        });
      }
      const dataArr = [];
      for (let i = 0; i < 100; i++) {
        if (i % 2 === 0) {
          dataArr.push({
            name: (i + 1).toString(),
            value: 25,
            itemStyle: {
              normal: {
                color: "#2ac9e1",
                borderWidth: 0,
                borderColor: "rgba(0,0,0,0)"
              }
            }
          });
        } else {
          dataArr.push({
            name: (i + 1).toString(),
            value: 20,
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)",
                borderWidth: 0,
                borderColor: "rgba(0,0,0,0)"
              }
            }
          });
        }
      }
      option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },

        series: [
          {
            type: "pie",
            zlevel: 3,
            silent: true,
            // center: ['50%', '40%'],
            radius: ["58%", "59%"],
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: dataArr
          },
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "56%"],
            label: {
              formatter: "{d}%",
              position: "inner"
            },
            data: data2
          },
          {
            type: "pie",
            radius: ["61%", "63%"],
            labelLine: {
              normal: {
                length: 10,
                length2: 14
              }
            },
            label: {
              show: true,
              position: "outer",
              alignTo: "labelLine",
              // ·圆点
              backgroundColor: "auto",
              height: 0,
              width: 0,
              lineHeight: 0,
              distanceToLabelLine: 0,
              borderRadius: 2.5,
              padding: [2.5, -2.5, 2.5, -2.5],
              formatter: "{a|{b}：}{b|{c}}",
              normal: {
                textStyle: {
                  color: "#fff"
                }
              },
              rich: {
                a: {
                  padding: [0, 0, 0, 10],
                  color: "#aebfe8"
                },
                b: {
                  padding: [0, 10, 0, 0]
                }
              }
            },

            data: data1
          }
        ]
      };
      this.myChart.setOption(option);
      const _this = this;
      window.addEventListener("resize", function() {
        _this.myChart.resize();
      });
      this.$on("hook:destroyed", () => {
        window.removeEventListener("resize", function() {
          _this.myChart.resize();
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
  // margin-top: 2%;
  .graphicsBox {
    width: 100%;
    height: 100%;
  }
}
</style>
