<template>
  <div class="mypage">
    <Header />
    <div class="mypage-inner flex">
      <div class="mypage-item flex">
        <Mypageicon class="mypage-icon" />
        <Mypageotherxllg class="mypage-other mypage-xllg" />
        <Mypageothermd class="mypage-other mypage-md" />
        <Mypageothersm class="mypage-other mypage-sm" />
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
import Mypageotherxllg from "@/components/mypageotherxllg.vue";
import Mypageothermd from "@/components/mypageothermd.vue";
import Mypageothersm from "@/components/mypageothersm.vue";
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
    Mypageotherxllg,
    Mypageothermd,
    Mypageothersm,
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
        });
    }
  }
};
</script>

<style scoped lang="scss">
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
    font-family: "Roboto", sans-serif;
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

.mypage .mypage-inner .mypage-item {
  @include md {
    width: 80%;
  }
  @include sm {
    width: 90%;
  }
}

.mypage .post-list {
  @include md {
    width: 60%;
    font-size: 1rem;
  }
  @include sm {
    width: 70%;
    font-size: 0.95rem;
  }
}
.mypage-xllg {
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
.mypage-md {
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
.mypage-sm {
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
