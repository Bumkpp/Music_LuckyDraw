<template>
  <el-container>
    <el-header height="70px">
      <Header @changeMenu="changeMenu"></Header>
    </el-header>
    <el-container>
      <el-aside>
        <menu-list></menu-list>
      </el-aside>
      <el-main :style="{ left: !showMenu ? '200px' : '60px' }">
        <change-page></change-page>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import MenuList from "../components/Menu.vue";
import Header from "../components/Header.vue";
import ChangePage from "../components/ChangePage.vue";
import { onMounted, ref } from "vue";

export default {
  components: {
    MenuList,
    Header,
    ChangePage,
  },
  setup() {
    const showMenu = ref(false);
    const changeMenu = (data: boolean) => {
      showMenu.value = data;
    };

    return {
      showMenu,
      changeMenu,
    };
  },
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #2b384b;
  color: var(--el-text-color-primary);
  line-height: 70px;
}
.el-main {
  --el-main-padding: 0px 0px 20px 0px;
  overflow-y: scroll !important;
  -ms-overflow-style: none;
  scrollbar-width: none;
  min-width: 1200px;
  background: #f0f0f0;
  position: absolute;
  right: 0;
  top: 70px;
  bottom: 0;
}
.el-main::-webkit-scrollbar {
  display: none !important; /* Chrome Safari */
}
</style>
