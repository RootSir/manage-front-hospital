<template>
  <BoxFour class="box-container" :title="title" :titleSize="titleSize">
    <span v-if="tableData[0]">{{ tableData[0].msgText }}</span>
  </BoxFour>
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
      //
      count: 0,
      classOption: {
        limitMoveNum: 2,
        direction: 2
      }
    };
  },
  watch: {},
  computed: {},
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
  width: 99%;
  height: 100%;
  margin-top: 1%;
  margin-left: 0.5%;
  overflow: hidden;
}

.box-container span {
  animation: scroll 25s linear infinite; /* 设置动画 */
  float: right;
  font-size: 25px;
  color: white;
}

@keyframes scroll {
  0% {
    transform: translateX(100%); /* 初始位置，将文本移动到容器最右侧 */
  }
  100% {
    transform: translateX(-550%); /* 结束位置，将文本移动到容器最左侧 */
  }
}
</style>
