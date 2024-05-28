<template>
  <div class="goods" id="goods" name="goods">
    <!-- 面包屑 -->
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
        <el-breadcrumb-item>全部商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 面包屑END -->

    <!-- 主要内容区 -->
    <div class="main">
      <div class="list">
        <MyList :list="goodList" v-if="goodList.length > 0"></MyList>
        <div v-else class="none-product">抱歉没有找到相关的商品，请看看其他的商品</div>
        <MyList :list="newList" v-if="newList.length > 0"></MyList>
        <MyList :list="fitList" v-if="fitList.length > 0"></MyList>
      </div>
      <!-- 分页 -->
      <!-- <div class="pagination">
        <el-pagination background layout="prev, pager, next" :page-size="pageSize" :total="total"
          @current-change="currentChange"></el-pagination>
      </div> -->
      <!-- 分页END -->
    </div>
    <!-- 主要内容区END -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
// 引入商品列表组件
import MyList from "../components/MyList.vue";

// 引入面包屑图标
import { ArrowRight } from "@element-plus/icons-vue";

// 定义商品变量
const goodList = ref([]);
const newList = ref([]);
const fitList = ref([]);

// 定义页面加载时执行的方法
onMounted(() => {
  // 获取当前分类标签的商品数据
  getGoodsList();
  getNewList();
  getFitList();
});
// 获取满减商品数据
const getGoodsList = () => {
  let url = "http://localhost:3000/goods";
  axios.get(url).then((res) => {
    // 更新商品数据变量
    goodList.value = res.data;
    console.log("获取满减商品数据：", res);
  });
};

// 获取新品上线商品数据
const getNewList = () => {
  let url = "http://localhost:3000/newgood";
  axios.get(url).then((res) => {
    // 更新商品数据变量
    newList.value = res.data;
    console.log("获取新品上线商品数据：", res);
  });
};

// 获取重磅尖货商品数据
const getFitList = () => {
  let url = "http://localhost:3000/fitgood";
  axios.get(url).then((res) => {
    // 更新商品数据变量
    fitList.value = res.data;
    console.log("获取重磅尖货商品数据：", res);
  });
};

// 定义商品数据;
const product = reactive([
  {
    product_id: 1,
    product_name: "测试1",
    product_price: 100,
    product_selling_price: 80,
    product_img: "测试1.jpg",
  },
  {
    product_id: 2,
    product_name: "测试2",
    product_price: 200,
    product_selling_price: 180,
    product_img: "测试2.jpg",
  },
  {
    product_id: 3,
    product_name: "测试3",
    product_price: 300,
    product_selling_price: 280,
    product_img: "测试3.jpg",
  },
]);
</script>

<style scoped>
.goods {
  background-color: #f5f5f5;
}

/* 面包屑CSS */
.el-tabs--card .el-tabs__header {
  border-bottom: none;
}

.goods .breadcrumb {
  height: 50px;
  background-color: white;
}

.goods .breadcrumb .el-breadcrumb {
  width: 1225px;
  line-height: 30px;
  font-size: 16px;
  margin: 0 auto;
}

/* 面包屑CSS END */

/* 分类标签CSS */
.goods .nav {
  background-color: white;
}

.goods .nav .product-nav {
  width: 1225px;
  height: 40px;
  line-height: 40px;
  margin: 0 auto;
}

.nav .product-nav .title {
  width: 50px;
  font-size: 16px;
  font-weight: 700;
  float: left;
}

/* 分类标签CSS END */

/* 主要内容区CSS */
.goods .main {
  margin: 0 auto;
  max-width: 1225px;
}

.goods .main .list {
  min-height: 650px;
  padding-top: 14.5px;
  margin-left: -13.7px;
  overflow: auto;
}

.goods .main .pagination {
  height: 50px;
  text-align: center;
}

.goods .main .none-product {
  color: #333;
  margin-left: 13.7px;
}

/* 主要内容区CSS END */
</style>
