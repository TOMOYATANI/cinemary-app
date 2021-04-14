<template>
  <div class="list">
    <div class="list-inner">
      <div class="list-img"></div>
      <div class="list-profile">
        <img
          class="profile-small-image rounded-circle border"
          width="30"
          height="30"
          src="../assets/デフォルト画像.jpg"
        />
        <a href="#" class="small-font">TOMOYA TANI</a>
      </div>
      <div class="list-ttl">{{list.title}}</div>
      <!--{{propsのlist内にデータが格納させているので、list内のtitleを取得}}}}-->
      <div class="post-container">
        <p>{{list.description}}</p>
      </div>
      <div class="post-genre">{{list.genre}}</div>
      <div class="btn-inner">
        <button class="btn">ルームへ参加</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    //親コンポーネントから子コンポーネントに文字列、数値、配列やオブジェクトなどの値を渡す
    list: {
      type: Object
      //list内にObject型で格納されてる
    },
    index: {
      type: Number
      //index内にNumber型で格納されてる
    }
  }
};
</script>


<style scoped lang="scss">
a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.list {
  position: relative;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 35px;
  padding: 10px;
  box-shadow: 0 0 5px rgb(134, 134, 134);
  width: 20%;
  height: 350px;
  border-radius: 0.5rem;
  .list-inner {
    .list-img {
      height: 150px;
      border: 1px;
      margin-top: 2px;
      box-shadow: 0 0 5px lightgrey;
      object-fit: cover;
      border-radius: 0.5rem;
      background-color: rgba(228, 226, 226, 0.822);
    }
    .list-profile {
      margin-top: 0.5rem;
      display: flex;
      align-items: center;
      .rounded-circle {
        border-radius: 50%;
        margin-left: 0.5rem;
      }
      .small-font {
        font-size: small;
        padding-left: 0.5rem;
        a {
          text-decoration: none;
          color: #01091c;
          padding: 0.5rem;
          margin-bottom: 1rem;
        }
      }
    }
  }
  //   &:not(:first-child) {
  //     margin: 2rem;
  //   }
  &-ttl {
    font-size: 0.9rem;
    padding: 0.2rem;
    margin-top: 0.5rem;
    font-weight: bold;
  }
  .post-container {
    height: 60px;
    padding: 0.3rem;
    p {
      font-size: 0.7rem;
    }
  }
  .post-genre {
    font-size: 0.9rem;
    padding: 0.2rem;
    margin-top: 0.5rem;
    font-weight: bold;
  }
  .btn-inner {
    width: 100%;
    .btn {
      width: 7rem;
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
      position: absolute;
      bottom: 5px;
      right: 7px;
    }
  }
}
</style>
