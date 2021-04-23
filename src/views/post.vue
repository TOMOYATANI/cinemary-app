<template>
  <div>
    <Header />
    <div class="post-inner flex">
      <h2 class="post-tll flex">Chinemaryを投稿する</h2>
      <hr class="separate" />

      <div class="post-items flex">
        <div class="post-contens flex">
          <img class="item-img" src="../assets/タイトル.jpg" alt="タイトル" />
          <input
            type="text"
            class="post-item blank"
            placeholder="タイトル"
            v-model="title"
          />
        </div>
        <div class="post-contens flex">
          <img class="item-img" src="../assets/自己紹介.jpg" alt="内容" />
          <input
            type="text"
            class="post-item"
            placeholder="内容"
            v-model="description"
          />
        </div>
        <div class="post-contens post-img flex">
          <img class="item-img" src="../assets/画像.jpg" alt="画像" />
          <input type="text" class="post-item blank" v-model="image" />
          <button class="btn-img">画像選択</button>
        </div>
        <div class="post-contens flex">
          <img
            class="item-img"
            src="../assets/好きなジャンル.jpg"
            alt="好きなジャンル"
          />
          <select v-model="genre" name="好きなジャンル">
            <option class="post-item" value="好きなジャンル" hidden
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
        <button class="btn" @click.prevent="postItem">投稿</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);

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
    };
  },
  components: {
    Header,
  },
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
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

select {
  width: 15rem;
  outline: none;
  border: none;
  font-size: 1rem;
  color: #444;
  height: 2.5rem;
  border-bottom: 1px solid #ddd;
}

::placeholder {
  color: #444;
  font-size: 1rem;
  padding-left: 0.25rem;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-inner {
  width: 100%;
  height: 90vh;
  flex-direction: column;
  .post-tll {
    width: 80%;
    padding-top: 2rem;
  }
}
.post-items {
  flex-direction: column;

  .post-contens {
    position: relative;
    margin: 0.8rem;
    .item-img {
      width: 35px;
      height: 35px;
      margin-right: 0.8rem;
    }
    .post-item {
      width: 15rem;
      outline: none;
      border: none;
      height: 2.5rem;
      border-bottom: 1px solid #ddd;
      color: #444;
      font-size: 1rem;
    }
  }
  .btn {
    width: 5rem;
    margin: 2rem;
    color: #fff;
    background-color: #06baf1;
    padding: 0.5rem;
    border-radius: 1rem;
    text-decoration: none;
    cursor: pointer;
    cursor: hand;
    border: none;
    outline: none;
    font-weight: bold;
  }
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

.post-img {
  position: relative;
  .btn-img {
    position: absolute;
    left: 45px;
    bottom: 5px;
    width: 5rem;
    color: #fff;
    background-color: #afafaf;
    padding: 0.5rem;
    border-radius: 1rem;
    text-decoration: none;
    cursor: pointer;
    cursor: hand;
    border: none;
    outline: none;
    font-weight: bold;
  }
}
</style>
