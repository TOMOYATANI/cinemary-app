<template>
  <div class="post-content">
    <button
      @click="
        show();
        openModal();
      "
      class="post-comment flex"
    >
      <img class="comment-icon" src="../assets/コメント.jpg" alt="コメント" />
    </button>
    <modal
      class="modal-inner"
      v-scroll-lock="open"
      name="post"
      :width="750"
      :height="550"
    >
      <div
        data-modal="post"
        aria-expanded="true"
        class="vm--overlay"
        styles="background: rgba(255, 255, 255, 0.1);"
      >
        <div class="vm--top-right-slot"></div>
      </div>
      <div class="modal-header flex">
        <h2 class="post-title flex">Cinemaryを投稿する</h2>
        <hr class="separate" />
      </div>
      <div class="modal-body">
        <div class="post-items flex">
          <div class="post-contens flex">
            <input
              type="text"
              class="post-item"
              maxlength="50"
              placeholder="タイトル"
              v-model="title"
            />
          </div>
          <div class="post-contens flex">
            <textarea-autosize
              name="text"
              rows="1"
              v-model="description"
              placeholder="内容"
              maxlength="50"
              :min-height="70"
              :max-height="70"
            ></textarea-autosize>
          </div>
          <div class="post-contens flex">
            <select
              v-model="genre"
              class="post-select"
              :style="{ color: genre == '' ? 'gray' : 'white' }"
            >
              <option class="post-item" value hidden>ジャンルを選択</option>
              <option
                v-for="genre in genres"
                :value="genre.name"
                :key="genre.id"
                class="post-item"
                style="color: white;"
                >{{ genre.name }}</option
              >
            </select>
          </div>
          <button class="post-btn" @click.prevent="postItem">投稿</button>
          <button
            class="hide-btn flex"
            @click="
              hide();
              closeModal();
            "
          >
            ×
          </button>
        </div>
      </div>
    </modal>
    <div class="search-inner flex">
      <h2 class="search-tll neon flex">Cinemaryを検索する</h2>
      <hr class="separate" />
      <div class="search-main-contens flex">
        <!-- <ais-instant-search
          :search-client="searchClient"
          index-name="cinemary-app"
        >
          <ais-search-box
            placeholder="例）アクション  恋愛  ミステリー  SF  ホラー  ミュージカル  etc.."
            class="search-main-item"
          />
        </ais-instant-search> -->
        <!-- <input
          type="text"
          class="search-main-item"
          placeholder="例）アクション  恋愛  ミステリー  SF  ホラー  ミュージカル  etc.."
        /> -->
        <!-- </div> -->
        <!-- <div class="search-items flex">
        <div class="search-contens flex">
          <input type="text" class="search-item" placeholder="タイトル" />
        </div>
        <div class="search-contens flex">
          <select
            class="search-select"
            v-model="searchGenre"
            :style="{ color: genre == '' ? 'gray' : 'white' }"
          >
            <option class="search-item" value hidden>ジャンルを選択</option>
            <option
              v-for="searchGenre in searchGenres"
              :value="searchGenre.name"
              :key="searchGenre.id"
              class="search-item"
              style="color: white;"
              >{{ searchGenre.name }}</option
            >
          </select>
        </div>
        <button class="search-btn">
          <img src="../assets/検索.jpg" alt="検索" class="search-icon" />
        </button> -->
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);
import VModal from "vue-js-modal";
Vue.use(VModal);
import VScrollLock from "v-scroll-lock";
Vue.use(VScrollLock);
import VueTextareaAutosize from "vue-textarea-autosize";
Vue.use(VueTextareaAutosize);
// import algoliasearch from "algoliasearch/lite";
// import "instantsearch.css/themes/satellite.css";

export default {
  data() {
    return {
      // searchClient: algoliasearch(
      //   "VRXF7X7FPR",
      //   "3b859896d42aa2c4576114dd3cd5735e"
      // ),
      db: null,
      time: "",
      title: "",
      description: "",
      genre: "",
      genres: [
        { id: 1, name: "アクション" },
        { id: 2, name: "ドラマ" },
        { id: 3, name: "恋愛" },
        { id: 4, name: "ホラー" },
        { id: 5, name: "戦争" },
        { id: 6, name: "音楽" },
        { id: 7, name: "ミュージカル" },
        { id: 8, name: "スポーツ" },
        { id: 9, name: "SF" },
        { id: 10, name: "青春" },
        { id: 11, name: "コメディ" },
        { id: 12, name: "アニメ" },
        { id: 13, name: "アドベンチャー・冒険" },
        { id: 14, name: "アート・コンテンボラリー" },
        { id: 15, name: "クライム" },
        { id: 16, name: "ドキュメンタリー" },
        { id: 17, name: "ショートフィルム・短編" },
        { id: 18, name: "サスペンス" },
        { id: 19, name: "ファミリー" },
        { id: 20, name: "スリラー" },
        { id: 21, name: "ヤクザ・任侠" },
        { id: 22, name: "ファンタジー" },
        { id: 23, name: "時代劇" },
        { id: 24, name: "ミステリー" },
        { id: 25, name: "伝記" },
        { id: 26, name: "西部劇" },
        { id: 27, name: "パニック" },
        { id: 28, name: "オムニバス" },
        { id: 29, name: "バイオレンス" },
        { id: 30, name: "歴史" },
        { id: 31, name: "ギャング・マフィア" },
      ],
      searchGenre: "",
      searchGenres: [
        { id: 1, name: "アクション" },
        { id: 2, name: "ドラマ" },
        { id: 3, name: "恋愛" },
        { id: 4, name: "ホラー" },
        { id: 5, name: "戦争" },
        { id: 6, name: "音楽" },
        { id: 7, name: "ミュージカル" },
        { id: 8, name: "スポーツ" },
        { id: 9, name: "SF" },
        { id: 10, name: "青春" },
        { id: 11, name: "コメディ" },
        { id: 12, name: "アニメ" },
        { id: 13, name: "アドベンチャー・冒険" },
        { id: 14, name: "アート・コンテンボラリー" },
        { id: 15, name: "クライム" },
        { id: 16, name: "ドキュメンタリー" },
        { id: 17, name: "ショートフィルム・短編" },
        { id: 18, name: "サスペンス" },
        { id: 19, name: "ファミリー" },
        { id: 20, name: "スリラー" },
        { id: 21, name: "ヤクザ・任侠" },
        { id: 22, name: "ファンタジー" },
        { id: 23, name: "時代劇" },
        { id: 24, name: "ミステリー" },
        { id: 25, name: "伝記" },
        { id: 26, name: "西部劇" },
        { id: 27, name: "パニック" },
        { id: 28, name: "オムニバス" },
        { id: 29, name: "バイオレンス" },
        { id: 30, name: "歴史" },
        { id: 31, name: "ギャング・マフィア" },
      ],
      open: false,
    };
  },
  components: {},
  methods: {
    // postItem()が押下されたら、dbインスタンスを初期化して"posts"という名前のコレクションへの参照
    postItem() {
      const currentUser = firebase.auth().currentUser;
      this.uid = currentUser.uid;
      const id = firebase
        .firestore()
        .collection("posts")
        .doc().id;
      //変数「id」に入れて、コレクションの"posts"を参照して、「id」を取得
      this.$swal({
        title: "内容確認",
        text: "この内容で投稿しますか？",
        icon: "info",
        buttons: true,
        dangerMode: true,
      })
        .then((willDelete) => {
          if (willDelete) {
            firebase
              .firestore()
              .collection("posts")
              .add({
                title: this.title,
                description: this.description,
                genre: this.genre,
                time: firebase.firestore.FieldValue.serverTimestamp(),
                //サーバ側で値設定
                id: id,
                //dataにデータを作ってないので、thisは付けなくてOK!
                uid: this.$route.params.uid,
              });
            this.$swal("投稿しました。", {
              icon: "success",
            });
            // this.$router.push({ path: `/board/${this.uid}`, force: true });
            //router.go(path:"/ ~ ")まで戻す。
          } else {
            this.$swal("キャンセルしました。");
          }
        })
        .catch(() => {
          this.$swal("投稿出来ませんでした。", {
            icon: "error",
          });
        });
    },
    // this.$swal({
    //   title: "内容確認",
    //   text: "この内容で投稿しますか？",
    //   icon: "info",
    //   buttons: true,
    //   dangerMode: true,
    // })
    //   .then(() => {
    //     firebase
    //       .firestore()
    //       .collection("posts")
    //       .add({
    //         title: this.title,
    //         description: this.description,
    //         genre: this.genre,
    //         time: firebase.firestore.FieldValue.serverTimestamp(),
    //         //サーバ側で値設定
    //         id: id,
    //         //dataにデータを作ってないので、thisは付けなくてOK!
    //         uid: this.$route.params.uid,
    //       });
    //     this.$swal("投稿しました。", {
    //       icon: "success",
    //     });
    //     // this.$router.go({ path: `/board/${this.uid}`, force: true });
    //     //router.go(path:"/ ~ ")まで戻す。
    //   })
    //   .catch(() => {
    //     this.$swal("キャンセルしました。");
    //   });

    show() {
      this.$modal.show("post");
    },
    hide() {
      this.$modal.hide("post");
    },
    openModal() {
      this.open = true;
    },
    closeModal() {
      this.open = false;
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

// -- 共通 -- //

::placeholder {
  color: gray;
  font-size: 1rem;
  padding-left: 0.25rem;
}

hr.separate {
  width: 60%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid $gray-color;
  margin: 2rem 0;
  padding: 0;
}

textarea {
  width: 25rem;
  outline: none;
  border: none;
  border-bottom: 1px solid #ddd;
  color: $white-color;
  font-size: 1rem;
  background-color: $black-color;
}

textarea::placeholder {
  color: gray;
  font-size: 1rem;
  padding-left: 0.25rem;
}

// -- 検索フォーム -- //

.search-inner {
  width: 100%;
  flex-direction: column;
  padding-top: 3rem;
  background-color: $black-color;
  .search-tll {
    width: 80%;
    padding-top: 3rem;
    color: $white-color;
    font-family: "Roboto", sans-serif;
    display: flex;
  }
  .search-main-contens {
    position: relative;
    margin: 0.8rem;
    .search-main-item {
      width: 30rem;
      outline: none;
      border: none;
      height: 2.5rem;
      border-bottom: 1px solid #ddd;
      color: $white-color;
      font-size: 1rem;
      background-color: $black-color;
    }
  }
  .search-items {
    .search-contens {
      position: relative;
      margin: 0.8rem;
      .item-img {
        width: 35px;
        height: 35px;
        margin-right: 0.8rem;
      }
      .search-item {
        width: 15rem;
        outline: none;
        border: none;
        height: 2.5rem;
        border-bottom: 1px solid #ddd;
        color: $white-color;
        font-size: 1rem;
        background-color: $black-color;
      }
      .search-select {
        width: 15rem;
        outline: none;
        border: none;
        font-size: 1rem;
        color: $white-color;
        height: 3rem;
        border-bottom: 1px solid #ddd;
        margin-right: 2rem;
        background-color: $black-color;
      }
    }
    .search-btn {
      width: 25px;
      height: 25px;
      background-color: $black-color;
      cursor: pointer;
      border: none;
      outline: none;
      .search-icon {
        margin-top: 0.4rem;
        width: 100%;
        height: 100%;
      }
    }
  }
}

// -- algolia --//

.ais-SearchBox-input {
  width: 30rem;
  outline: none;
  border: none;
  height: 2.5rem;
  border-bottom: 1px solid #ddd;
  color: $white-color;
  font-size: 1rem;
  background-color: $black-color;
}

// -- 投稿フォーム -- //

.post-content {
  width: 100%;
  position: relative;
  flex-direction: column;
  background-color: $black-color;
  .post-comment {
    position: fixed;
    top: 130px;
    right: 45px;
    width: 60px;
    height: 60px;
    border-radius: 50% 50%;
    box-shadow: inset 0 0 50px rgb(2, 149, 247), inset 20px 0 80px #015dc7,
      inset -20px 0 80px rgb(0, 132, 255), inset 20px 0 300px #015dc7,
      inset -20px 0 300px rgb(0, 132, 255), 0 0 40px rgb(0, 130, 252),
      -10px 0 80px #015dc7, 10px 0 80px rgb(0, 132, 255);
    border: none;
    cursor: pointer;
    outline: none;
    transition-duration: 0.5s;
    .comment-icon {
      width: 30px;
      height: 30px;
    }
  }
  .post-comment:hover {
    transform: translateY(-5px);
  }
}

.modal-inner {
  position: fixed;
  .vm--overlay {
    background: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }
  .modal-header {
    flex-direction: column;
    background-color: $black-color;
    .post-title {
      padding-top: 3rem;
      color: $white-color;
      font-family: "Roboto", sans-serif;
    }
  }
  .modal-body {
    .post-items {
      flex-direction: column;
      background-color: $black-color;
      color: $white-color;
      padding-bottom: 4rem;
      .post-contens {
        margin: 0.8rem;
        .post-select {
          width: 25rem;
          outline: none;
          border: none;
          font-size: 1rem;
          color: $white-color;
          height: 3rem;
          border-bottom: 1px solid #ddd;
          background-color: $black-color;
        }
        .post-item {
          width: 25rem;
          outline: none;
          border: none;
          height: 3rem;
          border-bottom: 1px solid #ddd;
          color: $white-color;
          font-size: 1.1rem;
          background-color: $black-color;
        }
      }
    }
    .post-btn {
      display: inline-block;
      padding: 7px 30px;
      letter-spacing: 4px;
      overflow: hidden;
      color: #fff;
      background: #015dc7;
      box-shadow: 0 0 10px #015dc7, 0 0 40px #015dc7, 0 0 80px;
      outline: none;
      border: none;
      border-radius: 0.5rem;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
      margin-top: 4rem;
    }
    .hide-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      font-weight: bold;
      border: 2px solid $black-color;
      color: $black-color;
      border-radius: 100%;
      width: 25px;
      line-height: 22px;
      cursor: pointer;
      outline: none;
      transition: 0.2s;
      background-color: white;
    }
  }
  .hide-btn:hover {
    background: #333;
    border-color: #333;
    color: #fff;
  }
}

// -- ネオンカラー -- //

.neon {
  color: transparent;
  -webkit-text-stroke: 0.2px rgb(255, 0, 0);
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 50px rgba(255, 0, 0, 0.5);
}
</style>
