<template>
  <div id="app">
    <Header />
    <Search />
    <br />
    <div class="post">
      <h2 class="post-tll">投稿一覧</h2>
      <div class="post-inner">
        <div class="post-items">
          <List v-for="(list,index) in allData" :index="index" :list="list" :key="list.id" />
          <!--allDataのデータをlist関数とindex関数にそれぞれ格納-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Search from "@/components/search.vue";
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
    Search,
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
  }
};
</script>

<style scoped lang="scss">
.post {
  .post-tll {
    width: 220px;
    margin-top: 3rem;
    margin-left: 10rem;
    z-index: 1;
    color: gray;
    background-color: white;
    border-radius: 1rem;
    padding: 0.8rem;
    box-shadow: 0 0 10px lightgrey;
    text-align: center;
  }
  .post-inner {
    width: 100%;
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    .post-items {
      width: 90%;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
    }
  }
  &-inner {
    width: 100%;
    height: 40rem;
  }
}
</style>
