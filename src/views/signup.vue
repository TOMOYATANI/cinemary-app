<template>
  <div id="app">
    <Header />
    <div class="signup flex">
      <div class="signup-inner flex">
        <h2>新規登録</h2>
        <input type="text" placeholder="Email" v-model="email" />
        <input type="password" placeholder="Password" v-model="password" />
        <button class="btn-signup" @click.prevent="signUp">登録</button>
        <p>
          既に登録済みの方は
          <router-link to="/signin">こちらへ</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Vue from 'vue'
import VueSwal from 'vue-swal'
Vue.use(VueSwal)

export default {
  name: "Signup",
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
    //以下、「メールアドレス」と「パスワード」を使った新規登録の実装。
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        //ユーザーから提供されたメールアドレスとパスワードを検証し、それらをcreateUserWithEmailAndPassword メソッドに渡す。
        // .then(() => {
        //   firebase
        //     .auth()
        //     .currentUser.updateProfile({
        //       displayName: this.username,
        //     })
        .then((willDelete) => {
          if (willDelete) {
            this.$swal("登録に成功しました。", {
              icon: "success",
            });
            this.$router.push("/signin");
          }
        })
        .catch(() => {
          this.$swal("登録情報が正しくありません。", {
            icon: "error",
          });
        });
    },
  },
};
</script>

<style scoped lang="scss">
.signup {
  height: 90vh;
  flex-flow: column nowrap;
  background-color: rgba(211, 211, 211, 0.24);
  .signup-inner {
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
    h2 {
      font-weight: normal;
      margin-bottom: 0.5rem;
    }

    a {
      color: #eb6100;
    }
    input {
      margin: 10px 0;
      padding: 10px;
    }
    .btn-signup {
      width: 5rem;
      margin: 1rem;
      color: #fff;
      background-color: #eb6100;
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
}
</style>
