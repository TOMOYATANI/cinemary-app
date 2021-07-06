<template>
  <div class="mypage-length">
    <div class="profile-inner flex">
      <div class="item-inner">
        <div class="post">
          <div class="txt">{{ listData.length }}</div>
          <p>POSTS</p>
        </div>

        <div class="bookmark">
          <router-link :to="`/bookmark/${this.$route.params.uid}`">
            <div class="txt">{{ bookmarkData.length }}</div>
          </router-link>
          <p>BOOKMARK</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      listData: [],
      bookmarkData: []
    };
  },

  methods: {
    updateData() {
      const currentUser = firebase.auth().currentUser;
      this.uid = currentUser.uid;

      firebase
        .firestore()
        .collection("posts")
        .orderBy("time", "desc")
        .where("uid", "==", this.$route.params.uid)
        //uidをフィルタリングして現在のURLと合致するもののみを参照
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.listData.push(doc.data());
          });
        });

      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.uid)
        .collection("bookmarks")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            this.bookmarkData.push(doc.data());
          });
        });
    }
  },
  watch: {
    "$route.params.uid": {
      handler: function() {
        this.listData = [];
        this.bookmarkData = [];
        this.updateData();
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- テンプレート -- //

.txt {
  color: $white-color;
}

p {
  font-weight: bold;
  font-size: 15px;
  margin: 1rem;
}

.mypage-length {
  width: 100%;
  .profile-inner {
    width: 100%;
    .item-inner {
      display: flex;
      text-align: center;
    }
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

p {
  @include md {
    font-size: 13px;
    margin: 0.9rem;
  }
  @include md {
    font-size: 12px;
    margin: 0.4rem;
  }
}
</style>
