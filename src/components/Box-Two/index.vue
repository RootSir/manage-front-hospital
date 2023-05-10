<template>
  <div class="box-containers">
    <div class="box-middle">
      <div class="box-title">
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
  name: "Boxplus",
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>

<style lang="less" scoped>
.box-containers {
  width: 100%;
  position: relative;
  background: url("../../assets/images/box5.png") no-repeat;
  background-size: 100% 100%;
  .box-middle {
    width: 100%;
    height: 100%;
    .box-title {
      position: absolute;
      top: 2%;
      left: 1%;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      color: #a4bb3e;
      font-weight: bold;
      display: flex;
    }

    .content {
      height: calc(100% - 10px);
      padding-top: 5%;
    }
  }
}
</style>
