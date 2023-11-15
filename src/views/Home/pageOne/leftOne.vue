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
      />
      <el-table-column
        prop="name"
        label="姓名"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="postName"
        label="岗位"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="epc"
        label="银箱编号"
        align="center"
        show-overflow-tooltip
        width="400"
      />
      <el-table-column
        prop="takeTimeStr"
        label="取箱时间"
        align="center"
        show-overflow-tooltip
        width="300"
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
      //数据定时器
      timer: null,
      pageNum: 1, // 当前页数
      pageSize: 20, // 每页数量
      threshold: 25, // 距离底部多少像素时触发加载
      newPersonList: [], // 用于存放已加载的 item
      count: 0,
      //
      isTriggered: false
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
    /*  */
    this.generateTimer();
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
    // 懒加载
    handleScroll() {
      // 标准浏览器中：定义一个形参event，但当事件触发的时候，并没有给event赋实际的值，
      // 则浏览器会把”事件“的对象赋给这个形参e，这时这个e是个系统级的对象：事件；
      const scrollTable = this.$refs.personTable.bodyWrapper;
      const scrollDistance =
        // 正文全文高
        scrollTable.scrollHeight -
        // 被卷去的高
        scrollTable.scrollTop -
        // 可见区域的宽度
        scrollTable.clientHeight;

      // 滚动条距离底部小于等于0证明已经到底了，可以请求接口了
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
        args = arguments; // 取throttle执行作用域的this
        if (now - previous > wait) {
          fn.apply(context, args); // 用apply指向调用throttle的对象，相当于throttle.fn(args);
          previous = now;
        }
      };
    },

    throttleFun() {
      this.throttle(this.handleScroll(), 1000);
    },
    /*  */
    generateTimer() {
      this.timer = setInterval(() => {
        this.pageNum = 1;
        this.personList = [];
        this.getList(this.pageNum, this.pageSize);
        this.count++;
        if (this.count === 5) {
          clearInterval(this.timer);
          this.count = 0;
          this.generateTimer(); // 重新定义定时器并循环执行
        }
      }, 5 * 60 * 1000);
    },
    /*  */
    changeRow({ row }) {
      if (
        row.amount !== "" &&
        row.amount !== null &&
        row.amount !== undefined
      ) {
        // 变颜色的条件
        return {
          color: "#fda01e" // 这个return的就是样式 可以是color 也可以是backgroundColor
        };
      } else {
        return {
          color: "white" // 这个return的就是样式 可以是color 也可以是backgroundColor
        };
      }
    },
    /* 人员信息 */
    getList(pageNum, pageSize) {
      this.$axios
        .post("/apis/visualizing/getWorkUserInfo", {
          pageNum: pageNum,
          pageSize: pageSize
        })
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.newPersonList = rs.data.result.rows;
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
    // margin-left: 1%;
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
  // background-color: #31445f4f;
  background-color: transparent !important;
  border: 0; //去除表格
  // color: rgb(139, 196, 247);
  color: white;
}
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent !important;
  border: 0; //去除表格
  // color: white;
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
