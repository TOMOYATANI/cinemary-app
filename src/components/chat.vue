<template>
  <div class="chat">
    <div class="chat-header flex">
      <h1 class="chat-tll flash neon flex">Chat Room</h1>
      <slide right disableOutsideClick width="200">
        <router-link to="/" class="hamburger-link neon3 flash">HOME</router-link>
        <router-link to="/about" class="hamburger-link neon3 flash">ABOUT</router-link>
        <router-link :to="`/board/${this.uid}`" class="hamburger-link neon3 flash">POST</router-link>
        <router-link
          to="/signup"
          class="hamburger-link neon3 flash"
          v-if="!authenticatedUser"
        >SINGUP</router-link>
        <router-link
          to="/signin"
          class="hamburger-link neon3 flash"
          v-if="!authenticatedUser"
        >SINGIN</router-link>
        <router-link :to="`/mypage/${this.uid}`" class="hamburger-link neon3 flash">MYPAGE</router-link>
      </slide>
      <div id="page-wrap"></div>
    </div>
    <!--Firebase から取得したリストを描画-->
    <transition-group name="chat" tag="div" class="list content">
      <!--chatの中の{ key, name, image, message ,userid }をそれぞれ取得-->
      <section v-for="{ key, name, image, message, userid, time } in chat" :key="key">
        <div v-if="userid === user.uid" class="myitem flex">
          <!-- 自身 -->
          <!--「画像」の指定-->

          <!--「名前」と「メッセージ」の指定-->
          <div class="mydetail">
            <div class="mytime">{{ $dayjs(time).format("HH:mm") }}</div>
            <div @click.right.prevent="deleteMessage(key)" class="mymessage">
              <nl2br tag="div" :text="message" />
            </div>
          </div>
          <div class="myimage flex">
            <img :src="user.photoURL" width="50" height="50" />
            <div class="myname flex">{{ user.displayName }}</div>
          </div>
        </div>
        <div v-else class="otheritem flex">
          <!-- 自身ではない -->
          <!--「画像」の指定-->
          <div class="otherimage flex">
            <router-link
              v-if="returnUserData(userid)"
              :to="`/mypage/${returnUserData(userid).uid}`"
            >
              <img
                :src="
                  returnUserData(userid)
                    ? returnUserData(userid).uploadedImage.fileUrl
                    : preview
                "
                width="50"
                height="50"
              />
              <div class="othername flex">
                {{
                returnUserData(userid)
                ? returnUserData(userid).name
                : "NO NAME"
                }}
              </div>
            </router-link>
          </div>
          <!--「名前」と「メッセージ」の指定-->
          <div class="otherdetail">
            <div class="othermessage">
              <nl2br tag="div" :text="message" />
            </div>
            <div class="othertime">{{ $dayjs(time).format("HH:mm") }}</div>
          </div>
        </div>
      </section>
    </transition-group>

    <!-- 入力フォームの設定 -->
    <div class="message-inner flex">
      <form action @submit.prevent="doSend" class="form flex">
        <textarea
          v-model="input"
          placeholder="メッセージを入力"
          :disabled="!user.uid"
          @click.prevent="doSend"
        ></textarea>
        <!-- ユーザーでなければ無効化 -->
        <button type="submit" :disabled="!user.uid" class="send-button">
          <img src="../assets/電球.jpg" class="send-img" alt="送信" />
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Nl2br from "vue-nl2br";
import Vue from "vue";
// 改行を <br> タグに変換するモジュール
import dayjs from "dayjs";
import { Slide } from "vue-burger-menu";
Vue.component("slide", Slide);

dayjs.locale("ja");
Vue.prototype.$dayjs = dayjs;

export default {
  components: { Nl2br },
  data() {
    return {
      user: {}, // ユーザー情報
      chat: [], // 取得したメッセージを入れる配列
      input: "", // 入力したメッセージ
      uid: null,
      userIds: [],
      userDatas: [],
      authenticatedUser: "",
      preview: require("../assets/デフォルト画像.jpg")
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      // ログイン状態ならuserが取得できる
      this.user = user ? user : {};
      //userにはログイン中のユーザー情報(Firebaseのデータ)が保存されている。
      const ref_message = firebase.database().ref(this.$route.params.id);

      if (user) {
        this.chat = [];
        //limitToLast(10)で並べ替えられた「ref_message」の最後の10個を取得し、on()で変更があったときのハンドラを登録。
        ref_message.limitToLast(10).on("child_added", this.childAdded);
      } else {
        //off()は、変更があったときのハンドラを解除
        ref_message.limitToLast(10).off("child_added", this.childAdded);
      }
    });
  },
  methods: {
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        //this.$nextTickは、再描画を待つ。絶対値からbody要素の高さを取得。
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    childAdded(snap) {
      const message = JSON.parse(JSON.stringify(snap.val()));
      if (!this.userIds.includes(String(message.userid))) {
        this.userIds.push(String(message.userid));
        //this.userIds（配列）にuserid含まれていていなければthis.userIds（配列）に追加。

        let self = this;

        firebase
          .firestore()
          .collection("users")
          .doc(message.userid)
          .get()
          .then(snapshot => {
            self.userDatas.push(snapshot.data());
          });
        //メッセージを送信したuserid(ログイン中のユーザーid)の情報をuserDatasに保存
      }
      //データベースに新しい要素が追加されると随時呼び出される
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message,
        userid: message.userid,
        time: message.time
      });
      this.scrollBottom();
      //スクロールの一番下に追加。
    },
    doSend() {
      const time = time;
      if (this.user.uid && this.input.length) {
        //以下でFirebaseに書き込まれたメッセージを追加
        firebase
          .database()
          .ref(this.$route.params.id)
          .push(
            {
              message: this.input,
              name: this.user.displayName,
              image: this.user.photoURL,
              userid: this.user.uid,
              time: firebase.database.ServerValue.TIMESTAMP
            },

            () => {
              this.input = ""; //フォームを空にする
            }
          );
      }
    },
    returnUserData(id) {
      const userData = this.userDatas.find(user => user.uid === id);
      //methodsなので引数に渡した値(id)はtemplate内の引数(userid)を渡していること。
      //this.userDatas（配列）に入っている値uesr.uidとidが一致したものを一つuserData（配列）に保存。
      return userData;
    },
    deleteMessage(key) {
      firebase
        .database()
        .ref(this.$route.params.id + "/" + key)
        .remove();
      this.$swal({
        title: "内容確認",
        text: "メッセージを削除しますか？",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            this.$router.go({
              path: `/chat/${this.$route.params.id}`,
              force: true
            });
          } else {
            this.$swal("キャンセルしました。");
          }
        })
        .catch(() => {
          this.$swal("メッセージを削除出来ません。", {
            icon: "error"
          });
        });
    }
  },
  mounted() {
    //以下、ユーザーが認証済みであれば表示・非表示を設定
    firebase.auth().onAuthStateChanged(user => {
      const currentUser = firebase.auth().currentUser;
      this.uid = currentUser.uid;

      if (user) {
        this.authenticatedUser = true;
      } else {
        this.authenticatedUser = false;
      }
    });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- 全体 -- //

div {
  color: $black-color;
}

.chat {
  width: 100%;
  flex-direction: column;
  background-color: rgba(20, 20, 20);
  .chat-header {
    position: sticky;
    color: $white-color;
    background-color: $black-color;
    padding: 1rem 3rem;
    top: 0;
    z-index: 999;
    .chat-tll {
      width: 100%;
      font-family: "Roboto", sans-serif;
      display: flex;
      padding: 0.3rem;
      font-size: 2.2rem;
    }
  }
  .content {
    margin: 0 auto;
    padding: 0 10px;

    // -- mymessage -- //

    .myitem {
      position: relative;
      margin: 2rem;
    }

    .mytime {
      color: $white-color;
      margin-right: 0.5rem;
      display: flex;
      align-items: flex-end;
    }

    .mymessage {
      display: inline-block;
      position: relative;
      margin: 0 20px 0 0;
      padding: 10px;
      max-width: 460px;
      border-radius: 12px;
      background: #00ec0ccb;
      user-select: none;
    }

    .mymessage::before {
      position: absolute;
      content: " ";
      display: block;
      right: -16px;
      bottom: 12px;
      border: 4px solid transparent;
      border-left: 12px solid #00ec0ccb;
    }

    .myname {
      color: $white-color;
      font-size: 75%;
      margin-top: 0.5rem;
      font-weight: bold;
      font-family: "Roboto", sans-serif;
    }

    .myimage {
      flex-direction: column;
      padding-left: 1.4rem;
      img {
        border-radius: 20px;
        vertical-align: top;
        display: flex;
        align-items: flex-end;
      }
    }
    .mydetail {
      margin: 0 0 0 auto;
      display: flex;
    }

    // -- othermessage -- //

    .otheritem {
      position: relative;
      margin: 2rem;
      justify-content: flex-start;
    }

    .othertime {
      color: $white-color;
      margin-left: 0.5rem;
      display: flex;
      align-items: flex-end;
    }

    .othermessage {
      display: inline-block;
      position: relative;
      margin: 0 0 0 20px;
      padding: 10px;
      max-width: 460px;
      border-radius: 12px;
      background: #00ec0ccb;
      user-select: none;
    }

    .othermessage::before {
      position: absolute;
      content: " ";
      display: block;
      left: -16px;
      bottom: 12px;
      border: 4px solid transparent;
      border-right: 12px solid #00ec0ccb;
    }

    .othername {
      color: $white-color;
      font-size: 75%;
      margin-top: 0.5rem;
      font-weight: bold;
      font-family: "Roboto", sans-serif;
    }

    .otherimage {
      flex-direction: column;
      padding-right: 1.4rem;
      img {
        border-radius: 20px;
        vertical-align: top;
      }
    }
    .otherdetail {
      margin: 0 0 0 1.4em;
      display: flex;
      .othername {
        font-size: 75%;
      }
    }
  }
  .list {
    width: 90%;
    padding-bottom: 50px;
    overflow: hidden;
  }
  .message-inner {
    width: 100%;
    position: fixed;
    bottom: 0;
    padding: 0.5rem;
    background-color: $black-color;
    .form {
      width: 95%;
      bottom: 0;
      height: 3rem;
      textarea {
        width: 100%;
        height: 3em;
        border: 1px solid #ccc;
        border-radius: 25px;
        resize: none;
        margin-right: 0.5rem;
        padding: 0.65rem;
        outline: none;
        color: $black-color;
        background-color: $white-color;
      }
      .send-button {
        width: 2rem;
        height: 2rem;
        cursor: pointer;
        border: none;
        outline: none;
        .send-img {
          width: 100%;
          height: 100%;
          background-color: $black-color;
        }
      }
    }
  }
}

/* トランジション用スタイル */
.chat-enter-active {
  transition: all 1s;
}
.chat-enter {
  opacity: 0;
  transform: translateX(-1rem);
}

//ハンバーガーメニュー

.hamburger-link {
  color: $white-color;
  text-decoration: none;
  background-color: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  cursor: hand;
  margin-left: 3rem;
  font-family: "Roboto", sans-serif;
}

.bm-burger-button {
  cursor: pointer;
  height: 30px;
  left: 36px;
  position: absolute;
  top: 28px !important;
  width: 36px;
  color: $white-color;
}

.bm-burger-bars {
  background-color: $white-color !important;
}

.bm-menu {
  background-color: $black-color !important;
  height: 100%;
  left: 0;
  overflow-x: hidden;
  padding-top: 60px;
  position: fixed;
  top: 0;
  transition: 0.5s;
  width: 0;
  z-index: 1000;
}

.line-style {
  height: 20%;
  left: 0;
  position: absolute;
  right: 0;
  background-color: lightgray;
}

.cross-style {
  cursor: pointer;
  position: absolute;
  left: 25px !important;
  top: 18px;
}

.bm-cross {
  position: absolute;
  width: 3px;
  height: 17px !important;
  transform: rotate(45deg);
}

// -- neon -- //
.neon {
  color: transparent;
  -webkit-text-stroke: 1px rgb(255, 255, 255);
  text-shadow: 0 0 10px rgb(255, 255, 255), 0 0 15px rgb(150, 150, 150);
}

.neon3 {
  color: transparent;
  -webkit-text-stroke: 0.5px #0f0;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.5), 0 0 15px rgba(0, 255, 0, 0.5);
}

.flash {
  animation: flash-anime 5s linear infinite;
}
@keyframes flash-anime {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  51% {
    opacity: 0.3;
  }
  52% {
    opacity: 1;
  }
  75% {
    opacity: 1;
  }
  76% {
    opacity: 0.6;
  }
  77% {
    opacity: 1;
  }
  78% {
    opacity: 0.3;
  }
  79% {
    opacity: 1;
  }
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

.chat .content .otheritem {
  @include sm {
    margin: 1.1rem;
  }
}

.chat .content .otherimage {
  @include sm {
    padding-right: 0rem;
  }
}

.chat .content .myitem {
  @include sm {
    margin: 1.1rem;
  }
}

.chat .content .myimage {
  @include sm {
    padding-left: 0rem;
  }
}

.bm-burger-button {
  @include sm {
    right: 23px !important;
  }
}

.chat .chat-header .chat-tll {
  @include sm {
    font-size: 2rem;
  }
}
.chat .content .othermessage {
  @include lg {
    margin: 0;
  }
  @include md {
    margin: 0;
  }
  @include sm {
    font-size: 0.9rem;
  }
}
.chat .content .mymessage {
  @include sm {
    font-size: 0.9rem;
  }
}

.chat .list {
  @include md {
    width: 100%;
  }
}
</style>
