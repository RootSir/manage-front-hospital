<template>
  <Box1
    class="box-container"
    :title="title"
    :titleSize="titleSize"
    ref="myComponent"
  >
    <el-table
      class="box-table"
      ref="personTable"
      :data="personList"
      height="100%"
      :style="{ '--fontSize': fontSize }"
      :row-style="changeRow"
      @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseLeave"
    >
      <el-table-column
        prop="userId"
        label="工号"
        align="center"
        show-overflow-tooltip
        :width="colWidths.userId"
      />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        show-overflow-tooltip
        :width="colWidths.name"
      />
      <el-table-column
        prop="postName"
        label="岗位"
        align="center"
        show-overflow-tooltip
        :width="colWidths.postName"
      />
      <el-table-column
        prop="epc"
        label="银箱编号"
        align="center"
        show-overflow-tooltip
        :width="colWidths.epc"
      />
      <el-table-column
        prop="takeTimeStr"
        label="取箱时间"
        align="center"
        show-overflow-tooltip
        :width="colWidths.takeTimeStr"
      />
      <!-- 新加的一列：存箱时间 -->
      <el-table-column
        prop="storeTimeStr"
        label="存箱时间"
        align="center"
        show-overflow-tooltip
        :width="colWidths.storeTimeStr"
      />
    </el-table>
  </Box1>
</template>

<script>
export default {
  name: "leftOne",
  props: ["title", "fontSize", "titleSize"],
  data() {
    return {
      //人员信息表格数据
      personList: [],
      //数据定时器（周期性刷新）
      timer: null,
      //零点清空的定时器句柄
      midnightTimer: null,
      pageNum: 1, // 当前页数
      pageSize: 20, // 每页数量
      threshold: 25, // 距离底部多少像素时触发加载
      newPersonList: [], // 用于存放已加载的 item
      count: 0,
      //
      isTriggered: false,

      // 各列宽度权重：全部相等，六列均分总宽度
      colWeights: {
        userId: 1,
        name: 1,
        postName: 1,
        epc: 1,
        takeTimeStr: 1,
        storeTimeStr: 1
      },
      // 计算后的实际列宽（px），由 calcColWidths 动态生成
      colWidths: {
        userId: undefined,
        name: undefined,
        postName: undefined,
        epc: undefined,
        takeTimeStr: undefined,
        storeTimeStr: undefined
      }
    };
  },
  watch: {
    fontSize(newVal, oldVal) {
      this.fontSize = newVal;
    }
  },
  created() {
    this.getList(this.pageNum, this.pageSize);
  },
  mounted() {
    /* 数据滚动 */
    this.$tableScroll.tableScroll(this.$refs.personTable);
    /* 监听当前页面滚动事件 */
    const element = this.$refs.myComponent.$el;
    element.addEventListener("scroll", this.throttleFun, true);

    /* 列宽按比例计算，并监听窗口尺寸变化保持一致 */
    this.calcColWidths();
    window.addEventListener("resize", this.calcColWidths);

    /* 周期刷新 */
    this.generateTimer();

    /* 零点自动清空上一天数据 */
    this.scheduleMidnightClear();
  },
  methods: {
    /* 鼠标移入停止滚动 */
    handleMouseEnter() {
      // this.$tableScroll.stopScroll();
    },
    /* 鼠标移出继续滚动 */
    handleMouseLeave() {
      // this.$tableScroll.tableScroll(this.$refs.personTable);
    },

    /* 按权重计算各列实际像素宽度，权重相等则六列宽度一致 */
    calcColWidths() {
      const container = this.$refs.myComponent && this.$refs.myComponent.$el;
      if (!container) return;
      const totalWidth = container.clientWidth * 0.98; // 对应 .box-table 的 98% 宽度
      const totalWeight = Object.values(this.colWeights).reduce(
        (sum, w) => sum + w,
        0
      );
      const widths = {};
      Object.keys(this.colWeights).forEach(key => {
        widths[key] = Math.floor(
          (totalWidth * this.colWeights[key]) / totalWeight
        );
      });
      this.colWidths = widths;
    },

    // 懒加载
    handleScroll() {
      const scrollTable = this.$refs.personTable.bodyWrapper;
      const scrollDistance =
        scrollTable.scrollHeight -
        scrollTable.scrollTop -
        scrollTable.clientHeight;

      if (scrollDistance == this.threshold) {
        if (this.newPersonList.length < this.pageSize) {
          this.pageNum = 1;
        } else {
          this.pageNum++;
          this.getList(this.pageNum, this.pageSize);
        }
      }
    },

    // 节流
    throttle(fn, wait) {
      let context, args;
      let previous = 0;
      return function() {
        let now = +new Date();
        context = this;
        args = arguments;
        if (now - previous > wait) {
          fn.apply(context, args);
          previous = now;
        }
      };
    },

    throttleFun() {
      this.throttle(this.handleScroll, 1000)();
    },

    /* 周期性刷新（保留原有 5 分钟一次、循环 5 次的逻辑） */
    generateTimer() {
      this.timer = setInterval(() => {
        this.pageNum = 1;
        this.personList = [];
        this.getList(this.pageNum, this.pageSize);
        this.count++;
        if (this.count === 5) {
          clearInterval(this.timer);
          this.count = 0;
          this.generateTimer();
        }
      }, 5 * 60 * 1000);
    },

    /* 精确调度到次日 00:00:00 清空数据，避免 setInterval 累计误差 */
    scheduleMidnightClear() {
      const now = new Date();
      const nextMidnight = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 1,
        0,
        0,
        0,
        0
      );
      const delay = nextMidnight.getTime() - now.getTime();

      this.midnightTimer = setTimeout(() => {
        this.pageNum = 1;
        this.personList = [];
        this.newPersonList = [];
        this.getList(this.pageNum, this.pageSize);
        // 递归调度下一次零点清空
        this.scheduleMidnightClear();
      }, delay);
    },

    /* 判断某个时间字符串是否为今天，格式："2026-08-26 07:57:16" */
    isToday(timeStr) {
      if (!timeStr) return false;
      const datePart = String(timeStr).slice(0, 10); // "2026-08-26"
      const today = new Date();
      const todayStr = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      return datePart === todayStr;
    },

    /*  */
    changeRow({ row }) {
      if (row && "amount" in row && row.amount !== "" && row.amount !== null) {
        return {
          color: "#fda01e"
        };
      } else {
        return {
          color: "white"
        };
      }
    },

    /* 人员信息（只保留当天存取箱记录） */
    getList(pageNum, pageSize) {
      this.$axios
        .post("/apis/visualizing/getWorkUserInfo", {
          pageNum: pageNum,
          pageSize: pageSize
          // 如接口支持按日期查询，建议加上当天日期参数，例如：
          // date: this.formatDate(new Date())
        })
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          const rows = rs.data.result.rows || [];
          // 前端兜底过滤：只保留取箱时间或存箱时间为当天的记录
          this.newPersonList = rows.filter(
            item =>
              this.isToday(item.takeTimeStr) || this.isToday(item.storeTimeStr)
          );
          this.personList = this.personList.concat(this.newPersonList);
        })
        .catch(err => {});
    }
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.midnightTimer) {
      clearTimeout(this.midnightTimer);
      this.midnightTimer = null;
    }
    window.removeEventListener("resize", this.calcColWidths);
  }
};
</script>

<style lang="less" scoped>
.box-container {
  width: 98%;
  height: 98%;
  margin: 0 1% 0 1%;
  .box-table {
    width: 98%;
    margin-top: -1.5%;
    font-size: var(--fontSize) !important;
  }
}

/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}
/* 表格内背景颜色 */
::v-deep .el-table th {
  background-color: transparent !important;
  border: 0; //去除表格
  color: white;
}
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent !important;
  border: 0; //去除表格
}
/*去除底边框*/
::v-deep.el-table td.el-table__cell {
  border: 0;
}
::v-deep.el-table th.el-table__cell.is-leaf {
  border: 0;
}

/* 去掉table 最底部的线 */
::v-deep .el-table--border::after,
::v-deep .el-table--group::after,
::v-deep .el-table::before {
  background-color: transparent !important;
}
</style>