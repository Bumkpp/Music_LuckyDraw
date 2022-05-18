<template>
  <div class="box-home">
    <div style="line-height: 26px; display: flex" class="tags">
      <div v-for="(item, i) in result" :key="item.path">
        <el-tag
          closable
          size="small"
          :class="{ isActive: isActive(item.path) }"
          :type="!isActive(item.path) ? 'info' : ''"
          :effect="isActive(item.path) ? 'dark' : 'plain'"
          @close="closeTag(i)"
        >
          <router-link :to="item.path" class="tags-li-title">
            {{ item.title }}
          </router-link>
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    //存放标签信息
    let itemTags: {
      path: string;
      title: string;
    }[] = [];
    let result = ref(itemTags);

    //添加标签
    const addTags = (path: string, title: string) => {
      let tag: any = reactive({
        path,
        title,
      });
      //去重
      const curItem = result.value.some((item) => {
        return item.path == tag.path;
      });
      if (!curItem) {
        result.value.push(tag);
        if (result.value.length > 10) {
          result.value.shift();
        }
      }
    };

    //是否选中
    const isActive = (path: string) => {
      return path === route.path;
    };

    //右侧标签选项
    const handleTags = (command: string) => {
      command === "other" ? closeOther() : closeAll();
    };

    //关闭其他
    const closeOther = () => {
      const curItem = result.value.filter((item) => {
        return item.path === route.path;
      });
      result.value = curItem;
    };

    //关闭所有
    const closeAll = () => {
      result.value = [];
      router.replace("/");
    };

    //关闭标签
    const closeTag = (index:number) => {
      const delItem = result.value.splice(index,1)[0]
      const item = result.value[index] ? result.value[index] : result.value[index - 1]
      if(item) {
        delItem.path === route.path  && router.push(item.path)
      }else {
        router.replace('/')
      }
    };

    watch(
      () => route.path,
      () => {
        let title: any = route.meta.title;
        addTags(route.path, title);
      }
    );

    return {
      route,
      addTags,
      result,
      isActive,
      handleTags,
      closeTag
    };
  },
  created() {
    let title: any = this.route.meta.title;
    this.addTags(this.route.path, title);
  },
});
</script>

<style scoped>
.box-home {
  position: relative;
  width: 100%;
  height: 38px;
  overflow: hidden;
  background: #fff;
  padding-right: 120px;
  box-shadow: 0 5px 10px #ddd;
  margin-bottom: 20px;
  display: flex;
}
.el-tag {
  margin: 7px 4px;
  cursor: pointer;
  background-color: #F6FEE7;
}
.tags-close-box {
  position: absolute;
  right: 0;
  top: 0;
  color: red;
  box-sizing: border-box;
  padding-top: 1px;
  text-align: center;
  width: 110px;
  height: 30px;
  background: #fff;
  /* box-shadow: -3px 0 15px 3px rgba(0, 0, 0, 0.1); */
  z-index: 10;
}
.tags-li-title {
  float: left;
  max-width: 80px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 5px;
  color: #666;
}
.isActive .tags-li-title {
  color: red !important;
}
.tags:not(.isActive):hover {
  background: #fff !important;
}
.tags:not(.isActive) {
  background: #fff !important;
}
</style>
