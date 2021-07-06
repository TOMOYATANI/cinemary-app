<template>
  <div>
    <Header />
    <div class="bookmarkList flex">
      <h3 class="bookmarkList-title flex">{{ profileData.name }} さんのブックマーク一覧</h3>
      <hr class="separate" />
      <div class="bookmarkList-posts">
        <paginate
          name="paginate-bookmarkList"
          tag="ol"
          :list="bookmarkList"
          :per="12"
          v-if="bookmarkList.length !== 0"
        >
          <List v-for="list in paginated('paginate-bookmarkList')" :list="list" :key="list.id" />
          <!-- data内にあるbookmarkList配列から、v-forディレクティブを使って1つずつ要素を取り出し描画。 -->
        </paginate>
        <div v-else class="nothing flex">ブックマークされた投稿はありません</div>
        <paginate-links
          for="paginate-bookmarkList"
          name="paginate-bookmarkList"
          :async="true"
          class="pagination flex"
          :show-step-links="true"
          :style="bookmarkList == '' ? 'display:none;' : 'display:flex;'"
        ></paginate-links>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import List from "@/components/list.vue";
import Vue from "vue";
import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);

export default {
  data() {
    return {
      profileData: {},
      paginate: ["paginate-bookmarkList"],
      bookmarkList: [],
      currentUserBookmarkIds: [],
      uid: null
    };
  },
  components: {
    Header,
    List
  },

  created() {
    firebase
      .firestore()
      .collection("users")
      .doc(this.$route.params.uid)
      .get()
      .then(snapshot => {
        this.profileData = snapshot.data();
      });

    //ログイン中ユーザーがブックマークしたリスト
    firebase
      .firestore()
      .collection("users") //「users」コレクションを参照
      .doc(this.$route.params.uid) //現在表示中ユーザーを参照
      .collection("bookmarks") //「bookmarks」サブコレクションを参照
      .orderBy("time", "desc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          //forEachで全てのドキュメントに対して
          this.currentUserBookmarkIds.push(doc.data().postId);
          //「postId」を追加し、this.currentUserBookmarkIdsへ格納
        });
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
            this.bookmarkList.push({
              ...doc.data(),
              isBookmarked: true
            });
            //...doc.data()としてバラした「posts」の投稿データとisBookmarkedを代入。
          }
        });
      });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");
// -- 変数 -- //
$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);
// -- 共通 -- //
.txt {
  color: $white-color;
}
hr.separate {
  width: 60%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid #646464;
  margin: 1rem 0;
  padding: 0;
}

// -- マイページ -- //
.bookmarkList {
  width: 100%;
  padding: 5rem 0;
  flex-direction: column;
  background-color: $black-color;

  &-title {
    padding-top: 3rem;
    color: $white-color;
    font-family: "Roboto", sans-serif;
    font-style: italic;
  }

  &-list {
    width: 60%;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    justify-content: flex-start;
  }
  .bookmarkList-posts {
    width: 90%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .nothing {
    color: $white-color;
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 10rem 2rem;
    margin-bottom: 8rem;
  }
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

.bookmarkList .nothing {
  @include md {
    font-size: 1rem;
    margin: 13rem 2rem;
    margin-bottom: 15rem;
    padding: 0;
  }
  @include sm {
    font-size: 1rem;
    margin: 14rem 2rem;
    margin-bottom: 15rem;
    padding: 0;
  }
}
</style>
