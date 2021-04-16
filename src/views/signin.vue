<template>
  <div id="app">
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
.signin {
  height: 90vh;
  flex-flow: column nowrap;
  background-color: rgba(211, 211, 211, 0.24);
  .signin-inner {
    width: 35%;
    height: 53%;
    flex-direction: column;
    z-index: 1;
    font-weight: bold;
    color: gray;
    background-color: white;
    position: absolute;
    top: 30%;
    left: 35%;
    padding: 2rem;
    box-shadow: 0 0 10px lightgrey;
  }
  h2 {
    font-weight: normal;
    margin-bottom: 0.5rem;
  }

  a {
    color: #008deb;
  }
  input {
    margin: 10px 0;
    padding: 10px;
  }
  .btn {
    width: 5rem;
    margin: 1rem;
    color: #fff;
    background-color: #008deb;
    padding: 0.5rem;
    border-radius: 1rem;
    text-decoration: none;
    cursor: pointer;
    cursor: hand;
    border: none;
    outline: none;
    font-weight: bold;
  }
}
</style>
