<template>
  <Box class="box-container" :title="title" :titleSize="titleSize">
    <el-table
      class="box-table"
      ref="abnormalTable"
      :data="abnormalList"
      height="95%"
      :style="{ '--fontSize': fontSize }"
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
    this.timers = setInterval(() => {
      this.getList();
    }, 300000);
    /* 数据滚动 */
    this.$tableScroll(this.$refs.abnormalTable);
  },
  methods: {
    /* 异常情况 */
    getList() {
      this.$axios
        .post("/apis/visualizing/queryAbnormalInfo", {
          isConfirm: 0
        })
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.abnormalList = rs.data.result;
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
  width: 100%;
  height: 100%;
  // margin-top: 1%;
  .box-table {
    width: 98%;
    margin-left: 1%;
    // margin-top: 2%;
    font-size: var(--fontSize) !important;
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
