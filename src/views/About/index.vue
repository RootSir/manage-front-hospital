<template>
  <div class="flex flex-column full-screen" style="width: 98%; height: 100%">
    <div class="about flex flex1">
      <div class="flex1">
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">取箱次数</div>
          <ghyBar :operationType="2" :data="fetchBoxData1" />
        </dv-border-box-12>
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">存箱次数</div>
          <ghyBar :operationType="1" :data="fetchBoxData2" :color="['#62b2e6', '#57ed51', '#c3d894']" />
        </dv-border-box-12>
        <dv-border-box-12 class="bar-list"  backgroundColor="#0f245d">
          <div class="border-box-title">异常次数</div>
          <ghyBar :operationType="3" :data="fetchBoxData3" :color="['#62b2e6', '#f76a68', '#c3d894']" />
        </dv-border-box-12>
      </div>
      <div class="middle-content flex flex-column">
        <div class="top flex">
          <div class="detail-list-container">
            <div class="detail-list-box detail-list-box-left">
              <p class="title">取箱人次</p>
              <ul>
                <li class="flex"><p>今日取箱量</p><p>{{ singlefetchBoxData1.today }}</p></li>
                <li class="flex"><p>月累计</p><p>{{ singlefetchBoxData1.monthTotal }}</p></li>
                <li class="flex"><p>月同期</p><p>{{ singlefetchBoxData1.monthSamePeriod }}</p></li>
                <li class="flex"><p>季累计</p><p>{{ singlefetchBoxData1.quarterTotal }}</p></li>
                <li class="flex"><p>季同期</p><p>{{ singlefetchBoxData1.quarterSamePeriod }}</p></li>
                <li class="flex"><p>年累计</p><p>{{ singlefetchBoxData1.yearTotal }}</p></li>
                <li class="flex"><p>年同期</p><p>{{ singlefetchBoxData1.yearSamePeriod }}</p></li>
              </ul>
            </div>
            <div class="detail-list-box detail-list-box-left">
              <p class="title">存箱人次</p>
              <ul>
                <li class="flex"><p>今日存箱量</p><p>{{ singlefetchBoxData2.today }}</p></li>
                <li class="flex"><p>月累计</p><p>{{ singlefetchBoxData2.monthTotal }}</p></li>
                <li class="flex"><p>月同期</p><p>{{ singlefetchBoxData2.monthSamePeriod }}</p></li>
                <li class="flex"><p>季累计</p><p>{{ singlefetchBoxData2.quarterTotal }}</p></li>
                <li class="flex"><p>季同期</p><p>{{ singlefetchBoxData2.quarterSamePeriod }}</p></li>
                <li class="flex"><p>年累计</p><p>{{ singlefetchBoxData2.yearTotal }}</p></li>
                <li class="flex"><p>年同期</p><p>{{ singlefetchBoxData2.yearSamePeriod }}</p></li>
              </ul>
            </div>
          </div>
          <div class="detail-list-container">
            <div class="detail-list-box detail-list-box-right">
              <p class="title">门急诊缴款</p>
              <ul>
                <li class="flex"><p>今日缴费额</p><p>{{ singlefetchBoxData3.today }}</p></li>
                <li class="flex"><p>月累计</p><p>{{ singlefetchBoxData3.monthTotal }}</p></li>
                <li class="flex"><p>月同期</p><p>{{ singlefetchBoxData3.monthSamePeriod }}</p></li>
                <li class="flex"><p>季累计</p><p>{{ singlefetchBoxData3.quarterTotal }}</p></li>
                <li class="flex"><p>季同期</p><p>{{ singlefetchBoxData3.quarterSamePeriod }}</p></li>
                <li class="flex"><p>年累计</p><p>{{ singlefetchBoxData3.yearTotal }}</p></li>
                <li class="flex"><p>年同期</p><p>{{ singlefetchBoxData3.yearSamePeriod }}</p></li>
              </ul>
            </div>
            <div class="detail-list-box detail-list-box-right">
              <p class="title">出入院缴款</p>
              <ul>
                <li class="flex"><p>今日缴费额</p><p>{{ singlefetchBoxData4.today }}</p></li>
                <li class="flex"><p>月累计</p><p>{{ singlefetchBoxData4.monthTotal }}</p></li>
                <li class="flex"><p>月同期</p><p>{{ singlefetchBoxData4.monthSamePeriod }}</p></li>
                <li class="flex"><p>季累计</p><p>{{ singlefetchBoxData4.quarterTotal }}</p></li>
                <li class="flex"><p>季同期</p><p>{{ singlefetchBoxData4.quarterSamePeriod }}</p></li>
                <li class="flex"><p>年累计</p><p>{{ singlefetchBoxData4.yearTotal }}</p></li>
                <li class="flex"><p>年同期</p><p>{{ singlefetchBoxData4.yearSamePeriod }}</p></li>
              </ul>
            </div>
          </div>
          <div class="count-cail">
            <dv-decoration-9 style="width:100%;height:100%;" :dur="8">
              <div class="cool-ellipse">
                <div class="cool-ellipse-content">
                  <p class="title">{{ currentDate }}</p>
                  <div class="money-group">
                    <p class="money-item">今日收入：{{ singlefetchBoxData7.today || 0 }}元</p>
                    <p class="money-item">昨日收入：{{ singlefetchBoxData7.yesterday || 0 }}元</p>
                  </div>
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
                <p class="title">异常人次</p>
                <ul>
                  <li class="flex"><p>今日异常量</p><p>{{singlefetchBoxData5.today}}</p></li>
                  <li class="flex"><p>月累计</p><p>{{singlefetchBoxData5.monthTotal}}</p></li>
                  <li class="flex"><p>季累计</p><p>{{singlefetchBoxData5.quarterTotal}}</p></li>
                  <li class="flex"><p>年累计</p><p>{{singlefetchBoxData5.yearTotal}}</p></li>
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
                <p class="title">轧账金额</p>
                <ul>
                  <li class="flex"><p>今日金额</p><p>{{singlefetchBoxData6.today}}</p></li>
                  <li class="flex"><p>月累计</p><p>{{singlefetchBoxData6.monthTotal}}</p></li>
                  <li class="flex"><p>季累计</p><p>{{singlefetchBoxData6.quarterTotal}}</p></li>
                  <li class="flex"><p>年累计</p><p>{{singlefetchBoxData6.yearTotal}}</p></li>
                </ul>
              </div>
            </dv-border-box-13>
          </div>
        </div>
      </div>
      <div class="flex1">
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">门急诊缴款</div>
          <ghyBar :operationType="4" :data="fetchBoxData4" />
        </dv-border-box-12>
        <dv-border-box-12 class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">出入院缴款</div>
          <ghyBar :operationType="5" :data="fetchBoxData5" :color="['#62b2e6', '#57ed51', '#c3d894']" />
        </dv-border-box-12>
        <dv-border-box-12 title="div" class="bar-list" backgroundColor="#0f245d">
          <div class="border-box-title">轧账管理</div>
          <ghyBar :operationType="6" :data="fetchBoxData6" :color="['#62b2e6', '#f76a68', '#c3d894']" />
        </dv-border-box-12>
      </div>
    </div>
  </div>
</template>

<script>
import topBox from '../Home/pageOne/topBox.vue'
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
  data() {
    return {
      operationType: 1,
      fetchBoxData1: [],
      fetchBoxData2: [],
      fetchBoxData3: [],
      fetchBoxData4: [],
      fetchBoxData5: [],
      fetchBoxData6: [],
      currentDate: '',
      singlefetchBoxData1: { today: '', monthTotal: '', monthSamePeriod: '', quarterTotal: '', quarterSamePeriod: '', yearTotal: '', yearSamePeriod: '' },
      singlefetchBoxData2: { today: '', monthTotal: '', monthSamePeriod: '', quarterTotal: '', quarterSamePeriod: '', yearTotal: '', yearSamePeriod: '' },
      singlefetchBoxData3: { today: '', monthTotal: '', monthSamePeriod: '', quarterTotal: '', quarterSamePeriod: '', yearTotal: '', yearSamePeriod: '' },
      singlefetchBoxData4: { today: '', monthTotal: '', monthSamePeriod: '', quarterTotal: '', quarterSamePeriod: '', yearTotal: '', yearSamePeriod: '' },
      singlefetchBoxData5: { today: '', monthTotal: '', monthSamePeriod: '', quarterTotal: '', quarterSamePeriod: '', yearTotal: '', yearSamePeriod: '' },
      singlefetchBoxData6: { today: '', monthTotal: '', monthSamePeriod: '', quarterTotal: '', quarterSamePeriod: '', yearTotal: '', yearSamePeriod: '' },
      // 增加了 yesterday 字段用于显示昨日收入
      singlefetchBoxData7: {
        today: '',
        yesterday: '',
        monthTotal: '',
        monthSamePeriod: '',
        quarterTotal: '',
        quarterSamePeriod: '',
        yearTotal: '',
        yearSamePeriod: ''
      }
    }
  },
  methods: {
    getCurrentDate() {
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${month}月${day}日`;
    },
    async getFetchBoxData1() {
      this.$axios.post("/apis/visualizing/getDataLastSixMonths", { operationType: 1 })
        .then(rs => { if (rs.data.statusCode == "200") this.fetchBoxData1 = rs.data.result.monthlyDataList; }).catch(err => {});
    },
    async getFetchBoxData2() {
      this.$axios.post("/apis/visualizing/getDataLastSixMonths", { operationType: 2 })
        .then(rs => { if (rs.data.statusCode == "200") this.fetchBoxData2 = rs.data.result.monthlyDataList; }).catch(err => {});
    },
    async getFetchBoxData3() {
      this.$axios.post("/apis/visualizing/getDataLastSixMonths", { operationType: 3 })
        .then(rs => { if (rs.data.statusCode == "200") this.fetchBoxData3 = rs.data.result.monthlyDataList; }).catch(err => {});
    },
    async getFetchBoxData4() {
      this.$axios.post("/apis/visualizing/getDataLastSixMonths", { operationType: 4 })
        .then(rs => { if (rs.data.statusCode == "200") this.fetchBoxData4 = rs.data.result.monthlyDataList; }).catch(err => {});
    },
    async getFetchBoxData5() {
      this.$axios.post("/apis/visualizing/getDataLastSixMonths", { operationType: 5 })
        .then(rs => { if (rs.data.statusCode == "200") this.fetchBoxData5 = rs.data.result.monthlyDataList; }).catch(err => {});
    },
    async getFetchBoxData6() {
      this.$axios.post("/apis/visualizing/getDataLastSixMonths", { operationType: 6 })
        .then(rs => { if (rs.data.statusCode == "200") this.fetchBoxData6 = rs.data.result.monthlyDataList; }).catch(err => {});
    },
    async getSingleFetchBoxData1() {
      try {
        const response = await this.$axios.post("/apis/visualizing/getDataStatisticsSingle", { operationType: 1 });
        if (response.data.statusCode === 200) this.singlefetchBoxData1 = response.data.result;
      } catch (error) { console.error("Error fetching data:", error); }
    },
    async getSingleFetchBoxData2() {
      try {
        const response = await this.$axios.post("/apis/visualizing/getDataStatisticsSingle", { operationType: 2 });
        if (response.data.statusCode === 200) this.singlefetchBoxData2 = response.data.result;
      } catch (error) { console.error("Error fetching data:", error); }
    },
    async getSingleFetchBoxData3() {
      try {
        const response = await this.$axios.post("/apis/visualizing/getDataStatisticsSingle", { operationType: 3 });
        if (response.data.statusCode === 200) this.singlefetchBoxData3 = response.data.result;
      } catch (error) { console.error("Error fetching data:", error); }
    },
    async getSingleFetchBoxData4() {
      try {
        const response = await this.$axios.post("/apis/visualizing/getDataStatisticsSingle", { operationType: 4 });
        if (response.data.statusCode === 200) this.singlefetchBoxData4 = response.data.result;
      } catch (error) { console.error("Error fetching data:", error); }
    },
    async getSingleFetchBoxData5() {
      try {
        const response = await this.$axios.post("/apis/visualizing/getDataStatisticsSingle", { operationType: 5 });
        if (response.data.statusCode === 200) this.singlefetchBoxData5 = response.data.result;
      } catch (error) { console.error("Error fetching data:", error); }
    },
    async getSingleFetchBoxData6() {
      try {
        const response = await this.$axios.post("/apis/visualizing/getDataStatisticsSingle", { operationType: 6 });
        if (response.data.statusCode === 200) this.singlefetchBoxData6 = response.data.result;
      } catch (error) { console.error("Error fetching data:", error); }
    },
    async getSingleFetchBoxData7() {
      try {
        const response = await this.$axios.post("/apis/visualizing/getDataStatisticsSingle", { operationType: 7 });
        if (response.data.statusCode === 200) this.singlefetchBoxData7 = response.data.result;
      } catch (error) { console.error("Error fetching data:", error); }
    },
    startDataFetching() {
      console.log("startDataFetching:");
      this.currentDate = this.getCurrentDate();
      
      this.getSingleFetchBoxData1();
      this.getSingleFetchBoxData2();
      this.getSingleFetchBoxData3();
      this.getSingleFetchBoxData4();
      this.getSingleFetchBoxData5();
      this.getSingleFetchBoxData6();
      this.getSingleFetchBoxData7();

      this.getFetchBoxData1();
      this.getFetchBoxData2();
      this.getFetchBoxData3();
      this.getFetchBoxData4();
      this.getFetchBoxData5();
      this.getFetchBoxData6();

      setInterval(this.getFetchBoxData1, 300000);
      setInterval(this.getFetchBoxData2, 300000);
      setInterval(this.getFetchBoxData3, 300000);
      setInterval(this.getFetchBoxData4, 300000);
      setInterval(this.getFetchBoxData5, 300000);
      setInterval(this.getFetchBoxData6, 300000);

      setInterval(this.getSingleFetchBoxData1, 300000);
      setInterval(this.getSingleFetchBoxData2, 300000);
      setInterval(this.getSingleFetchBoxData3, 300000);
      setInterval(this.getSingleFetchBoxData4, 300000);
      setInterval(this.getSingleFetchBoxData5, 300000);
      setInterval(this.getSingleFetchBoxData6, 300000);
      setInterval(this.getSingleFetchBoxData7, 300000);
    },
  },
  mounted() {
    this.startDataFetching();
  },
  beforeDestroy() {
    // Note: The original code passed method references instead of interval IDs to clearInterval, 
    // which won't actually clear them, but kept unchanged to avoid unrelated logic modifications.
    clearInterval(this.getFetchBoxData1);
    clearInterval(this.getFetchBoxData2);
    clearInterval(this.getFetchBoxData3);
    clearInterval(this.getFetchBoxData4);
    clearInterval(this.getFetchBoxData5);
    clearInterval(this.getFetchBoxData6);
  }
}
</script>

<style scoped lang="less">
/* 省略了与原本完全一致的样式代码，直接复用原文件即可 */
.flex { display: flex; }
.flex-column { flex-direction: column; }
.flex1 { flex: 1; height: 100%; }
.full-screen { background-color: #071846; margin: 0 auto; }
.content-color { background: #0f245d; }
.header { height: 100px; }
.middle-content { width: 48%; padding: 0.2rem 0.1rem; }
.bar-list-box { border-radius: 0.2rem; border: 0.04rem solid #3171bf; position: relative; }
.bar-list {
  height: 27%; margin-top: 0.2rem; position: relative;
  .border-box-title {
    position: absolute; width: 45%; height: 0.3rem; text-align: center; line-height: 0.3rem;
    color: #26e4f0; background-color: #0f245d; box-shadow: inset 0 0 50px rgba(33, 235, 255, 0.5);
    font-size: 0.12rem; left: 50%; top: -0.07rem; transform: translateX(-50%); border: 1px solid #21ebff;
  }
}
.top { justify-content: space-between; position: relative; }
.detail-list-box {
  border: 1px solid #2b4286; margin-bottom: 0.1rem;
  box-shadow: 0 0 0.3rem rgba(100, 200, 255, 0.5) inset; position: relative;
}
.detail-list-box-left { padding: 0.1rem 0.3rem 0.1rem 0.1rem; }
.detail-list-box-right { padding: 0.1rem 0.1rem 0.1rem 0.3rem; }
.detail-list-container {
  width: 35%;
  .title { color: #f9fd49; font-size: 0.12rem; text-align: center; margin-bottom: 5px; }
  li { justify-content: space-between; line-height: 0.166rem; p { font-size: 0.08rem; color: #fff; } }
}
.detail-message { width: 50%; margin: 0 0.1rem; }
.detail-message-content {
  height: 1rem; position: relative; padding: 0.2rem 0;
  .title { text-align: center; font-size: 0.12rem; color: #26e4f0; margin-bottom: 0.1rem; }
  ul { margin: 0.1rem 0; display: flex; flex-wrap: wrap; }
  li {
    font-size: 0.085rem; line-height: 0.2rem; color: #fff; width: 50%; padding: 0 0.1rem; box-sizing: border-box;
    p:first-child { width: 0.55rem; }
  }
}
.count-cail {
  position: absolute; left: 50%; transform: translateX(-50%); width: 40%; top: 10%; bottom: 10%;
  border-radius: 46%; background: #071846;
}
.border-box-content { position: relative; }
.animated-circle {
  width: 0.4rem; height: 0.4rem; position: absolute; top: -2%; left: -2%; background: #071846;
  div { height: 90%; width: 90%; border-radius: 50%; background: #071846; padding: 0.04rem; }
  img { width: 100%; }
}
.cool-ellipse {
  width: 96%; height: 96%; border-radius: 50%;
  box-shadow: 0 0 0.15625rem rgba(0, 0, 0, 0.5), 0 0 0.104167rem #21ebff, 0 0 0.208333rem rgba(0, 0, 255, 0.7);
  position: relative; background: #071846; display: flex; align-items: center; justify-content: center;
  &::after {
    content: ' '; width: 96%; height: 96%; border-radius: 50%; position: absolute; box-shadow: inset 0 0 50px rgba(33, 235, 255, 0.5);
  }
  .cool-ellipse-content { width: 60%; }
  p { color: #fff; font-size: 0.15rem; text-align: center; font-weight: 500; line-height: 0.3rem; }
  .money-group { margin-top: 0.06rem; }
  .money-item { color: #f9fd49; font-weight: 500; font-size: 0.14rem; line-height: 0.24rem; }
}
</style>