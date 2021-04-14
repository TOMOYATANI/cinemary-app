<template>
  <div id="app">
    <div class="search-inner flex">
      <h2 class="search-tll flex">Chinemaryを検索する</h2>
      <hr class="separate" />
      <div class="search-main-contens flex">
        <input
          type="text"
          class="search-main-item"
          placeholder="例）アクション  恋愛  ミステリー  SF  ホラー  ミュージカル  etc.."
          v-model="title"
        />
      </div>
      <div class="search-items flex">
        <div class="search-contens flex">
          <img class="item-img" src="../assets/タイトル.jpg" alt="タイトル" />
          <input
            type="text"
            class="search-item"
            placeholder="タイトル"
            v-model="title"
          />
        </div>
        <div class="search-contens flex">
          <img
            class="item-img"
            src="../assets/好きなジャンル.jpg"
            alt="好きなジャンル"
          />
          <select name="好きなジャンル">
            <option class="search-item" value="好きなジャンル" hidden
              >好きなジャンル</option
            >
            <option class="search-item" value="アクション">アクション</option>
            <option class="search-item" value="ドラマ">ドラマ</option>
            <option class="search-item" value="恋愛">恋愛</option>
            <option class="search-item" value="ホラー">ホラー</option>
            <option class="search-item" value="戦争">戦争</option>
            <option class="search-item" value="音楽">音楽</option>
            <option class="search-item" value="ミュージカル"
              >ミュージカル</option
            >
            <option class="search-item" value="スポーツ">スポーツ</option>
            <option class="search-item" value="SE">SF</option>
            <option class="search-item" value="青春">青春</option>
            <option class="search-item" value="コメディ">コメディ</option>
            <option class="search-item" value="アニメ">アニメ</option>
            <option class="search-item" value="アドベンチャー・冒険"
              >アドベンチャー・冒険</option
            >
            <option class="search-item" value="アート・コンテンボラリー"
              >アート・コンテンボラリー</option
            >
            <option class="search-item" value="クライム">クライム</option>
            <option class="search-item" value="ドキュメンタリー"
              >ドキュメンタリー</option
            >
            <option class="search-item" value="ショートフィルム・短編"
              >ショートフィルム・短編</option
            >
            <option class="search-item" value="サスペンス">サスペンス</option>
            <option class="search-item" value="ファミリー">ファミリー</option>
            <option class="search-item" value="スリラー">スリラー</option>
            <option class="search-item" value="ヤクザ・任侠"
              >ヤクザ・任侠</option
            >
            <option class="search-item" value="ファンタジー"
              >ファンタジー</option
            >
            <option class="search-item" value="時代劇">時代劇</option>
            <option class="search-item" value="ミステリー">ミステリー</option>
            <option class="search-item" value="伝記">伝記</option>
            <option class="search-item" value="西部劇">西部劇</option>
            <option class="search-item" value="ヤクザ・任侠"
              >ヤクザ・任侠</option
            >
            <option class="search-item" value="パニック">パニック</option>
            <option class="search-item" value="オムニバス">オムニバス</option>
            <option class="search-item" value="バイオレンス"
              >バイオレンス</option
            >
            <option class="search-item" value="歴史">歴史</option>
            <option class="search-item" value="ギャング・マフィア"
              >ギャング・マフィア</option
            >
          </select>
        </div>
        <button class="search-btn">
          <img src="../assets/検索icon.jpg" alt="検索" class="search-icon" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      title: "",
      contents: "",
      image: "",
    };
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
  margin-right: 2rem;
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

.search-main-contens {
  position: relative;
  margin: 0.8rem;
  .search-main-item {
    width: 30rem;
    outline: none;
    border: none;
    height: 2.5rem;
    border-bottom: 1px solid #ddd;
    color: #444;
    font-size: 1rem;
  }
}

.search-inner {
  width: 100%;
  flex-direction: column;
  .search-tll {
    width: 80%;
    padding-top: 2rem;
  }
}
.search-items {
  .search-contens {
    position: relative;
    margin: 0.8rem;
    .item-img {
      width: 35px;
      height: 35px;
      margin-right: 0.8rem;
    }
    .search-item {
      width: 15rem;
      outline: none;
      border: none;
      height: 2.5rem;
      border-bottom: 1px solid #ddd;
      color: #444;
      font-size: 1rem;
    }
  }
  .search-btn {
    width: 25px;
    height: 25px;
    cursor: pointer;
    border: none;
    outline: none;
    .search-icon {
      width: 100%;
      height: 100%;
    }
  }
}

hr.separate {
  width: 60%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid #3a3939;
  margin: 2rem 0;
  padding: 0;
}
</style>
