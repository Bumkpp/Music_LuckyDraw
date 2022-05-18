<template>
  <div class="login-wrap">
    <div class="ms-login">
      <el-card class="box-card">
        <div class="title">
          <h2>首届西部学校艺术周展演活动抽签系统</h2>
        </div>
        <div class="top">
          <el-select placeholder="参演类别" v-model="params.pro_type">
            <el-option value="管乐">管乐</el-option>
            <el-option value="合唱">合唱</el-option>
          </el-select>
          <el-select placeholder="参演组别" v-model="params.pro_group">
            <el-option value="小学">小学</el-option>
            <el-option value="中学">中学</el-option>
            <el-option value="大学">大学</el-option>
            <el-option value="教师">教师</el-option>
          </el-select>
          <el-button type="danger" @click="handleList">查询</el-button>
        </div>
        <div class="middle" :style="{height:height + 'px'}">
          <div style="width: 100%">
            <el-row :gutter="20">
              <el-col :span="4" v-for="(o, index) in arr" :key="o.account">
                <div class="card_item">
                  <div class="item-position">
                    <div style="margin-bottom:20px">{{ index + 1 }}</div>
                    <div>{{ o.account }}</div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="bottom">
          <el-button type="danger" @click="handleBtn" v-if="!flag"
            >开始</el-button
          >
          <el-button type="danger" @click="handleEnding" v-if="flag"
            >结束</el-button
          >
          <el-button type="danger" plain @click="getExcel">导出</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, onMounted } from "vue";
import { getList } from "../http/user/user";
import { ElMessage } from "element-plus";
export default {
  setup() {
    let arr: any = ref([]);
    let flag = ref(false);
    let timer: any = null;
    let params = reactive({
      pro_group: "小学",
      pro_type: "合唱",
    });
    let length = ref();
    let height = Math.floor(document.body.clientWidth / 4)

    const shuffle = (arr: any) => {
      var len = arr.value.length;
      for (let i: number = 0; i < len - 1; i++) {
        var index: number = parseInt(String(Math.random() * (len - i)));
        var temp = arr.value[index];
        arr.value[index] = arr.value[len - i - 1];
        arr.value[len - i - 1] = temp;
      }
      return arr;
    };

    const handleBtn = () => {
      flag.value = true;
      timer = setInterval(() => {
        shuffle(arr);
      }, 200);
      timer = 0;
    };

    const handleEnding = () => {
      flag.value = false;
      for (let i = 1; i < 10000; i++) {
        clearInterval(i);
      }
    };

    const getSchool = async () => {
      const res: any = await getList(params);
      arr.value = res.data;
      length.value = res.data.length;
    };

    // 导出
    const getExcel = () => {
      if (flag.value) {
        ElMessage.error("请先结束抽签！");
        return;
      }
      const res: any[] = [];
      for (let i = 0; i < arr.value.length; i++) {
        res.push({
          index: i + 1,
          account: arr.value[i].account,
        });
      }
      const { export_json_to_excel } = require("../excel/Export2Excel");
      const tHeader = ["参赛顺序", "参赛组别"];
      const filterVal = ["index", "account"]; //对应表头的字段名
      const data = formatJson(filterVal, res);
      const name = params.pro_type + "-" + params.pro_group + "-" + "抽签结果";
      export_json_to_excel(tHeader, data, name);
    };

    const formatJson = (filterVal: any, jsonData: any) => {
      return jsonData.map((v: any) => {
        return filterVal.map((j: any) => v[j]);
      });
    };

    //查询
    const handleList = () => {
      getSchool();
    };

    onMounted(() => {
      getSchool();
    });

    return {
      arr,
      handleBtn,
      handleEnding,
      flag,
      length,
      params,
      getExcel,
      handleList,
      height
    };
  },
};
</script>

<style scoped>
.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("http://cool.gumpxd.cn/file/1638327363339.png");
  background-size: 100%;
}
.ms-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: rgb(141, 137, 137);
  border-bottom: 1px solid #ddd;
}
.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 90%;
  height: 80%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background: rgba(187, 185, 185, 0.3);
  overflow: hidden;
}
.box-card {
  width: 100%;
  height: 100%;
  position: relative;
}
.top {
  width: 100%;
  height: 50px;
}
.el-select {
  padding-right: 20px;
  width: 300px;
}
.middle {
  width: 100%;
  margin-bottom: 20px;
  display: flex;
  line-height: 30px;
  font-size: 18px;
  overflow-y: scroll;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.middle::-webkit-scrollbar {
  display: none;
}
.bottom {
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
}

.title {
  height: 60px;
  text-align: center;
}

h2 {
  font-size: 26px;
  font-weight: 600;
  color: #f56c6c;
}
.card_item {
  width: 90%;
  height: 150px;
  background: #ef3838;
  margin: 20px 0 0;
  display: block;
  border-radius: 10px;
  box-shadow: 2px 3px 10px rgba(200, 36, 36, 0.7);
  position: relative;
}
.item-position {
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 100%;
  color: #fff;
  text-align: center;
}
</style>