<template>
  <div class="pd-le-ri">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon :size="11"><home-filled /></el-icon> 作品列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div style="width: 400px; display: flex">
        <el-input v-model="search" placeholder="团队名称" />
        <div style="margin: 0 20px">
          <el-button type="primary" @click="handleBtn">搜索</el-button>
        </div>
      </div>
      <div style="margin: 20px 0 30px">
        <el-table :data="tableData" border style="width: 100%" :stripe="true">
          <el-table-column prop="pro_team" label="团队名称" width="100" />
          <el-table-column prop="pro_name" label="领队姓名" />
          <el-table-column prop="pro_phone" label="领队电话"></el-table-column>
          <el-table-column label="参赛组别">
            <template v-slot="scope">
              <span v-if="scope.row.pro_group == 1">小学</span>
              <span v-if="scope.row.pro_group == 2">中学</span>
              <span v-if="scope.row.pro_group == 3">大学</span>
              <span v-if="scope.row.pro_group == 4">教师</span>
            </template>
          </el-table-column>
          <el-table-column prop="pro_song" label="参赛曲目"></el-table-column>
          <el-table-column prop="pro_num1" label="正式队员数量">
          </el-table-column>
          <el-table-column prop="pro_num2" label="预备队员数量">
          </el-table-column>
          <el-table-column prop="pro_url" label="视频链接" width="200">
          </el-table-column>
          <el-table-column prop="pro_remarks" label="备注"> </el-table-column>
          <el-table-column label="导出操作" width="80" align="center">
            <template v-slot="scope">
              <el-button type="primary" size="small" @click="getFile(scope.row.id)">导出</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-bottom: 10px">
        <div class="demo-pagination-block">
          <el-pagination
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total1"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { HomeFilled } from "@element-plus/icons";
import { getList, getMessage } from "@/http/admin/admin";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    HomeFilled,
  },
  setup() {
    let dataApi:number = 1
    const search = ref("");
    const tableData: any = ref();
    const store = useStore();
    const pageMessage = reactive({
      basic_id: "",
      limit: 10,
      page: 1,
      token: "",
      name: "",
      pro_team: "",
    });
    const total1 = ref(0);

    const getData = async () => {
      dataApi = 1
      pageMessage.token = store.state.token;
      const res = await getList(pageMessage);
      const data:any = res.data
      total1.value = data.total;
      tableData.value = data.data;
    };

    onMounted(async () => {
      getData();
    });

    const pageChange = async(page: any) => {
      pageMessage.page = page;
      if(dataApi === 1) {
        getData();
      }else if(dataApi === 2) {
        dataApi = 2
        const res = await getMessage(pageMessage);
        const data:any = res.data
        total1.value = data.total;
        tableData.value = data.data;
      }
    };

    const handleBtn = async () => {
      if (search.value == "") {
        pageMessage.pro_team = "";
        dataApi = 1
        getData();
      } else {
        pageMessage.pro_team = search.value;
        dataApi = 2
        const res = await getMessage(pageMessage);
        const data:any = res.data
        total1.value = data.total;
        tableData.value = data.data;
      }
    };

    const getFile = (id:number) => {
      window.location.href = "http://scs-music.isekko.cn/api/program/pdf?id="+id
    }

    return {
      tableData,
      total1,
      pageChange,
      handleBtn,
      search,
      getFile
    };
  },
});
</script>

<style scoped>
</style>
