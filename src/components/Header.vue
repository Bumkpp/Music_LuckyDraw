<template>
  <div class="headers">
    <div class="logo" :style="{ backgroundColor: '#fff' }">
      <span>四川省2021年</span><br />
      <span>西部音乐周作品列表</span>
    </div>
    <div class="header_middle"></div>
    <div class="header_right">
      <el-dropdown>
        <div
          style="
            width: 140px;
            display: flex;
            cursor: pointer;
          "
        >
          <span class="user">退出登录</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logout"
              >退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router'
import { Edit, Expand, Fold } from "@element-plus/icons";
import bus from "../assets/ts/bus";

export default defineComponent({
  components: {
    Edit,
    Expand,
    Fold,
  },
  setup(props, context) {
    let fullscreen = ref(false);
    let show = ref(false);
    const dialogFormVisible = ref(false);
    const info = ref({
      name: "",
    });

    const router = useRouter();

    const handleFullScreen = () => {
      let element = document.documentElement;
      if (fullscreen.value) {
        document.exitFullscreen();
        fullscreen.value = !fullscreen.value;
      } else {
        element.requestFullscreen();
        fullscreen.value = !fullscreen.value;
      }
    };

    const isShow = () => {
      show.value = !show.value;
      sendShow(show.value);
      bus.$emit("sendShow", show.value);
    };

    const sendShow = (data: boolean) => {
      context.emit("changeMenu", data);
    };

    const logout = async() => {
       router.replace('/login')
    }

    return {
      handleFullScreen,
      fullscreen,
      show,
      isShow,
      dialogFormVisible,
      info,
      logout
    };
  },
});
</script>

<style scoped>
.headers {
  width: 100%;
  height: 70px;
  font-size: 22px;
  /* color: #fff; */
  margin: 0 !important;
  padding: 0 !important;
  background-color: #e51a14 !important;
  display: flex;
  position: relative;
}
.headers .logo {
  /* float: left; */
  font-size: 16px;
  width: 199px;
  line-height: 30px;
  text-align: center;
  color: #e51a14;
  margin-left: -20px;
  padding: 5px 0px;
  font-weight: 800;
}

.header_right {
  position: absolute;
  background-color: #a90109;
  right: 0px;
  height: 70px;
  display: flex;
  margin-right: -20px;
  display: flex;
  text-align: center;
  align-items: center;
}
.tips {
  width: 90%;
  line-height: 18px;
  text-align: center;
  margin-bottom: 26px;
  margin-top: -26px;
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex: 1;
  margin: 0 10px;
}
.user {
  font-size: 16px;
  line-height: 50px !important;
  color: #fff;
  margin: 0 auto;
}
</style>
