<template>
  <div>
    <h1>Home文件</h1>
    <el-button type="primary" size="default" :icon="Plus">新增</el-button>

    <!-- 帮我写一个element-plus的表单 -->
    <el-form :model="form" label-width="120px">
      <!-- 简单写点内容 -->
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item> <el-button type="primary">登录</el-button> </el-form-item>
      <!-- 帮我写一个登录按钮 -->
      <!-- 帮我写一个重置按钮 -->
      <el-form-item> <el-button type="primary">重置</el-button> </el-form-item>
      <!-- 帮我写一个注册按钮 -->
      <el-form-item> <el-button type="primary">注册</el-button> </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
const form = reactive({
  username: "",
  password: "",
});
</script>

<style scoped></style>
