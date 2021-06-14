<template>
  <div>
    <Header />
    <div class="signup flex">
      <div class="signup-inner flex">
        <h2>新規登録</h2>
        <input type="text" placeholder="Username" v-model="name" />
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
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);

export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      uid: ""
    };
  },
  components: {
    Header
  },
  methods: {
    signUp() {
      let self = this;

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        //メールアドレスとパスワードを検証し、それらをcreateUserWithEmailAndPassword メソッドに渡す。

        .then(userCredential => {
          userCredential.user.updateProfile({
            //新規登録時に取得したemailとpasswordを引数として（userCredential）渡す。
            //userCredential引数に渡して新規登録したユーザーをFirebaseでプロフィール情報を登録。
            displayName: self.name,
            photoURL: require("../assets/デフォルト画像.jpg")
          });
          this.$swal("登録に成功しました。", {
            icon: "success"
          });
          this.uid = userCredential.user.uid;

          return firebase
            .firestore()
            .collection("users")
            .doc(this.uid)
            .set({
              name: this.name,
              time: firebase.firestore.FieldValue.serverTimestamp(),
              uid: userCredential.user.uid
              //各マイページにページ遷移出来るようにする為にuidをfirestoreに格納
            });
        })
        .then(() => {
          this.$router.push(`/mypage/${this.uid}`);
          //新規登録後、「/mypage/(該当ユーザー)」へページ遷移
        })
        .catch(() => {
          this.$swal("登録情報が正しくありません。", {
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

.signup {
  height: 90vh;
  background-color: rgba(20, 20, 20);
  .signup-inner {
    width: 35%;
    height: 60%;
    flex-direction: column;
    z-index: 1;
    font-weight: bold;
    color: gray;
    background-color: $black-color;
    padding: 2rem;
    box-shadow: 0 0 10px rgb(45, 45, 45);
    h2 {
      font-weight: normal;
      margin-bottom: 0.5rem;
      color: $white-color;
    }
    p {
      color: $white-color;
    }

    a {
      color: #fc8f01;
    }
    input {
      margin: 10px 0;
      padding: 10px;
      color: $black-color;
    }
    .btn-signup {
      width: 6rem;
      margin: 1rem;
      padding: 0.5rem;
      display: inline-block;
      overflow: hidden;
      letter-spacing: 2px;
      color: #fff;
      background: #fc8f01;
      box-shadow: 0 0 10px #fc8f01, 0 0 40px #fc8f01, 0 0 80px;
      outline: none;
      border: none;
      border-radius: 0.5rem;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
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

.signup .signup-inner {
  @include sp {
    width: 60%;
    left: 21%;
  }
}
</style>
