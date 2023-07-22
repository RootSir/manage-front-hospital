<template>
  <Box class="box-container" :title="title" :titleSize="titleSize">
    <el-button
      icon="el-icon-caret-right"
      type="success"
      circle
      @click="toggleButton"
    ></el-button>
    <h1 :style="{ '--labelSize': labelSize }">{{subheadings}}</h1>
    <el-table
      class="box-table"
      ref="adultTable"
      :data="subheadings=='成人银库'?adultTable:childTable"
      height="87%"
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
    <!-- <h2 :style="{ '--labelSize': labelSize }">{{ child }}</h2> -->
    <!-- <el-table
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
import { text } from 'express';
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
      //
      subheadings:'成人银库'
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
    this.timer = setInterval(() => {
      this.getList();
    }, 300000);
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
    // 切换按钮
    toggleButton() {
      if (this.subheadings=='成人银库') {
        this.subheadings='儿科银库'
      } else {
        this.subheadings='成人银库'
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
  width: 100%;
  height: 98%;
  position: relative;
  .box-table {
    width: 98%;
    margin-left: 1%;
    font-size: var(--fontSize) !important;
  }
  .el-button {
    position: absolute;
    right: 1%;
    top: 50%;
    z-index: 99;
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
