import { ElMessage } from "element-plus";

export function validatePhone(item: any) {
  const reg = /^1\d{10}$/;
  if (!reg.test(item.phone)) {
    ElMessage.error("请输入正确的手机号码");
  }
}
