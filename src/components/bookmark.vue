<template>
  <div>
    <Header />
    <div class="bookmarkList flex">
      <h2 class="bookmarkList-title flex">
        {{ bookmarkData.name }} さんのブックマーク一覧
      </h2>
      <hr class="separate" />
      <h3 class="bookmarkList-lists flex"></h3>
      <div class="profile-posts">
        <paginate
          name="paginate-bookmarkList"
          tag="ol"
          :list="bookmarkList"
          :per="3"
        >
          <List
            v-for="(list, index) in paginated('paginate-bookmarkList')"
            :index="index"
            :list="list"
            :key="list.id"
          />
        </paginate>
        <paginate-links
          for="paginate-bookmarkList"
          class="pagination flex"
          :show-step-links="true"
          :style="bookmarkList == '' ? 'display:none;' : 'display:flex;'"
        >
        </paginate-links>
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
      bookmarkData: {},
      paginate: ["paginate-bookmarkList"],
      bookmarkList: [],
    };
  },
  components: {
    Header,
    List,
  },
  created() {
    const currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;

    firebase
      .firestore()
      .collection("users")
      .doc(this.$route.params.uid)
      .get()
      .then((snapshot) => {
        this.bookmarkData = snapshot.data();
        //   .then((doc) => {
        //     this.bookmarkData.push(doc.data());
      });
    console.log(this.bookmarkData);
  },
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
  width: 70%;
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
  .profile-posts {
    width: 90%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
/* <====== Media Queries======> */
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
</style>
