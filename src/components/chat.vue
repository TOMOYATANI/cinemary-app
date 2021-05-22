<template>
  <div class="chat">
    <h1 class="chat-tll flex">
      <div class="flash neon">Chat Room</div>
      <router-link :to="`/board/${this.uid}`" class="back-btn">
        <img
          src="../assets/戻る.jpg"
          alt="チャット終了"
          class="back-btn-icon"
        />
      </router-link>
    </h1>
    <!--Firebase から取得したリストを描画-->
    <transition-group name="chat" tag="div" class="list content">
      <!--chatの中の{ key, name, image, message ,userid }をそれぞれ取得-->
      <section
        v-for="{ key, name, image, message, userid, time } in chat"
        :key="key"
      >
        <div v-if="userid === user.uid" class="myitem flex">
          {{ userDatas }}
          <!-- 自身 -->
          <!--「画像」の指定-->

          <!--「名前」と「メッセージ」の指定-->
          <div class="mydetail">
            <div class="mytime">{{ $dayjs(time).format("hh:mm") }}</div>
            <div @click.right.prevent="deleteMessage(key)" class="mymessage">
              <nl2br tag="div" :text="message" />
            </div>
          </div>
          <div class="myimage flex">
            <img :src="image" width="40" height="40" />
            <div class="myname">{{ name }}</div>
          </div>
        </div>
        <div v-else class="otheritem flex">
          <!-- 自身ではない -->
          <!--「画像」の指定-->
          <div class="otherimage flex">
            <img :src="image" width="40" height="40" />
            <div class="othername">name</div>
          </div>
          <!--「名前」と「メッセージ」の指定-->
          <div class="otherdetail">
            <div class="othermessage">
              <nl2br tag="div" :text="message" />
            </div>
            <div class="othertime">{{ $dayjs(time).format("hh:mm") }}</div>
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
          @keydown.enter.exact.prevent="doSend"
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

dayjs.locale("ja");
Vue.prototype.$dayjs = dayjs;

export default {
  components: { Nl2br },
  data() {
    return {
      user: {}, // ユーザー情報
      chat: [], // 取得したメッセージを入れる配列
      input: "", // 入力したメッセージ
      usersData: [],
      profileDeta: {},
      userIds: [],
      userDatas:  {},
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      // ログイン状態ならuserが取得できる
      this.user = user ? user : {};
      //firebase.database()で以下のデータベースの読み書きを行う。
      const ref_message = firebase.database().ref(this.$route.params.id);
      //[router.vue]にて「/ ~ /:id」と指定しルートがマッチした時、
      //この動的セグメントの値は全てのコンポーネント内で this.$route.params として利用可能になる。
      if (user) {
        this.chat = [];
        // limitToLast(10)で並べ替えられた「message」の最後の10個を取得。
        // on()は、message に変更があったときのハンドラを登録
        //child_addedは、データベースのリスト「message」を取得。
        ref_message.limitToLast(10).on("child_added", this.childAdded);
      } else {
        // message に変更があったときのハンドラを解除
        ref_message.limitToLast(10).off("child_added", this.childAdded);
      }
    });
    const currentUser = firebase.auth().currentUser;
    //現在ログインしているユーザーを取得
    this.uid = currentUser.uid;

    console.log(this.userIds);
    this.userIds.forEach((id) => {
      console.log(id);
      firebase
        .firestore()
        .collection("users")
        .doc(id)
        .get()
        .then((snapshot) => {
          this.userDatas.push(snapshot.data());
          console.log(snapshot.data());
        });
    });
    console.log(this.userDatas);
  },
  methods: {
    // スクロール位置を一番下に移動
    scrollBottom() {
      this.$nextTick(() => {
        //this.$nextTickは、再描画を待つ。
        //絶対値からbody要素の高さを取得
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    childAdded(snap) {
      //snapshotとは、ある時点における特定のデータベース参照にあるデータの全体像を写し取ったもの
      //childAdded：データベースからアイテムのリストを取得する関数
      // 受け取ったメッセージをchatに追加
      const message = snap.val();
      if (!this.userIds.includes(message.userid))
        this.userIds.push(message.userid);
      //イベントのときにデータベース内の「message」データを取得。
      // データベースに新しい要素が追加されると随時呼び出される
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message,
        userid: message.userid,
        time: message.time,
      });
      this.scrollBottom();
      //スクロールの一番下に追加。
    },
    doSend() {
      const time = time;
      if (this.user.uid && this.input.length) {
        //  firebaseに書き込まれたメッセージを追加
        firebase
          .database()
          .ref(this.$route.params.id)
          .push(
            {
              message: this.input,
              name: this.user.displayName,
              image: this.user.photoURL,
              userid: this.user.uid,
              time: firebase.database.ServerValue.TIMESTAMP,
            },

            () => {
              this.input = ""; // フォームを空にする
            }
          );
      }
    },
    returnUserData(id) {
      const userData = this.userDatas.filter((user) => user.id === id);
      return userData;
    },
    deleteMessage(key) {
      firebase
        .database()
        .ref(this.$route.params.id + "/" + key)
        .remove();
      console.log(key);
      this.$swal({
        title: "内容確認",
        text: "メッセージを削除しますか？",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$swal("メッセージを削除しました", {
            icon: "success",
          });
          this.$router.go({
            path: `/chat/${this.$route.params.id}`,
            force: true,
          });
        } else {
          this.$swal("キャンセルしました。");
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- 全体 -- //

* {
  color: $black-color;
}

.header {
  display: none;
}

.chat {
  width: 100%;
  flex-direction: column;
  background-color: rgba(20, 20, 20);
  &-tll {
    position: relative;
    width: 100%;
    color: $white-color;
    font-family: "Roboto", sans-serif;
    background-color: $black-color;
    padding: 1rem 3rem;
    position: sticky;
    top: 0;
    z-index: 999;
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
    width: 75%;
    margin-bottom: 50px;
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

//戻るボタン

.back-btn-icon {
  width: 22px;
  height: 22px;
  margin: 0.2rem;
  cursor: pointer;
}

.back-btn {
  position: absolute;
  bottom: 12px;
  left: 15px;
}

// -- neon -- //
.neon {
  color: transparent;
  -webkit-text-stroke: 1px rgb(255, 255, 255);
  text-shadow: 0 0 10px rgb(255, 255, 255), 0 0 15px rgb(150, 150, 150);
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
</style>
