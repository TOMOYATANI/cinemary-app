 <template>
  <div class="search-inner flex">
    <h2 class="search-tll neon flex">Cinemaryを検索する</h2>
    <hr class="separate" />
    <div class="search-main-contens flex">
      <input
        placeholder="例）アクション 恋愛 ミステリー SF ホラー ミュージカル etc.."
        class="search-main-item search-other"
        type="search"
        v-model="inputValue"
      />
      <input
        placeholder="例）アクション 恋愛 ミステリー SF ホラー etc.."
        class="search-main-item search-sm"
        type="search"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    value: {
      type: String,
      required: true
      //文字列型を必須で要求する
    }
  },
  computed: {
    inputValue: {
      get() {
        return this.value;
        //getterとは、変数から値を取得して呼び出し元に返す関数。ここではpropsで親より受けた値(value)を返している。
      },
      set(value) {
        this.$emit("input", value);
        //setterとは、変数に値(value)を設定する関数。ここでは入力フォーム(input)に入力された値(value)を返している。
      }
    }
  }
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
  padding-left: 0.25rem;
}

hr.separate {
  width: 60%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid $gray-color;
  margin: 2rem 0;
  padding: 0;
}

// -- 検索フォーム -- //

.search-inner {
  width: 100%;
  flex-direction: column;
  padding-top: 3rem;
  background-color: $black-color;
  .search-tll {
    width: 80%;
    padding-top: 3rem;
    color: $white-color;
    font-family: "Roboto", sans-serif;
    font-style: italic;
    display: flex;
  }
  .search-main-contens {
    position: relative;
    margin: 0.8rem;
    .search-main-item {
      width: 31.5rem;
      outline: none;
      border: none;
      height: 2.5rem;
      border-bottom: 1px solid #ddd;
      border-radius: 5px;
      color: $black-color;
      font-size: 1rem;
      padding-left: 0.7rem;
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
        color: $white-color;
        font-size: 1rem;
        background-color: $black-color;
      }
      .search-select {
        width: 15rem;
        outline: none;
        border: none;
        font-size: 1rem;
        color: $white-color;
        height: 3rem;
        border-bottom: 1px solid #ddd;
        margin-right: 2rem;
        background-color: $black-color;
      }
    }
    .search-btn {
      width: 25px;
      height: 25px;
      background-color: $black-color;
      cursor: pointer;
      border: none;
      outline: none;
      .search-icon {
        margin-top: 0.4rem;
        width: 100%;
        height: 100%;
      }
    }
  }
}

// -- ネオンカラー -- //

.neon {
  color: transparent;
  -webkit-text-stroke: 0.2px rgb(255, 0, 0);
  text-shadow: 0 0 10px rgba(255, 0, 0, 0.5), 0 0 50px rgba(255, 0, 0, 0.5);
}

// -- メディアクエリ -- //

$breakpoint-xl: 1025px;
$breakpoint-lg: 1024px;
$breakpoint-md: 600px;
$breakpoint-sm: 400px;

@mixin xl {
  @media (min-width: ($breakpoint-xl)) {
    @content;
  }
}
@mixin lg {
  @media (max-width: ($breakpoint-lg)) {
    @content;
  }
}
@mixin md {
  @media (max-width: ($breakpoint-md)) {
    @content;
  }
}
@mixin sm {
  @media (max-width: ($breakpoint-sm)) {
    @content;
  }
}

hr.separate {
  @include sm {
    margin: 1rem 0;
  }
}

::placeholder {
  @include md {
    font-size: 0.9rem;
  }
  @include sm {
    font-size: 0.8rem;
  }
}

.search-inner .search-main-contens .search-main-item {
  @include md {
    width: 28rem;
    height: 2.5rem;
    font-size: 0.9rem;
  }
  @include sm {
    width: 20rem;
    font-size: 0.8rem;
  }
}

.search-other {
  @include xl {
    display: flex;
  }
  @include lg {
    display: flex;
  }
  @include md {
    display: flex;
  }
  @include sm {
    display: none;
  }
}

.search-sm {
  @include xl {
    display: none;
  }
  @include lg {
    display: none;
  }
  @include md {
    display: none;
  }
  @include sm {
    display: flex;
  }
}
</style>

