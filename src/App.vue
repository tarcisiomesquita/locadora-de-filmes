<template>
  <div id="app" class="container">
    <router-view></router-view>
  </div>
</template>
 
<script>
export default {
  name: 'app',
  data() {
    return {}
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mensagem-estoque {
  font-weight: bold;
}

span.avaliacao-active {
  background-image: url('./assets/star-fill.jpg');
  background-repeat: no-repeat;
  background-position-y: 3px;
  background-position-x: 1px;
  background-size: 20px;
}
</style>
