<template>
  <div id="app">
    <Header />
    <div class="profile-inner flex">
      <div class="profile-contens flex">
        <div class="profile-img-inner flex">
          <img
            :src="uploadedImage"
            width="200"
            height="200"
            class="profile-img"
            alt="プロフィール画像"
          />
          <button class="profile-txt profile-update" @click="update">
            プロフィール画像を編集する
          </button>
        </div>
        <div class="line"></div>
        <div class="profile-items flex">
          <div class="profile-contens flex">
            <img class="item-img" src="../assets/名前.jpg" alt="名前" />
            <input
              type="text"
              class="profile-item"
              placeholder="名前"
              v-model="name"
            />
          </div>
          <div class="profile-contens flex">
            <img class="item-img" src="../assets/性別.jpg" alt="性別" />
            <select v-model="sex" name="性別">
              <option class="post-item" value="性別" hidden>性別</option>
              <option
                v-for="sex in sexs"
                :value="sex.name"
                :key="sex"
                class="post-item"
              >
                {{ sex.name }}
              </option>
            </select>
          </div>
          <div class="profile-contens flex">
            <img class="item-img" src="../assets/年齢.jpg" alt="年齢" />
            <select v-model="age" name="年齢">
              <option class="post-item" value="年齢" hidden>年齢</option>
              <option
                v-for="age in ages"
                :value="age.name"
                :key="age"
                class="post-item"
              >
                {{ age.name }}
              </option>
            </select>
          </div>
          <div class="profile-contens flex">
            <img class="item-img" src="../assets/職業.jpg" alt="職業" />
            <select v-model="profession" name="職業">
              <option class="post-item" value="職業" hidden>職業</option>
              <option
                v-for="profession in professions"
                :value="profession.name"
                :key="profession"
                class="post-item"
              >
                {{ profession.name }}
              </option>
            </select>
          </div>
          <div class="profile-contens flex">
            <img class="item-img" src="../assets/自己紹介.jpg" alt="自己紹介" />
            <input
              type="text"
              class="profile-item selfpr"
              placeholder="自己紹介"
              v-model="selfpr"
            />
          </div>
          <div class="profile-contens flex">
            <img
              class="item-img"
              src="../assets/好きなジャンル.jpg"
              alt="好きなジャンル"
            />
            <select v-model="genre" name="好きなジャンル">
              <option class="post-item" value="ジャンル" hidden
                >ジャンル</option
              >
              <option
                v-for="genre in genres"
                :value="genre.name"
                :key="genre"
                class="post-item"
              >
                {{ genre.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button @click="updateBtn" class="btn flex">更新</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);
import VModal from 'vue-js-modal'
Vue.use(VModal);

export default {
  data() {
    return {
      name: "",
      sex: "",
      sexs: [{ name: "男性" }, { name: "女性" }, { name: "その他" }],
      age: "",
      ages: [
        { name: "10際未満" },
        { name: "10 ~ 19歳" },
        { name: "20 ~ 29歳" },
        { name: "30 ~ 39歳" },
        { name: "40 ~ 49歳" },
        { name: "50 ~ 59歳" },
        { name: "60 ~ 69歳" },
        { name: "70 ~ 79歳" },
        { name: "80際以上" },
      ],
      profession: "",
      professions: [
        { name: "公務員" },
        { name: "会社員" },
        { name: "自営業" },
        { name: "フリーランス" },
        { name: "パート・アルバイト" },
        { name: "専業主婦" },
        { name: "学生" },
        { name: "その他" },
      ],
      selfpr: "",
      genre: "",
      genres: [
        { id: 0, name: "ジャンル" },
        { id: 1, name: "アクション" },
        { id: 2, name: "ドラマ" },
        { id: 3, name: "恋愛" },
        { id: 4, name: "ホラー" },
        { id: 5, name: "戦争" },
        { id: 6, name: "音楽" },
        { id: 7, name: "ミュージカル" },
        { id: 8, name: "スポーツ" },
        { id: 9, name: "SF" },
        { id: 10, name: "青春" },
        { id: 11, name: "コメディ" },
        { id: 12, name: "アニメ" },
        { id: 13, name: "アドベンチャー・冒険" },
        { id: 14, name: "アート・コンテンボラリー" },
        { id: 15, name: "クライム" },
        { id: 16, name: "ドキュメンタリー" },
        { id: 17, name: "ショートフィルム・短編" },
        { id: 18, name: "サスペンス" },
        { id: 19, name: "ファミリー" },
        { id: 20, name: "スリラー" },
        { id: 21, name: "ヤクザ・任侠" },
        { id: 22, name: "ファンタジー" },
        { id: 23, name: "時代劇" },
        { id: 24, name: "ミステリー" },
        { id: 25, name: "伝記" },
        { id: 26, name: "西部劇" },
        { id: 27, name: "パニック" },
        { id: 28, name: "オムニバス" },
        { id: 29, name: "バイオレンス" },
        { id: 30, name: "歴史" },
        { id: 31, name: "ギャング・マフィア" },
      ],
      uploadedImage: "",
    };
  },
  components: {
    Header,
  },
  methods: {
    // postItem()が押下されたら、dbインスタンスを初期化して"posts"という名前のコレクションへの参照
    updateBtn() {
      firebase
        .firestore()
        .collection("users")
        .add({
          name: this.name,
          sex: this.sex,
          age: this.age,
          selfpr: this.selfpr,
          profession: this.profession,
          uploadedImage: this.uploadedImage,
          genre: this.genre,
          time: firebase.firestore.FieldValue.serverTimestamp(),
          //サーバ側で値設定
        });
      this.$swal({
        title: "内容確認",
        text: "この内容で投稿しますか？",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.$swal("投稿しました。", {
            icon: "success",
          });
        } else {
          this.$swal("キャンセルしました。");
        }
      });
    },
     show : function() {
      this.$modal.show('hello-world');
    },
    hide : function () {
      this.$modal.hide('hello-world');
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
}

select {
  width: 15rem;
  outline: none;
  border: none;
  font-size: 1rem;
  color: #444;
  height: 2.5rem;
  border-bottom: 1px solid #ddd;
}

::placeholder {
  color: #444;
  font-size: 1rem;
  padding-left: 0.25rem;
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile-inner {
  width: 100%;
  height: 90vh;
  flex-direction: column;
  .profile-tll {
    width: 80%;
    padding-top: 2rem;
  }
  .profile-contens {
    width: 100%;
    margin-top: 6rem;
    .profile-img-inner {
      width: 35%;
      flex-direction: column;
      .profile-update {
        cursor: pointer;
        border: none;
        outline: none;
        color: rgb(68, 126, 233);
        background-color: #fff;
        font-weight: bold;
        font-size: 1rem;
      }
      .profile-img {
        width: 200px;
        height: 185px;
        border-radius: 50% 50%;
        margin-left: 2rem;
      }
      .profile-txt {
        margin: 1rem;
        margin-left: 2rem;
      }
    }
    .profile-items {
      width: 35%;
      flex-direction: column;
      .profile-contens {
        .item-img {
          width: 35px;
          height: 35px;
          margin-right: 0.8rem;
        }
        position: relative;
        margin: 0.5rem;
        .profile-item {
          width: 15rem;
          outline: none;
          border: none;
          height: 2.5rem;
          border-bottom: 1px solid #ddd;
          color: #444;
          font-size: 1rem;
        }
      }
    }
  }
}

.btn {
  width: 5rem;
  margin: 3rem;
  color: #fff;
  background-color: #f10606;
  padding: 0.5rem;
  border-radius: 1rem;
  text-decoration: none;
  cursor: pointer;
  border: none;
  outline: none;
  font-weight: bold;
}

hr.separate {
  width: 70%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid #3a3939;
  margin: 1rem 0;
  padding: 0;
}

.line {
  content: "";
  top: 0;
  left: 50%;
  width: 1px;
  height: 25rem;
  background-color: #969090;
  z-index: 10;
}
</style>
