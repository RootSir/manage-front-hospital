<template>
  <Box class="box-container" :title="title" :titleSize="titleSize">
    <el-button
      type="primary"
      icon="el-icon-caret-right"
      circle
      @click="switchData"
    ></el-button>
    <h1 :style="{ '--labelSize': labelSize }">{{ subheadings }}</h1>
    <el-table
      class="box-table"
      ref="adultTable"
      :data="subheadings == '门急诊' ? adultTable : childTable"
      height="80%"
      :style="{ '--fontSize': fontSize }"
    >
      <el-table-column
        prop="workTeamName"
        label="分类"
        align="center"
        show-overflow-tooltip
        width="200"
      />
      <el-table-column
        prop="lockerGridNum"
        label="格子总数"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="waitReviewNum"
        label="待复核数"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="desirableNum"
        label="可取数量"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="reviewErrorNum"
        label="复核错误"
        align="center"
        show-overflow-tooltip
      />

      <el-table-column
        prop="waitSaveSilverBoxNum"
        label="代存银箱"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="stayStillSilverNum"
        label="待还银箱"
        align="center"
        show-overflow-tooltip
      />
    </el-table>
    <!-- <h2 :style="{ '--labelSize': labelSize }">{{ child }}</h2>
    <el-table
      class="box-table"
      ref="childTable"
      :data="childTable"
      height="30%"
      :style="{ '--fontSize': fontSize }"
    >
      <el-table-column
        prop="workTeamName"
        label="分类"
        align="center"
        show-overflow-tooltip
        width="200"
      />
      <el-table-column
        prop="lockerGridNum"
        label="格子总数"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="waitReviewNum"
        label="待复核数"
        align="center"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="desirableNum"
        label="可取数量"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="reviewErrorNum"
        label="复核错误"
        align="center"
        show-overflow-tooltip
      />

      <el-table-column
        prop="waitSaveSilverBoxNum"
        label="代存银箱"
        align="center"
        show-overflow-tooltip
      />
      <el-table-column
        prop="stayStillSilverNum"
        label="待还银箱"
        align="center"
        show-overflow-tooltip
      />
    </el-table> -->
  </Box>
</template>

<script>
export default {
  name: "rightOne",
  props: ["title", "fontSize", "titleSize", "labelSize"],
  data() {
    return {
      //数据定时器
      timer: null,
      //
      tableData: [],
      //
      adultTable: [],
      //
      childTable: [],
      //
      index: 0,
      //
      adult: null,
      //
      child: null,
      subheadings: "门急诊",
      count: 0
    };
  },
  watch: {
    fontSize(newVal, oldVal) {
      this.fontSize = newVal;
    },
    labelSize(newVal, oldVal) {
      this.labelSize = newVal;
    }
  },
  created() {
    this.getList();
  },
  mounted() {
    this.generateTimer();

    // this.$tableScroll(this.$refs.adultTable);
    // this.$tableScroll(this.$refs.childTable);

    /*  */
    // setInterval(() => {
    //   this.index = this.index + 1;
    //   if (this.index == this.tableData.length) this.index = 0;

    //   this.adult = this.tableData[this.index].lockerName;
    //   this.adultTable = this.tableData[this.index].statistical;

    //   if (this.index + 1 == this.tableData.length) {
    //     this.child = this.tableData[0].lockerName;
    //     this.childTable = this.tableData[0].statistical;
    //   } else {
    //     this.child = this.tableData[this.index + 1].lockerName;
    //     this.childTable = this.tableData[this.index + 1].statistical;
    //   }
    // }, 60000);
  },
  methods: {
    /*  */
    generateTimer() {
      this.timer = setInterval(() => {
        this.getList();
        this.count++;
        if (this.count === 5) {
          clearInterval(this.timer);
          this.count = 0;
          this.generateTimer(); // 重新定义定时器并循环执行
        }
      }, 5 * 60 * 1000);
    },
    switchData() {
      if (this.subheadings == "门急诊") {
        this.subheadings = "出入院";
      } else {
        this.subheadings = "门急诊";
      }
    },
    getList() {
      this.$axios
        .post("/apis/visualizing/getTeamGridStatistics")
        .then(rs => {
          if (rs.data.statusCode != "200") {
            return;
          }
          this.tableData = rs.data.result;
          if (this.tableData) {
            this.adult = this.tableData[0].lockerName;
            this.adultTable = this.tableData[0].statistical;
            this.child = this.tableData[1].lockerName;
            this.childTable = this.tableData[1].statistical;
          }
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
  position: relative;
  margin-left: 0.5%;
  .el-button {
    position: absolute;
    top: 50%;
    right: 1%;
    z-index: 99;
  }
  .box-table {
    width: 98%;
    margin-left: 1%;
    font-size: var(--fontSize) !important;
  }
}

h1 {
  margin-top: 2%;
  margin-left: 2%;
  font-size: var(--labelSize) !important;

  // color: #65a6fa;
  color: white;

  font-weight: bold;
}
h2 {
  margin-left: 2%;
  margin-top: 0.5%;
  font-size: var(--labelSize) !important;

  // color: #65a6fa;
  color: white;

  font-weight: bold;
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
  // color: rgb(139, 196, 247);
  color: white;
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
