<template>
  <BoxThree class="centerBox" ref="centerBox" :title="title">
    <div ref="bar" class="graphicsBox"></div>
  </BoxThree>
</template>

<script>
export default {
  name: "centerOne",
  props: ["title"],
  data() {
    return {
      //
      timer: null,
      //
      tableData: [],
      //
      chartData: [["存箱", "取箱"]],
      //
      year: null
      //
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
        .post("/apis/visualizing/queryAccessStatistics", {
          type: type,
          year: year
        })
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.tableData = rs.data.result;
          this.chartData = [["存箱", "取箱"]];
          this.tableData.map(item => {
            if (type == 1 || type == 2) {
              this.chartData.push([
                item.day,
                item.storageNumber,
                item.takeNumber
              ]);
            } else if (type == 3) {
              this.chartData.push([
                "第" + parseInt(item.day) + "季度",
                item.storageNumber,
                item.takeNumber
              ]);
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

      const colorArr = [
        "#49CCFFee",
        "#20D3ABee",
        "#FDD56Aee",
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
      const colorAlpha = [
        "#49CCFF88",
        "#20D3AB88",
        "#FDD56A88",
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
      const title = "合计";
      const storageNumber = this.tableData.reduce(
        (per, cur) => per + parseInt(cur.storageNumber),
        0
      );
      const takeNumber = this.tableData.reduce(
        (per, cur) => per + parseInt(cur.takeNumber),
        0
      );
      const amountSum = storageNumber + takeNumber;
      const piedata = [
        {
          name: "存箱",
          value: storageNumber,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: colorAlpha[0],
              shadowColor: colorArr[0]
            }
          }
        },
        {
          name: "取箱",
          value: takeNumber,
          itemStyle: {
            normal: {
              borderWidth: 5,
              shadowBlur: 20,
              borderColor: colorAlpha[1],
              shadowColor: colorArr[1]
            }
          }
        }
      ];
      // myChart.resize({
      //   height: 320,
      //   width: 1112
      // });

      // 图表配置

      option = {
        dataset: {
          source: this.chartData
        },
        dataZoom: [
          {
            type: "slider",
            yAxisIndex: 0,
            left: "95%",
            top: "60%",
            zoomLock: true,
            width: 10,
            height: 150,
            handleSize: 0,
            showDetail: false,
            start: 120,
            end: 70
          },
          {
            type: "inside",
            id: "insideY",
            yAxisIndex: 0,
            start: 0,
            end: 30,
            zoomOnMouseWheel: false,
            moveOnMouseMove: true,
            moveOnMouseWheel: true
          }
        ],
        grid: {
          left: "55%",
          right: "10%",
          top: "60%",
          bottom: "15%"
        },
        // title: [
        //   {
        //     text: title,
        //     subtext: amountSum,
        //     left: "17.5%",
        //     top: "66%",
        //     subtextStyle: {
        //       fontSize: 15,
        //       fontWeight: "normal",
        //       color: "#fff",
        //       padding: [10, 0]
        //     },
        //     textStyle: {
        //       fontSize: 18,
        //       fontWeight: "bolder",
        //       color: "#fff",
        //       padding: [10, 0]
        //     }
        //   }
        // ],
        tooltip: {
          show: false,
          trigger: "axis",
          axisPointer: {
            type: "cross"
          },
          padding: 16
        },
        legend: {
          show: true,
          left: "55%",
          top: "55%",
          itemWidth: 12,
          itemHeight: 12,
          textStyle: {
            color: "#fff",
            fontWeight: "bolder"
          }
        },
        color: colorArr,
        yAxis: {
          type: "category",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "#fff",
            fontWeight: "bolder"
          }
        },
        xAxis: {
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitNumber: 3,
          axisLabel: {
            color: "#fff",
            fontWeight: "bolder"
          },
          splitLine: {
            lineStyle: {
              type: "dashed"
            }
          }
        },
        series: [
          {
            type: "bar",
            name: this.chartData[0][0],
            barWidth: 20,
            stack: true,
            encode: {
              y: 0,
              x: 1
            },
            itemStyle: {
              normal: {
                borderWidth: 2,
                shadowBlur: 20,
                borderColor: colorAlpha[0],
                shadowColor: colorArr[0]
              }
            },
            label: {
              normal: {
                show: true,
                color: "#fff",
                fontWeight: "bolder"
              }
            }
          },
          {
            type: "bar",
            name: this.chartData[0][1],
            barWidth: 20,
            stack: true,
            encode: {
              y: 0,
              x: 2
            },
            itemStyle: {
              normal: {
                borderWidth: 2,
                shadowBlur: 20,
                borderColor: colorAlpha[1],
                shadowColor: colorArr[1]
              }
            },
            label: {
              normal: {
                show: true,
                color: "#fff",
                fontWeight: "bolder"
              }
            }
          },

          {
            type: "pie",
            z: 100,
            radius: ["15%", "30%"],
            center: ["25%", "70%"],
            data: piedata,
            tooltip: {
              trigger: "item",
              formatter: "{a} <br/>{b} : {c}"
            },
            label: {
              show: true,
              fontSize: 12,
              formatter: "{b}\n{c}次",
              fontWeight: "bolder",
              color: "#fff"
            }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.centerBox {
  width: 100%;
  height: 100%;
  margin-top: -10%;
  .graphicsBox {
    width: 100%;
    height: 100%;
  }
}
</style>
