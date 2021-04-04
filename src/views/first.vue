<template>
  <div class="first flex">
    <h2 class="about-tll">Cinemary(シネマリー)とは？</h2>
    <hr class="separate" />
    <ul class="flex">
      <li>
        <div class="remark flex">
          <div class="faceicon">
            <img src="../assets/faceicon1.jpg" />
          </div>
          <div class="chatting">
            <div class="say say1">
              <p>恋人とキュンとする恋愛映画が観たいな♡</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="remark flex">
          <div class="faceicon">
            <img src="../assets/faceicon3.jpg" />
          </div>
          <div class="chatting">
            <div class="say say2">
              <p>スカッとするアクション映画が観たい！</p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="remark flex">
          <div class="faceicon">
            <img src="../assets/faceicon2.jpg" />
          </div>
          <div class="chatting">
            <div class="say say3">
              <p>お友達と大人数でホラー映画鑑賞会をしたい♩</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="description">
      <p>そんな映画を観たい気分の時があるかと思います。</p>
      <p>
        しかし、「何の映画を観よう」「どれを観たらいいだろう」と悩んだことはないでしょうか。
      </p>
      <p>
        その時の気分を投稿して、そのシーンにあった映画をチャットを通じて選んでみませんか。
      </p>
    </div>
    <h2 class="flow-tll">Cinemaryを利用するまでの流れ</h2>
    <hr class="separate" />
    <div class="flow flex">
      <div class="flow-item flex">
        <div class="step">
          <div>
            <img src="../assets/パソコンicon.jpg" alt="パソコン" />
          </div>
          <p>STEP1</p>
          <h3>無料会員登録</h3>
          <p class="step-txt">
            会員登録をすると全てのサービスが使用でき、全ての投稿を閲覧できます。
          </p>
        </div>
        <div class="step">
          <div>
            <img src="../assets/投稿icon.jpg" alt="投稿" />
          </div>
          <p>STEP2</p>
          <h3>投稿</h3>
          <p class="step-txt">
            自分の気分を投稿したり、自分の気になる投稿に書き込みができます。
          </p>
        </div>
        <div class="step">
          <div>
            <img src="../assets/成立icon.jpg" alt="成立" />
          </div>
          <p>STEP3</p>
          <h3>映画が決定！</h3>
          <p class="step-txt">
            チャットを通じて、あなたの気分にあった映画が決まります。
          </p>
        </div>
      </div>
      <div class="first-btn">
        <router-link
          to="/signup"
          class="btn btn-orange"
          v-if="!authenticatedUser"
          >今すぐ登録</router-link
        >
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
.say {
  display: inline-block;
  position: relative;
  margin: 0 0 0 50px;
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

.first {
  flex-direction: column;
  .about-tll {
    margin-top: 3rem;
  }
  .separate {
    width: 70%;
    display: block;
    height: 0;
    border: 0;
    border-top: 1px solid rgb(58, 57, 57);
    margin: 1em 0;
    padding: 1rem;
  }
  ul {
    width: 50%;
    flex-direction: column;
    margin-left: 5rem;
    li {
      width: 80%;
      position: relative;
    }
    .remark {
      width: 100%;
      justify-content: space-between;
      .faceicon {
        img {
          width: 70px;
          height: 70px;
          margin: 0.5rem;
        }
      }
      .chatting {
        .say1 {
          position: absolute;
          top: 20px;
          left: 55px;
        }
        .say2 {
          position: absolute;
          top: 20px;
          left: 55px;
        }
        .say3 {
          position: absolute;
          top: 20px;
          left: 55px;
        }
      }
    }
  }

  .description {
    position: relative;
    width: 70%;
    padding: 3rem;
    p {
      padding: 2px;
    }
  }

  .flow-tll {
    margin-top: 2rem;
  }

  .flow {
    flex-direction: column;
    height: 25rem;
    .flow-item {
      width: 65%;
      margin-bottom: 3rem;
      .step {
        width: 32%;
      }
      img {
        width: 90px;
        height: 90px;
      }
      h4 {
        font-weight: 0px;
      }
      h3 {
        padding: 0.5rem;
      }
      .step-txt {
        padding: 1rem;
        font-size: 14px;
      }
    }
    .first-btn {
      height: 5rem;
      .btn-orange,
      a.btn-orange {
        width: 8rem;
        color: #fff;
        background-color: #eb6100;
        padding: 10px;
        margin-top: 1rem;
        border-radius: 1rem;
        text-decoration: none;
        font-weight: bold;
        display: inline-block;
      }
      .btn-orange:hover,
      a.btn-orange:hover {
        color: #fff;
        background: #f56500;
      }
    }
  }
}
</style>
