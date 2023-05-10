<template>
  <Box1 class="box-container" :title="title" :titleSize="titleSize">
    <el-table
      class="box-table"
      ref="personTable"
      :data="personList"
      height="100%"
      :style="{ '--fontSize': fontSize }"
      :row-style="changeRow"
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
      <el-table-column
        prop="amount"
        label="缴款金额"
        align="center"
        show-overflow-tooltip
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
      timer: null
    };
  },
  watch: {
    fontSize(newVal, oldVal) {
      this.fontSize = newVal;
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    /* 数据请求定时 */
    this.timer = setInterval(() => {
      this.getList();
    }, 300000);
    /* 数据滚动 */
    this.$tableScroll(this.$refs.personTable);
    /*  */
  },
  methods: {
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
    getList() {
      this.$axios
        .post("/apis/visualizing/getWorkUserInfo")
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.personList = rs.data.result;
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
