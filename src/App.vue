<template>
<div id="app">
    <div>
      <router-view/>
    </div>
</div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
* {
  padding: 0 0;
  margin:0 0;
}
.menu{
  float: left;
}
.menu ul li{
  float:left;
  list-style: none;
  margin:20px;
}
.menu ul li a{
  font-size:20px;
  color:white;
  text-decoration: none;
}
.login{
  float: right;
}
.header{
    background:#CCCFFF;
    width:100%;
    height:90px;
  }
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
