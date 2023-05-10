<template>
  <div class="box-containers">
    <div class="box-middle">
      <div class="box-title" :style="{ '--titleSize': titleSize }">
        {{ title }}
      </div>

      <div class="content">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Box",
  props: {
    title: {
      type: String,
      default: ""
    },
    titleSize: {
      type: String,
      default: ""
    }
  },
  watch: {
    titleSize(newVal, oldVal) {
      this.titleSize = newVal;
    }
  }
};
</script>

<style lang="less" scoped>
.box-containers {
  width: 100%;
  position: relative;
  background: url("../../assets/images/pageOne.png") no-repeat;
  background-size: 100% 100%;
  .box-middle {
    width: 100%;
    height: 100%;
    .box-title {
      position: absolute;
      top: 3%;
      left: 3%;
      height: 30px;
      line-height: 30px;
      color: #a4bb3e;
      font-weight: bold;
      display: flex;
      font-size: var(--titleSize) !important;
    }
    .content {
      height: calc(100% - 10px);
      padding-top: 5%;
    }
  }
}
</style>
