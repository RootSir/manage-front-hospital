<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
div {
  box-sizing: border-box;
}
html,
body,
#app,
.full-page {
  height: 100vh;
  width: 100vw;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
div::-webkit-scrollbar {
  width: 0;
}
</style>
