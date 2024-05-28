<template>
  <div style="height: 100vh; overflow: hidden; background-color: aliceblue">
    <div style="
        display: flex;
        width: 50%;
        margin: 150px auto;
        background-color: white;
        box-shadow: 0 0 10px -2px rgba(30, 144, 255, 0.5);
        overflow: hidden;
        border-radius: 10px;
      ">
      <div style="padding: 30px">
        <img src="../assets/bg2.png" alt="" style="width: 100%; margin-top: 50px" />
      </div>
      <div>
        <div style="width: 400px; background-color: white; padding: 30px 40px">
          <el-form ref="ruleFormRef" :model="loginData" :rules="rules" size="large" status-icon>
            <div style="
                text-align: center;
                color: dodgerblue;
                font-size: 30px;
                font-weight: bold;
                margin-bottom: 30px;
              ">
              登 录
            </div>
            <el-form-item prop="username">
              <el-input v-model="loginData.username" placeholder="请输入账号" :prefix-icon="User" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="loginData.password" show-password placeholder="请输入密码" :prefix-icon="Lock" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="login">登 录</el-button>
            </el-form-item>
          </el-form>
          <div style="text-align: right">
            <a style="text-decoration: none; color: dodgerblue" href="/register">还没有账号？去注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
// pinia
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import router from "@/router";

// 定义表单收集的数据对象
const loginData = reactive({});
const rules = reactive({
  username: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 3, max: 20, message: "密码长度在3-20位之间", trigger: "blur" },
  ],
});
const ruleFormRef = ref();

// 在登录页面打印pinia用户信息：
console.log("userStore.userInfo:", userStore.userInfo);

const login = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      // 登录逻辑
      // 用模拟生成的五位数字当做用户是否存在的标志
      if (userStore.userInfo.tokenCode) {
        // 用户存在，检查账号和密码是否和注册时一致
        // 下面判断，是否相同
        // 定义一个布尔值，是真或者是假
        let flag =
          userStore.userInfo.username === loginData.username &&
          userStore.userInfo.password === loginData.password;
        // 判断flag的值
        console.log("flag:", flag);
        if (flag) {
          ElMessage.success("登录成功");
          router.push("/");
        } else {
          ElMessage.error("账号或密码错误,请检查！");
        }
      } else {
        // 用户不存在，提示用户去注册
        ElMessage.error("用户不存在，请先注册！");
      }
    }
  });
};
</script>

<style scoped></style>
