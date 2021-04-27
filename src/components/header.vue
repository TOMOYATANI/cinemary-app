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
        <router-link to="/board" class="header-link neon3 flash">POST</router-link>
      </li>
      <li>
        <router-link to="/signup" class="header-link neon3 flash" v-if="!authenticatedUser">SINGUP</router-link>
      </li>
      <li>
        <router-link to="/signin" class="header-link neon3 flash" v-if="!authenticatedUser">SINGIN</router-link>
      </li>
      <li>
        <router-link :to="`/mypage/${this.$route.params.uid}`" class="header-link neon3 flash">MYPAGE</router-link>
      </li>
      <li v-if="authenticatedUser">
        <button class="header-link neon3 flash" @click="signOut" v-if="authenticatedUser">SINGOUT</button>
      </li>
    </ul>
  </header>
</template>

<script>
import firebase from "firebase";
import ClickOutside from "vue-click-outside";

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: "",
      isOpen: false
    };
  },
  props: {
    //親コンポーネントから子コンポーネントに文字列、数値、配列やオブジェクトなどの値を渡す
    profile: {
      type: Object,
      //list内にObject型で格納されてる
    },
    index: {
      type: Number,
      //index内にNumber型で格納されてる
    },
  },
  methods: {
    //ログアウトを実装
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          // alert("ログアウトしました。");
          this.$router.push("/signin");
        })
        .catch(() => {
          // alert("ログアウトができません。");
        });
    },
    toggle() {
      this.isOpen = !this.isOpen;
      //「!」を先頭につける事で真偽が逆。
    },
    clickoutside() {
      //this.isOpenがtrue場合、this.toggleは何も起きない。
      //要するにドロップダウンメニューが開かれている時は、クリックしても何も起きない。
      if (this.isOpen) {
        this.toggle();
      }
    }
  },
  mounted() {
    //以下、ユーザーが認証済みであれば「ログアウト」を表示
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authenticatedUser = true;
      } else {
        this.authenticatedUser = false;
      }
    });
    this.popupItem = this.$el;
  },
  //directivesオプションを使用することにより、ローカルディレクティブに登録されるため、機能を使える
  directives: {
    ClickOutside
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
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
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


.isOpen {
  display: block;
}

a.header-ttl:hover,
a.header-ttl:hover span {
  color: rgba(200, 200, 200, 0.600);
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
</style>
