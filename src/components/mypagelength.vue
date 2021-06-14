<template>
  <div class="mypage-length">
    <div class="profile-inner flex">
      <div class="item-inner">
        <div class="post">
          <div class="txt">{{ cardData.length }}</div>
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
      cardData: [],
      bookmarkData: []
    };
  },

  created() {
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
          this.cardData.push({ ...doc.data(), id: doc.id });
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

$breakpoint-tablet: 1024px;
$breakpoint-mobile: 600px;

@mixin pc {
  @media (min-width: ($breakpoint-tablet)) {
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

p {
  @include sp {
    font-size: 13px;
    margin: 0.9rem;
  }
}
</style>
