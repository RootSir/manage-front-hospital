<template>
    <div ref="myBarChart" :style="{ width: '100%', height: '100%' }"></div>
</template>

<script>
export default {
    name: "ghyBar",
    props: {
        data: [],
        color: {
            type: Array,
            default:()=>{
                return ['#5cb0ec','#fc9932','#c3d894']
            }
        }
    },
    data() {
        return {
        };
    },
    methods: {
        drawLine() {
            const myBarChartRef=this.$refs.myBarChart
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(myBarChartRef);
            // 绘制图表
            myChart.setOption({
                color:this.color,
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
                    axisTick: {
                        show: false // 隐藏X轴刻度
                    },
                },
                yAxis: {
                    type: 'value',
                    show: false
                },
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
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' ml';
                            }
                        },
                        data: [2.0, 4.9, 7.0, 23.2, 25.6, 32.6, 20.0, 6.4, 3.3]
                    },
                    {
                        name: "同期",
                        type: "bar",
                        data: [5, 20, 36, 10, 10, 20],
                    },
                    {
                        name: '同比',
                        type: 'line',
                        smooth: true,
                        //yAxisIndex: 1,
                        tooltip: {
                            valueFormatter: function (value) {
                                return value + ' °C';
                            }
                        },
                        data: [5, 7, 8, 6, 6.3, 3, 5,]
                    }
                ],
            });
        },
    },
    mounted() {
        this.drawLine();
    },
};
</script>
