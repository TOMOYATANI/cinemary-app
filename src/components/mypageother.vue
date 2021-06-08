<template>
  <div class="mypage-other">
    <div class="profile-inner flex">
      <Mypagelength />
      <hr class="separate" />
      <Mypageedit
        :style="
              this.uid == this.$route.params.uid
                ? 'display:flex;'
                : 'display:none;'
            "
      />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Mypageedit from "@/components/mypageedit.vue";
import Mypagelength from "@/components/mypagelength.vue";

export default {
  components: {
    Mypageedit,
    Mypagelength
  },

  created() {
    const currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;
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

.mypage-other {
  .profile-inner {
    width: 100%;
    flex-direction: column;
  }
}
</style>
