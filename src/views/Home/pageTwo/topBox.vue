<template>
  <div class="center-wraper">
    <h1 class="sys-title">财 务 收 费 数 据 大 屏</h1>
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
      timers: null,
      lastTime: null,
      page: null
    };
  },
  methods: {
    changPage(val) {
      this.page = val;
      this.$emit("changPage", this.page);
    },
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
      this.timers = setInterval(() => {
        this.times--;
        if (this.times <= 0) {
          clearInterval(this.timers);
          this.times = 300;
        }
      }, 1000);
    }
  },
  created() {
    this.resetTime();
  },
  mounted() {
    this.clock();
    this.timer = setInterval(() => {
      this.resetTime();
    }, 300000);
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
    font-size: 45px;
    text-align: center;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
  }
  .subtips {
    color: #2a8ec9;
    font-size: 20px;
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
