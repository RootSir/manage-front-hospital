//滚动方法定义
const tableScroll = function(table) {
  const scrollTable = table;
  // 拿到表格中承载数据的元素
  const divData = scrollTable.bodyWrapper;
  // 拿到元素后，对元素进行定时增加距离顶部距离，实现滚动效果(此配置为每100毫秒移动1像素)
  setInterval(() => {
    // 元素自增距离顶部1像素
    divData.scrollTop += 1;
    // 判断元素是否滚动到底部(可视高度+距离顶部=整个高度)
    if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
      // 重置table距离顶部距离
      divData.scrollTop = 0;
    }
  }, 100); // 滚动速度
};

export default tableScroll;
