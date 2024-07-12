<template>
  <div class="center-wraper">
    <h1 class="sys-title">财 务 收 费 运 营 监 测 数 据 大 屏</h1>
    <div class="subtips left-clock">
      最近更新:{{ lastTime }} {{ times }}s后刷新数据
    </div>
    <div class="subtips right-clock">
      {{ dateStr }}
      {{ day }}
    </div>
  </div>
</template>

<script>
export default {
  name: "top",
  data() {
    return {
      timer: null,
      dateStr: "",
      day: "",
      times: 300,
      timer2: null,
      lastTime: null,
      timer3: null,
      //
      count: 0
    };
  },
  methods: {
    /*  */
    clock() {
      this.timer = setInterval(() => {
        const curDate = new Date();
        this.dateStr = this.$options.filters.dateformat(
          curDate,
          "YYYY-MM-DD HH:mm:ss"
        );
        this.day = this.$options.filters.dateformat(curDate, "dddd");
      }, 1000);
    },
    resetTime() {
      const datetime = new Date();
      this.lastTime = this.$options.filters.dateformat(
        datetime,
        "YYYY-MM-DD HH:mm:ss"
      );
      this.timer2 = setInterval(() => {
        this.times--;
        if (this.times <= 0) {
          clearInterval(this.timer2);
          this.times = 300;
        }
      }, 1000);
    },
    /*  */
    generateTimer() {
      this.timer3 = setInterval(() => {
        this.resetTime();
        this.count++;
        if (this.count === 5) {
          clearInterval(this.timer3);
          this.count = 0;
          this.generateTimer(); // 重新定义定时器并循环执行
        }
      }, 5 * 60 * 1000);
    }
  },
  created() {
    this.resetTime();
  },
  mounted() {
    this.clock();
    this.generateTimer();
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

.center-wraper {
  width: 100%;
  height: 100px;
  position: relative;
  background: url("../../../assets/images/top.png") no-repeat;
  background-size: 100% 100%;
  .sys-title {
    line-height: 70px;
    font-size: 35px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }
  .subtips {
    color: #2a8ec9;
    font-size: 20px;
    font-weight: bold;
    // line-height: 40px;
    // height: 0px;
    &.left-clock {
      position: absolute;
      left: 30px;
      top: 20px;
    }
    &.right-clock {
      position: absolute;
      right: 30px;
      top: 20px;
    }
  }
}
</style>
