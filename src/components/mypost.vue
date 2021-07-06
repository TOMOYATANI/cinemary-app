<template>
  <div class="profile-posts">
    <paginate
      name="paginate-listData"
      tag="ol"
      :list="listData"
      :per="3"
      v-if="listData.length !== 0"
    >
      <List v-for="list in paginated('paginate-listData')" :list="list" :key="list.id" />
    </paginate>
    <div v-else class="nothing flex">投稿はありません</div>
    <paginate-links
      for="paginate-listData"
      name="paginate-listData"
      :async="true"
      class="pagination flex"
      :show-step-links="true"
      :style="listData == '' ? 'display:none;' : 'display:flex;'"
    ></paginate-links>
  </div>
</template>

<script>
import firebase from "firebase";
import List from "@/components/list.vue";
import Vue from "vue";
import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);

export default {
  data() {
    return {
      listData: [],
      paginate: ["paginate-listData"],
      currentUserBookmarkIds: []
    };
  },
  components: {
    List
  },
  methods: {
    updateData() {
      //ログイン中ユーザーがブックマークしたリスト
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
            console.log(this.currentUserBookmarkIds);
          });
          firebase
            .firestore()
            .collection("posts")
            .orderBy("time", "desc")
            .where("uid", "==", this.$route.params.uid)
            //uidをフィルタリングして現在のURLと合致するもののみを参照
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                //forEachで全てのドキュメントに対して
                if (this.currentUserBookmarkIds.includes(doc.data().id)) {
                  //this.currentUserBookmarkIdsに「id」が含まれていたら、
                  this.listData.push({
                    ...doc.data(),
                    isBookmarked: true
                  });
                } else {
                  this.listData.push({
                    ...doc.data(),
                    isBookmarked: false
                  });
                }
                console.log(doc.data().id);
                console.log(this.currentUserBookmarkIds);
                console.log(this.listData);
                //...doc.data()としてバラした「posts」の投稿データとisBookmarkedを代入。
              });
            });
        });
    }
  },
  watch: {
    //watchプロパティは、指定した要素の変更を監視するもの
    "$route.params.uid": {
      //対象のオブジェクト
      handler: function() {
        this.listData = [];
        this.updateData();
        //処理
      },
      deep: true,
      //入れ子になったデータ（オブジェクトのプロパティ）を監視する場合、handlerとdeep:trueのどちらも必須。
      immediate: true
      //ページが読み込まれた時に処理を行いたい場合は、immediate: trueを設置。
    }
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

hr.separate {
  width: 70%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid #646464;
  margin: 1rem 0;
  padding: 0;
}

// -- テンプレート -- //

.mypage {
  width: 100%;
  flex-direction: column;
  background-color: $black-color;
  &-inner {
    width: 70%;
    margin-top: 5rem;
  }

  .post-list {
    width: 60%;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    justify-content: flex-start;
  }

  .profile-posts {
    width: 90%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-bottom: 3rem;
  }
}

.mypage-icon {
  width: 100%;
}

.mypage-other {
  width: 100%;
}

.nothing {
  color: $white-color;
  font-family: "Roboto", sans-serif;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 5rem;
}

// -- ネオンカラー -- //

.neon {
  color: transparent;
  -webkit-text-stroke: 0.5px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
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

.mypage-inner .profile-inner-l {
  @include md {
    padding: 1rem;
  }
}

.mypage-inner .profile-inner-r {
  @include md {
    padding: 1rem;
  }
}

.nothing {
  @include sm {
    font-size: 0.95rem;
    padding: 3rem;
  }
}
</style>
