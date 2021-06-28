<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  color: rgb(255, 255, 255);
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
body {
  font-size: 16px;
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

html {
  background-color: rgba(20, 20, 20);
}

.vm--modal {
  background-color: black !important;
}
</style>
