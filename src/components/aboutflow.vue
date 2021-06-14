<template>
  <div>
    <div class="about flex">
      <h2 class="flow-tll neon">Cinemaryを利用するまでの流れ</h2>
      <hr class="separate" />
      <div class="flow flex">
        <div class="flow-item flex">
          <div class="step">
            <div>
              <img src="../assets/パソコン.jpg" alt="パソコン" />
            </div>
            <p>STEP1</p>
            <h3>無料会員登録</h3>
            <p class="step-txt">会員登録をすると全てのサービスが使用でき、全ての投稿を閲覧できます。</p>
          </div>
          <div class="step">
            <div>
              <img src="../assets/投稿.jpg" alt="投稿" />
            </div>
            <p>STEP2</p>
            <h3>投稿</h3>
            <p class="step-txt">自分の気分を投稿したり、自分の気になる投稿に書き込みができます。</p>
          </div>
          <div class="step">
            <div>
              <img src="../assets/成立.jpg" alt="成立" />
            </div>
            <p>STEP3</p>
            <h3>映画が決定！</h3>
            <p class="step-txt">チャットを通じて、その時のあなたの気分にあった映画が決まります。</p>
          </div>
        </div>
        <router-link to="/signup" class="first-btn" v-if="!authenticatedUser">今すぐ登録</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: ""
    };
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

.about {
  width: 100%;
  flex-direction: column;
  background-color: $black-color;
  &-tll {
    margin-top: 3rem;
    color: $white-color;
    font-family: "Roboto", sans-serif;
  }

  // -- テンプレート -- //

  .flow-tll {
    margin-top: 2rem;
    color: $white-color;
    font-family: "Roboto", sans-serif;
  }

  .flow {
    flex-direction: column;
    height: 25rem;
    .flow-item {
      width: 65%;
      margin-bottom: 3rem;
      .step {
        width: 32%;
        text-align: center;
      }
      p {
        color: $white-color;
      }
      img {
        width: 70px;
        height: 70px;
      }
      h4 {
        font-weight: 0px;
        color: $white-color;
      }
      h3 {
        padding: 0.5rem;
        color: $white-color;
      }
      .step-txt {
        padding: 1rem;
        font-size: 14px;
        color: $white-color;
      }
    }
    .first-btn {
      width: 7rem;
      margin-bottom: 3rem;
      padding: 0.5rem;
      display: inline-block;
      letter-spacing: 2px;
      overflow: hidden;
      color: $white-color;
      background: #fc8f01;
      box-shadow: 0 0 10px #fc8f01, 0 0 40px #fc8f01, 0 0 80px;
      outline: none;
      border: none;
      border-radius: 0.5rem;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
      text-align: center;
    }
  }
}

// -- タイトル -- //

.neon {
  -webkit-text-stroke: 0.2px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
}

// -- メディアクエリ -- //

$breakpoint-tablet: 1024px;
$breakpoint-mobile: 600px;

@mixin pc {
  @media (min-width: ($breakpoint-tablet)) {
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

.about .flow {
  @include sp {
    height: 22rem;
  }
}

.about .flow .flow-item img {
  @include sp {
    width: 55px;
    height: 55px;
  }
  @include tab {
    width: 60px;
    height: 60px;
  }
}

.about .flow .flow-item h3 {
  @include sp {
    padding: 0.3rem;
    font-size: 0.9rem;
  }
  @include tab {
    padding: 0.4rem;
    font-size: 1rem;
  }
}

.about .flow .flow-item .step-txt {
  @include sp {
    padding: 0.9rem;
    font-size: 12px;
  }
  @include sp {
    padding: 1rem;
    font-size: 13px;
  }
}
</style>
