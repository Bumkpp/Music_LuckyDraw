<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="collapse"
      background-color="#E51A14"
      text-color="#fff"
      active-text-color="#E51A14"
      unique-opened
      router
    >
      <div :style="{ width: '199px', height: '55px' }" class="menutt">
        <div class="menuTitle">后台管理</div>
      </div>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index">
            <template #title>
              <el-icon v-if="item.icon == 'List'"><list /></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-sub-menu
                v-if="subItem.subs"
                :index="subItem.index"
                :key="subItem.index"
              >
                <template>{{ subItem.title }}</template>
                <el-menu-item
                  v-for="(threeItem, i) in subItem.subs"
                  :key="i"
                  :index="threeItem.index"
                  >{{ threeItem.title }}</el-menu-item
                >
              </el-sub-menu>
              <el-menu-item
                v-else
                :index="subItem.index"
                >{{ subItem.title }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <el-icon v-if="item.icon == 'Key'"><key /></el-icon>
            <el-icon v-if="item.icon == 'HomeFilled'"><home-filled /></el-icon>
            <span>{{ item.title }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { menu } from "../router/menu/menuList";
import { UserFilled, List, Key, HomeFilled } from "@element-plus/icons";
import bus from "@/assets/ts/bus";

export default defineComponent({
  components: {
    UserFilled,
    List,
    Key,
    HomeFilled,
  },
  setup() {
    let items: any = menu;
    let collapse = ref(false);

    bus.$on("sendShow", (val: any) => {
      collapse.value = val;
    });

    return {
      collapse,
      items,
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("", "");
    },
  },
});
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
.menutt{
  padding-top: 1px;
}
.menuTitle {
  width: 80%;
  height: 43px;
  font-size: 16px;
  line-height: 43px;
  text-align: center;
  background-color: #f25e57;
  color: #d71f23;
  font-weight: 700;
  border-radius: 5px;
  margin-left: 10%;
  margin-top: 5px;
}
</style>
