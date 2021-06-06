<template>
  <div>
    <Header />
    <Post @searchData="search" />
    <!--子コンポーネントから$emitで受けたデータを関数とする。※searchに()を付けるとvalueの引数が取れないので注意。-->
    <div class="post">
      <h2 id="top" class="post-tll neon">投稿一覧</h2>
      <div class="post-inner">
        <div class="post-items">
          <paginate name="paginate-log" tag="ol" :list="postData" :per="12">
            <List
              v-for="(list, index) in paginated('paginate-log')"
              :index="index"
              :list="list"
              :userDatas="userDatas"
              :key="list.id"
            />
          </paginate>
          <paginate-links
            for="paginate-log"
            class="pagination flex"
            v-scroll-to="postTop"
            :show-step-links="true"
          ></paginate-links>
          <!--postDataのデータをlist関数とindex関数にそれぞれ格納-->
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
import Vue from "vue";
import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);
const VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo);

export default {
  data() {
    return {
      title: "",
      contents: "",
      image: "",
      postData: [],
      paginate: ["paginate-log"],
      postTop: "#top",
      userDatas: [],
      searchData: []
    };
  },
  components: {
    Header,
    Post,
    List
  },

  methods: {
    // search() {
    //   //引数にvalue
    //   //ジャンルで絞る
    //   //postData内を一旦クリアさせてpush
    //   firebase
    //     .firestore()
    //     .collection("posts")
    //     .orderBy("genre")
    //     .orderBy("time", "desc")
    //     .get()
    //     .then(snapshot => {
    //       snapshot.forEach(doc => {
    //         this.postData.push({ ...doc.data(), id: doc.id });
    //       });
    //     });
    // }
    search(value) {
      if (value != "") {
        this.postData = this.postData.filter(v => {
          return ~v.genre.indexOf(value);
        });
      }
    }
  },
  created() {
    // "posts"コレクションの全ドキュメントを取得。
    firebase
      .firestore()
      .collection("posts")
      .orderBy("time", "desc")
      .get()
      .then(snapshot => {
        //"posts"(参照先)のスナップショットを得る
        snapshot.forEach(doc => {
          //上記で得たデータをforEachでドキュメントの数だけ"doc"データに格納
          this.postData.push({ ...doc.data(), id: doc.id });
          //更にpostDataの空配列に格納した"doc"データを格納
        });
        console.log(this.postData);
      });

    firebase
      .firestore()
      .collection("users")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.userDatas.push(JSON.parse(JSON.stringify(doc.data())));
        });
      });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");
// -- 変数 -- //

$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- 全体共通 -- //

#app {
  background-color: $black-color;
}

// -- 投稿一覧 -- //

.post {
  background-color: $black-color;
  &-tll {
    width: 220px;
    margin: 3rem;
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

// -- ページネーション --//

ol {
  width: 90%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.pagination {
  margin: 2rem;
  cursor: pointer;
}

.paginate-links {
  padding: 1rem;
  margin: 1rem;
  font-weight: bold;
  color: transparent;
  text-shadow: 0 0 10px rgb(255 255 255), 0 0 15px rgb(150 150 150);
}

ul.paginate-links > li.left-arrow > a {
  margin: 1rem;
}

ul.paginate-links > li.right-arrow > a {
  margin: 1rem;
}

ul.paginate-links > li.number > a {
  margin: 1rem;
}

ul.paginate-links > li.ellipses > a {
  margin: 1rem;
}

// -- neon --//

.neon {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1.5px rgb(255, 255, 255);
  text-shadow: 0 0 20px rgb(150, 150, 150), 0 0 20px rgb(150, 150, 150);
}
</style>
