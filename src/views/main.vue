<template>
  <div>
    <Header />
    <div class="main">
      <Maintitle class="tll"/>
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
import Header from "@/components/header.vue";
import Maintitle from "@/components/maintitle.vue";

export default {
  components: {
    Header,
    Maintitle
  }
};
</script>

<style scoped lang="scss">
// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- テンプレート -- //

.main {
  width: 100%;
  height: 90vh;
  background-color: rgba(20, 20, 20, 20);
  position: relative;
  overflow: hidden;
  .tll {
    z-index: 1;
    position: absolute;
    top: 30%;
    left: 15%;
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

// -- メディアクエリ -- //

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
