<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";



const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    type: "",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline" :rules="formRules" label-width="82px">
    <el-form-item label="用户名" prop="name">
      <el-input v-model="newFormInline.name" clearable placeholder="请输入用户名" />
    </el-form-item>

    <el-form-item label="账号" prop="type">
      <el-input v-model="newFormInline.type" clearable placeholder="请输入账号" />
    </el-form-item>

    <el-form-item label="密码" prop="type">
      <el-input v-model="newFormInline.remark" clearable placeholder="请输入密码" />
    </el-form-item>

  </el-form>
</template>
