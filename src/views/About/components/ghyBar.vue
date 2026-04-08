<template>
    <div ref="myBarChart" :style="{ width: '100%', height: '100%' }"></div>
  </template>
  
  <script>
  export default {
    name: "ghyBar",
    props: {
      operationType: {
        type: Number,
        required: true // 1 for 存箱, 2 for 取箱
      },
      data: {
        type: Array,
        required: true
      },
      color: {
        type: Array,
        default: () => ['#5cb0ec','#fc9932','#c3d894']
      }
    },
    data() {
      return {
        // yxy备注：请这里修改成相关接口的数据
        mockBarTopLabels: {
          4: {
            current: [128, 132, 141, 156, 163, 170],
            same: [118, 121, 129, 138, 145, 152]
          },
          5: {
            current: [88, 94, 102, 110, 118, 126],
            same: [79, 84, 91, 98, 103, 109]
          },
          6: {
            current: [68, 73, 77, 82, 89, 95],
            same: [61, 66, 69, 74, 79, 83]
          },
          default: {
            current: [100, 100, 100, 100, 100, 100],
            same: [90, 90, 90, 90, 90, 90]
          }
        }
      }
    },
    methods: {
      getMockLabelValue(seriesType, dataIndex) {
        const operationMockData = this.mockBarTopLabels[this.operationType] || this.mockBarTopLabels.default
        const labelList = operationMockData[seriesType] || []
        return labelList[dataIndex] !== undefined ? labelList[dataIndex] : 0
      },
      drawLine() {
        const myBarChartRef = this.$refs.myBarChart;
        let myChart = this.$echarts.init(myBarChartRef);
        
        const xAxisData = this.data.map(item => item.month);
        const currentPeriodData = this.data.map(item => item.currentPeriod);
        const samePeriodData = this.data.map(item => item.samePeriodLastYear);
        const yoyData = this.data.map(item => item.yearOverYearGrowth);
  
        const yoyMin = Math.min(...yoyData);
        const yoyMax = Math.max(...yoyData);
        const yoyAvg = (yoyMin + yoyMax) / 2;
        const yoyRange = yoyMax - yoyMin;
  
        // 调整 y 轴范围，使曲线不那么夸张
        const yAxisMin = yoyAvg - yoyRange * 0.75; // 减小范围
        const yAxisMax = yoyAvg + yoyRange * 0.75; // 减小范围
  
        myChart.setOption({
          color: this.color,
          xAxis: {
            data: xAxisData,
            axisTick: {
              show: false
            },
            axisLabel: {
              interval: 0 // 显示所有标签
            }
          },
          yAxis: [
            {
              type: 'value',
              show: false
            },
            {
              type: 'value',
              show: false,
              min: yAxisMin,
              max: yAxisMax
            }
          ],
          legend: {
            bottom: '2%',
            textStyle: {
              color: '#666',
              fontSize: 13,
            },
          },
          series: [
            {
              name: '本期',
              type: 'bar',
              data: currentPeriodData,
              label: {
                show: true,
                position: 'top',
                color: '#000',
                backgroundColor: '#fff',
                padding: [2, 4],
                borderRadius: 2,
                fontSize: 10,
                formatter: params => this.getMockLabelValue('current', params.dataIndex)
              }
            },
            {
              name: "同期",
              type: "bar",
              data: samePeriodData,
              label: {
                show: true,
                position: 'top',
                color: '#000',
                backgroundColor: '#fff',
                padding: [2, 4],
                borderRadius: 2,
                fontSize: 10,
                formatter: params => this.getMockLabelValue('same', params.dataIndex)
              }
            },
            {
              name: '同比',
              type: 'line',
              yAxisIndex: 1,
              smooth: 0.3, // 稍微减小平滑度
              data: yoyData,
              lineStyle: {
                width: 2
              },
              symbol: 'circle',
              symbolSize: 8
            }
          ],
        });
      },
    },
    watch: {
      data: {
        handler() {
          this.drawLine();
        },
        deep: true
      }
    },
    mounted() {
      this.drawLine();
    },
  };
  </script>
