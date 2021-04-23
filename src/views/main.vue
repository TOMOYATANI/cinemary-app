<template>
  <div>
    <Header />
    <div class="main">
      <div class="main-tll flex">
        <h1>映画を楽しむすべての映画好きへ</h1>
        <p>Cinemary(シネマリー)は、映画を共有するアプリです。</p>
        <p>あなたのお気に入りの作品を共有してみませんか。</p>
        <router-link to="/signup" class="post-btn" v-if="!authenticatedUser">今すぐ登録</router-link>
        <router-link to="/board" class="post-btn flex" v-if="authenticatedUser">投稿</router-link>
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
          <img class="main-img" src="../assets/グレイテストショーマン.jpg" alt />
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
          <img class="main-img" src="../assets/グレイテストショーマン.jpg" alt />
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
import Vue from 'vue'
import VueSwal from 'vue-swal'
Vue.use(VueSwal)

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: "",
      isOpen: false
    };
  },
  components: {
    Header
  },
  methods: {
    toggle() {
      this.isOpen = !this.isOpen;
      //「!」を先頭につける事で真偽が逆。
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authenticatedUser = true;
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

.main {
  width: 100%;
  height: 90vh;
  background-color: rgba(0, 0, 0, 0.911);
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
</style>
