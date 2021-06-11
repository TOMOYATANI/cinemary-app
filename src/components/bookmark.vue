<template>
  <div>
    <Header />
    <div class="bookmarkList flex">
      <h3 class="bookmarkList-title flex">{{ profileData.name }} さんのブックマーク一覧</h3>
      <hr class="separate" />
      <div class="bookmarkList-posts">
        <!-- PC・タブレット用ページネーション -->
        <paginate
          name="paginate-bookmarkList"
          class="paginate-pctb"
          tag="ol"
          :list="bookmarkList"
          :per="3"
          v-if="bookmarkList.length !== 0"
        >
          <List
            v-for="(list) in paginated('paginate-bookmarkList')"
            :list="list"
            :bookmark="bookmarklist"
            :key="list.id"
          />
        </paginate>

        <div v-else class="nothing flex">ブックマークされた投稿はありません</div>
        <paginate-links
          for="paginate-bookmarkList"
          name="paginate-bookmarkList"
          :async="true"
          class="pagination paginate-pctb flex"
          :show-step-links="true"
          :style="bookmarkList == '' ? 'display:none;' : 'display:flex;'"
        ></paginate-links>
        <!--スマホ用ページネーション -->
        <!-- <paginate
          name="paginate-bookmarkList"
          class="paginate-sp"
          tag="ol"
          :list="bookmarkList"
          :per="3"
          v-if="bookmarkList.length !== 0"
        >
          <List v-for="(list) in paginated('paginate-bookmarkList')" :list="list" :key="list.id" />
        </paginate>

        <div v-else class="nothing flex">ブックマークされた投稿はありません</div>
        <paginate-links
          for="paginate-bookmarkList"
          name="paginate-bookmarkList"
          :async="true"
          class="pagination paginate-sp flex"
          :show-step-links="true"
          :style="bookmarkList == '' ? 'display:none;' : 'display:flex;'"
        ></paginate-links>-->
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
      bookmarkList: []
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

    firebase
      .firestore()
      .collection("users")
      .doc(this.$route.params.uid)
      .collection("bookmarks")
      .orderBy("time", "desc")
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.bookmarkList.push(doc.data());
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
    padding: 13rem;
  }
}

// -- メディアクエリ -- //

$breakpoint-pc: 1440px;
$breakpoint-tablet: 1024px;
$breakpoint-mobile: 600px;

@mixin pc {
  @media (max-width: ($breakpoint-pc)) {
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

// .paginate-pctb {
//   @include pc {
//     display: flex !important;
//   }
//   @include tab {
//     display: flex !important;
//   }
//   @include sp {
//     display: none !important;
//   }
// }

// .paginate-sp {
//   @include pc {
//     display: none !important;
//   }
//   @include tab {
//     display: none !important;
//   }
//   @include sp {
//     display: flex !important;
//   }
// }
</style>
