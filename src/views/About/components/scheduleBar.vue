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
            default: () => {
                return ['#5cb0ec', '#fc9932', '#c3d894']
            }
        }
    },
    data() {
        return {
        };
    },
    methods: {
        drawLine() {
            const myBarChartRef = this.$refs.myBarChart
            let colorList = ['#f5c1f6', '#58e2e1', '#709bde', '#58e2e1',]
            let result = [
                { name: '好企业', value: 2032 },

            ]
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(myBarChartRef);
            // 绘制图表
            myChart.setOption({
                color: colorList,
                legend: {
                    show: false,
                },
                xAxis: [
                    {
                        splitLine: {
                            show: false,
                        },
                        type: 'value',
                        show: false,
                    },
                ],
                yAxis: [
                    {
                        splitLine: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                        },
                        type: 'category',
                        axisTick: {
                            show: false,
                        },
                        inverse: true,
                        data: result.map((item) => item.name),
                        axisLabel: {
                            color: '#9bb2de',
                            fontSize: 30,
                            margin: 10,
                            formatter: (name, index) => {
                                const id = index + 1;
                            },

                        },
                    },
                ],
                series: [
                    {
                        name: '',
                        type: 'bar',
                        barWidth: 20, // 柱子宽度
                        MaxSize: 0,
                        showBackground: false,
                        barBorderRadius: [30, 30, 30, 30],
                        backgroundStyle: {
                            color: '#194B72',
                        },
                        data: result.map((item, index) => {
                            return {
                                name: item.name,
                                value: item.value,
                                itemStyle: {
                                    barBorderRadius: [30, 30, 30, 30],
                                    color: {
                                        type: "linear",
                                        x: 0,
                                        y: 0,
                                        x2: 1,
                                        y2: 1,
                                        colorStops: [
                                            {
                                                offset: 0,
                                                color: "#0F1F45",
                                            },
                                            {
                                                offset: 1,
                                                color: colorList[index],
                                            },
                                        ],
                                    }
                                }
                            }
                        }),
                    },

                ],
            });
        },
    },
    mounted() {
        this.drawLine();
    },
};
</script>
