<template>
  <div class="chat flex">
    <h1 class="chat-tll flex">Chat Room</h1>

    <!--Firebase から取得したリストを描画-->
    <transition-group name="chat" tag="div" class="list content">
      <!--chatの中の{ key, name, image, message }をそれぞれ取得-->
      <section
        v-for="{ key, name, image, message } in chat"
        :key="key"
        class="item"
      >
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
    <form action="" @submit.prevent="doSend" class="form flex">
      <textarea
        v-model="input"
        placeholder="メッセージを入力"
        :disabled="!user.uid"
        @keydown.enter.exact.prevent="doSend"
      ></textarea>
      <!-- ユーザーでなければ無効化 -->
      <button type="submit" :disabled="!user.uid" class="send-button">
        <img src="../assets/矢印icon.jpg" class="send-img" alt="送信" />
      </button>
    </form>
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
      input: "", // 入力したメッセージ
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      // ログイン状態ならuserが取得できる
      this.user = user ? user : {};
      //firebase.database()で以下のデータベースの読み書きを行う。
      const ref_message = firebase.database().ref("message");
      //「ref_message」という関数にデータベージ上の「message」を格納。
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
        message: message.message,
      });
      this.scrollBottom();
      //スクロールの一番下に追加。
    },
    doSend() {
      if (this.user.uid && this.input.length) {
        //  firebaseに書き込まれたメッセージを追加
        firebase
          .database()
          .ref("message")
          .push(
            {
              message: this.input,
              name: this.user.displayName,
              image: this.user.photoURL,
            },
            () => {
              this.input = ""; // フォームを空にする
            }
          );
      }
    },
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

.header {
  display: none;
}

.chat {
  width: 100%;
  flex-direction: column;
  &-tll {
    width: 100%;
    color: #fff;
    font-family: "Roboto", sans-serif;
    background-color: #000000;
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
  .form {
    width: 98%;
    position: fixed;
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
</style>
