<template>
  <div>
    <Header />
    <div class="mypage flex">
      <div class="mypage-inner flex">
        <div class="profile-inner-l flex">
          <img
            class="profile-inner-l-img"
            :src="uploadedImage == '' ? preview : uploadedImage.fileUrl"
            alt="プロフィール画像"
          />
          <div class="profile-inner-l-name txt">{{ profileData.name }}</div>
        </div>
        <div class="profile-inner-r flex">
          <div class="item-inner">
            <div class="post">
              <div class="txt">{{ listData.length }}</div>
              <p>POSTS</p>
            </div>
            <div class="bookmark">
              <div class="txt">{{ bookmarkList.length }}</div>
              <p>BOOKMARK</p>
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
            :height="740"
          >
            <div data-modal="edit" aria-expanded="true" class="vm--overlay">
              <div class="vm--top-right-slot"></div>
            </div>
            <div class="modal-header flex">
              <h2 class="profile-tll flex">プロフィールを編集する</h2>
              <hr class="separate" />
            </div>
            <div class="modal-body">
              <div class="profile-inner flex">
                <div class="profile-contens flex">
                  <div class="profile-img-inner flex">
                    <img
                      :src="
                        uploadedImage == '' ? preview : uploadedImage.fileUrl
                      "
                      width="200"
                      height="200"
                      class="profile-img"
                      alt="プロフィール画像"
                    />
                    <label class="profile-txt profile-update">
                      プロフィール画像を編集する
                      <input
                        type="file"
                        @change="onFileChange"
                        style="display:none"
                      />
                    </label>
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
                        v-model="access"
                        :style="{ color: access == '' ? 'gray' : 'white' }"
                      >
                        <option class="profile-item" value hidden
                          >居住地</option
                        >
                        <option
                          v-for="access in accesses"
                          :value="access.name"
                          :key="access.id"
                          class="profile-item"
                          style="color: white;"
                          >{{ access.name }}</option
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
                      <textarea-autosize
                        name="text"
                        cols="10"
                        rows="1"
                        v-model="selfpr"
                        placeholder="自己紹介"
                        maxlength="50"
                        :min-height="70"
                        :max-height="70"
                      ></textarea-autosize>
                    </div>
                    <div class="profile-contens flex">
                      <select
                        v-model="genre"
                        class="profile-select"
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
                    <div class="profile-contens flex">
                      <input
                        type="text"
                        class="profile-item"
                        placeholder="好きな映画"
                        v-model="favMovie"
                      />
                    </div>
                  </div>
                  <button
                    class="hide-btn flex"
                    @click="
                      hide();
                      closeModal();
                    "
                  >
                    ×
                  </button>
                </div>
                <button @click="updateBtn" class="update-btn flex">
                  更新
                </button>
              </div>
            </div>
          </modal>
        </div>
      </div>
      <div class="profile-list">
        <ul class="list-item">
          <li class="list-items">
            性別：
            <div class="list-color">{{ profileData.sex }}</div>
          </li>
          <li class="list-items">
            年齢：
            <div class="list-color">{{ profileData.age }}</div>
          </li>
          <li class="list-items">
            職業：
            <div class="list-color">{{ profileData.profession }}</div>
          </li>
          <li class="list-items">
            居住地：
            <div class="list-color">{{ profileData.access }}</div>
          </li>
          <li class="list-items">
            好きな映画：
            <div class="list-color">{{ profileData.favMovie }}</div>
          </li>
          <li class="list-items">
            好きなジャンル：
            <div class="list-color">{{ profileData.genre }}</div>
          </li>
          <li class="list-items">
            自己紹介：
            <div class="list-color">{{ profileData.selfpr }}</div>
          </li>
        </ul>
      </div>
      <hr class="separate" />
      <h3 class="post-list flex">{{ profileData.name }} さんの投稿一覧</h3>
      <div class="profile-posts">
        <paginate name="paginate-listData" tag="ol" :list="listData" :per="3">
          <List
            v-for="(list, index) in paginated('paginate-listData')"
            :index="index"
            :list="list"
            :key="list.id"
          />
        </paginate>
        <paginate-links
          for="paginate-listData"
          class="pagination flex"
          :show-step-links="true"
        >
        </paginate-links>
      </div>
      <hr class="separate" />
      <h3 class="bookmark-list flex">
        {{ profileData.name }} さんのブックマーク一覧
      </h3>
      <div class="profile-posts">
        <paginate
          name="paginate-bookmarkList"
          tag="ol"
          :list="bookmarkList"
          :per="3"
        >
          <List
            v-for="(list, index) in paginated('paginate-bookmarkList')"
            :index="index"
            :list="list"
            :key="list.id"
          />
        </paginate>
        <paginate-links
          for="paginate-bookmarkList"
          class="pagination flex"
          :show-step-links="true"
        >
        </paginate-links>
      </div>
    </div>
    <!-- <div class="profile-posts">
        <VueSlickCarousel v-bind="settings">
          <List
            v-for="(list, index) in listData"
            :index="index"
            :list="list"
            :key="list.id"
          />
        </VueSlickCarousel>
      </div>
      <hr class="separate" />
      <h3 class="bookmark-list flex">
        {{ profileData.name }} さんのブックマーク一覧
      </h3>
      <div class="profile-posts">
        <List
          v-for="(list, index) in bookmarkList"
          :index="index"
          :list="list"
          :key="list.id"
        />
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import firebase from "firebase";
import Header from "@/components/header.vue";
import List from "@/components/list.vue";
import Vue from "vue";
import VueSwal from "vue-swal";
Vue.use(VueSwal);
import VModal from "vue-js-modal";
Vue.use(VModal);
import VScrollLock from "v-scroll-lock";
Vue.use(VScrollLock);
import VueTextareaAutosize from "vue-textarea-autosize";
Vue.use(VueTextareaAutosize);
import VuePaginate from "vue-paginate";
Vue.use(VuePaginate);
// import VueSlickCarousel from "vue-slick-carousel";
// import "vue-slick-carousel/dist/vue-slick-carousel.css";

import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";

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
      access: "",
      accesses: [
        { name: "北海道" },
        { name: "青森県" },
        { name: "岩手県" },
        { name: "宮城県" },
        { name: "秋田県" },
        { name: "山形県" },
        { name: "福島県" },
        { name: "茨城県" },
        { name: "栃木県" },
        { name: "群馬県" },
        { name: "埼玉県" },
        { name: "千葉県" },
        { name: "東京都" },
        { name: "神奈川県" },
        { name: "新潟県" },
        { name: "富山県" },
        { name: "石川県" },
        { name: "福井県" },
        { name: "山梨県" },
        { name: "長野県" },
        { name: "岐阜県" },
        { name: "静岡県" },
        { name: "愛知県" },
        { name: "三重県" },
        { name: "滋賀県" },
        { name: "京都府" },
        { name: "大阪府" },
        { name: "兵庫県" },
        { name: "奈良県" },
        { name: "和歌山県" },
        { name: "鳥取県" },
        { name: "島根県" },
        { name: "岡山県" },
        { name: "広島県" },
        { name: "山口県" },
        { name: "徳島県" },
        { name: "香川県" },
        { name: "愛媛県" },
        { name: "高知県" },
        { name: "福岡県" },
        { name: "佐賀県" },
        { name: "長崎県" },
        { name: "熊本県" },
        { name: "大分県" },
        { name: "宮崎県" },
        { name: "鹿児島県" },
        { name: "沖縄県" },
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
      favMovie: "",
      uploadedImage: "",
      profileData: {},
      //配列にしないようにする。
      listData: [],
      paginate: ["paginate-listData", "paginate-bookmarkList"],
      // settings: {
      //   dots: true,
      //   infinite: false,
      //   slidesToShow: 3,
      //   slidesToScroll: 3,
      //   initialSlide: 0,
      // },
      bookmarkList: [],
      open: false,
      file: "",
      preview: require("../assets/デフォルトの画像.jpg"),
    };
  },
  components: {
    Header,
    List,
    // VueSlickCarousel,
  },
  methods: {
    onFileChange(e) {
      const image = e.target.files; //選択された画像ファイルを選択
      this.file = image[0]; //画像ファイルを1つだけ選択

      // Firebase storageに保存するパス乱数で決めてthis.uploadUrlへ代入
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      this.uploadUrl = Array.from(crypto.getRandomValues(new Uint32Array(N)))
        .map((n) => S[n % S.length])
        .join("");

      let self = this;
      let fileReader = new FileReader();
      //FileReaderは、Fileオブジェクトからデータを読み込むことのみを目的としたオブジェクト
      fileReader.onload = function() {
        //fileReader.onloadは、読み込みが正常に完了した時に発火するイベント
        self.preview = fileReader.result;
        //fileReaderの結果をself.previewへ代入
        //関数の中ではfileReaderの[this]を参照してしまうため、一旦[self]に代入して、[this.]の代わりに[self.] とする
      };
      fileReader.readAsDataURL(this.file);
      //this.fileの値をデータURLとして読み込み、488行目が発火する。
    },
    // updateBtn()が押下されたら、dbインスタンスを初期化して"posts"という名前のコレクションへの参照
    updateBtn() {
      this.$swal({
        title: "内容確認",
        text: "この内容で更新しますか？",
        icon: "info",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          let uploadParam = {};
          if (this.uploadUrl) {
            const uploadTask = firebase
              .storage()
              .ref(this.uploadUrl) //さっき決めたパスを参照して、
              // .child(this.uploadUrl)
              .put(this.file); //保存する
            uploadTask.then(() => {
              uploadTask.snapshot.ref.getDownloadURL().then((fileUrl) => {
                //this.fileに保存されたrefを参照してファイルのダウンロード URL を取得して、fileUrlへ代入。
                this.$set(this, "uploadedImage", {
                  fileUrl: fileUrl,
                  time: firebase.firestore.FieldValue.serverTimestamp(),
                });
                console.log(fileUrl, this.uploadUrl);
                uploadParam = { uploadedImage: this.uploadedImage };
                //uploadParamへuploadedImageを代入。
                firebase
                  //画像をfirestoreに保存
                  .firestore()
                  .collection("users") //保存する場所を参照して、
                  .doc(this.$route.params.uid) //追加で保存setメソッドを使うと上書きされる
                  .set(
                    {
                      name: this.name,
                      sex: this.sex,
                      age: this.age,
                      access: this.access,
                      selfpr: this.selfpr,
                      profession: this.profession,
                      genre: this.genre,
                      favMovie: this.favMovie,
                      ...uploadParam,
                      time: firebase.firestore.FieldValue.serverTimestamp(),
                      //サーバ側で値設定
                    },
                    { merge: true }
                    //set()でmergeをtrueにすると、上書き。updetaと同様。
                  );

                const currentUser = firebase.auth().currentUser;
                currentUser
                  .updateProfile({
                    photoURL: fileUrl,
                  })
                  .then(() => {});
                // .catch((err)=>{
                // console.log(err);
                // });
              });
            });
          }
          console.log(this.uploadedImage);

          this.$swal("更新しました。", {
            icon: "success",
          });
          // this.$router.go({
          //   path: `/mypage/${this.$route.params.uid}`,
          //   force: true,
          // });
          //プロフィール編集されたらページをリロード
        } else {
          this.$swal("キャンセルしました。");
        }
      });
      // .catch(() => {
      //   this.$swal("更新出来ませんでした。", {
      //     icon: "error",
      //   });
      // });
    },
    show() {
      this.$modal.show("edit");
    },
    hide() {
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
    const currentUser = firebase.auth().currentUser;
    this.uid = currentUser.uid;

    if (currentUser) {
      firebase
        .firestore()
        .collection("users")
        .doc(this.$route.params.uid)
        .get()
        .then((snapshot) => {
          this.profileData = snapshot.data();
          this.name = this.profileData.name || "";
          this.sex = this.profileData.sex || "";
          this.age = this.profileData.age || "";
          this.access = this.profileData.access || "";
          this.selfpr = this.profileData.selfpr || "";
          this.profession = this.profileData.profession || "";
          this.uploadedImage = this.profileData.uploadedImage || "";
          this.genre = this.profileData.genre || "";
          this.favMovie = this.profileData.favMovie || "";
          //全てのデータを取得して、profileDataへ代入。
        });
    }
    firebase
      .firestore()
      .collection("posts")
      .orderBy("time", "desc")
      .where("uid", "==", this.uid)
      //uidをフィルタリングして現在のURLと合致するもののみを参照
      .get()
      .then((snapshot) => {
        //"posts"(参照先)のスナップショットを得る
        snapshot.forEach((doc) => {
          //上記で得たデータをforEachでドキュメントの数だけ"doc"データに格納
          this.listData.push({ ...doc.data(), id: doc.id });
          // console.log(this.listData);
          //更にlistDataの空箱に格納した"doc"データを格納
        });
      });
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .orderBy("time", "desc")
    //   .doc(this.uid)
    //   .collection("bookmarks")
    //   .where("uid", "==", this.uid)
    //   .get()
    //   .then((snapshot) => {
    //     //"posts"(参照先)のスナップショットを得る
    //     snapshot.forEach((doc) => {
    //       //上記で得たデータをforEachでドキュメントの数だけ"doc"データに格納
    //       this.bookmarkList.push(doc.data());
    //     });
    //   });
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@1,500&display=swap");

// -- 変数 -- //

$gray-color: rgb(100, 100, 100);
$white-color: rgb(255, 255, 255);
$black-color: rgb(0, 0, 0);

// -- 共通 -- //

.txt {
  color: $white-color;
}

::placeholder {
  color: gray;
  font-size: 1rem;
  padding-left: 0.2rem;
}

textarea {
  width: 20rem;
  outline: none;
  border: none;
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
  height: 28rem;
  background-color: #646464;
  z-index: 10;
  margin: 0 2rem;
}

// -- マイページ -- //

.mypage {
  width: 100%;
  padding: 5rem 0;
  flex-direction: column;
  background-color: $black-color;
  &-inner {
    width: 70%;
    .profile-inner-l {
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
    .profile-inner-r {
      width: 100%;
      flex-direction: column;
      .item-inner {
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
    .list-items {
      display: flex;
      justify-content: start;
      color: rgb(130, 130, 130);
      .list-color {
        color: $white-color;
        font-weight: bold;
        margin: 0 1rem;
      }
    }
  }
  .post-list {
    width: 60%;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    justify-content: flex-start;
  }

  .bookmark-list {
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
  }
}

// -- プロフィール編集 -- //

.profile-select {
  width: 20rem;
  outline: none;
  border: none;
  font-size: 1rem;
  color: $white-color;
  height: 2.5rem;
  border-bottom: 1px solid #ddd;
  background-color: $black-color;
}

.modal-inner {
  position: fixed;
  .vm--overlay {
    background: rgba(0, 0, 0, 0.7);
    z-index: -1;
  }
  .modal-header {
    flex-direction: column;
    background-color: $black-color;
    .profile-tll {
      padding-top: 2rem;
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
        margin-top: 1rem;
        background-color: $black-color;
        .item-img {
          width: 35px;
          height: 35px;
          margin-right: 0.8rem;
        }
        .profile-item {
          width: 20rem;
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
            width: 250px;
            height: 250px;
            border-radius: 50% 50%;
            margin-left: 2rem;
          }
          .profile-txt {
            margin: 2rem;
            margin-left: 4rem;
          }
        }
        .profile-items {
          width: 35%;
          flex-direction: column;
          padding-bottom: 2rem;
        }
      }
    }
    .update-btn {
      width: 5rem;
      margin: 2rem;
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

// -- slick -- //

.slick-slider {
  width: 90%;
}

// -- ネオンカラー -- //

.neon {
  color: transparent;
  -webkit-text-stroke: 0.5px rgb(255, 0, 0);
  text-shadow: 0 0 50px rgba(255, 0, 0, 0.5);
}
</style>
