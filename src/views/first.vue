<template>
  <div>
    <Header />
    <div class="first flex">
      <h2 class="about-tll neon">Cinemary(シネマリー)とは？</h2>
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
        <p>しかし、「何の映画を観よう」「どれを観たらいいだろう」と悩んだことはないでしょうか。</p>
        <p>その時の気分を投稿して、そのシーンにあった映画をチャットを通じて選んでみませんか。</p>
      </div>
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
            <p class="step-txt">チャットを通じて、あなたの気分にあった映画が決まります。</p>
          </div>
        </div>
        <router-link to="/signup" class="first-btn" v-if="!authenticatedUser">今すぐ登録</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";

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
  background-color: rgb(0, 0, 0);
  .about-tll {
    margin-top: 3rem;
    color: rgb(255, 255, 255);
    font-family: "Roboto", sans-serif;
  }
  .separate {
    width: 70%;
    display: block;
    height: 0;
    border: 0;
    border-top: 1px solid rgb(100, 100, 100);
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
          width: 60px;
          height: 60px;
          margin: 0.5rem;
        }
      }
      .chatting {
        .say1 {
          position: absolute;
          top: 20px;
          left: 55px;
          p {
            color: rgb(0, 0, 0);
          }
        }
        .say2 {
          position: absolute;
          top: 20px;
          left: 55px;
          p {
            color: rgb(0, 0, 0);
          }
        }
        .say3 {
          position: absolute;
          top: 20px;
          left: 55px;
          p {
            color: rgb(0, 0, 0);
          }
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
      color: rgb(255, 255, 255);
    }
  }

  .flow-tll {
    margin-top: 2rem;
    color: rgb(255, 255, 255);
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
        color: rgb(255, 255, 255);
      }
      img {
        width: 70px;
        height: 70px;
      }
      h4 {
        font-weight: 0px;
        color: rgb(255, 255, 255);
      }
      h3 {
        padding: 0.5rem;
        color: rgb(255, 255, 255);
      }
      .step-txt {
        padding: 1rem;
        font-size: 14px;
        color: rgb(255, 255, 255);
      }
    }
    .first-btn {
      width: 7rem;
      margin-bottom: 3rem;
      padding: 0.5rem;
      display: inline-block;
      letter-spacing: 2px;
      overflow: hidden;
      color: #fff;
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

.neon {
  color: transparent;
  -webkit-text-stroke: 0.2px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
}
</style>
