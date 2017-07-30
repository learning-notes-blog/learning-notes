<template>
  <div id="app">
    <myheader></myheader>
    <router-view></router-view>
  </div>
</template>

<script>
import Myheader from './components/header'
export default {
  name: 'app',
  components:{
    Myheader
  }
}
</script>

<style>
#app {
    margin:0;
    padding:0;
}
</style>
