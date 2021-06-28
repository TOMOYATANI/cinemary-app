  <template>
  <div class="main-roop-xllg">
    <Maintitle class="tll" />
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
import Maintitle from "@/components/maintitle.vue";

export default {
  components: {
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

.main-roop-xllg {
  width: 100%;
  height: 90vh;
  background-color: rgba(20, 20, 20, 20);
  position: relative;
  overflow: hidden;
  .tll {
    z-index: 1;
    position: absolute;
    top: 30%;
    left: 13%;
  }
  .main-roop {
    width: 100%;
    display: flex;
    opacity: 0.6;
    .main-roop-items {
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
  padding: 0.3rem;
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

.main-img {
  @include md {
    padding: 0.1rem;
  }
}
</style>
