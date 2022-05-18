import { ElMessage } from "element-plus";

export function validateEmpty(data: any) {
  try {
    Object.values(data).forEach((item: any) => {
      if (item.length === 0) {
        ElMessage.error("您还有数据未填写");
        throw new Error("您还有数据未填写");
      }
    });
  } catch (err) {
  }
}
