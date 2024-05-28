<template>
  <div class="home" id="home" name="home">
    <!-- 轮播图 -->
    <div class="block">
      <el-carousel :interval="4000" type="card" height="500px">
        <el-carousel-item v-for="item in carousel" :key="item.id">
          <img style="height: 500px; width: 100%" :src="item.imgPath" :alt="item.name" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 轮播图END -->
    <!-- 商品展示区域 -->
    <div class="main-box">
      <div class="main">
        <!-- 满减商品展示区域 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">满减满折享不停</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img :src="testImg" />
              </router-link>
            </div>
            <div class="list">
              <MyList :list="goodList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 满减商品展示区域END -->
        <!-- 新品上线 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">新品上线</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img :src="testImg1" />
              </router-link>
            </div>
            <div class="list">
              <MyList :list="newList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
        <!-- 重磅尖货 -->
        <div class="phone">
          <div class="box-hd">
            <div class="title">重磅尖货</div>
          </div>
          <div class="box-bd">
            <div class="promo-list">
              <router-link to>
                <img :src="testImg2" />
              </router-link>
            </div>
            <div class="list">
              <MyList :list="fitList" :isMore="true"></MyList>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyList from "../components/MyList.vue";
import { onBeforeMount, onMounted, ref, reactive } from "vue";
import axios from "axios";

// 定义轮播图变量
const carousel = ref([]);

// 定义商品变量
const goodList = ref([]);
const newList = ref([]);
const fitList = ref([]);

// 满减变量大图片变量定义
const testImg = ref("https://pic.imgdb.cn/item/660ffe1f68eb93571323c936.png");
// 新品上线大图片变量定义
const testImg1 = ref("https://pic.imgdb.cn/item/6610005168eb935713285bbd.png");
// 重磅尖货大图片定义
const testImg2 = ref("https://pic.imgdb.cn/item/6610012c68eb935713295f11.png");
//生命周期
onBeforeMount(() => {
  // 获取轮播图数据
  getCarouselList();
  // 获取商品数据
  getGoodsList();
  getNewList();
  getFitList();
});
// 在组件创建时获取数据
onMounted(() => { });

// 获取轮播图变量数据
const getCarouselList = () => {
  let url = "http://localhost:3000/carousel";
  axios.get(url).then((res) => {
    // 更新轮播图变量
    carousel.value = res.data;
    console.log("获取后台轮播图数据：", res);
  });
};

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
</script>

<style scoped>
/* 轮播图 css */
.block {
  margin: 0 auto;
  max-width: 1225px;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 460px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 商品展示区域 css */
.main-box {
  background-color: #f5f5f5;
  padding-bottom: 20px;
}

.main {
  margin: 0 auto;
  max-width: 1225px;
}

.box-hd {
  height: 58px;
  margin: 20px 0 0 0;
}

.box-hd .title {
  float: left;
  font-size: 22px;
  font-weight: 200;
  line-height: 58px;
  color: #333;
}

.box-hd .more {
  float: right;
}

.box-hd .more a {
  font-size: 16px;
  line-height: 58px;
  color: #424242;
}

.box-hd .more a:hover {
  color: #ff6700;
}

.box-bd {
  height: 615px;
}

.box-bd .promo-list {
  float: left;
  height: 615px;
  width: 234px;
}

.box-bd .promo-list li {
  z-index: 1;
  width: 234px;
  height: 300px;
  margin-bottom: 14.5px;
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}

.box-bd .promo-list li:hover {
  z-index: 2;
  -webkit-box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  -webkit-transform: translate3d(0, -2px, 0);
  transform: translate3d(0, -2px, 0);
}

.box-bd .promo-list li img {
  width: 234px;
  height: 300px;
}

.box-bd .promo-list img {
  width: 234px;
}

.box-bd .list {
  float: left;
  height: 615px;
  width: 991px;
}
</style>
