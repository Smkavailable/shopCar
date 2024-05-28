<template>
  <el-container>
    <!-- 顶部导航栏 -->
    <div class="topbar">
      <div class="nav">
        <ul>
          <li v-if="false">
            <el-button type="text" @click="login">登录</el-button>
            <span class="sep">|</span>
            <el-button type="text" @click="register = true">注册</el-button>
          </li>
          <li v-else>
            欢迎
            <!-- <el-popover placement="top" width="180" v-model="visible">
              <p>确定退出登录吗？</p>
              <div style="text-align: right; margin: 10px 0 0">
                <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                <el-button type="primary" size="mini" @click="logout">确定</el-button>
              </div>
              <el-button type="text" slot="reference">{{ username }}</el-button>
            </el-popover> -->
          </li>
          <li>
            <router-link to="/order">我的订单</router-link>
          </li>
          <li>
            <router-link to="/collect">我的收藏</router-link>
          </li>
          <li :class="1 > 0 ? 'shopCart-full' : 'shopCart'">
            <router-link to="/shoppingCart">
              <i class="el-icon-shopping-cart-full"></i> 购物车
              <span class="num">({{ 1 }})</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 顶部导航栏END -->
    <el-header>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" active-text-color="#409eff" router>
        <div class="logo">
          <router-link to="/">
            <img style="width: 100%; padding: 21px 30px" src="./assets/logo1.png" alt />
          </router-link>
        </div>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/goods">全部商品</el-menu-item>
        <el-menu-item index="/shoppingCart">购物车</el-menu-item>
        <el-menu-item index="/login">我的</el-menu-item>
        <el-menu-item index="/about">关于我们</el-menu-item>
        <!-- <el-menu-item index="/register">注册</el-menu-item> -->
        <!-- <div class="so">
          <el-input placeholder="请输入搜索内容" v-model="search">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="searchClick"
            ></el-button>
          </el-input>
        </div> -->
        <div class="avatar_css avatar">
          <!-- 在用户登录之后，显示登录用户信息 -->
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar style="cursor: pointer" src="https://pic.imgdb.cn/item/64f74997661c6c8e54c06cf3.jpg" />
              <span style="margin-left: 5px">Smk_1234242</span>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu style="width: 100%">
                <el-dropdown-item>登录</el-dropdown-item>
                <el-dropdown-item>注册</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
          <!-- <div v-else>
            <span class="el-dropdown-link">
              <el-avatar style="cursor: pointer"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
              <div style="margin-left: 5px; margin-top: 8px">请先登录</div>
            </span>
          </div> -->
        </div>
      </el-menu>
    </el-header>
    <!-- 主要区域容器 -->
    <el-main>
      <router-view v-slot="{ Component }">
        <transition name="router-fade" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </el-main>
    <!-- 主要区域容器END -->
    <!-- 底栏容器 -->
    <el-footer>
      <div class="footer">
        <div class="ng-promise-box">
          <div class="ng-promise">
            <p class="text">
              <a class="icon1" href="javascript:;">7天无理由退换货</a>
              <a class="icon2" href="javascript:;">满99元全场免邮</a>
              <a class="icon3" style="margin-right: 0" href="javascript:;">100%品质保证</a>
            </p>
          </div>
        </div>
        <!-- <div class="github">
          <a href="#" target="_blank">
            <div class="github-but"></div>
          </a>
        </div> -->
        <div class="mod_help">
          <p>
            <router-link to="/">首页</router-link>
            <span>|</span>
            <router-link to="/goods">全部商品</router-link>
            <span>|</span>
            <router-link to="/about">关于我们</router-link>
          </p>
          <p class="coty">CONVERSE商城版权所有 &copy; 2024</p>
        </div>
      </div>
    </el-footer>
    <!-- 底栏容器END -->
  </el-container>
</template>

<script setup>
import { reactive, ref, onBeforeMount, watch } from "vue";
import router from "@/router";
import { UserFilled, ArrowDown } from "@element-plus/icons-vue";
// 1 引入useRoute路由信息方法
import { useRoute } from "vue-router";
// 2 获取实例
const route = useRoute();
// 定义表单收集的数据对象
const activeIndex = ref("");
const search = ref("");
const visible = ref(false);

console.log("打印一下主页的router的信息：", router);
console.log("打印一下主页的route的信息：", route.name);

// 监听路由中的name属性的变化
watch(
  () => route.name,
  (newValue, oldValue) => {
    console.log("路由中的name属性变化了：", newValue, oldValue);
    activeIndex.value = newValue;

    // 根据路由中的name属性来设置菜单的选中状态
    // switch (newValue) {
    //   case "Home":
    //     activeIndex.value = "1";
    //     break;
    //   case "About":
    //     activeIndex.value = "2";
    //     break;
    //   case "Goods":
    //     activeIndex.value = "3";
    //     break;
    //   default:
    //     activeIndex.value = "";
    //     break;
    // }
  }
);

// 监听路由中的query属性的变化
// watch(
//   () => route.query,
//   (newValue, oldValue) => {
//     console.log("路由中的query属性变化了：", newValue, oldValue);
//     // 根据路由中的query属性来设置菜单的选中状态
//     switch (newValue.categoryId) {
//       case "1":
//         activeIndex.value = "1";
//         break;
//       case "2":
//         activeIndex.value = "2";
//         break;
//       case "3":
//         activeIndex.value = "3";
//         break;
//       default:
//         activeIndex.value = "";
//         break;
//     }
//   }
// );
</script>

<style scoped>
:deep(.el-tooltip__trigger:focus-visible) {
  outline: unset;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
}

.avatar_css {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  border-bottom: 2px solid transparent;
  color: #303133;
  height: 100%;
}

/* 全局CSS */
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}

#app .el-header {
  padding: 0;
}

#app .el-main {
  min-height: 300px;
  padding: 20px 0;
}

#app .el-footer {
  padding: 0;
}

a,
a:hover {
  text-decoration: none;
}

/* 全局CSS END */

/* 顶部导航栏CSS */
.topbar {
  height: 40px;
  background-color: #3d3d3d;
  margin-bottom: 20px;
}

.topbar .nav {
  width: 1225px;
  margin: 0 auto;
}

.topbar .nav ul {
  float: right;
}

.topbar .nav li {
  float: left;
  height: 40px;
  color: #b0b0b0;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  margin-left: 20px;
}

.topbar .nav .sep {
  color: #b0b0b0;
  font-size: 12px;
  margin: 0 5px;
}

.topbar .nav li .el-button {
  color: #b0b0b0;
}

.topbar .nav .el-button:hover {
  color: #fff;
}

.topbar .nav li a {
  color: #b0b0b0;
}

.topbar .nav a:hover {
  color: #fff;
}

.topbar .nav .shopCart {
  width: 120px;
  background: #424242;
}

.topbar .nav .shopCart:hover {
  background: #fff;
}

.topbar .nav .shopCart:hover a {
  color: #ff6700;
}

.topbar .nav .shopCart-full {
  width: 120px;
  background: #ff6700;
}

.topbar .nav .shopCart-full a {
  color: white;
}

/* 顶部导航栏CSS END */
/* .demo-type {
  display: flex;
}

.demo-type>div {
  flex: 1;
  text-align: center;
}

.demo-type>div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}

#app .el-header {
  padding: 0;
}

#app .el-main {
  min-height: 300px;
  padding: 20px 0;
}

#app .el-footer {
  padding: 0;
}

a,
a:hover {
  text-decoration: none;
} */

/* 顶栏容器CSS */
.el-header .el-menu {
  max-width: 1225px;
  margin: 0 auto;
}

.el-header .logo {
  height: 60px;
  width: 189px;
  float: left;
  margin-right: 100px;
}

.avatar {
  height: 60px;
  width: 189px;
  float: right;
  margin-left: 100px;
}

.el-header .so {
  margin-top: 10px;
  width: 300px;
  float: right;
}

/* 顶栏容器CSS END */

/* 底栏容器CSS */
.footer {
  width: 100%;
  text-align: center;
  background: #2f2f2f;
  padding-bottom: 20px;
}

.footer .ng-promise-box {
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}

.footer .ng-promise-box {
  margin: 0 auto;
  border-bottom: 1px solid #3d3d3d;
  line-height: 145px;
}

.footer .ng-promise-box .ng-promise p a {
  color: #fff;
  font-size: 20px;
  margin-right: 210px;
  padding-left: 44px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-decoration: none;
  background: url("./assets/us-icon.png") no-repeat left 0;
}

.footer .github {
  height: 50px;
  line-height: 50px;
  margin-top: 20px;
}

.footer .github .github-but {
  width: 50px;
  height: 50px;
  margin: 0 auto;
  background: url("./assets/github.png") no-repeat;
}

.footer .mod_help {
  text-align: center;
  color: #888888;
}

.footer .mod_help p {
  margin: 20px 0 16px 0;
}

.footer .mod_help p a {
  color: #888888;
  text-decoration: none;
}

.footer .mod_help p a:hover {
  color: #fff;
}

.footer .mod_help p span {
  padding: 0 22px;
}

/* 底栏容器CSS END */
</style>
