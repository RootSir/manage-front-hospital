import Box from "@/components/Box";
import BoxTwo from "@/components/Box-Two";
import BoxThree from "@/components/Box-three";
import Box1 from "@/components/Box1";
import BoxFour from "@/components/Box-four";

import moment from "moment";
const echarts = require("echarts");
export default {
  install(Vue) {
    Vue.component("Box", Box);
    Vue.component("Box1", Box1);
    Vue.component("BoxTwo", BoxTwo);
    Vue.component("BoxThree", BoxThree);
    Vue.component("BoxFour", BoxFour);

    Vue.prototype.$echarts = echarts;
    Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD") {
      if (dataStr) {
        moment.locale("zh-cn");
        return moment(dataStr).format(pattern);
      } else {
        return dataStr;
      }
    });
  }
};
