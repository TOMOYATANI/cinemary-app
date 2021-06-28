<template>
  <div class="about">
    <Header />
    <div class="about-inner flex">
      <Aboutcinemary />
      <Aboutflow />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Aboutcinemary from "@/components/aboutcinemary.vue";
import Aboutflow from "@/components/aboutflow.vue";

export default {
  name: "signOut",
  data() {
    return {
      authenticatedUser: ""
    };
  },
  components: {
    Header,
    Aboutcinemary,
    Aboutflow
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authenticatedUser = true;
      } else {
        this.authenticatedUser = false;
      }
    });
  }
};
</script>

<style scoped lang="scss">

// -- 変数 -- //

$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- テンプレート -- //

.about {
  width: 100%;
  .about-inner {
    width: 100%;
    flex-direction: column;
    background-color: $black-color;
  }
}

// -- ネオン -- //

.neon {
  -webkit-text-stroke: 0.2px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
}
</style>
