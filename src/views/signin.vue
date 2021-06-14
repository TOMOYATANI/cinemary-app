<template>
  <div>
    <Header />
    <div class="signin flex">
      <div class="signin-inner flex">
        <h2>ログイン</h2>
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button class="btn" @click.prevent="signIn">ログイン</button>
        <p>
          アカウントをお持ちでない方は
          <router-link to="/signup">こちらへ</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);

export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  components: {
    Header
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        //ユーザーがログインフォームへ入力したら、signInWithEmailAndPassword メソッドを呼び出す。
        .then(res => {
          this.$swal("ログインに成功しました。 ", {
            icon: "success"
          });
          this.uid = res.user.uid;

          return firebase
            .firestore()
            .collection("users")
            .doc(this.uid)
            .get();
        })
        .then(() => {
          this.$router.push(`/mypage/${this.uid}`);
        })
        .catch(() => {
          this.$swal("ログイン情報が間違っています。", {
            icon: "error"
          });
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

.signin {
  height: 90vh;
  background-color: rgba(20, 20, 20);
  .signin-inner {
    width: 35%;
    height: 55%;
    flex-direction: column;
    z-index: 1;
    font-weight: bold;
    color: gray;
    background-color: $black-color;
    padding: 2rem;
    box-shadow: 0 0 10px rgb(45, 45, 45);
  }
  h2 {
    font-weight: normal;
    margin-bottom: 0.5rem;
    color: $white-color;
  }
  p {
    color: $white-color;
  }
  a {
    color: #008deb;
  }
  input {
    margin: 10px 0;
    padding: 10px;
    color: $black-color;
  }
  .btn {
    width: 6rem;
    margin: 1rem;
    padding: 0.5rem;
    display: inline-block;
    overflow: hidden;
    letter-spacing: 2px;
    color: #fff;
    background: #2f84e6;
    box-shadow: 0 0 10px #2f84e6, 0 0 40px #2f84e6, 0 0 80px;
    outline: none;
    border: none;
    border-radius: 0.5rem;
    font-weight: bold;
    font-size: 0.9rem;
    cursor: pointer;
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

.signin .signin-inner {
  @include sp {
    width: 60%;
    left: 21%;
  }
}
</style>
