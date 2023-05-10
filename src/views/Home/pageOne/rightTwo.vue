<template>
  <Box class="box-container" :title="title" :titleSize="titleSize">
    <el-table
      class="box-table"
      ref="table"
      :data="tableData"
      height="92%"
      :show-header="false"
      :style="{ '--fontSize': fontSize }"
    >
      <el-table-column prop="number" width="90" />
      <el-table-column prop="msgText" />
    </el-table>
  </Box>
</template>

<script>
export default {
  name: "rightTwo",
  props: ["title", "fontSize", "titleSize"],
  data() {
    return {
      timer: null,
      //
      tableData: []
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
    /*  */
    this.timer = setInterval(() => {
      this.getList();
    }, 300000);
    /*  */
    this.$tableScroll(this.$refs.table);
  },
  methods: {
    getList() {
      this.$axios
        .post("/apis/visualizing/queryAnnouncementInfo", {})
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.tableData = rs.data.result;
          const newArr = this.tableData;
          this.tableData.map(item => {
            item.number =
              "公告" + (newArr.findIndex(v => v.msgText == item.msgText) + 1);
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
  width: 100%;
  height: 37%;
  margin-top: 1%;
  .box-table {
    width: 98%;
    margin-left: 1%;
    margin-top: 1%;
    font-size: var(--fontSize) !important;
  }
}
/*最外层透明*/
::v-deep .el-table,
::v-deep .el-table__expanded-cell {
  background-color: transparent !important;
}
/* 表格内背景颜色 */
::v-deep .el-table th,
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
