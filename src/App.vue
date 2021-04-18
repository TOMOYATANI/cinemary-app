<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input[type="submit"],
input[type="button"] {
  border-radius: 0;
  -webkit-box-sizing: content-box;
  -webkit-appearance: button;
  appearance: button;
  border: none;
  box-sizing: border-box;
  &::-webkit-search-decoration {
    display: none;
  }
  &::focus {
    outline-offset: -2px;
  }
}
* {
  margin: 0;
  box-sizing: border-box;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

ul {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>
