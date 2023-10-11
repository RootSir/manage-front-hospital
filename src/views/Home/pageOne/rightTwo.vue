<template>
  <Box class="box-container" :title="title" :titleSize="titleSize">
    <div class="TopCard">
      <!-- 小喇叭 -->
      <!-- <i class="el-icon-s-opportunity" style="color:#606266" />
      <span class="tips">告警提示：</span> -->
      <!-- 滚动文字外层div，文字能展示的区域-->
      <div class="noticeBox">
        <!-- 滚动div，marginLeft变化-->
        <div :style="'margin-left:' + marginLeft + 'px;white-space:nowrap'">
          <span class="showNotice">{{ showNotice }}</span>
          <!-- 不会展示，用来测量第二条与第一条重合时的长度 -->
          <span class="notice">{{ notice }}</span>
        </div>
      </div>
    </div>
  </Box>
</template>

<script>
export default {
  name: "rightTwo",
  props: ["title", "titleSize"],
  data() {
    return {
      timer: null,
      //
      tableData: [],

      // 公告展示（过长时会重复两遍）
      showNotice: "",
      // 用于公告过长时，获取重复两遍中第一遍的长度
      notice: "",
      // 公告初始位置
      marginLeft: window.screen.width,
      //
      count: 0
    };
  },
  watch: {},
  created() {
    this.getList();
  },
  mounted() {
    this.generateTimer();
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
    /*  */
    startScroll() {
      // this.tableData = ["这是一条公告信息", "公告二"];
      this.tableData.forEach((val, index) => {
        if (index === 0) {
          this.showNotice += "【" + val.number + "】" + val.msgText;
        } else {
          this.showNotice +=
            "\xa0\xa0\xa0\xa0\xa0\xa0【" + val.number + "】" + val.msgText;
        }
      });
      console.log(this.tableData);
      // 公告上面先赋值，再获取宽度
      setTimeout(() => {
        // 公告div长度
        // var oneNoticeWidth = document.getElementsByClassName("showNotice")[0]
        //   .offsetWidth;
        // // 公告外层div长度
        // var noticeBoxWidth = document.getElementsByClassName("noticeBox")[0]
        //   .offsetWidth;
        // 一条公告长度太大时，才滚动
        // if (oneNoticeWidth > noticeBoxWidth) {
        // 滚动公告需要将公告重复两遍进行滚动，两遍中间需要加空格
        this.notice =
          this.showNotice +
          "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0";
        // 上面先赋值，再获取宽度
        setTimeout(() => {
          // 获取一遍加中间空格的长度，即左移时第二遍与第一遍完全重合时的长度
          var oneNoticeAddEmptyWidth = document.getElementsByClassName(
            "notice"
          )[0].offsetWidth;
          // 公告内容重复两遍
          this.showNotice = this.notice + this.showNotice;
          this.timer = setInterval(() => {
            this.marginLeft -= 1;
            // 第二遍与第一遍起始位置重合时（第一条已完全移到左侧隐藏），marginLeft置0，即回到第一条
            if (this.marginLeft === -1 * oneNoticeAddEmptyWidth) {
              this.marginLeft = 0;
            }
          }, 20);
        }, 20);
        // } else {
        //   //公告并没有很长时不滚动
        //   this.marginLeft = 0;
        // }
      }, 10);
    },
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
          this.startScroll();
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
  width: 99%;
  height: 100%;
  margin-top: 1%;
  margin-left: 0.5%;
}

.TopCard {
  width: 99%;
  animation: shine 1s infinite linear;
  overflow: hidden;
  font-weight: bold;
  margin-top: 1%;
  margin-left: 0.5%;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
}

/* 公告title */
// .tips {
//   color: #606266;
//   font-weight: bold;
// }

@keyframes shine {
  0% {
    background-position: -1px -1px;
  }
  100% {
    background-position: -12px -12px;
  }
}
</style>
