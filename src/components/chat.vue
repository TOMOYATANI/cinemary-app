<template>
  <div class="chat">
    <h1 class="chat-tll flex">
      <div class="flash neon">Chat Room</div>
    </h1>
    <!--Firebase から取得したリストを描画-->
    <transition-group name="chat" tag="div" class="list content">
      <!--chatの中の{ key, name, image, message }をそれぞれ取得-->
      <section v-for="{ key, name, image, message } in chat" :key="key" class="item">
        <!--「画像」の指定-->
        <div class="item-image">
          <img :src="image" width="40" height="40" />
        </div>
        <!--「名前」と「メッセージ」の指定-->
        <div class="item-detail">
          <div class="item-name">{{ name }}</div>
          <div class="item-message">
            <nl2br tag="div" :text="message" />
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
// 改行を <br> タグに変換するモジュール

export default {
  components: { Nl2br },
  data() {
    return {
      user: {}, // ユーザー情報
      chat: [], // 取得したメッセージを入れる配列
      input: "" // 入力したメッセージ
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
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
      //イベントのときにデータベース内の「message」データを取得。
      // データベースに新しい要素が追加されると随時呼び出される
      this.chat.push({
        key: snap.key,
        name: message.name,
        image: message.image,
        message: message.message
      });
      this.scrollBottom();
      //スクロールの一番下に追加。
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        //  firebaseに書き込まれたメッセージを追加
        firebase
          .database()
          .ref(this.$route.params.id)
          .push(
            {
              message: this.input,
              name: this.user.displayName,
              image: this.user.photoURL
            },
            () => {
              this.input = ""; // フォームを空にする
            }
          );
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

* {
  color: $black-color;
}

.header {
  display: none;
}

.chat {
  width: 100%;
  height: 100vh;
  flex-direction: column;
  background-color: rgba(20, 20, 20);
  &-tll {
    width: 100%;
    color: #fff;
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
    max-width: 600px;
    .item {
      position: relative;
      display: flex;
      align-items: flex-end;
      margin: 0.8em;
    }
    .item-image {
      img {
        border-radius: 20px;
        vertical-align: top;
      }
    }
    .item-detail {
      margin: 0 0 0 1.4em;
      .item-name {
        font-size: 75%;
      }
      .item-message {
        display: inline-block;
        position: relative;
        margin: 0 0 0 20px;
        padding: 10px;
        max-width: 460px;
        border-radius: 12px;
        background: #00ec0ccb;
        z-index: 5;
      }
      .item-message::before {
        position: absolute;
        content: " ";
        display: block;
        left: -16px;
        bottom: 12px;
        border: 4px solid transparent;
        border-right: 12px solid #00ec0ccb;
      }
    }
  }
  .list {
    width: 100%;
    margin-bottom: 100px;
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
