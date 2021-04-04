<template>
  <div class="main">
    <div class="main-tll flex">
      <h1>映画を楽しむすべての映画好きへ</h1>
      <p>Cinemary(シネマリー)は、映画を共有するアプリです。</p>
      <p>あなたのお気に入りの作品を共有しませんか。</p>
      <router-link to="/signup" class="btn btn-orange" v-if="!authenticatedUser"
        >今すぐ登録</router-link
      >
      <router-link to="/post" class="btn btn-orange" v-if="authenticatedUser"
        >投稿する</router-link
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
</template>

<script>
import firebase from "firebase";

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: "",
      isOpen: false,
    };
  },
  methods: {
    toggle: function() {
      this.isOpen = !this.isOpen;
      //「!」を先頭につける事で真偽が逆。
    },
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
    left: 10%;
    padding: 2rem;
    box-shadow: 0 0 10px lightgrey;
    width: 80%;
  }
  .btn-orange,
  a.btn-orange {
    width: 7rem;
    color: #fff;
    background-color: #eb6100;
    padding: 10px;
    margin-top: 1rem;
    border-radius: 1rem;
    text-decoration: none;
    font-weight: bold;
  }
  .btn-orange:hover,
  a.btn-orange:hover {
    color: #fff;
    background: #f56500;
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
