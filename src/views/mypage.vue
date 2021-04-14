<template>
  <div id="app">
    <Header />
    <div class="mypage flex">
      <div class="mypage-inner flex">
        <div class="profile-inner flex">
          <img class="profile-inner-img" src="../assets/デフォルト画像.jpg" alt="デフォルト画像" />
          <div class="profile-inner-name">TOMOYA TANI</div>
        </div>
        <div class="profile-inner2 flex">
          <div class="follow-inner">
            <div class="post">
              <div>0</div>
              <p>投稿</p>
            </div>
            <div class="follow">
              <div>0</div>
              <p>フォロー</p>
            </div>
            <div class="follower">
              <div>0</div>
              <p>フォロワー</p>
            </div>
          </div>
          <hr class="separate" />
          <button @click="edit" class="profile-edit">プロフィール編集</button>
        </div>
      </div>
      <div class="profile-list">
        <ul>
          <li>性別</li>
          <li>年齢</li>
          <li>職業</li>
          <li>居住地</li>
          <li>好きな映画</li>
          <li>好きなジャンル</li>
          <li>自己紹介</li>
        </ul>
      </div>
      <hr class="separate" />
      <div class="profile-post flex">
        <h3>TOMOYA TANIさんの投稿一覧</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/header.vue";

export default {
  components: {
    Header
  }
};
</script>

<style scoped lang="scss">
.separate {
  width: 70%;
  display: block;
  height: 0;
  border: 0;
  border-top: 1px solid rgb(58, 57, 57);
  padding: 1rem;
}

.mypage {
  width: 100%;
  margin-top: 3rem;
  flex-direction: column;
  &-inner {
    width: 70%;
    .profile-inner {
      width: 100%;
      flex-direction: column;
      &-img {
        width: 200px;
        height: 185px;
        border-radius: 50% 50%;
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
        width: 9rem;
        margin: 1rem;
        color: #fff;
        background-color: #008deb;
        padding: 0.5rem;
        border-radius: 1rem;
        text-decoration: none;
        cursor: pointer;
        border: none;
        outline: none;
        font-weight: bold;
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
    li {
      display: flex;
      justify-content: start;
      opacity: 0.5;
    }
  }
  .profile-post {
    display: inline-block;
    width: 80%;
    height: 20rem;
  }
}
</style>
