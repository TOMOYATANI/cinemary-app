<template>
  <div class="mypage">
    <Header />
    <div class="mypage-inner flex">
      <div class="mypage-item flex">
        <Mypageicon class="mypage-icon" />
        <Mypageother class="mypage-other" />
      </div>
      <Mypageprofile />
      <hr class="separate" />
      <h3 class="post-list flex">{{ profileData.name }} さんの投稿一覧</h3>
      <Mypost />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Mypageicon from "@/components/mypageicon.vue";
import Mypageother from "@/components/mypageother.vue";
import Mypageprofile from "@/components/mypageprofile.vue";
import Mypost from "@/components/mypost.vue";
import Vue from "vue";
import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);

export default {
  data() {
    return {
      profileData: {},
      listData: [],
      paginate: ["paginate-listData"],
      bookmarkData: [],
      open: false
    };
  },
  components: {
    Header,
    Mypageicon,
    Mypageother,
    Mypageprofile,
    Mypost
  },

  created() {
    const currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;

    if (currentUser) {
      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.uid)
        .get()
        .then(snapshot => {
          this.profileData = snapshot.data();
          this.name = this.profileData.name || "";
          this.sex = this.profileData.sex || "";
          this.age = this.profileData.age || "";
          this.access = this.profileData.access || "";
          this.selfpr = this.profileData.selfpr || "";
          this.profession = this.profileData.profession || "";
          this.genre = this.profileData.genre || "";
          this.favMovie = this.profileData.favMovie || "";
        });
    }

    firebase
      .firestore()
      .collection("posts")
      .orderBy("time", "desc")
      .where("uid", "==", this.$route.params.uid)
      //uidをフィルタリングして現在のURLと合致するもののみを参照
      .get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          this.listData.push({ ...doc.data(), id: doc.id });
        });
      });
  }
};
</script>

<style scoped lang="scss">
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
  .mypage-inner {
    width: 100%;
    flex-direction: column;
    background-color: $black-color;
    .mypage-item {
      width: 70%;
    }
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

// -- ネオンカラー -- //

.neon {
  color: transparent;
  -webkit-text-stroke: 0.5px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
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

.mypage .post-list[data-v-1d5f4956] {
  @include sp {
    width: 60%;
    font-size: 1rem;
  }
}
</style>
