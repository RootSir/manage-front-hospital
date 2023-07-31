<template>
  <Box class="box-container" :title="title" :titleSize="titleSize">
    <!-- <el-table
      class="box-table"
      ref="table"
      :data="tableData"
      height="92%"
      :show-header="false"
      :style="{ '--fontSize': fontSize }"
    >
      <el-table-column prop="number" width="90" />
      <el-table-column prop="msgText" />
    </el-table> -->

    <vue-seamless-scroll
      :data="tableData"
      :class-option="classOption"
      class="warp"
    >
      <ul class="ul-item">
        <li class="li-item" v-for="(item, index) in tableData" :key="index">
          <div class="top">
            {{ item.number }}
          </div>
          {{ item.msgText }}
        </li>
      </ul>
      <!-- <div class="ul-item">
        <div class="li-item" v-for="(item, index) in tableDatas" :key="index">
          {{ item.number }}{{ item.msgText }}
        </div>
      </div> -->
    </vue-seamless-scroll>
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
      tableData: [],
      tableDatas: [
        {
          id: "1",
          msgText:
            "目前智能柜正测试排班功能，目前智能柜正测试排班功能，目前智能柜正测试排班功能，",
          number: "公告1",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智试排班功能",
          number: "公告3",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目",
          number: "公告4",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告5",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测班功能目前智能柜正测试排班功能",
          number: "公告6",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试智能柜正排班功能",
          number: "公告7",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智班功能柜正测试排能",
          number: "公告8",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告9",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告10",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告11",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告12",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告13",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告14",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告14",
          status: 1,
          statusName: "正常"
        },
        {
          id: "1",
          msgText: "目前智能柜正测试排班功能",
          number: "公告14",
          status: 1,
          statusName: "正常"
        }
      ],
      listData: [1, 2, 3, 4, 5, 6],
      classOption: {
        limitMoveNum: 2,
        direction: 2
      }
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
          console.log(this.tableData);
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
.warp {
  width: 90%;
  // height: 140px;
  margin: 0 auto;
  overflow: hidden;
  // border: 1px solid #fff;
  .ul-item {
    display: flex;
    // border: 1px solid #000;
    .li-item {
      // margin: 0 1%;
      // width: 1rem;
      // margin: 0 2%;
      padding: 0 2%;
      font-size: 0.1rem;
      // border: 1px solid #000;
      white-space: nowrap;
      color: #fff;
      font-size: .15rem;
      .top{
        font-size: .2rem;
      }
    }
  }
  // ul {
  //   list-style: none;
  //   padding: 0;
  //   margin: 0 auto;
  //   &.ul-item {
  //     display: flex;
  //     border-color: #000;
  //     .li-item {
  //       background-color: #eb1010;
  //       margin: 0 10%;
  //     }
  //   }
  // }
}

.box-container {
  width: 100%;
  height: 100%;
  margin-top: 1%;
  .box-table {
    width: 98%;
    margin-left: 1%;
    // margin-top: 1%;
    font-size: var(--fontSize) !important;
  }
}
// /*最外层透明*/
// ::v-deep .el-table,
// ::v-deep .el-table__expanded-cell {
//   background-color: transparent !important;
// }
// /* 表格内背景颜色 */
// ::v-deep .el-table th,
// ::v-deep .el-table tr,
// ::v-deep .el-table td {
//   background-color: transparent !important;
//   border: 0; //去除表格
//   color: white;
//   // color: rgb(139, 196, 247);
// }
// /*去除底边框*/
// ::v-deep.el-table td.el-table__cell {
//   border: 0;
// }
// ::v-deep.el-table th.el-table__cell.is-leaf {
//   border: 0;
// }

// /* 去掉table 最底部的线 */
// ::v-deep .el-table--border::after,
// ::v-deep .el-table--group::after,
// ::v-deep .el-table::before {
//   background-color: transparent !important;
// }
</style>
