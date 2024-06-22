<template>
  <div class="flex flex-column full-screen" style="width: 98%;
    height: 100%">
    <div class="header flex">
      <topBox />
    </div>
    <div class="about flex flex1">
      <!-- <img src="../../assets/banner.png" alt="" srcset="" style="height: 1600px;"> -->
      <div class="flex1">
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">取箱次数</div>
          <ghyBar />
        </dv-border-box-12>
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">存箱次数</div>
          <ghyBar :color="['#62b2e6', '#57ed51', '#c3d894']" />
         
        </dv-border-box-12>
        <dv-border-box-12 class="bar-list"  backgroundColor="#0f245d">
          <div class="border-box-title">异常次数</div>
          <ghyBar :color="['#62b2e6', '#f76a68', '#c3d894']" />
        </dv-border-box-12>
      </div>
      <div class="middle-content flex flex-column">
        <div class="top flex">
          <div class="detail-list-container">
            <div class="detail-list-box detail-list-box-left">
              <p class="title">取箱业务量/人次</p>
              <ul>
                <li class="flex">
                  <p>今日取箱量</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年同期</p>
                  <p>14,56</p>
                </li>
              </ul>
            </div>
            <div class="detail-list-box detail-list-box-left">
              <p class="title">取箱业务量/人次</p>
              <ul>
                <li class="flex">
                  <p>今日取箱量</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年同期</p>
                  <p>14,56</p>
                </li>
              </ul>
            </div>

          </div>
          <div class="detail-list-container">
            <div class="detail-list-box detail-list-box-right">
              <p class="title">取箱业务量/人次</p>
              <ul>
                <li class="flex">
                  <p>今日取箱量</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年同期</p>
                  <p>14,56</p>
                </li>
              </ul>
            </div>
            <div class="detail-list-box detail-list-box-right">
              <p class="title">取箱业务量/人次</p>
              <ul>
                <li class="flex">
                  <p>今日取箱量</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>月同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>季同期</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年累计</p>
                  <p>14,56</p>
                </li>
                <li class="flex">
                  <p>年同期</p>
                  <p>14,56</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="count-cail">
            <dv-decoration-9 style="width:100%;height:100%;" :dur="8">
              <div class="cool-ellipse">
                <div class="cool-ellipse-content">
                  <p class="title">08月22日收入</p>
                  <p class="money">14,56万元</p>
                  <p>68.98%</p>
                  <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
                  <p>总体执行率</p>
                </div>

              </div>
            </dv-decoration-9>


          </div>

        </div>
        <dv-decoration-10 style="width:100%;height:5px;margin: 0.1rem 0;" />
        <div class="flex">
          <div class="detail-message ">
            <dv-border-box-13>
              <div class="detail-message-content">
                <dv-decoration-12 class="animated-circle">
                  <div>
                    <img src="../../assets/icon1.png" alt="">
                  </div>
                </dv-decoration-12>
                <p class="title">门急诊均次收费/元</p>
                <ul>
                  <li class="flex">
                    <p>年累计</p>
                    <p>14,56</p>
                  </li>
                  <li class="flex">
                    <p>年同化</p>
                    <p>14,56</p>
                  </li>
                  <li class="flex">
                    <p>去除药耗</p>
                    <p>14,56</p>
                  </li>
                  <li class="flex">
                    <p>去药耗年同比</p>
                    <p>14,56</p>
                  </li>
                </ul>
              </div>
            </dv-border-box-13>
          </div>
          <div class="detail-message ">
            <dv-border-box-13>
              <div class="detail-message-content">
                <dv-decoration-12 class="animated-circle">
                  <div>
                    <img src="../../assets/icon2.png" alt="">
                  </div>
                </dv-decoration-12>
                <p class="title">门急诊均次收费/元</p>
                <ul>
                  <li class="flex">
                    <p>年累计</p>
                    <p>14,56</p>
                  </li>
                  <li class="flex">
                    <p>年同化</p>
                    <p>14,56</p>
                  </li>
                  <li class="flex">
                    <p>去除药耗</p>
                    <p>14,56</p>
                  </li>
                  <li class="flex">
                    <p>去药耗年同比</p>
                    <p>14,56</p>
                  </li>
                </ul>
              </div>
            </dv-border-box-13>
          </div>

        </div>
      </div>
      <div class="flex1">
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">门急诊缴款</div>
          <ghyBar />
        </dv-border-box-12>
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">出入院缴款</div>
          <ghyBar :color="['#62b2e6', '#57ed51', '#c3d894']" />
        </dv-border-box-12>
        <dv-border-box-12 title="div" class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">轧账管理</div>
          <ghyBar :color="['#62b2e6', '#f76a68', '#c3d894']" />
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
import topBox from '../Home/pageTwo/topBox.vue'
import ghyBar from './components/ghyBar.vue';
import scheduleBar from './components/scheduleBar.vue';
export default {
  name: 'About',
  components: {
    ghyBar,
    topBox,
    scheduleBar
  },
  created() {
    console.log('About created')
  },
  destroyed() {
    console.log('About destroyed')
  },
}
</script>

<style  scoped lang="less">
.flex {
  display: flex;
}

.flex-column {
  flex-direction: column;
}

.flex1 {
  flex: 1;
  height: 100%;
}

.full-screen {
  background-color: #071846;
  margin: 0 auto;
}

.content-color {
  background: #0f245d;
}

.header {
  height: 100px;
}

.middle-content {
  width: 48%;
  padding: 0.2rem 0.1rem;
}

.bar-list-box {
  border-radius: 0.2rem;
  border: 0.04rem solid #3171bf;
  position: relative;
}

.bar-list {
  height: 27%;
  margin-top: 0.2rem;
  position: relative;

  .border-box-title {
    position: absolute;
    width: 45%;
    height: 0.3rem;
    text-align: center;
    line-height: 0.3rem;
    color: #26e4f0;
    background-color: #0f245d;
    box-shadow: inset 0 0 50px rgba(33, 235, 255, 0.5);
    font-size: 0.12rem;
    left: 50%;
    top: -0.07rem;
    transform: translateX(-50%);
    border: 1px solid #21ebff;

  }
}

.top {
  justify-content: space-between;
  position: relative;
}



.detail-list-box {
  border: 1px solid #2b4286;

  margin-bottom: 0.1rem;
  box-shadow: 0 0 0.3rem rgba(100, 200, 255, 0.5) inset;
  position: relative;
}

.detail-list-box-left {
  padding: 0.1rem 0.3rem 0.1rem 0.1rem;
}

.detail-list-box-right {
  padding: 0.1rem 0.1rem 0.1rem 0.3rem;
}

.detail-list-container {
  width: 35%;

  .title {
    color: #f9fd49;
    font-size: 0.12rem;
    text-align: center;
    margin-bottom: 30px;
  }

  li {
    justify-content: space-between;
    line-height: 0.2rem;

    p {
      font-size: 0.08rem;
      color: #fff;
    }
  }
}

.detail-message {
  width: 50%;
  margin: 0 0.1rem;
}

.detail-message-content {
  height: 1rem;
  position: relative;
  padding: 0.2rem 0;

  .title {
    text-align: center;
    font-size: 0.12rem;
    color: #26e4f0;
    margin-bottom: 0.1rem;
  }

  ul {
    margin: 0.1rem 0;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    font-size: 0.085rem;
    line-height: 0.2rem;
    color: #fff;
    width: 50%;
    padding: 0 0.1rem;
    box-sizing: border-box;

    p:first-child {
      width: 0.55rem;
    }
  }

}

.count-cail {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  top: 10%;
  bottom: 10%;
  border-radius: 46%;
  background: #071846;

  &::before {}
}

.border-box-content {
  position: relative;
}

.animated-circle {
  width: 0.4rem;
  height: 0.4rem;
  position: absolute;
  top: -2%;
  left: -2%;
  background: #071846;

  // border-top-color: transparent;
  //animation: spin 2s linear infinite;
  div {
    height: 90%;
    width: 90%;
    border-radius: 50%;
    background: #071846;
    padding: 0.04rem;
  }

  img {
    width: 100%;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.cool-ellipse {
  width: 96%;
  height: 96%;
  border-radius: 50%;
  /* background: radial-gradient(circle at 50% 50%, rgba(255, 0, 150, 0.7), rgba(0, 0, 255, 0.7)); */
  box-shadow: 0 0 0.15625rem rgba(0, 0, 0, 0.5), 0 0 0.104167rem #21ebff, 0 0 0.208333rem rgba(0, 0, 255, 0.7);
  //animation: rotate-data-v-bc8bb8f4 12s linear infinite, pulse-data-v-bc8bb8f4 6s ease-in-out infinite;
  position: relative;
  background: #071846;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: ' ';
    width: 96%;
    height: 96%;
    border-radius: 50%;
    position: absolute;
    box-shadow: inset 0 0 50px rgba(33, 235, 255, 0.5);
  }

  .cool-ellipse-content {
    width: 60%;
  }

  p {
    color: #fff;
    font-size: 0.15rem;
    text-align: center;
    font-weight: 500;
    line-height: 0.3rem;
  }

  .money {
    color: #f9fd49;
    font-weight: 500;
    font-size: 0.2rem;
    line-height: 0.3rem;
    margin-top: 0.1rem;
  }

  .title {}

}

// .cool-ellipse::before {
//   content: '';
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   width: 99%;
//   height: 99%;
//   background: rgba(255, 255, 255, 0.2);
//   border-radius: 50%;
//   transform: translate(-50%, -50%);
//   filter: blur(10px);
// }

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}
</style>