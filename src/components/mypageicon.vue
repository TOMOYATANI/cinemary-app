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
      font-family: "Roboto", sans-serif;
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

.mypage-icon .profile-inner-img {
  @include md {
    width: 180px;
    height: 180px;
  }
  @include sm {
    width: 150px;
    height: 150px;
  }
}

.mypage-icon .profile-inner-name {
  @include md {
    font-size: 18px;
    padding: 0.9rem;
  }
}
</style>
