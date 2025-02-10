<template>
  <div class="home-container">
    <el-carousel class="container-carousel-main" arrow="never" ref="cardShow" :interval="20000" @change="change"
      :autoplay="true">
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
            <One-LeftOne :title="'人 员 信 息'" :fontSize="fontSize" :titleSize="titleSize" />
          </div>
        </div>
      </el-carousel-item>

      <el-carousel-item class="container-carousel-item">
        <div class="pageOne">
          <One-Toptit ref="Toptit"></One-Toptit>
          <div class="box-wrapper">
            <div class="box-left">
              <One-LeftTwo :title="'银 箱 管 理'" :fontSize="fontSize" :titleSize="titleSize" :labelSize="labelSize" />
              <One-RightOne :title="'系 统 消 息'" :fontSize="fontSize" :titleSize="titleSize" />
            </div>
            <div class="box-right">
              <One-RightTwo :title="'公 共 通 知'" :fontSize="fontSize" :titleSize="titleSize" />
            </div>
          </div>
        </div>
      </el-carousel-item>

      <el-carousel-item class="container-carousel-item">
        <div class="pageThree">
          <One-Toptit ref="Toptit"></One-Toptit>
          <div class="box-wrapper"> <!-- 增加这个容器 -->
            <fullScreen v-if="changeIndex === 2" />
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import fullScreen from "../About/index.vue"

export default {
  name: "Home",
  components: {
    fullScreen,
    OneToptit: () => import("./pageOne/topBox"),
    OneLeftOne: () => import("./pageOne/leftOne"),
    OneLeftTwo: () => import("./pageOne/leftTwo"),
    OneRightOne: () => import("./pageOne/rightOne"),
    OneRightTwo: () => import("./pageOne/rightTwo"),
  },
  data() {
    return {
      year: null,
      changeIndex: 1,
      fontSize: "17px",
      titleSize: "22px",
      labelSize: "20px",
      isFullScreen: false
    };
  },
  mounted() {
    const date = new Date();
    this.year = date.getFullYear();

    this.checkFullscreen();
    this.adjustLayout();
    window.addEventListener('resize', this.onResize);
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  },
  methods: {
    onResize() {
      this.checkFullscreen();
      this.adjustLayout();
    },
    checkFullscreen() {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      this.isFullScreen = screen.height == clientHeight;
      this.updateFontSizes();
    },
    updateFontSizes() {
      if (this.isFullScreen) {
        this.fontSize = "18px";
        this.titleSize = "28px";
        this.labelSize = "25px";
      } else {
        this.fontSize = "15px";
        this.titleSize = "22px";
        this.labelSize = "20px";
      }
    },
    adjustLayout() {
      const aspectRatio = window.innerWidth / window.innerHeight;
      if (aspectRatio != 16 / 10) {
        // 宽屏设备
        console.log("电视" +aspectRatio);
        //this.fontSize = (parseInt(this.fontSize) - 1) + "px";
        //this.titleSize = (parseInt(this.titleSize) - 1) + "px";
        //this.labelSize = (parseInt(this.labelSize) - 1) + "px";
      }
      else {
        console.log("电脑显示屏"+aspectRatio);

      }
    },
    onFullscreenChange() {
      this.checkFullscreen();
      this.restartAutoplay();
    },
    restartAutoplay() {
      if (this.$refs.cardShow) {
        this.$refs.cardShow.pause();
        this.$refs.cardShow.play();
      }
    },
    change(v) {
      this.changeIndex = v;
      console.log(v);
    },
    arrowClick(val) {
      if (val === "next") {
        this.$refs.cardShow.next();
      } else {
        this.$refs.cardShow.prev();
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.container-carousel-main {
  width: 100%;
  height: 100%;
  position: relative;

  .prev,
  .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
    cursor: pointer;

    img {
      width: 40px;
      height: 40px;
    }
  }

  .prev {
    left: 10px;
  }

  .next {
    right: 10px;
  }

  .container-carousel-item {
    height: 100%;
    background-color: #010e3b;

    .pageThree,
    .pageOne {
      height: 100%;
      display: flex;
      flex-direction: column;

      .box-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
    }

    .pageOne {
      .box-wrapper {
        .box-left {
          display: flex;
          width: 100%;
          flex: 3;
        }

        .box-right {
          width: 100%;
          flex: 2;
        }
      }
    }
  }
}

/deep/ .el-carousel__container {
  height: 100% !important;
}

.el-button {
  position: relative;
  padding: 10px 30px;
  color: #21ebff;
  text-decoration: none;
  font-size: 30px;
  text-transform: uppercase;
  transition: 0.5s;
  overflow: hidden;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0003);
  background-color: transparent;

  &:hover {
    background: #21ebff;
    color: #111;
    box-shadow: 0 0 50px #21ebff;
    transition-delay: 0.2s;
  }

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    transition: 0.5s;
    transition-delay: 0.5s;
  }

  &::before {
    top: 0;
    left: 0;
    border-top: 2px solid #21ebff;
    border-left: 2px solid #21ebff;
  }

  &::after {
    right: 0;
    bottom: 0;
    border-bottom: 2px solid #21ebff;
    border-right: 2px solid #21ebff;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
    transition-delay: 0s;
  }
}
</style>