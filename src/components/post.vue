<template>
  <div id="app">
    <div class="post-inner">
      <button @click="show" class="post-comment flex">
        <img class="comment-icon" src="../assets/コメント.jpg" alt="コメント" />
      </button>
      <modal class="modal-inner" name="post" :width="750" :height="550">
        <div class="modal-header flex">
          <h2 class="post-tll flex">Chinemaryを投稿する</h2>
          <hr class="separate" />
        </div>
        <div class="modal-body">
          <div class="post-items flex">
            <div class="post-contens flex">
              <img
                class="item-img"
                src="../assets/タイトル.jpg"
                alt="タイトル"
              />
              <input
                type="text"
                class="post-item blank"
                placeholder="タイトル"
                v-model="title"
              />
            </div>
            <div class="post-contens flex">
              <img class="item-img" src="../assets/自己紹介.jpg" alt="内容" />
              <textarea
                class="post-item"
                name="text"
                id=""
                cols="10"
                rows="1"
                v-model="description"
                placeholder="内容"
              ></textarea>
            </div>
            <div class="post-contens post-img flex">
              <img class="item-img" src="../assets/画像.jpg" alt="画像" />
              <input type="text" class="post-item" v-model="image" />
              <button class="btn-img">画像選択</button>
            </div>
            <div class="post-contens flex">
              <img
                class="item-img"
                src="../assets/好きなジャンル.jpg"
                alt="好きなジャンル"
              />
              <select v-model="genre" class="post-select" name="好きなジャンル">
                <option class="post-item" :value="genre" hidden
                  >ジャンルを選択</option
                >
                <option
                  v-for="genre in genres"
                  :value="genre.name"
                  :key="genre.id"
                  class="post-item"
                >
                  {{ genre.name }}
                </option>
              </select>
            </div>
            <button class="post-btn" @click.prevent="postItem">投稿</button>
            <button class="hide-btn flex" @click="hide">×</button>
          </div>
        </div>
      </modal>
      <div class="search-inner flex">
        <h2 class="search-tll flex">Chinemaryを検索する</h2>
        <hr class="separate" />
        <div class="search-main-contens flex">
          <input
            type="text"
            class="search-main-item"
            placeholder="例）アクション  恋愛  ミステリー  SF  ホラー  ミュージカル  etc.."
            v-model="title"
          />
        </div>
        <div class="search-items flex">
          <div class="search-contens flex">
            <img class="item-img" src="../assets/タイトル.jpg" alt="タイトル" />
            <input
              type="text"
              class="search-item"
              placeholder="タイトル"
              v-model="title"
            />
          </div>
          <div class="search-contens flex">
            <img
              class="item-img"
              src="../assets/好きなジャンル.jpg"
              alt="好きなジャンル"
            />
            <select class="search-select">
              <option class="search-item" hidden>ジャンルを選択</option>
              <option
                v-for="searchGenre in searchGenres"
                :value="searchGenre.name"
                :key="searchGenre.id"
                class="search-item"
              >
                {{ searchGenre.name }}
              </option>
            </select>
          </div>
          <button class="search-btn">
            <img src="../assets/検索icon.jpg" alt="検索" class="search-icon" />
          </button>
        </div>
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

export default {
  data() {
    return {
      db: null,
      time: "",
      title: "",
      description: "",
      image: "",
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
    };
  },
  components: {},
  methods: {
    // postItem()が押下されたら、dbインスタンスを初期化して"posts"という名前のコレクションへの参照
    postItem() {
      firebase
        .firestore()
        .collection("posts")
        .add({
          title: this.title,
          description: this.description,
          image: this.image,
          genre: this.genre,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          //サーバ側で値設定
        });
      this.$swal({
        title: "内容確認",
        text: "この内容で投稿しますか？",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$swal("投稿しました。", {
            icon: "success",
          });
        } else {
          this.$swal("キャンセルしました。");
        }
      });
    },
    show() {
      this.$modal.show("post");
    },
    hide() {
      this.$modal.hide("post");
    },
  },
};
</script>

<style scoped lang="scss">
// -- 共通 -- //

::placeholder {
  color: #444;
  font-size: 1rem;
  padding-left: 0.25rem;
}

hr.separate {
  width: 60%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid #3a3939;
  margin: 2rem 0;
  padding: 0;
}

textarea {
  resize: vertical;
}

textarea::placeholder {
  color: #444;
  font-size: 1rem;
  padding-left: 0.25rem;
  padding-top: 1rem;
}

// -- search -- //

.search-inner {
  width: 100%;
  flex-direction: column;
  .search-tll {
    width: 80%;
    padding-top: 3rem;
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
      color: #444;
      font-size: 1rem;
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
        color: #444;
        font-size: 1rem;
      }
      .search-select {
        width: 15rem;
        outline: none;
        border: none;
        font-size: 1rem;
        color: #444;
        height: 3rem;
        border-bottom: 1px solid #ddd;
        margin-right: 2rem;
      }
    }
    .search-btn {
      width: 25px;
      height: 25px;
      cursor: pointer;
      border: none;
      outline: none;
      .search-icon {
        width: 100%;
        height: 100%;
      }
    }
  }
}

// -- post -- //

.post-inner {
  width: 100%;
  position: relative;
  flex-direction: column;
  .post-comment {
    position: fixed;
    top: 100px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50% 50%;
    box-shadow: 0px 0px 1px;
    background-color: rgba(35, 146, 236, 0.925);
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
  position: relative;
  .modal-header {
    flex-direction: column;
    .post-tll {
      padding-top: 3rem;
    }
  }
  .modal-body {
    .post-items {
      flex-direction: column;
      .post-img {
        position: relative;
      }
      .post-contens {
        position: relative;
        margin: 0.8rem;
        .post-select {
          width: 17rem;
          outline: none;
          border: none;
          font-size: 0.9rem;
          color: #444;
          height: 3rem;
          border-bottom: 1px solid #ddd;
        }
        .btn-img {
          position: absolute;
          left: 50px;
          bottom: 8px;
          width: 4.5rem;
          color: #fff;
          background-color: #afafaf;
          padding: 0.3rem;
          border-radius: 1rem;
          text-decoration: none;
          cursor: pointer;
          border: none;
          outline: none;
          font-weight: bold;
        }
        .item-img {
          width: 35px;
          height: 35px;
          margin-right: 0.8rem;
        }
        .post-item {
          width: 17rem;
          outline: none;
          border: none;
          height: 3rem;
          border-bottom: 1px solid #ddd;
          color: #444;
          font-size: 1rem;
        }
      }
    }
    .post-btn {
      width: 5rem;
      margin: 2rem;
      color: #fff;
      background-color: #06baf1;
      padding: 0.5rem;
      border-radius: 1rem;
      text-decoration: none;
      cursor: pointer;
      border: none;
      outline: none;
      font-weight: bold;
    }
    .hide-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      font-weight: bold;
      border: 2px solid #2db2ff;
      color: #2db2ff;
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
</style>
