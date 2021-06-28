<template>
  <header class="header">
    <router-link to="/" class="header-ttl neon">
      <span class="header-ttl-color neon2">C</span>inemary
    </router-link>
    <ul class="header-menu">
      <li>
        <router-link to="/" class="header-link neon3 flash">HOME</router-link>
      </li>
      <li>
        <router-link to="/about" class="header-link neon3 flash">ABOUT</router-link>
      </li>
      <li>
        <router-link
          :to="`/board/${this.uid}`"
          class="header-link neon3 flash"
          v-if="authenticatedUser"
        >POST</router-link>
        <router-link to="/board" class="header-link neon3 flash" v-if="!authenticatedUser">POST</router-link>
      </li>
      <li>
        <router-link to="/signup" class="header-link neon3 flash" v-if="!authenticatedUser">SINGUP</router-link>
      </li>
      <li>
        <router-link to="/signin" class="header-link neon3 flash" v-if="!authenticatedUser">SINGIN</router-link>
      </li>
      <li>
        <router-link
          :to="`/mypage/${this.uid}`"
          class="header-link neon3 flash"
          v-if="authenticatedUser"
        >MYPAGE</router-link>
        <router-link
          to="/mypage"
          class="hamburger-link neon3 flash"
          v-if="!authenticatedUser"
        >MYPAGE</router-link>
      </li>
      <li v-if="authenticatedUser">
        <button class="header-link neon3 flash" @click="signOut" v-if="authenticatedUser">SINGOUT</button>
      </li>
    </ul>
    <!-- スマホ用ハンバーガーメニュー -->
    <slide right disableOutsideClick width="200" class="hamburger-menu">
      <router-link to="/" class="hamburger-link neon3 flash home-link">HOME</router-link>
      <router-link to="/about" class="hamburger-link neon3 flash">ABOUT</router-link>
      <router-link
        :to="`/board/${this.uid}`"
        class="hamburger-link neon3 flash"
        v-if="authenticatedUser"
      >POST</router-link>
      <router-link to="/board" class="hamburger-link neon3 flash" v-if="!authenticatedUser">POST</router-link>

      <router-link to="/signup" class="hamburger-link neon3 flash" v-if="!authenticatedUser">SINGUP</router-link>
      <router-link to="/signin" class="hamburger-link neon3 flash" v-if="!authenticatedUser">SINGIN</router-link>
      <router-link
        :to="`/mypage/${this.uid}`"
        class="hamburger-link neon3 flash"
        v-if="authenticatedUser"
      >MYPAGE</router-link>
      <router-link to="/mypage" class="hamburger-link neon3 flash" v-if="!authenticatedUser">MYPAGE</router-link>
      <button class="hamburger-link neon3 flash" @click="signOut" v-if="authenticatedUser">SINGOUT</button>
    </slide>
  </header>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import { Slide } from "vue-burger-menu";
Vue.component("slide", Slide);

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: "",
      uid: null
    };
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/signin");
        })
        .catch(() => {
          this.$swal("ログアウト出来ませんでした。", {
            icon: "error"
          });
        });
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authenticatedUser = true;

        const currentUser = firebase.auth().currentUser;
        this.uid = currentUser.uid;
      } else {
        this.authenticatedUser = false;
      }
    });
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");
// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- ヘッダー -- //

.home-link {
  padding-right: 1rem;
}

.header {
  position: sticky;
  top: 0;
  background-color: $black-color;
  padding: 1rem 3rem;
  z-index: 999;
  display: flex;
  align-items: center;
  &-ttl {
    color: #fff;
    font-size: 2.5rem;
    font-weight: bold;
    text-decoration: none;
    background-color: transparent;
    border: none;
    outline: none;
    font-family: "Roboto", sans-serif;
    font-style: italic;
    &-color {
      color: rgb(0, 0, 0);
      font-size: 3rem;
    }
  }
  &-menu {
    display: flex;
    margin-left: auto;
  }
  &-link {
    color: #fff;
    text-decoration: none;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    cursor: hand;
    margin-left: 3rem;
    font-family: "Roboto", sans-serif;
    font-style: italic;
    &:not(:first-child) {
      margin-left: 2rem;
    }
    &:hover {
      color: rgba(0, 255, 0, 0.5);
    }
  }
}

.hamburger-link {
  color: $white-color;
  text-decoration: none;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  cursor: hand;
  margin-left: 3rem;
  font-family: "Roboto", sans-serif;
  font-style: italic;
}

a.header-ttl:hover,
a.header-ttl:hover span {
  color: rgba(200, 200, 200, 0.6);
}

// -- ネオンカラー -- //

.neon {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1px rgb(255, 255, 255);
  text-shadow: 0 0 10px rgb(255, 255, 255), 0 0 15px rgb(150, 150, 150);
}

.neon2 {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1px rgb(180, 180, 180);
  text-shadow: 0 0 10px rgb(50, 50, 50), 0 0 15px rgb(50, 50, 50);
}

.neon3 {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 0.5px #0f0;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 15px rgba(0, 255, 0, 0.5);
}

.flash {
  animation: flash-anime 5s linear infinite;
}
@keyframes flash-anime {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  51% {
    opacity: 0.3;
  }
  52% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  76% {
    opacity: 0.6;
  }
  77% {
    opacity: 1;
  }
  78% {
    opacity: 0.3;
  }
  79% {
    opacity: 1;
  }
}

// -- メディアクエリ -- //

$breakpoint-xl: 1025px;
$breakpoint-lg: 1024px;
$breakpoint-md: 600px;
$breakpoint-sm: 400px;

@mixin xl {
  @media (min-width: ($breakpoint-xl)) {
    @content;
  }
}
@mixin lg {
  @media (max-width: ($breakpoint-lg)) {
    @content;
  }
}
@mixin md {
  @media (max-width: ($breakpoint-md)) {
    @content;
  }
}
@mixin sm {
  @media (max-width: ($breakpoint-sm)) {
    @content;
  }
}

.header {
  @include sm {
    padding: 1rem 2rem;
  }
}

.header-ttl {
  @include sm {
    font-size: 2rem;
  }
}

.header-ttl-color {
  @include sm {
    font-size: 2.5rem;
  }
}

.header-menu {
  @include lg {
    display: none;
  }
  @include md {
    display: none;
  }
}

.hamburger-menu {
  @include xl {
    display: none;
  }
  @include lg {
    display: flex;
  }
  @include md {
    display: flex;
  }
  @include sm {
    display: flex;
  }
}
</style>
