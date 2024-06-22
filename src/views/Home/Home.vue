<template>
  <el-carousel
    class="container-carousel-main"
    arrow="never"
    ref="cardShow"
    :interval="60000"
    @change="change"
    :autoplay="false"
  >
    <div class="prev">
      <img src="../../assets/images/left.png" @click="arrowClick('prev')" />
    </div>
    <div class="next">
      <img src="../../assets/images/right.png" @click="arrowClick('next')" />
    </div>
    <el-carousel-item class="container-carousel-item">
      <div class="pageThree">
        <One-Toptit ref="Toptit"></One-Toptit>
        <div class="box-wrapper">
          <One-LeftOne
            :title="'人 员 信 息'"
            :fontSize="fontSize"
            :titleSize="titleSize"
          />
        </div>
      </div>
    </el-carousel-item>
    <el-carousel-item class="container-carousel-item">
      <div class="pageOne">
        <One-Toptit ref="Toptit"></One-Toptit>
        <div class="box-wrapper">
          <div class="box-left">
            <One-LeftTwo
              :title="'银 箱 管 理'"
              :fontSize="fontSize"
              :titleSize="titleSize"
              :labelSize="labelSize"
            />
            <One-RightOne
              :title="'系 统 消 息'"
              :fontSize="fontSize"
              :titleSize="titleSize"
            />
          </div>
          <div class="box-right">
            <One-RightTwo
              :title="'公 共 通 知'"
              :fontSize="fontSize"
              :titleSize="titleSize"
            />
          </div>
        </div>
      </div>
    </el-carousel-item>
    <el-carousel-item class="container-carousel-item">
      <div class="pageTwo">
        <Two-Toptit ref="Toptit"></Two-Toptit>
        <div class="box-wrapper">
          <div class="left-box">
            <Two-LeftOne :title="'异 常 情 况 次 数'" ref="leftone" />
            <Two-LeftTwo :title="'换 班 次 数'" ref="lefttwo" />
          </div>
          <div class="center-box">
            <div class="center-top">
              <el-button style="float:left" @click="handleClick(2, year)"
                >月</el-button
              >
              <el-button style="margin-left:34%" @click="handleClick(3, year)"
                >季</el-button
              >
              <el-button style="float:right" @click="handleClick(1, '')"
                >年</el-button
              >
            </div>

            <div class="center-main">
              <Two-CenterOne ref="centerone" />
            </div>
          </div>
          <div class="right-box">
            <Two-RightOne :title="'现 金 缴 款 金 额 汇 总'" ref="rightone" />
            <Two-RightTwo :title="'换 零 金 额 汇 总'" ref="righttwo" />
          </div>
        </div>
      </div>
    </el-carousel-item>
    <el-carousel-item class="container-carousel-item">
      <fullScreen v-if="changeIndex===3"/>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import fullScreen from "../About/index.vue"
export default {
  name: "Home",
  components: {
    /* 页面三 */
    fullScreen,
    /* 页面一 */
    OneToptit: () => import("./pageOne/topBox"),
    OneLeftOne: () => import("./pageOne/leftOne"),
    OneLeftTwo: () => import("./pageOne/leftTwo"),
    OneRightOne: () => import("./pageOne/rightOne"),
    OneRightTwo: () => import("./pageOne/rightTwo"),
    /* 页面二 */
    TwoToptit: () => import("./pageTwo/topBox"),
    TwoLeftOne: () => import("./pageTwo/leftOne"),
    TwoLeftTwo: () => import("./pageTwo/leftTwo"),

    TwoCenterOne: () => import("./pageTwo/centerOne"),

    TwoRightOne: () => import("./pageTwo/rightOne"),
    TwoRightTwo: () => import("./pageTwo/rightTwo")
  },
  data() {
    return {
      year: null,
      changeIndex:1,
      //
      fontSize: "17px",
      //
      titleSize: "22px",
      //
      labelSize: "20px"
    };
  },
  mounted() {
    const date = new Date();
    this.year = date.getFullYear();

    // 可视区域的高度
    const clientHeight =
      document.documentElement.clientHeight || document.body.clientHeight;
    // screen是window的属性方法，window.screen可省略window，指的是窗口
    this.isFullScreen = screen.height == clientHeight;
    /*  */
    window.onresize = () => {
      return (() => {
        // 可视区域的高度
        const clientHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        // screen是window的属性方法，window.screen可省略window，指的是窗口
        this.isFullScreen = screen.height == clientHeight;
        if (this.isFullScreen) {
          this.fontSize = "18px";
          this.titleSize = "28px";
          this.labelSize = "25px";
        } else {
          this.fontSize = "15px";
          this.titleSize = "22px";
          this.labelSize = "20px";
        }
      })();
    };
  },
  methods: {
    /*  */
    change(v){
      this.changeIndex=v
      console.log(v)
    },  
    handleClick(type, year) {
      this.$refs.leftone.getList(type, year);
      this.$refs.lefttwo.getList(type, year);
      this.$refs.centerone.getList(type, year);
      this.$refs.rightone.getList(type, year);
      this.$refs.righttwo.getList(type, year);
    },
    /*  */
    arrowClick(val) {
      if (val === "next") {
        this.$refs.cardShow.next();
      } else {
        this.$refs.cardShow.prev();
      }
    }
  },
  created() {},
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
.container-carousel-main {
  width: 100%;
  height: 100vh;
  .prev {
    position: absolute;
    left: 0;
    top: 140%;
    z-index: 99;
  }
  .next {
    position: absolute;
    right: 0;
    top: 140%;
    z-index: 99;
  }
  img {
    width: 40px;
    height: 40px;
  }
  .container-carousel-item {
    width: 100%;
    height: 100vh;
    background-color: #010e3b;
    .pageThree {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .box-wrapper {
        width: 100%;
        height: calc(100% - 100px);
      }
    }
    .pageOne {
      width: 100%;
      height: 100%;
      overflow: hidden;
      .box-wrapper {
        width: 100%;
        height: calc(100% - 100px);
        .box-left {
          display: flex;
          width: 100%;
          height: 65%;
        }
        .box-right {
          width: 100%;
          height: 30%;
        }
      }
    }
    .pageTwo {
      width: 100%;
      height: 100%;
      .box-wrapper {
        width: 100%;
        height: calc(100% - 100px);
        display: flex;
        .left-box {
          width: 28%;
          height: 100%;
          margin-left: 1%;
        }
        .center-box {
          width: 48%;
          height: 100%;
          margin: 0 1%;
          .center-top {
            width: 100%;
            height: 20%;
            margin-top: 6%;
          }
          .center-main {
            width: 100%;
            height: 80%;
          }
        }
        .right-box {
          width: 28%;
          height: 100%;
          margin-right: 1%;
        }
      }
    }
  }
}

::v-deep .el-button {
  background-color: transparent;
}
/* 按钮特效 */
.el-button {
  position: relative;
  padding: 10px 30px;
  // margin: 0 16.3%;
  color: #21ebff;
  text-decoration: none;
  font-size: 30px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
}

.el-button:hover {
  background: #21ebff;
  color: #111;
  box-shadow: 0 0 50px #21ebff;
  transition-delay: 0.2s;
}

.el-button::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-top: 2px solid #21ebff;
  border-left: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}

.el-button:hover::before {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}

.el-button::after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  width: 10px;
  height: 10px;
  border-bottom: 2px solid #21ebff;
  border-right: 2px solid #21ebff;
  transition: 0.5s;
  transition-delay: 0.5s;
}

.el-button:hover::after {
  width: 100%;
  height: 100%;
  transition-delay: 0s;
}
</style>
