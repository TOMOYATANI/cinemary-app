<template>
  <div class="profile-posts">
    <paginate name="paginate-listData" class="paginate-pctb" tag="ol" :list="listData" :per="3">
      <List
        v-for="(list, index) in paginated('paginate-listData')"
        :index="index"
        :list="list"
        :key="list.id"
      />
    </paginate>
    <paginate-links
      for="paginate-listData"
      name="paginate-listData"
      :async="true"
      class="pagination paginate-pctb flex"
      :show-step-links="true"
      :style="listData == '' ? 'display:none;' : 'display:flex;'"
    ></paginate-links>
  </div>
</template>

<script>
import firebase from "firebase";
import List from "@/components/list.vue";
import Vue from "vue";
import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);

export default {
  data() {
    return {
      profileData: {},
      listData: [],
      paginate: ["paginate-listData"],
    };
  },
  components: {
    List
  },

  created() {
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

<style lang="scss">
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
  width: 100%;
  flex-direction: column;
  background-color: $black-color;
  &-inner {
    width: 70%;
    margin-top: 5rem;
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

.mypage-inner .profile-inner-l {
  @include sp {
    padding: 1rem;
  }
}

.mypage-inner .profile-inner-r {
  @include sp {
    padding: 1rem;
  }
}
</style>
