<template>
  <Box
    class="box-container"
    :title="title"
    :titleSize="titleSize"
    ref="myComponent"
  >
    <el-table
      class="box-table"
      ref="abnormalTable"
      :data="abnormalList"
      height="95%"
      :style="{ '--fontSize': fontSize }"
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
        prop="userName"
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
      <el-table-column prop="type" label="类型" align="center" />
      <el-table-column prop="msgText" label="状态" align="center" width="200" />
      <el-table-column
        prop="createTime"
        label="时间"
        align="center"
        show-overflow-tooltip
        width="200"
      />
    </el-table>
  </Box>
</template>

<script>
export default {
  name: "leftTwo",
  props: ["title", "fontSize", "titleSize"],
  data() {
    return {
      //异常情况表格数据
      abnormalList: [],
      //定时器
      timer: null,
      pageNum: 1, // 当前页数
      pageSize: 10, // 每页数量
      threshold: 20, // 距离底部多少像素时触发加载
      newAbnormalList: [], // 用于存放已加载的 item
      count: 0
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
    this.$tableScroll.tableScroll(this.$refs.abnormalTable);
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
    /* 鼠标移出停止滚动 */
    handleMouseLeave() {
      // this.$tableScroll.tableScroll(this.$refs.abnormalTable);
    },
    // 懒加载
    handleScroll() {
      // 标准浏览器中：定义一个形参event，但当事件触发的时候，并没有给event赋实际的值，
      // 则浏览器会把”事件“的对象赋给这个形参e，这时这个e是个系统级的对象：事件；
      const scrollTable = this.$refs.abnormalTable.bodyWrapper;
      const scrollDistance =
        // 正文全文高
        scrollTable.scrollHeight -
        // 被卷去的高
        scrollTable.scrollTop -
        // 可见区域的宽度
        scrollTable.clientHeight;
      // 滚动条距离底部小于等于0证明已经到底了，可以请求接口了
      if (scrollDistance == this.threshold) {
        if (this.newAbnormalList.length < this.pageSize) {
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
        this.abnormalList = [];
        this.getList(this.pageNum, this.pageSize);
        this.count++;
        if (this.count === 5) {
          clearInterval(this.timer);
          this.count = 0;
          this.generateTimer(); // 重新定义定时器并循环执行
        }
      }, 5 * 60 * 1000);
    },
    /* 异常情况 */
    getList(pageNum, pageSize) {
      this.$axios
        .post("/apis/visualizing/queryAbnormalInfo", {
          isConfirm: 0,
          pageNum: pageNum,
          pageSize: pageSize
        })
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.newAbnormalList = rs.data.result.rows;
          this.abnormalList = this.abnormalList.concat(this.newAbnormalList);
          this.abnormalList.map(item => {
            switch (item.type) {
              case 0:
                item.type = "超时领用";
                break;
              case 1:
                item.type = "申请领用";
                break;
              case 2:
                item.type = "重开误关柜门(存)";
                break;
              case 3:
                item.type = "待存银箱";
                break;
              case 4:
                item.type = "短信发送记录";
                break;
              case 5:
                item.type = "重开误关柜门(取)";
                break;
              case 6:
                item.type = "轧账异常";
                break;
              case 7:
                item.type = "岗位变更";
                break;
              case 8:
                item.type = "领用分层钥匙银箱";
                break;
              case 9:
                item.type = "未缴款";
                break;
              case 10:
                item.type = "未结账";
                break;
              case 11:
                item.type = "超时未存箱";
                break;
              case 12:
                item.type = "领用应急箱";
                break;
              case 13:
                item.type = "非排班人员取箱";
                break;
              case 14:
                item.type = "非取箱时间进行取箱";
                break;
              case 15:
                item.type = "重复班组取箱";
                break;
              default:
                break;
            }
          });
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
  width: 49%;
  height: 100%;
  margin-left: 1%;
  .box-table {
    width: 98%;
    margin-left: 1%;
    // margin-top: 2%;
    font-size: var(--fontSize) !important;
    overflow-y: visible;
  }
}

/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}
//* 表格内背景颜色 */
::v-deep .el-table th {
  // background-color: #31445f4f;
  background-color: transparent !important;
  border: 0; //去除表格
  color: white;
  // color: rgb(139, 196, 247);
}
::v-deep .el-table tr,
::v-deep .el-table td {
  background-color: transparent !important;
  border: 0; //去除表格
  color: white;
  // color: rgb(139, 196, 247);
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
