//滚动方法定义
let scrollInterval;
const tableScroll = function(table) {
  const scrollTable = table;
  // 拿到表格中承载数据的元素
  const divData = scrollTable.bodyWrapper;
  // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
  scrollInterval = setInterval(() => {
    // 元素自增距离顶部1像素
    divData.scrollTop += 1;
    // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
    if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
      // 重置table距离顶部距离
      divData.scrollTop = 0;
    }
  }, 30); // 滚动速度
};

// 停止滚动
const stopScroll = function() {
  clearInterval(scrollInterval);
};

export default { tableScroll, stopScroll };
