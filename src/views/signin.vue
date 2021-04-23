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
      password: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    //以下、「メールアドレス」と「パスワード」を使ったサインインの実装。
    signIn() {
      firebase
        .auth()
        //.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        .signInWithEmailAndPassword(this.email, this.password)
        //ユーザーがフォームに入力したら、signInWithEmailAndPassword メソッドを呼び出します。
        .then((willDelete) => {
          if (willDelete) {
            this.$swal("ログインに成功しました。", {
              icon: "success",
            });
            this.$router.push("/mypage");
          }
          //return firebase.auth().signInWithEmailAndPassword(email, password);
        })
        .catch(() => {
          this.$swal("ログイン情報が間違っています。", {
            icon: "error",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

.signin {
  height: 90vh;
  flex-flow: column nowrap;
  background-color: rgba(20, 20, 20);
  .signin-inner {
    width: 35%;
    height: 53%;
    flex-direction: column;
    z-index: 1;
    font-weight: bold;
    color: gray;
    background-color: $black-color;
    position: absolute;
    top: 30%;
    left: 35%;
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
</style>
