<template>
  <div>
    <Header />
    <Post />
    <div class="post">
      <h2 class="post-tll neon">投稿一覧</h2>
      <div class="post-inner">
        <div class="post-items">
          <List v-for="(list, index) in allData" :index="index" :list="list" :key="list.id" />
          <!--allDataのデータをlist関数とindex関数にそれぞれ格納-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Post from "@/components/post.vue";
import List from "@/components/list.vue";

export default {
  data() {
    return {
      title: "",
      contents: "",
      image: "",
      allData: []
    };
  },
  components: {
    Header,
    Post,
    List
  },
  created() {
    // "posts"コレクションの全ドキュメントを取得。
    firebase
      .firestore()
      .collection("posts")
      .get()
      .then(snapshot => {
        //"posts"(参照先)のスナップショットを得る
        snapshot.forEach(doc => {
          //上記で得たデータをforEachでドキュメントの数だけ"doc"データに格納
          this.allData.push(doc.data());
          //更にallDataの空箱に格納した"doc"データを格納
        });
      });
  },
  methods: {
    //  // firebase databaseからコーヒーデータをダウンロード
    //  loadCoffeeView() {
    //    const imageRef = firebase
    //      .database()
    //      .ref('users') //firebase database の beans に保存したデータを参照
    //      .orderByChild('createdAt'); //並び替え
    //    // 過去に登録したイベントハンドラを削除
    //    imageRef.off('child_added');
    //    // ここで保存データを抜き取り
    //    imageRef.on('child_added',(Snapshot) => {
    //      const imageId = Snapshot.key;
    //      const imageData = Snapshot.val();

    //     //  this.lct = ; //ここでURLが抜き取られる
    //    });
    //  },
    //firebase storageからコーヒーの画像データをダウンロード
    downloadCoffeeImages(uploadUrl) {
      firebase
        .storage()
        .ref(uploadUrl)
        .getDownloadURL()
        .then(data => {
          this.image = data;
        })
        .catch(error => {
          console.error("画像をダウンロードできませんでした。", error);
        });
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");
// -- 変数 -- //

$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

#app {
  background-color: $black-color;
}

.post {
  background-color: $black-color;
  &-tll {
    width: 220px;
    margin-top: 3rem;
    margin-left: 10rem;
    z-index: 1;
    font-family: "Roboto", sans-serif;
    background-color: white;
    border-radius: 1rem;
    padding: 0.8rem;
    box-shadow: 0 0 20px lightgrey;
    text-align: center;
    background-color: $black-color;
  }
  &-inner {
    width: 100%;
    display: flex;
    justify-content: center;
    .post-items {
      width: 90%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
}

// -- neon --//

.neon {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1.5px rgb(255, 255, 255);
  text-shadow: 0 0 20px rgb(150, 150, 150), 0 0 20px rgb(150, 150, 150);
}
</style>
