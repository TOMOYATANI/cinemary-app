<template>
  <div class="mypage-icon">
    <div class="profile-inner flex">
      <img
        class="profile-inner-img"
        :src="preview == '' ? uploadedImage.fileUrl : preview"
        alt="プロフィール画像"
      />
      <!--returnUserData(userid)にて一致したものの画像を表示。無ければpreviewに格納しているデフォルトを画像を表示。-->
      <div class="profile-inner-name txt">{{ profileData.name }}</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      profileData: {},
      file: "",
      preview: "",
      uploadedImage: {
        fileUrl: require("../assets/デフォルトの画像.jpg"),
        time: null
      }
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
          this.$set(
            this,
            "uploadedImage",
            this.profileData.uploadedImage || this.uploadedImage
          );
          //変更検知がvue側で行わせる為にset()を使用。
        });
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

.mypage-icon {
  .profile-inner {
    width: 100%;
    flex-direction: column;
    &-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
    }
    &-name {
      font-weight: bold;
      font-size: 20px;
      padding: 1rem;
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

.mypage-icon .profile-inner-img {
  @include sp {
    width: 180px;
    height: 180px;
  }
}

.mypage-icon .profile-inner-name {
  @include sp {
    font-size: 18px;
    padding: 0.9rem;
  }
}
</style>
