<template>
  <div class="about flex">
    <h2 class="about-tll neon">Cinemary(シネマリー)とは？</h2>
    <hr class="separate" />
    <ul class="flex">
      <li>
        <div class="remark">
          <div class="faceicon">
            <img src="../assets/faceicon1.jpg" />
          </div>
          <div class="chatting">
            <div class="say">
              <p>恋人とキュンとする恋愛映画が観たいな♡</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="remark">
          <div class="faceicon">
            <img src="../assets/faceicon3.jpg" />
          </div>
          <div class="chatting">
            <div class="say">
              <p>スカッとするアクション映画が観たい！</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="remark">
          <div class="faceicon">
            <img src="../assets/faceicon2.jpg" />
          </div>
          <div class="chatting">
            <div class="say">
              <p>お友達と大人数でホラー映画鑑賞会をしたい♩</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="description">
      <p>そんな映画を観たい気分の時があるかと思います。</p>
      <p>しかし「何の映画を観よう」「どれを観たらいいだろう」と悩んだことはないでしょうか。</p>
      <p>その時の気分を投稿して、そのシーンにあった映画をチャットを通じて選んでみませんか。</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- 全体共通 -- //

.separate {
  width: 70%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid rgb(100, 100, 100);
  margin: 1em 0;
  padding: 1rem;
}

p {
  color: #000;
}

// -- Cinemary(シネマリー)とは？ -- //

.say {
  display: inline-block;
  position: relative;
  margin: 0 0 0 30px;
  padding: 10px;
  max-width: 460px;
  border-radius: 12px;
  background: #00ec0ccb;
  z-index: 5;
}

.say::before {
  position: absolute;
  content: " ";
  display: block;
  left: -16px;
  bottom: 12px;
  border: 4px solid transparent;
  border-right: 12px solid #00ec0ccb;
}

.about {
  flex-direction: column;
  background-color: $black-color;
  &-tll {
    margin-top: 3rem;
    color: $white-color;
    font-family: "Roboto", sans-serif;
  }

  ul {
    width: 50%;
    flex-direction: column;
    .remark {
      width: 465px;
      display: flex;
      align-items: center;
      .faceicon {
        img {
          width: 60px;
          height: 60px;
          margin: 0.5rem;
        }
      }
    }
  }

  .description {
    text-align: center;
    position: relative;
    width: 70%;
    padding: 3rem;
    p {
      padding: 2px;
      color: $white-color;
    }
  }
}

// -- ネオン -- //

.neon {
  -webkit-text-stroke: 0.2px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
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

.about-tll {
  @include sm {
    font-size: 1.4rem;
  }
}

.about .description p {
  @include lg {
    font-size: 0.85rem;
  }
  @include md {
    font-size: 0.8rem;
  }
}

.about ul .remark .faceicon img {
  @include md {
    width: 50px;
    height: 50px;
  }
  @include sm {
    width: 45px;
    height: 45px;
  }
}

.say {
  @include md {
    margin: 0 0 0 20px;
    padding: 8px;
  }
  @include sm {
    margin: 0 0 0 10px;
  }
}

.about ul .remark {
  @include md {
    width: 405px;
  }
  @include sm {
    width: 356px;
  }
}

p {
  @include md {
    font-size: 0.9rem;
  }
  @include sm {
    font-size: 0.8rem;
  }
}

.about .description {
  @include sm {
    width: 80%;
    margin: 2rem;
    padding: 0;
  }
}
</style>
