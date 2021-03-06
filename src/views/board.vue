<template>
  <div>
    <Header />
    <Search v-model="searchWord" />
    <Postxllg class="post-xllg" />
    <Postmd class="post-md" />
    <Postsm class="post-sm" />
    <div class="post">
      <h2 id="top" class="post-tll neon">投稿一覧</h2>
      <div class="post-inner">
        <div class="post-items">
          <paginate
            name="paginate-log"
            tag="ol"
            :list="filteredPostData"
            :per="12"
            v-if="filteredPostData.length !== 0"
          >
            <!-- filteredPostDataにて該当する投稿がある場合、表示。 -->
            <List v-for="list in paginated('paginate-log')" :list="list" :key="list.id" />
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
import Postxllg from "@/components/postxllg.vue";
import Postmd from "@/components/postmd.vue";
import Postsm from "@/components/postsm.vue";
import List from "@/components/list.vue";
import Search from "@/components/search.vue";
import Vue from "vue";
import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);
const VueScrollTo = require("vue-scrollto");
Vue.use(VueScrollTo, {
  offset: -120
});

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
      searchWord: "",
      currentUserBookmarkIds: []
    };
  },
  components: {
    Header,
    Postxllg,
    Postmd,
    Postsm,
    List,
    Search
  },
  computed: {
    filteredPostData() {
      if (this.searchWord != "") {
        return this.postData.filter(v => {
          return ~v.genre.indexOf(this.searchWord);
          //検索ワード「this.searchWord」が「genre」に存在する場合、結果を返す。
          //否定演算子を使って~v(-1) は 0 となるため、見つからなかった場合は、実行されない。
        });
      } else {
        return this.postData;
        //サーチ内容がない場合はそのまま、それ以外はフィルタ結果を返す
      }
    }
  },
  created() {
    //各ユーザーがブックマークしたリスト
    firebase
      .firestore()
      .collection("users") //「users」コレクションを参照
      .doc(this.$route.params.uid) //現在表示中ユーザーを参照
      .collection("bookmarks") //「bookmarks」サブコレクションを参照
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //forEachで全てのドキュメントに対して
          this.currentUserBookmarkIds.push(doc.data().postId);
          //「postId」を追加し、this.currentUserBookmarkIdsへ格納
        });
        firebase
          .firestore()
          .collection("posts") //「posts」コレクションを参照
          .orderBy("time", "desc")
          .get()
          .then(snapshot => {
            snapshot.forEach(doc => {
              //forEachで全てのドキュメントに対して
              if (this.currentUserBookmarkIds.includes(doc.data().id)) {
                //this.currentUserBookmarkIdsに「id」が含まれていたら、
                this.postData.push({
                  ...doc.data(),
                  isBookmarked: true
                });
                //isBookmarkedを追加。
              } else {
                this.postData.push({
                  ...doc.data(),
                  isBookmarked: false
                });
              }
            });
          });
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
    font-style: italic;
    font-size: 1.2rem;
    font-weight: bold;
    padding: 9rem;
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
  padding: 1rem;
}

ul.paginate-links > li.right-arrow > a {
  padding: 1rem;
}

ul.paginate-links > li.number > a {
  padding: 1rem;
}

ul.paginate-links > li.ellipses > a {
  padding: 1rem;
}

// --ネオン --//

.neon {
  display: inline-block;
  color: transparent;
  -webkit-text-stroke: 1.5px rgb(255, 255, 255);
  text-shadow: 0 0 20px rgb(150, 150, 150), 0 0 20px rgb(150, 150, 150);
}

// -- メディアクエリ -- //

$breakpoint-xl: 1025px;
$breakpoint-lg: 1024px;
$breakpoint-md: 600px;
$breakpoint-sm: 400px;

@mixin xl {
  @media (min-width: ($breakpoint-xl)) {
    @content;
  }
}
@mixin lg {
  @media (max-width: ($breakpoint-lg)) {
    @content;
  }
}
@mixin md {
  @media (max-width: ($breakpoint-md)) {
    @content;
  }
}
@mixin sm {
  @media (max-width: ($breakpoint-sm)) {
    @content;
  }
}

.post-tll {
  @include md {
    width: 200px;
    margin-left: 4rem;
    padding: 0.8rem;
  }
  @include sm {
    width: 150px;
    margin-left: 3rem;
    padding: 0.5rem;
    font-size: 1.3rem;
  }
}

.post .nothing {
  @include md {
    font-size: 1rem;
    padding: 0;
    margin: 8rem 2rem;
    margin-bottom: 11rem;
  }
  @include sm {
    font-size: 0.9rem;
    padding: 0;
    margin: 9rem 1rem;
    margin-bottom: 13rem;
  }
}

.post-xllg {
  @include xl {
    display: flex;
  }
  @include lg {
    display: flex;
  }
  @include md {
    display: none;
  }
  @include sm {
    display: none;
  }
}

.post-md {
  @include xl {
    display: none;
  }
  @include lg {
    display: none;
  }
  @include md {
    display: flex;
  }
  @include sm {
    display: none;
  }
}

.post-sm {
  @include xl {
    display: none;
  }
  @include lg {
    display: none;
  }
  @include md {
    display: none;
  }
  @include sm {
    display: flex;
  }
}
</style>
