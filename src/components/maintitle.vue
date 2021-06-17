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

$breakpoint-pc: 1025px;
$breakpoint-tablet: 1024px;
$breakpoint-mobile: 600px;

@mixin pc {
  @media (min-width: ($breakpoint-pc)) {
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

.main-tll h1 {
  @include sp {
    font-size: 1.5rem;
  }
}

.main-tll p {
  @include sp {
    font-size: 0.7rem;
  }
}

.main .tll {
  @include sp {
    padding: 1rem;
    top: 33%;
  }
}

.main-tll .post-btn {
  @include sp {
    width: 6.5rem;
    margin-top: 1.2rem;
    padding: 0.4rem;
  }
}
</style>
