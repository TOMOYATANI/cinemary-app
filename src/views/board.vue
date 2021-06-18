<template>
  <div>
    <Header />
    <Search v-model="searchWord" />
    <Post />
    <div class="post">
      <h2 id="top" class="post-tll neon">投稿一覧</h2>
      <div class="post-inner">
        <div class="post-items paginate-pctb">
          <paginate
            name="paginate-log"
            tag="ol"
            :list="filteredPostData"
            :per="12"
            v-if="filteredPostData.length !== 0"
          >
            <!-- filteredPostDataにて該当する投稿がある場合、表示。 -->
            <List
              v-for="(list, index) in paginated('paginate-log')"
              :index="index"
              :list="list"
              :key="list.id"
            />
          </paginate>
          <div v-else class="nothing">" {{ searchWord }} " に該当する投稿はありませんでした。</div>
          <!-- filteredPostDataにて該当する投稿がない場合、上記を表示させる。 -->
          <paginate-links
            for="paginate-log"
            name="paginate-log"
            class="pagination flex"
            v-scroll-to="postTop"
            :async="true"
            :show-step-links="true"
            :style="
              (filteredPostData.length !== 0) == ''
                ? 'display:none;'
                : 'display:flex;'
            "
          ></paginate-links>
          <!-- filteredPostDataにて該当する投稿がない場合、非表示。投稿がある場合、表示。 -->
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
import Search from "@/components/search.vue";
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
      searchWord: ""
      // currentUserBookmarkList: []
    };
  },
  components: {
    Header,
    Post,
    List,
    Search
  },
  computed: {
    filteredPostData() {
      if (this.searchWord != "") {
        return this.postData.filter(v => {
          return ~v.genre.indexOf(this.searchWord);
          //検索内容(this.searchWord)と同じ内容(genre)を持つ要素の位置を返す。存在しない場合、-1を返す。
          //しかし、-1は今回ない為、「~v」とビット反転演算子(符号を反転してマイナス1した数)を使って、-1 → 0となる。
        });
      } else {
        return this.postData;
        //サーチ内容がない場合はそのまま、それ以外はフィルタ結果を返す
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
          this.postData.push(doc.data());
          //更にpostDataの空配列に格納した"doc"データを格納
        });
      });

    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(this.uid)
    //   .collection("bookmarks")
    //   .orderBy("time", "desc")
    //   .get()
    //   .then(snapshot => {
    //     snapshot.forEach(doc => {
    //       this.currentUserBookmarkList.push(doc.data());
    //     });
    //   });

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

// -- テンプレート -- //

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
  .nothing {
    color: $white-color;
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 8rem;
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

// --ネオン --//

.neon {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1.5px rgb(255, 255, 255);
  text-shadow: 0 0 20px rgb(150, 150, 150), 0 0 20px rgb(150, 150, 150);
}

// -- メディアクエリ -- //

$breakpoint-pc: 1025px;
$breakpoint-tablet: 1024px;
$breakpoint-mobile: 600px;

@mixin pc {
  @media (min-width: ($breakpoint-pc)) {
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

.post-tll {
  @include sp {
    width: 175px;
    margin-left: 5rem;
    padding: 0.5rem;
  }
}
</style>
