<template>
  <div>
    <Header />
    <div class="mypage flex">
      <div class="mypage-inner flex">
        <div class="profile-inner flex">
          <img
            class="profile-inner-img"
            src="../assets/アイコン.jpg"
            alt="デフォルト画像"
          />
          <div class="profile-inner-name">{{ allData.name }}</div>
        </div>
        <div class="profile-inner2 flex">
          <div class="follow-inner">
            <div class="post">
              <div>0</div>
              <p>POSTS</p>
            </div>
            <div class="follow">
              <div>0</div>
              <p>FOLLOW</p>
            </div>
            <div class="follower">
              <div>0</div>
              <p>FOLLOWER</p>
            </div>
          </div>
          <hr class="separate" />
          <button
            @click="
              show();
              openModal();
            "
            class="profile-edit flex"
          >
            プロフィール編集
          </button>
          <modal
            class="modal-inner"
            v-scroll-lock="open"
            name="edit"
            :width="1100"
            :height="680"
          >
            <div class="modal-header flex">
              <h2 class="profile-tll flex">プロフィールを編集する</h2>
              <hr class="separate" />
            </div>
            <div class="modal-body">
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
                      <input
                        type="text"
                        class="profile-item"
                        placeholder="名前"
                        v-model="name"
                      />
                    </div>
                    <div class="profile-contens flex">
                      <select
                        class="profile-select"
                        v-model="sex"
                        :style="{ color: sex == '' ? 'gray' : 'white' }"
                      >
                        <option class="profile-item" value hidden>性別</option>
                        <option
                          v-for="sex in sexs"
                          :value="sex.name"
                          :key="sex.id"
                          class="profile-item"
                          style="color: white;"
                          >{{ sex.name }}</option
                        >
                      </select>
                    </div>
                    <div class="profile-contens flex">
                      <select
                        class="profile-select"
                        v-model="age"
                        :style="{ color: age == '' ? 'gray' : 'white' }"
                      >
                        <option class="profile-item" value hidden>年齢</option>
                        <option
                          v-for="age in ages"
                          :value="age.name"
                          :key="age.id"
                          class="profile-item"
                          style="color: white;"
                          >{{ age.name }}</option
                        >
                      </select>
                    </div>
                    <div class="profile-contens flex">
                      <select
                        class="profile-select"
                        v-model="profession"
                        :style="{ color: profession == '' ? 'gray' : 'white' }"
                      >
                        <option class="profile-item" value hidden>職業</option>
                        <option
                          v-for="profession in professions"
                          :value="profession.name"
                          :key="profession.id"
                          class="profile-item"
                          style="color: white;"
                          >{{ profession.name }}</option
                        >
                      </select>
                    </div>
                    <div class="profile-contens flex">
                      <textarea
                        name="text"
                        cols="10"
                        rows="1"
                        v-model="selfpr"
                        placeholder="自己紹介"
                      ></textarea>
                    </div>
                    <div class="profile-contens flex">
                      <select
                        class="profile-select"
                        v-model="genre"
                        :style="{ color: genre == '' ? 'gray' : 'white' }"
                      >
                        <option class="profile-item" value hidden
                          >好きなジャンル</option
                        >
                        <option
                          v-for="genre in genres"
                          :value="genre.name"
                          :key="genre.id"
                          class="profile-item"
                          style="color: white;"
                          >{{ genre.name }}</option
                        >
                      </select>
                    </div>
                  </div>
                </div>
                <button @click="updateBtn" class="update-btn flex">更新</button>
                <button class="hide-btn flex" @click="hide">×</button>
              </div>
            </div>
          </modal>
        </div>
      </div>
      <div class="profile-list">
        <ul class="list-item">
          <li class="list-item">性別：{{ allData.sex }}</li>
          <li class="list-item">年齢：{{ allData.age }}</li>
          <li class="list-item">職業：{{ allData.professions }}</li>
          <li class="list-item">居住地：</li>
          <li class="list-item">好きな映画：</li>
          <li class="list-item">好きなジャンル：{{ allData.genre }}</li>
          <li class="list-item">自己紹介：{{ allData.selfpr }}</li>
        </ul>
      </div>
      <hr class="separate" />
      <div class="profile-post flex">
        <h3>{{ allData.name }}の投稿一覧</h3>
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
import VModal from "vue-js-modal";
Vue.use(VModal);
import VScrollLock from "v-scroll-lock";
Vue.use(VScrollLock);

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
      allData: [],
      open: false,
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
    show: function() {
      this.$modal.show("edit");
    },
    hide: function() {
      this.$modal.hide("edit");
    },
    openModal() {
      this.open = true;
    },
    closeModal() {
      this.open = false;
    },
  },
  created() {
    firebase
      .firestore()
      .collection("users")
      .get()
      .then((snapshot) => {
        //"users"(参照先)のスナップショットを得る
        snapshot.forEach((doc) => {
          //上記で得たデータをforEachでドキュメントの数だけ"doc"データに格納
          this.allData.push(doc.data());
          //更にallDataの空箱に格納した"doc"データを格納
        });
      });
  },
  onFileChange(e) {
    const image = e.target.files; //選択された画像ファイルを選択
    this.file = image[0]; //画像ファイルを1つだけ選択

    // Firebase storageに保存するパスを決める
    // this.uploadUrl = `upload-images/${this.}`;
  },
  uploadImage() {
    //画像をfirebase storageに保存
    firebase
      .storage()
      .ref(this.uploadUrl) //さっき決めたパスを参照して、
      .put(this.file) //保存する
      .then(() => {
        //保存が成功したら、保存した画像ファイルの場所とともにfirebase databaseに保存する準備
        const imageData = {
          uploadUrl: this.uploadUrl,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        };
        // ここでfirebase databaseに保存する
        firebase
          .database()
          .ref("users") //保存する場所を参照して、
          .push(imageData) //追加で保存setメソッドを使うと上書きされる
          .then(() => {
            alert("画像が保存できました。");
            // this.$emit("", false); //親コンポーネントに伝達
          })
          .catch((error) => {
            console.error("画像が保存できませんでした。", error);
          });
      })
      .catch((error) => {
        console.error("エラー発生しました。", error);
      });
  },
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- 共通 -- //

::placeholder {
  color: gray;
  font-size: 1rem;
  padding-left: 0.2rem;
}

textarea {
  resize: vertical;
  width: 15rem;
  outline: none;
  border: none;
  height: 2rem;
  border-bottom: 1px solid #ddd;
  color: $white-color;
  font-size: 1rem;
  background-color: $black-color;
}

textarea::placeholder {
  color: gray;
  font-size: 1rem;
  padding-left: 0.2rem;
}

hr.separate {
  width: 70%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid #646464;
  margin: 1rem 0;
  padding: 0;
}

.line {
  content: "";
  top: 0;
  left: 50%;
  width: 1px;
  height: 25rem;
  background-color: #646464;
  z-index: 10;
}

// -- mypage -- //

.mypage {
  width: 100%;
  padding-top: 5rem;
  flex-direction: column;
  background-color: $black-color;
  &-inner {
    width: 70%;
    .profile-inner {
      width: 100%;
      flex-direction: column;
      &-img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
      }
      &-name {
        font-weight: bold;
        font-size: 20px;
        padding: 1rem;
      }
    }
    .profile-inner2 {
      width: 100%;
      flex-direction: column;
      .follow-inner {
        display: flex;
        text-align: center;
      }
      .profile-edit {
        width: 10rem;
        margin: 1rem;
        padding: 0.8rem;
        display: inline-block;
        overflow: hidden;
        letter-spacing: 2px;
        color: #fff;
        background: #2f84e6;
        box-shadow: 0 0 150px #2f84e6, 0 0 50px #2f84e6, 0 0 0px;
        outline: none;
        border: none;
        border-radius: 0.5rem;
        font-weight: bold;
        font-size: 0.9rem;
        cursor: pointer;
      }
      p {
        font-weight: bold;
        font-size: 15px;
        margin: 1rem;
      }
    }
  }
  .profile-list {
    width: 50%;
    display: flex;
    margin: 3rem;
    color: $white-color;
    li {
      display: flex;
      justify-content: start;
      opacity: 0.5;
    }
  }
  .profile-post {
    display: inline-block;
    width: 50%;
    height: 20rem;
  }
}

// -- profile-edit -- //

.profile-select {
  width: 15rem;
  outline: none;
  border: none;
  font-size: 1rem;
  color: $white-color;
  height: 2.5rem;
  border-bottom: 1px solid #ddd;
  background-color: $black-color;
}

.modal-inner {
  .modal-header {
    flex-direction: column;
    background-color: $black-color;
    .profile-tll {
      padding-top: 3rem;
      color: white;
      font-family: "Roboto", sans-serif;
    }
  }
  .modal-body {
    .profile-inner {
      width: 100%;
      flex-direction: column;
      background-color: $black-color;
      padding-bottom: 1rem;
      .profile-tll {
        width: 80%;
        padding-top: 1rem;
      }
      .profile-contens {
        width: 100%;
        margin-top: 1.5rem;
        background-color: $black-color;
        .item-img {
          width: 35px;
          height: 35px;
          margin-right: 0.8rem;
        }
        .profile-item {
          width: 15rem;
          outline: none;
          border: none;
          height: 2.5rem;
          border-bottom: 1px solid #ddd;
          color: $white-color;
          font-size: 1rem;
          background-color: $black-color;
        }
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
            background-color: $black-color;
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
        }
      }
    }
    .update-btn {
      width: 5rem;
      margin: 3rem;
      padding: 0.5rem;
      display: inline-block;
      overflow: hidden;
      letter-spacing: 2px;
      color: #fff;
      background: #e62f2f;
      box-shadow: 0 0 10px #e62f2f, 0 0 50px #e62f2f, 0 0 80px -6px;
      outline: none;
      border: none;
      border-radius: 0.5rem;
      font-weight: bold;
      font-size: 0.9rem;
      cursor: pointer;
    }

    .hide-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 20px;
      font-weight: bold;
      border: 2px solid $black-color;
      color: $black-color;
      border-radius: 100%;
      width: 25px;
      line-height: 22px;
      cursor: pointer;
      outline: none;
      transition: 0.2s;
      background-color: white;
    }

    .hide-btn:hover {
      background: #333;
      border-color: #333;
      color: #fff;
    }
  }
}


// -- neon -- //

.neon {
  color: transparent;
  -webkit-text-stroke: 0.5px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
}
</style>
