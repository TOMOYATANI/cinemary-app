<template>
    <div class="card">
      <div class="face face1 flex">
        <div class="content">
          <img
            class="profile-icon"
            width="50"
            height="50"
            src="../assets/アイコン.jpg"
          />
          <h3>{{ list.title }}</h3>
        </div>
      </div>
      <div class="face face2 flex">
        <div class="content flex">
          <p>{{ list.description }}</p>
          <router-link
            :to="`chat/${list.id}`"
            class="join-btn flex"
            >ルームへ参加</router-link
          >
          <!-- to="`chat/${list.id}`"でchat/(取得したid)でページ遷移する。 -->
          <!-- ${ ~ }で囲ってあげないと文字列のままになってしまうので注意。 -->
          <!-- 「list.id」propsで親コンポーネントから取得したidを取得。-->
          <p class="post-time">{{ list.time.toDate().toLocaleString() }}</p>
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
      type: Object,
      //list内にObject型で格納されてる
    },
    index: {
      type: Number,
      //index内にNumber型で格納されてる
    },
  },
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: rgb(0, 0, 0);
}

.join-btn {
  outline: none;
  border: none;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
}

.card {
  width: 300px;
  height: 420px;
  position: relative;
  margin: 1rem;
  flex-direction: column;
  display: flex;
  .face {
    width: 300px;
    height: 200px;
    transition: 0.4s;
  }
  .face.face1 .content {
    opacity: 0.2;
    transition: 0.5s;
    text-align: center;
    .profile-icon {
      border-radius: 50%;
    }
    h3 {
      font-size: 1em;
      color: white;
      text-align: center;
    }
  }
  .face.face1 {
    position: relative;
    background: #333;
    align-content: center;
    z-index: 1;
    transform: translateY(100px);
    box-shadow: 0px 0px 3px whitesmoke;
  }
  .face.face2 {
    position: relative;
    background: whitesmoke;
    padding: 20px;
    box-sizing: border-box;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8);
    transform: translateY(-100px);
    .content {
      width: 100%;
      flex-direction: column;
    }
    .content p,
    .join-btn {
      font-size: 10pt;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .content .join-btn {
      width: 50%;
      color: black;
      box-sizing: border-box;
      outline: 1px dashed #333;
      padding: 10px;
      margin: 15px 0 0;
      display: inline-block;
      text-align: center;
    }
    .content .post-time {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}

// -- hover-animation -- //

.card:hover .face.face1 {
  transform: translateY(0);
  box-shadow: inset 0 0 60px whitesmoke, inset 20px 0 80px #f0f,
    inset -20px 0 80px #0ff, inset 20px 0 300px #f0f, inset -20px 0 300px #0ff,
    0 0 50px #fff, -10px 0 80px #f0f, 10px 0 80px #0ff;
}

.card:hover .face.face1 .content {
  opacity: 1;
}

.card .face.face1 .content .join-btn {
  transition: 0.5s;
}
.card:hover .face.face2 {
  transform: translateY(0);
}

.card .face.face2 .content .join-btn:hover {
  background: #333;
  color: whitesmoke;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.5);
}
</style>
