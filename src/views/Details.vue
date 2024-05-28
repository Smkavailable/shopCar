<template>
    <div id="details">
        <!-- 头部 -->
        <div class="page-header">
            <div class="title">
                <p>{{ productDetails.product_name }}</p>
            </div>
        </div>
        <!-- 头部END -->

        <!-- 主要内容 -->
        <div class="main">
            <!-- 左侧商品轮播图 -->
            <div class="block">
                <el-carousel height="560px" v-if="productPicture.length > 1">
                    <el-carousel-item v-for="item in productPicture" :key="item.id">
                        <img style="height: 560px" :src="item.product_picture" :alt="item.intro" />
                    </el-carousel-item>
                </el-carousel>
                <div v-if="productPicture.length == 1">
                    <img style="height: 560px" :src="productPicture[0].product_picture"
                        :alt="productPicture[0].intro" />
                </div>
            </div>
            <!-- 左侧商品轮播图END -->

            <!-- 右侧内容区 -->
            <div class="content">
                <h1 class="name">{{ productDetails.product_name }}</h1>
                <p class="intro">{{ productDetails.product_intro }}</p>
                <p class="store">匡威自营</p>
                <div class="price">
                    <span>{{ productDetails.product_selling_price }}元</span>
                    <span v-show="productDetails.product_price != productDetails.product_selling_price" class="del">{{
                    productDetails.product_price }}元</span>
                </div>
                <div class="pro-list">
                    <span class="pro-name">{{ productDetails.product_name }}</span>
                    <span class="pro-price">
                        <span>{{ productDetails.product_selling_price }}元</span>
                        <span v-show="productDetails.product_price != productDetails.product_selling_price
                    " class="pro-del">{{ productDetails.product_price }}元</span>
                    </span>
                    <p class="price-sum">总计 : {{ productDetails.product_selling_price }}元</p>
                </div>
                <!-- 内容区底部按钮 -->
                <div class="button">
                    <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button>
                    <el-button class="like">喜欢</el-button>
                </div>
                <!-- 内容区底部按钮END -->
                <div class="pro-policy">
                    <ul>
                        <li><i class="el-icon-circle-check"></i> 匡威自营</li>
                        <li><i class="el-icon-circle-check"></i> 匡威发货</li>
                        <li><i class="el-icon-circle-check"></i> 7天无理由退货</li>
                        <li><i class="el-icon-circle-check"></i> 7天价格保护</li>
                    </ul>
                </div>
            </div>
            <!-- 右侧内容区END -->
        </div>
        <!-- 主要内容END -->
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import axios from "axios";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
import router from "@/router";
// 1 引入useRoute路由信息方法
import { useRoute } from "vue-router";
// 2 获取实例
const route = useRoute();
// 3 解构赋值
// const {
//     query: { productID },
// } = route;
// 定义商品id
let productID = ref(route.query.productID);

// 打印下商品的id
console.log("商品数据的id为:", productID);

// 生命周期钩子
// 页面加载完毕，执行onMounted方法
onMounted(() => {
    // 获取商品数据
    getProductDetails();
});

// 监听商品id的变化，如果发生变化，那么重新获取商品数据
watch(
    () => route.query,
    (newVal, oldVal) => {
        // 打印下商品的id
        console.log("watch商品数据的id为:", oldVal);
        console.log("watch新商品数据的id为:", newVal);
        // 获取商品数据
        // 把变化的id赋值给productID
        console.log("watch监听的商品id为:", productID.value);
        if (newVal != oldVal) {
            productID.value = newVal.productID;
            const params = productID.value;
            getProductDetails();
            fetchData(params);
            console.log("watch打印一下flag的值：", flag.value);
        }
    }
);

// 定义布尔类型变量dis，用于控制按钮是否禁用
const dis = ref(false);

// 定义商品详情对象
const productDetails = ref({
    product_id: 1,
    product_name: "测试测试",
    product_intro: "测试",
    product_price: 200,
    product_selling_price: 100,
    product_picture: "https://pic.imgdb.cn/item/6610044868eb9357132cf860.webp",
    id: 1,
    num: 1,
});

// 定义商品轮播图数组
const productPicture = ref([
    {
        id: 1,
        product_picture: "",
        intro: "轮播测试",
    },
]);

// 定义获取商品数据
const getProductDetails = () => {
    // 打印下商品的id
    // console.log("watch函数传来的商品数据的id为:", params);
    // 拿到商品id之后，发请求，获取本商品的数据
    // 如果id在1-10以内，那么就是满减的商品，如果是11-20以内的，那就是新品商品，如果是20-30的那就是中重磅的商品
    const productName = ref("");
    if (productID.value >= 1 && productID.value <= 10) {
        productName.value = "goods";
    } else if (productID.value >= 11 && productID.value <= 20) {
        productName.value = "newgood";
    } else {
        productName.value = "fitgood";
    }
    // 打印一下商品范围的名字
    console.log("商品范围的名字为:", productName.value);
    let url =
        "http://localhost:3000/" + productName.value + "?product_id=" + productID.value;
    console.log("商品详情页的url地址：", url);
    axios.get(url).then((res) => {
        // 更新商品变量
        productDetails.value = res.data[0];
        // 更新商品轮播图数组
        productPicture.value[0].product_picture = res.data[0].product_picture;
        console.log("商品详情页变量数据：", res.data);
    });
};
// 判断商品是否在购物车之中的标志
// 变量提升，把值定义在最外面，然后函数内使用，这样就不会报错，解决小bug
const flag = ref(false);
// 检查商品是否在购物车之中
async function fetchData(params) {
    try {
        console.log("打印一下params的值：", params);
        let urlID = "http://localhost:3000/shopCat/" + params;
        const response = await axios.get(urlID);
        flag.value = true;
        console.log("fetchData打印一下flag的值：", flag.value);
        console.log("商品在购物车之中");
        console.log("商品的数据是：", response);
    } catch (err) {
        console.log("打印一下错误信息：", err.code);
        if (err.code == "ERR_BAD_REQUEST") {
            flag.value = false;
            console.log("商品不在购物车之中");
        }
    }
}
// 定义添加购物车方法
const addShoppingCart = () => {
    // 添加购物车按钮点击之后，按钮禁用
    dis.value = true;
    // 判断用户是否登录，没有登录，则跳转到登录页面
    console.log("用户判断码：userStore.userInfo.tokenCode:", userStore.userInfo.tokenCode);
    if (!userStore.userInfo.tokenCode) {
        // 用户判断码不存在，则直接跳转到登录页面，让用户登录
        ElMessage({
            message: "请先登录",
            type: "warning",
        });
        // 跳转到登录页面
        router.push("/login");
    }
    // 判断商品是否已经加入购物车，如果已经加入购物车，则把数量加1，如果没在，则添加商品进去
    // let urlID = "http://localhost:3000/shopCat/" + productID.value;
    // 判断商品是否在购物车之中的标志
    // const flag = ref("0");
    // 判断商品是否已经加入购物车
    // axios
    //     .get(urlID)
    //     .then((res) => {
    //         flag.value = true;
    //         console.log("axios打印一下flag的值：", flag.value);
    //         console.log("商品在购物车之中");
    //         console.log("商品的数据是：", res);
    //     })
    //     .catch((err) => {
    //         console.log("打印一下错误信息：", err.code);
    //         if (err.code == "ERR_BAD_REQUEST") {
    //             flag.value = false;
    //             console.log("商品不在购物车之中");
    //         }
    //     });
    // async function fetchData() {
    //     try {
    //         const response = await axios.get(urlID);
    //         flag.value = true;
    //         console.log("商品在购物车之中");
    //         console.log("商品的数据是：", response);
    //     } catch (err) {
    //         console.log("打印一下错误信息：", err.code);
    //         if (err.code == "ERR_BAD_REQUEST") {
    //             flag.value = false;
    //             console.log("商品不在购物车之中");
    //         }
    //     }
    // }

    // fetchData();
    // 根据flag的值，判断商品是否已经加入购物车
    // 打印下flag的值
    console.log("if打印一下flag的值：", flag.value);
    if (flag.value) {
        // 商品已经加入购物车，则把数量加1
        console.log("商品已经加入购物车，则把数量加1");
        let urlAdd = "http://localhost:3000/shopCat/" + productID.value;
        console.log("商品数量加一的url地址：", urlAdd);
        // 使用patch api，局部修改变量的值
        console.log("productDetails.value.num是：", productDetails.value.num);
        axios
            .patch(urlAdd, {
                num: productDetails.value.num + 1,
            })
            .then((res) => {
                console.log("商品数量加1成功");
            });
        // 商品数量加1成功之后，按钮禁用取消
        dis.value = false;
        // 商品数量加1成功之后，弹出提示框
        ElMessage({
            message: "商品数量加1成功",
            type: "success",
        });
        // 商品数量加1成功之后，跳转到购物车页面
        router.push("/shoppingCart");
    } else {
        // 商品没有加入购物车，则添加商品进去
        console.log("商品没有加入购物车，则添加商品进去");
        // 商品未加入购物车，添加商品进去
        let urlNew = "http://localhost:3000/shopCat";
        axios
            .post(urlNew, {
                id: productDetails.value.id,
                product_id: productDetails.value.product_id,
                product_name: productDetails.value.product_name,
                product_title: productDetails.value.product_title,
                product_intro: productDetails.value.product_intro,
                product_price: productDetails.value.product_price,
                product_selling_price: productDetails.value.product_selling_price,
                product_picture: productDetails.value.product_picture,
                num: productDetails.value.num,
            })
            .then((res) => {
                console.log("商品添加成功");
            });
        // 商品数量加1成功之后，按钮禁用取消
        dis.value = false;
        // 商品数量加1成功之后，弹出提示框
        ElMessage({
            message: "商品添加成功",
            type: "success",
        });
        // 商品数量加1成功之后，跳转到购物车页面
        router.push("/shoppingCart");
    }
    // console.log("打印一下flagTest的值：", flagTest);

    // 未解决问题：在axios中，无法复制flag的值，现在想到的办法是用异步 await 方法 async await
    // 解决办法：变量提升，把值定义在最外面，然后函数内使用，这样就不会报错，解决小bug
};
</script>

<style>
/* 头部CSS */
#details .page-header {
    height: 64px;
    margin-top: -20px;
    z-index: 4;
    background: #fff;
    border-bottom: 1px solid #e0e0e0;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}

#details .page-header .title {
    width: 1225px;
    height: 64px;
    line-height: 64px;
    font-size: 18px;
    font-weight: 400;
    color: #212121;
    margin: 0 auto;
}

#details .page-header .title p {
    float: left;
}

#details .page-header .title .list {
    height: 64px;
    float: right;
}

#details .page-header .title .list li {
    float: left;
    margin-left: 20px;
}

#details .page-header .title .list li a {
    font-size: 14px;
    color: #616161;
}

#details .page-header .title .list li a:hover {
    font-size: 14px;
    color: #ff6700;
}

/* 头部CSS END */

/* 主要内容CSS */
#details .main {
    width: 1225px;
    height: 560px;
    padding-top: 30px;
    margin: 0 auto;
}

#details .main .block {
    float: left;
    width: 560px;
    height: 560px;
}

#details .el-carousel .el-carousel__indicator .el-carousel__button {
    background-color: rgba(163, 163, 163, 0.8);
}

#details .main .content {
    float: left;
    margin-left: 25px;
    width: 640px;
}

#details .main .content .name {
    height: 30px;
    line-height: 30px;
    font-size: 24px;
    font-weight: normal;
    color: #212121;
}

#details .main .content .intro {
    color: #b0b0b0;
    padding-top: 10px;
}

#details .main .content .store {
    color: #ff6700;
    padding-top: 10px;
}

#details .main .content .price {
    display: block;
    font-size: 18px;
    color: #ff6700;
    border-bottom: 1px solid #e0e0e0;
    padding: 25px 0 25px;
}

#details .main .content .price .del {
    font-size: 14px;
    margin-left: 10px;
    color: #b0b0b0;
    text-decoration: line-through;
}

#details .main .content .pro-list {
    background: #f9f9fa;
    padding: 30px 60px;
    margin: 50px 0 50px;
}

#details .main .content .pro-list span {
    line-height: 30px;
    color: #616161;
}

#details .main .content .pro-list .pro-price {
    float: right;
}

#details .main .content .pro-list .pro-price .pro-del {
    margin-left: 10px;
    text-decoration: line-through;
}

#details .main .content .pro-list .price-sum {
    color: #ff6700;
    font-size: 24px;
    padding-top: 20px;
}

#details .main .content .button {
    height: 55px;
    margin: 10px 0 20px 0;
}

#details .main .content .button .el-button {
    float: left;
    height: 55px;
    font-size: 16px;
    color: #fff;
    border: none;
    text-align: center;
}

#details .main .content .button .shop-cart {
    width: 340px;
    background-color: #ff6700;
}

#details .main .content .button .shop-cart:hover {
    background-color: #f25807;
}

#details .main .content .button .like {
    width: 260px;
    margin-left: 40px;
    background-color: #b0b0b0;
}

#details .main .content .button .like:hover {
    background-color: #757575;
}

#details .main .content .pro-policy li {
    float: left;
    margin-right: 20px;
    color: #b0b0b0;
}

/* 主要内容CSS END */
</style>
