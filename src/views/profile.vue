<template>
  <div id="app">
    <Header />
    <div class="profile-inner flex">
      <!-- <h2 class="profile-tll flex">プロフィールを変更する</h2>
      <hr class="separate" /> -->
      <div class="profile-contens flex">
        <div class="profile-img-inner flex">
          <img
            class="profile-img"
            src="../assets/デフォルト画像.jpg"
            alt="プロフィール画像"
          />
          <a class="profile-txt" href="#">プロフィール画像を変更する</a>
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
            <select name="性別">
              <option class="profile-item" value="性別" hidden>性別</option>
              <option class="profile-item" value="男性">男性</option>
              <option class="profile-item" value="女性">女性</option>
              <option class="profile-item" value="その他">その他</option>
            </select>
          </div>
          <div class="profile-contens flex">
            <img class="item-img" src="../assets/年齢.jpg" alt="年齢" />
            <select name="年齢">
              <option value="年齢" hidden>年齢</option>
              <option value="10歳未満">10歳未満</option>
              <option value="11歳">11歳</option>
              <option value="12歳">12歳</option>
              <option value="13歳">13歳</option>
              <option value="14歳">14歳</option>
              <option value="15歳">15歳</option>
              <option value="16歳">16歳</option>
              <option value="17歳">17歳</option>
              <option value="18歳">18歳</option>
              <option value="19歳">19歳</option>
              <option value="20歳">20歳</option>
              <option value="21歳">21歳</option>
              <option value="22歳">22歳</option>
              <option value="23歳">23歳</option>
              <option value="24歳">24歳</option>
              <option value="25歳">25歳</option>
              <option value="26歳">26歳</option>
              <option value="27歳">27歳</option>
              <option value="28歳">28歳</option>
              <option value="29歳">29歳</option>
              <option value="30歳">30歳</option>
              <option value="31歳">31歳</option>
              <option value="32歳">32歳</option>
              <option value="33歳">33歳</option>
              <option value="34歳">34歳</option>
              <option value="35歳">35歳</option>
              <option value="36歳">36歳</option>
              <option value="37歳">37歳</option>
              <option value="38歳">38歳</option>
              <option value="39歳">39歳</option>
              <option value="40歳">40歳</option>
              <option value="41歳">41歳</option>
              <option value="42歳">42歳</option>
              <option value="43歳">43歳</option>
              <option value="44歳">44歳</option>
              <option value="45歳">45歳</option>
              <option value="46歳">46歳</option>
              <option value="47歳">47歳</option>
              <option value="48歳">48歳</option>
              <option value="49歳">49歳</option>
              <option value="50歳">50歳</option>
              <option value="51歳">51歳</option>
              <option value="52歳">52歳</option>
              <option value="53歳">53歳</option>
              <option value="54歳">54歳</option>
              <option value="55歳">55歳</option>
              <option value="56歳">56歳</option>
              <option value="57歳">57歳</option>
              <option value="58歳">58歳</option>
              <option value="59歳">59歳</option>
              <option value="60歳">60歳</option>
              <option value="61歳">61歳</option>
              <option value="62歳">62歳</option>
              <option value="63歳">63歳</option>
              <option value="64歳">64歳</option>
              <option value="65歳">65歳</option>
              <option value="66歳">66歳</option>
              <option value="67歳">67歳</option>
              <option value="68歳">68歳</option>
              <option value="69歳">69歳</option>
              <option value="70歳">70歳</option>
              <option value="71歳">71歳</option>
              <option value="72歳">72歳</option>
              <option value="73歳">73歳</option>
              <option value="74歳">74歳</option>
              <option value="75歳">75歳</option>
              <option value="76歳">76歳</option>
              <option value="77歳">77歳</option>
              <option value="78歳">78歳</option>
              <option value="79歳">79歳</option>
              <option value="80歳">80歳</option>
              <option value="81歳">81歳</option>
              <option value="82歳">82歳</option>
              <option value="83歳">83歳</option>
              <option value="84歳">84歳</option>
              <option value="85歳">85歳</option>
              <option value="86歳">86歳</option>
              <option value="87歳">87歳</option>
              <option value="88歳">88歳</option>
              <option value="89歳">89歳</option>
              <option value="90歳">90歳</option>
              <option value="91歳">91歳</option>
              <option value="92歳">92歳</option>
              <option value="93歳">93歳</option>
              <option value="94歳">94歳</option>
              <option value="95歳">95歳</option>
              <option value="96歳">96歳</option>
              <option value="97歳">97歳</option>
              <option value="98歳">98歳</option>
              <option value="99歳">99歳</option>
            </select>
          </div>
          <div class="profile-contens flex">
            <img class="item-img" src="../assets/職業.jpg" alt="職業" />
            <select name="職業">
              <option class="profile-item" value="職業" hidden>職業</option>
              <option class="profile-item" value="公務員">公務員</option>
              <option class="profile-item" value="会社員">会社員</option>
              <option class="profile-item" value="自営業">自営業</option>
              <option class="profile-item" value="フリーランス"
                >フリーランス</option
              >
              <option class="profile-item" value="パート・アルバイト"
                >パート・アルバイト</option
              >
              <option class="profile-item" value="専業主婦">専業主婦</option>
              <option class="profile-item" value="学生">学生</option>
              <option class="profile-item" value="その他">その他</option>
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
            <select name="好きなジャンル">
              <option class="profile-item" value="好きなジャンル" hidden
                >好きなジャンル</option
              >
              <option class="profile-item" value="アクション"
                >アクション</option
              >
              <option class="profile-item" value="ドラマ">ドラマ</option>
              <option class="profile-item" value="恋愛">恋愛</option>
              <option class="profile-item" value="ホラー">ホラー</option>
              <option class="profile-item" value="戦争">戦争</option>
              <option class="profile-item" value="音楽">音楽</option>
              <option class="profile-item" value="ミュージカル"
                >ミュージカル</option
              >
              <option class="profile-item" value="スポーツ">スポーツ</option>
              <option class="profile-item" value="SE">SF</option>
              <option class="profile-item" value="青春">青春</option>
              <option class="profile-item" value="コメディ">コメディ</option>
              <option class="profile-item" value="アニメ">アニメ</option>
              <option class="profile-item" value="アドベンチャー・冒険"
                >アドベンチャー・冒険</option
              >
              <option class="profile-item" value="アート・コンテンボラリー"
                >アート・コンテンボラリー</option
              >
              <option class="profile-item" value="クライム">クライム</option>
              <option class="profile-item" value="ドキュメンタリー"
                >ドキュメンタリー</option
              >
              <option class="profile-item" value="ショートフィルム・短編"
                >ショートフィルム・短編</option
              >
              <option class="profile-item" value="サスペンス"
                >サスペンス</option
              >
              <option class="profile-item" value="ファミリー"
                >ファミリー</option
              >
              <option class="profile-item" value="スリラー">スリラー</option>
              <option class="profile-item" value="ヤクザ・任侠"
                >ヤクザ・任侠</option
              >
              <option class="profile-item" value="ファンタジー"
                >ファンタジー</option
              >
              <option class="profile-item" value="時代劇">時代劇</option>
              <option class="profile-item" value="ミステリー"
                >ミステリー</option
              >
              <option class="profile-item" value="伝記">伝記</option>
              <option class="profile-item" value="西部劇">西部劇</option>
              <option class="profile-item" value="ヤクザ・任侠"
                >ヤクザ・任侠</option
              >
              <option class="profile-item" value="パニック">パニック</option>
              <option class="profile-item" value="オムニバス"
                >オムニバス</option
              >
              <option class="profile-item" value="バイオレンス"
                >バイオレンス</option
              >
              <option class="profile-item" value="歴史">歴史</option>
              <option class="profile-item" value="ギャング・マフィア"
                >ギャング・マフィア</option
              >
            </select>
          </div>
          <div class="profile-contens flex">
            <img
              class="item-img"
              src="../assets/メールアドレス.jpg"
              alt="メールアドレス"
            />
            <input
              type="text"
              class="profile-item"
              placeholder="メールアドレス"
              v-model="mail"
            />
          </div>
          <div id="app" class="profile-contens flex">
            <img
              class="item-img"
              src="../assets/パスワード.jpg"
              alt="パスワード"
            />
            <div class="password-container">
              <input
                :type="inputType"
                id="password"
                placeholder="パスワード"
                class="profile-item password-input"
              />
            </div>
          </div>
          <div id="app" class="profile-contens flex">
            <img
              class="item-img"
              src="../assets/パスワード.jpg"
              alt="パスワード"
            />
            <div class="password-container">
              <input
                :type="inputType"
                id="password"
                placeholder="パスワード"
                class="profile-item password-input"
              />
            </div>
          </div>
        </div>
      </div>
      <button class="btn flex">更新</button>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";

export default {
  data() {
    return {
      name: "",
      sex: "",
      age: "",
      selfpr: "",
      genre: "",
      mail: "",
      password: "",
      passwordConfirm: "",
      profileImage: "",
      isChecked: false,
    };
  },
  components: {
    Header,
  },
  computed: {
    inputType() {
      return this.isChecked ? "text" : "password";
    },
    iconType() {
      return this.isChecked ? "eye-slash" : "eye";
    },
  },
  methods: {
    onClick() {
      this.isChecked = !this.isChecked;
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
      .profile-img {
        width: 200px;
        height: 185px;
        border-radius: 50% 50%;
        margin-left: 2rem;
      }
      .profile-txt {
        margin: 1rem;
        margin-left: 2rem;
        color: #000000
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
  cursor: hand;
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
