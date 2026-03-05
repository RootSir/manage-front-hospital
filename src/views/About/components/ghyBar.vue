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
    return {}
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

      // 调整 y 轴范围，修复如果所有数据比例一致（比如全都是 100）导致 range 为 0 的显示异常
      let yAxisMin, yAxisMax;
      if (yoyRange === 0) {
        yAxisMin = yoyAvg - 50; 
        yAxisMax = yoyAvg + 50; 
      } else {
        yAxisMin = yoyAvg - yoyRange * 0.75; 
        yAxisMax = yoyAvg + yoyRange * 0.75; 
      }

      myChart.setOption({
        color: this.color,
        // tooltip，鼠标悬停时可以看到详细数据
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          },
          formatter: function(params) {
            let result = params[0].name + '<br>';
            params.forEach(item => {
              // ⚠️ 这里进行了修改：移除了“同比”数据后的 % 符号，直接显示数值
              if (item.seriesName === '同比') {
                result += item.marker + item.seriesName + ': ' + item.value + '<br>'; // 原来是 '%<br>'
              } else {
                result += item.marker + item.seriesName + ': ' + item.value + '<br>';
              }
            });
            return result;
          }
        },
        xAxis: {
          data: xAxisData,
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0, // 显示所有标签
            color: '#a1c2fa' // 稍微调亮X轴字体颜色，适应深色大屏
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
            color: '#a1c2fa', // 调整底部图例字体颜色
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
              formatter: '{c}' 
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
              formatter: '{c}' 
            }
          },
          {
            name: '同比',
            type: 'line',
            yAxisIndex: 1,
            smooth: 0.3,
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