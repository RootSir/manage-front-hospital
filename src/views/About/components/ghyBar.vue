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
    methods: {
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
              data: currentPeriodData
            },
            {
              name: "同期",
              type: "bar",
              data: samePeriodData,
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