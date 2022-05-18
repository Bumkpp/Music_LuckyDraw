<template>
  <div class="pd-le-ri">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <el-icon :size="11"><key /></el-icon> 账号管理
        </el-breadcrumb-item>
      </el-breadcrumb>
      <div class="container" style="margin-top: 10px">
        <div style="display: flex; justify-content: space-between">
          <div style="display: flex; width: 400px">
            <el-input placeholder="账号" v-model="search" />
            <div style="margin: 0 20px">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
            </div>
          </div>
          <div>
            <el-button type="primary" @click="handleAdd">新增账号</el-button>
          </div>
        </div>
        <div style="margin: 20px 0 30px">
          <el-table border style="width: 100%" :data="tableData" :stripe="true">
            <el-table-column prop="account" label="账号" />
            <el-table-column label="操作" align="center">
              <template v-slot="scope">
                <el-button
                  type="danger"
                  @click="handleResetting(scope.row.account)"
                  >重置密码</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div>
      <el-dialog v-model="dialogVisible" title="增加账号" width="30%">
        <el-form
          ref="ruleForm"
          :model="form"
          class="demo-ruleForm"
          :rules="rules"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="form.account"></el-input>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="addUser">新增</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from "vue";
import { getUser, Resetting, Adduser } from "@/http/admin/admin";
import { Key } from "@element-plus/icons";

export default defineComponent({
  setup() {
    const dialogVisible = ref(false);
    const form = reactive({
      account: "",
    });
    let tableData = ref();
    const name = "";
    const search = ref("");
    const rules = {
      account: [
        {
          required: true,
          message: "请填写用户名",
          trigger: "blur",
        },
      ],
    };

    const handleAdd = () => {
      dialogVisible.value = true;
    };

    const getList = async (name?: string) => {
      const res = await getUser({ name });
      const data: any = res.data;
      tableData.value = data;
    };

    const handleResetting = async (name: string) => {
      await Resetting({ account: name });
    };

    const handleSearch = async () => {
      getList(search.value);
    };

    const addUser = async() => {
      await Adduser({account:form.account})
      dialogVisible.value = false
      getList()
    };

    onMounted(() => {
      getList();
    });

    return {
      dialogVisible,
      form,
      rules,
      search,
      tableData,
      handleAdd,
      handleResetting,
      handleSearch,
      addUser,
    };
  },
  components: {
    Key,
  },
});
</script>

<style scoped>
</style>
