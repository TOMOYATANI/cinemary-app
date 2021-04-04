<template>
  <header class="header">
    <router-link to="/" class="header-ttl">
      <span class="header-ttl-color">C</span>inemary</router-link
    >
    <ul class="header-menu">
      <li>
        <router-link to="/first" class="header-link">初めての方へ</router-link>
      </li>
      <li>
        <router-link to="/post" class="header-link" v-if="authenticatedUser"
          >投稿</router-link
        >
      </li>
      <li>
        <router-link to="/search" class="header-link">検索する</router-link>
      </li>
      <li>
        <router-link to="/signup" class="header-link" v-if="!authenticatedUser"
          >新規登録</router-link
        >
      </li>
      <li>
        <router-link to="/signin" class="header-link" v-if="!authenticatedUser"
          >ログイン</router-link
        >
      </li>
      <li>
        <span
          class="dropdown-menu"
          v-click-outside="clickoutside"
          @click="toggle"
        >
          <a class="header-link"
            >マイページ<span class="dropdown-arrow"></span
          ></a>
          <ul class="dropdown" :class="{ isOpen }">
            <li class="dropdown-items">
              <router-link to="/mypage" class="dropdown-link"
                >マイページ</router-link
              >
            </li>
            <li class="dropdown-items">
              <router-link to="/profile" class="dropdown-link"
                >プロフィール編集</router-link
              >
            </li>
            <li class="dropdown-items" v-if="authenticatedUser">
              <button
                class="dropdown-link"
                @click="signOut"
                v-if="authenticatedUser"
              >
                ログアウト
              </button>
            </li>
          </ul>
        </span>
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
      isOpen: false,
    };
  },
  methods: {
    //ログアウトを実装
    signOut: function() {
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
    toggle: function() {
      this.isOpen = !this.isOpen;
      //「!」を先頭につける事で真偽が逆。
    },
    clickoutside: function() {
      //this.isOpenがtrue場合、this.toggleは何も起きない。
      //要するにドロップダウンメニューが開かれている時は、クリックしても何も起きない。
      if (this.isOpen) {
        this.toggle();
      }
    },
  },
  mounted() {
    //以下、ユーザーが認証済みであれば「ログアウト」を表示
    firebase.auth().onAuthStateChanged((user) => {
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
    ClickOutside,
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");
li {
  list-style: none;
}

.header {
  position: sticky;
  top: 0;
  background-color: #000000;
  padding: 1rem 3rem;
  z-index: 999;
  display: flex;
  align-items: center;
  &-ttl {
    color: #fff;
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    background-color: transparent;
    border: none;
    outline: none;
    font-family: "Roboto", sans-serif;
    &-color {
      color: grey;
      font-size: 2.5rem;
    }
  }
  &-menu {
    display: flex;
    margin-left: auto;
    .dropdown-menu {
      position: relative;
      display: flex;
      .dropdown-link {
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
        &:hover {
          color: grey;
        }
      }
    }
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
    &:not(:first-child) {
      margin-left: 2rem;
    }
    &:hover {
      color: #bbb;
    }
  }
}

.dropdown-arrow {
  width: 0px;
  height: 0px;
  position: absolute;
  top: 9px;
  right: -20px;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 7px solid white;
  .header-link:hover & {
    border-top-color: #bbb;
  }
}

.dropdown {
  width: 10rem;
  height: auto;
  position: absolute;
  top: 50px;
  right: -47px;
  display: none;
  background-color: #000000;
  &-items {
    padding: 1rem;
    border-bottom: 1px solid #fff;
  }
}

.isOpen {
  display: block;
}

a.header-ttl:hover,
a.header-ttl:hover span {
  color: #bbb;
}
</style>
