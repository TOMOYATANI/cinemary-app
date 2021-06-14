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
        <router-link :to="`/board/${this.uid}`" class="header-link neon3 flash">POST</router-link>
      </li>
      <li>
        <router-link to="/signup" class="header-link neon3 flash" v-if="!authenticatedUser">SINGUP</router-link>
      </li>
      <li>
        <router-link to="/signin" class="header-link neon3 flash" v-if="!authenticatedUser">SINGIN</router-link>
      </li>
      <li>
        <router-link :to="`/mypage/${this.uid}`" class="header-link neon3 flash">MYPAGE</router-link>
      </li>
      <li v-if="authenticatedUser">
        <button class="header-link neon3 flash" @click="signOut" v-if="authenticatedUser">SINGOUT</button>
      </li>
    </ul>
    <!-- スマホ用ハンバーガーメニュー -->
    <slide right disableOutsideClick width="200" class="hamburger-menu">
      <router-link to="/" class="hamburger-link neon3 flash home-link">HOME</router-link>
      <router-link to="/about" class="hamburger-link neon3 flash">ABOUT</router-link>
      <router-link :to="`/board/${this.uid}`" class="hamburger-link neon3 flash">POST</router-link>
      <router-link to="/signup" class="hamburger-link neon3 flash" v-if="!authenticatedUser">SINGUP</router-link>
      <router-link to="/signin" class="hamburger-link neon3 flash" v-if="!authenticatedUser">SINGIN</router-link>
      <router-link :to="`/mypage/${this.uid}`" class="hamburger-link neon3 flash">MYPAGE</router-link>
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
      uid: []
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
      } else {
        this.authenticatedUser = false;
      }

      const currentUser = firebase.auth().currentUser;
      this.uid = currentUser.uid;
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

$breakpoint-tablet: 1024px;
$breakpoint-mobile: 600px;

@mixin pc {
  @media (min-width: ($breakpoint-tablet)) {
    @content;
  }
}
@mixin tab {
  @media (max-width: ($breakpoint-tablet)) {
    @content;
  }
}
@mixin sp {
  @media (max-width: ($breakpoint-mobile)) {
    @content;
  }
}

.header-menu {
  @include sp {
    display: none;
  }
}

.hamburger-menu {
  @include pc {
    display: none;
  }
  @include tab {
    display: none;
  }
  @include sp {
    display: flex;
  }
}
</style>
