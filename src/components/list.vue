<template>
  <div class="list">
    <div class="face face1 flex">
      <div class="content">
        <img
          class="profile-icon"
          width="50"
          height="50"
          :src="
            returnUserData() ? returnUserData().uploadedImage.fileUrl : preview
          "
        />
        <h3>{{ list.title }}</h3>
      </div>
    </div>
    <div class="face face2 flex">
      <div class="content flex">
        <button class="hide-btn" @click="deletePost">×</button>
        <p>{{ list.description }}</p>
        <router-link :to="`/chat/${list.id}`" class="join-btn flex">ルームへ参加</router-link>
        <!-- 「list.id」propsで親コンポーネントから取得したidを取得。-->
        <img
          src="../assets/ブックマーク保存.jpg"
          alt="ブックマーク"
          class="bookmark-icon"
          @click="saveBookmark"
        />
        <img
          src="../assets/ブックマーク未保存.jpg"
          alt="ブックマーク"
          class="bookmark-icon"
          @click="deleteBookmark"
        />
        <p class="post-time">{{ list.time.toDate().toLocaleString() }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);

export default {
  data() {
    return {
      bookmarkId: "",
      userDatas: [],
      preview: require("../assets/デフォルト画像.jpg")
    };
  },
  props: {
    //親コンポーネントから子コンポーネントに文字列、数値、配列やオブジェクトなどの値を渡す
    list: {
      type: Object,
      required: true
      //親コンポーネント(board.vue)のlist[Object型]をpropsで渡している。
    },
    index: {
      type: Number
      //親コンポーネント(board.vue)のindex[Number型]をpropsで渡している。
    },
    bookmark: {
      type: Object,
      required: true,
      default:() => {},
    }
  },

  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.userDatas.push(JSON.parse(JSON.stringify(doc.data())));
        });
      });
  },

  methods: {
    returnUserData() {
      const userData = this.userDatas.find(
        tmpUserData => this.list.uid === tmpUserData.uid
      );
      //this.userDatas（配列）に入っている値(uid)は、userDatas.uidとしても直接取れない為、tmpUserDataの引数に渡してからuidを取得する
      //そのuidとidが一致したものを一つuserData（配列）へ格納。
      return userData;
    },

    // hasBookmark(book) {
    //   // ブックマークリスト内にbook idがあればtrue それ以外はfalse
    //   return this.bookmarkList.some(value => value.id === book.id);
    // },

    saveBookmark() {
      const ref = firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.uid)
        .collection("bookmarks")
        .doc();

      const id = ref.id;

      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.uid)
        .collection("bookmarks")
        .doc(id)
        .set({
          bookmarkId: id,
          ...this.list,
          time: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          this.$swal("ブックマークに追加しました。", {
            icon: "success"
          });
        })
        .catch(() => {
          this.$swal("ブックマークを追加出来ません。", {
            icon: "error"
          });
        });
    },

    deleteBookmark() {
      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.uid)
        .collection("bookmarks")
        .doc(this.list.bookmarkId)
        .delete()
        .then(() => {
          this.$swal("ブックマークを取り消ししました。", {
            icon: "success"
          });
          this.$router.go({
            path: `/bookmark/${this.$route.params.uid}`,
            force: true
          });
        })
        .catch(() => {
          this.$swal("ブックマークを取り消し出来ません。", {
            icon: "error"
          });
        });
    },

    deletePost() {
      const currentUser = firebase.auth().currentUser;
      this.uid = currentUser.uid;

      if (this.list.uid == this.uid) {
        this.$swal({
          title: "内容確認",
          text: "投稿を削除しますか？",
          icon: "warning",
          buttons: true,
          dangerMode: true
        })
          .then(willDelete => {
            if (willDelete) {
              firebase
                .firestore()
                .collection("posts")
                .doc(this.list.id)
                .delete()
                .then(() => {
                  this.$swal("投稿を削除しました", {
                    icon: "success"
                  });
                  this.$router.go({
                    path: `/board/${this.$route.params.uid}`,
                    force: true
                  });
                })
                .catch(() => {
                  this.$swal("投稿を削除出来ません。", {
                    icon: "error"
                  });
                });
            } else {
              this.$swal("キャンセルしました。");
            }
          })
          .catch(() => {
            this.$swal("投稿を削除出来ません。", {
              icon: "error"
            });
          });
      }
    }
  }
};
</script>

<style scoped lang="scss">
// -- 変数 -- //

$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- 共通 -- //

a {
  text-decoration: none;
  color: $black-color;
}

div {
  color: $white-color;
}

// -- テンプレート -- //

.join-btn {
  outline: none;
  border: none;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
}

.list {
  width: 300px;
  height: 400px;
  position: relative;
  margin: 0 1rem;
  flex-direction: column;
  display: flex;
  .face {
    width: 300px;
    height: 200px;
    transition: 0.4s;
  }
  .face.face1 .content {
    opacity: 0.2;
    transition: 0.5s;
    text-align: center;
    .profile-icon {
      border-radius: 50%;
    }
    h3 {
      font-size: 1em;
      color: $white-color;
      text-align: center;
    }
  }
  .face.face1 {
    position: relative;
    background: #333;
    align-content: center;
    z-index: 1;
    transform: translateY(100px);
    box-shadow: 0px 0px 3px whitesmoke;
  }
  .face.face2 {
    position: relative;
    background: whitesmoke;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px);
    .content {
      width: 100%;
      flex-direction: column;
    }
    .content p,
    .join-btn {
      font-size: 10pt;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .content .join-btn {
      width: 50%;
      color: black;
      box-sizing: border-box;
      outline: 1px dashed #333;
      padding: 10px;
      margin: 15px 0 0;
      display: inline-block;
      text-align: center;
    }
    .content .post-time {
      position: absolute;
      bottom: 0;
      right: 0;
    }
    .content .bookmark-icon {
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}

.bookmark-icon {
  width: 15px;
  height: 15px;
  margin: 0.2rem;
  cursor: pointer;
}

.hide-btn {
  position: absolute;
  top: 7px;
  right: 10px;
  font-size: 18px;
  font-weight: bold;
  color: $black-color;
  cursor: pointer;
  outline: none;
  border: none;
  transition: 0.2s;
  background-color: white;
}

// -- ネオン -- //

.list:hover .face.face1 {
  transform: translateY(0);
  box-shadow: inset 0 0 60px whitesmoke, inset 20px 0 80px #f0f,
    inset -20px 0 80px #0ff, inset 20px 0 300px #f0f, inset -20px 0 300px #0ff,
    0 0 50px #fff, -10px 0 80px #f0f, 10px 0 80px #0ff;
}

.list:hover .face.face1 .content {
  opacity: 1;
}

.list .face.face1 .content .join-btn {
  transition: 0.5s;
}
.list:hover .face.face2 {
  transform: translateY(0);
}

.list .face.face2 .content .join-btn:hover {
  background: #333;
  color: whitesmoke;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
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
</style>
