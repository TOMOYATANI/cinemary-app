<template>
  <div class="main-tll flex">
    <h1>あなたに合わせて映画をマッチ</h1>
    <p>Cinemary(シネマリー)は、気分にあった映画を提供するアプリです。</p>
    <p>その時のシーンに合う映画を選び、より良いひと時を過ごしませんか。</p>
    <router-link to="/signup" class="post-btn" v-if="!authenticatedUser">今すぐ登録</router-link>
    <router-link :to="`/board/${this.uid}`" class="post-btn flex" v-if="authenticatedUser">投稿</router-link>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: "",
      uid: []
    };
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
// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- メイン -- //

.main-tll {
  width: 70%;
  flex-direction: column;
  font-weight: bold;
  color: gray;
  background-color: aliceblue;
  border-radius: 2rem;
  padding: 2.3rem;
  box-shadow: 0 0 10px lightgrey;

  h1 {
    color: rgb(80, 80, 80);
  }
  p {
    color: rgb(80, 80, 80);
  }

  .post-btn {
    width: 7rem;
    margin-top: 1.5rem;
    padding: 0.5rem;
    display: inline-block;
    letter-spacing: 2px;
    overflow: hidden;
    color: #fff;
    background: #fc8f01;
    box-shadow: 0 0 10px #fc8f01, 0 0 50px #fc8f01, 0 0 0px;
    outline: none;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
    text-align: center;
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

.main-tll {
  @include sm {
    width: 94%;
  }
}

.main .tll {
  @include sm {
    z-index: 1;
    left: 3% !important;
  }
}

.main-tll h1 {
  @include md {
    font-size: 1.5rem;
  }
  @include sm {
    font-size: 1.2rem;
  }
}

.main-tll p {
  @include md {
    font-size: 0.7rem;
  }
  @include sm {
    font-size: 0.6rem;
  }
}

.main .tll {
  @include md {
    padding: 1rem;
    top: 33%;
  }
}

.main-tll .post-btn {
  @include md {
    width: 6.5rem;
    margin-top: 1.2rem;
    padding: 0.4rem;
  }
}
</style>
