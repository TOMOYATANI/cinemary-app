<template>
  <div class="profile-list">
    <ul class="list-item">
      <li class="list-items">
        性別：
        <div class="list-color">{{ profileData.sex }}</div>
      </li>
      <li class="list-items">
        年齢：
        <div class="list-color">{{ profileData.age }}</div>
      </li>
      <li class="list-items">
        職業：
        <div class="list-color">{{ profileData.profession }}</div>
      </li>
      <li class="list-items">
        居住地：
        <div class="list-color">{{ profileData.access }}</div>
      </li>
      <li class="list-items">
        好きな映画：
        <div class="list-color">{{ profileData.favMovie }}</div>
      </li>
      <li class="list-items">
        好きなジャンル：
        <div class="list-color">{{ profileData.genre }}</div>
      </li>
      <li class="list-items">
        自己紹介：
        <div class="list-color">{{ profileData.selfpr }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      profileData: {}
    };
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
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- テンプレート -- //

.profile-list {
  width: 50%;
  display: flex;
  margin: 3rem;
  color: $white-color;
  .list-items {
    display: flex;
    justify-content: start;
    color: rgb(130, 130, 130);
    .list-color {
      color: $white-color;
      font-weight: bold;
      margin: 0 1rem;
    }
  }
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

.profile-list .list-items .list-color {
  @include sp {
    font-size: 0.9rem;
  }
}

.profile-list .list-items {
  @include sp {
      width: 330px;
    font-size: 0.9rem;
  }
}
</style>
