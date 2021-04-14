<template>
  <div id="app">
    <Header />
    <div class="post-inner flex">
      <h2 class="post-tll flex">Chinemaryを投稿する</h2>
      <hr class="separate" />

      <div class="post-items flex">
        <div class="post-contens flex">
          <img class="item-img" src="../assets/タイトル.jpg" alt="タイトル" />
          <input type="text" class="post-item blank" placeholder="タイトル" v-model="title" />
        </div>
        <div class="post-contens flex">
          <img class="item-img" src="../assets/自己紹介.jpg" alt="内容" />
          <input type="text" class="post-item" placeholder="内容" v-model="description" />
        </div>
        <div class="post-contens post-img flex">
          <img class="item-img" src="../assets/画像.jpg" alt="画像" />
          <input type="text" class="post-item blank" v-model="image" />
          <button class="btn-img">画像選択</button>
        </div>
        <div class="post-contens flex">
          <img class="item-img" src="../assets/好きなジャンル.jpg" alt="好きなジャンル" />
          <select name="好きなジャンル">
            <option class="post-item" value="好きなジャンル" hidden>ジャンル</option>
            <option class="post-item" value="アクション">アクション</option>
            <option class="post-item" value="ドラマ">ドラマ</option>
            <option class="post-item" value="恋愛">恋愛</option>
            <option class="post-item" value="ホラー">ホラー</option>
            <option class="post-item" value="戦争">戦争</option>
            <option class="post-item" value="音楽">音楽</option>
            <option class="post-item" value="ミュージカル">ミュージカル</option>
            <option class="post-item" value="スポーツ">スポーツ</option>
            <option class="post-item" value="SE">SF</option>
            <option class="post-item" value="青春">青春</option>
            <option class="post-item" value="コメディ">コメディ</option>
            <option class="post-item" value="アニメ">アニメ</option>
            <option class="post-item" value="アドベンチャー・冒険">アドベンチャー・冒険</option>
            <option class="post-item" value="アート・コンテンボラリー">アート・コンテンボラリー</option>
            <option class="post-item" value="クライム">クライム</option>
            <option class="post-item" value="ドキュメンタリー">ドキュメンタリー</option>
            <option class="post-item" value="ショートフィルム・短編">ショートフィルム・短編</option>
            <option class="post-item" value="サスペンス">サスペンス</option>
            <option class="post-item" value="ファミリー">ファミリー</option>
            <option class="post-item" value="スリラー">スリラー</option>
            <option class="post-item" value="ヤクザ・任侠">ヤクザ・任侠</option>
            <option class="post-item" value="ファンタジー">ファンタジー</option>
            <option class="post-item" value="時代劇">時代劇</option>
            <option class="post-item" value="ミステリー">ミステリー</option>
            <option class="post-item" value="伝記">伝記</option>
            <option class="post-item" value="西部劇">西部劇</option>
            <option class="post-item" value="ヤクザ・任侠">ヤクザ・任侠</option>
            <option class="post-item" value="パニック">パニック</option>
            <option class="post-item" value="オムニバス">オムニバス</option>
            <option class="post-item" value="バイオレンス">バイオレンス</option>
            <option class="post-item" value="歴史">歴史</option>
            <option class="post-item" value="ギャング・マフィア">ギャング・マフィア</option>
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

export default {
  data() {
    return {
      db: null,
      time: "",
      title: "",
      description: "",
      image: "",
      genre: ""
    };
  },
  components: {
    Header
  },
  // mounted() {
  //   this.db = firebase.firestore().collection("posts");
  // },
  //何度も使う場合は、リファクタリングで関数で定義しておく。
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
          time: firebase.firestore.FieldValue.serverTimestamp()
          //サーバ側で値設定
        })
        .then(() => {
          confirm("投稿しますか？");
        });
    }
  }
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
