<template>
  <div>
    <Header />
    <div class="main">
      <div class="main-tll flex">
        <h1>あなたに合わせて映画をマッチ</h1>
        <p>Cinemary(シネマリー)は、気分にあった映画を提供するアプリです。</p>
        <p>その時のシーンに合う映画を選び、より良いひと時を過ごしませんか。</p>
        <router-link to="/signup" class="post-btn" v-if="!authenticatedUser"
          >今すぐ登録</router-link
        >
        <router-link
          :to="`/board/${this.uid}`"
          class="post-btn flex"
          v-if="authenticatedUser"
          >投稿</router-link
        >
      </div>
      <ul class="main-roop">
        <li class="main-roop-items">
          <img class="main-img" src="../assets/アベンジャーズ.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ヴェノム.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/きみに読む物語.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ショーシャンク.jpg" alt />
        </li>
      </ul>
      <ul class="main-roop">
        <li class="main-roop-items">
          <img class="main-img" src="../assets/インセプション.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/シャッターアイランド.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/テネット.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ララランド.jpg" alt />
        </li>
      </ul>
      <ul class="main-roop">
        <li class="main-roop-items">
          <img
            class="main-img"
            src="../assets/グレイテストショーマン.jpg"
            alt
          />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/セッション.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ピエロがお前を嘲笑う.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ブラッドダイヤモンド.jpg" alt />
        </li>
      </ul>
      <ul class="main-roop">
        <li class="main-roop-items">
          <img class="main-img" src="../assets/アベンジャーズ.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ヴェノム.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/きみに読む物語.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ショーシャンク.jpg" alt />
        </li>
      </ul>
      <ul class="main-roop">
        <li class="main-roop-items">
          <img class="main-img" src="../assets/インセプション.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/シャッターアイランド.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/テネット.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ララランド.jpg" alt />
        </li>
      </ul>
      <ul class="main-roop">
        <li class="main-roop-items">
          <img
            class="main-img"
            src="../assets/グレイテストショーマン.jpg"
            alt
          />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/セッション.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ピエロがお前を嘲笑う.jpg" alt />
        </li>
        <li class="main-roop-items">
          <img class="main-img" src="../assets/ブラッドダイヤモンド.jpg" alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: "",
    };
  },
  components: {
    Header,
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authenticatedUser = true;
      } else {
        this.authenticatedUser = false;
      }
    });
  },
};
</script>

<style scoped lang="scss">
// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- メイン -- //

.main {
  width: 100%;
  height: 90vh;
  background-color: rgba(20, 20, 20, 20);
  position: relative;
  overflow: hidden;
  &-tll {
    flex-direction: column;
    z-index: 1;
    font-weight: bold;
    color: gray;
    background-color: aliceblue;
    border-radius: 2rem;
    position: absolute;
    top: 30%;
    left: 15%;
    padding: 2.3rem;
    box-shadow: 0 0 10px lightgrey;
    width: 70%;
    h1 {
      color: rgb(80, 80, 80);
    }
    p {
      color: rgb(80, 80, 80);
    }
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
  &-roop {
    width: 100%;
    display: flex;
    opacity: 0.6;
    &-items {
      animation: loop 50s -25s linear infinite;
      //50秒かけて1つ目をループし、25秒遅れで2つ目を実行。
      backface-visibility: hidden;
      will-change: transform;
      width: 100%;
      overflow: hidden;
    }
  }
}

.main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding: 0.5rem;
}

@keyframes loop {
  0% {
    transform: translateY(0%);
  }
  to {
    transform: translateY(-300%);
  }
  //(-300%)にすることで途切れずにループを実行。
}

/* <====== Media Queries======> */

$breakpoint-pc: 1440px;
$breakpoint-tablet: 1024px;
$breakpoint-mobile: 600px;

@mixin pc {
  @media (max-width: ($breakpoint-pc)) {
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

.main-tll h1[data-v-c9a65f5a] {
  @include sp {
    font-size: 1.5rem;
  }
}

.main-tll p[data-v-c9a65f5a] {
  @include sp {
    font-size: 0.7rem;
  }
}

.main-tll[data-v-c9a65f5a] {
  @include sp {
    padding: 1.3rem;
  }
}

.main .post-btn[data-v-c9a65f5a] {
  @include sp {
    width: 5rem;
    margin-top: 1.2rem;
    padding: 0.4rem;
  }
}

.main-img[data-v-c9a65f5a] {
  @include sp {
    padding: 0.1rem;
  }
}
</style>
