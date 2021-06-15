import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/main.vue";
import Signin from "../views/signin.vue";
import Signup from "../views/signup.vue";
import About from "../views/about.vue";
import Mypage from "../views/mypage.vue";
import Board from "../views/board.vue";
import Chat from "../components/chat.vue";
import Bookmark from "../components/bookmark.vue";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/mypage/:uid",
    name: "Mypage",
    component: Mypage,
    meta: { requiresAuth: true },
    //このルートは認証が必要であることの状態をもたせている。
  },
  {
    path: "/mypage",
    name: "Mypage",
    component: Mypage,
    meta: { requiresAuth: true },
    //このルートは認証が必要であることの状態をもたせている。
  },
  {
    path: "/board/:uid",
    name: "Board",
    component: Board,
  },
  {
    path: "/board",
    name: "Board",
    component: Board,
  },
  {
    path: "/chat/:id",
    ///「:id」とすることで、Firestoreで取得した「id」先へページ遷移できる。
    name: "Chat",
    component: Chat,
    meta: { requiresAuth: true },
  },
  {
    path: "/bookmark/:uid",
    name: "Bookmark",
    component: Bookmark,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  //ページ遷移が起こる直前にその関数が実行。
  //引数のto,fromには，現在遷移しようとしているルーティングの遷移先ルートと遷移元ルートの情報が入ってる。
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  //requiresAuthの状態をもつルートレコードなのかを確認。
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        next();
      } else {
        next({
          path: "/signin",
          query: { redirect: to.fullPath },
        });
      }
    });
  } else {
    next();
    //同じ階層にある要素を取得できるが、対象要素の次に配置されている要素だけを取得。
  }
});

export default router;
