<template>
    <div class="shoppingCart">
        <!-- 购物车头部 -->
        <div class="cart-header">
            <div class="cart-header-content">
                <p>
                    <i class="el-icon-shopping-cart-full" style="color: #ff6700; font-weight: 600"></i>
                    我的购物车
                </p>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
            </div>
        </div>
        <!-- 购物车头部END -->

        <!-- 购物车主要内容区 -->
        <div class="content" v-if="getShoppingCart.length > 0">
            <ul>
                <!-- 购物车表头 -->
                <li class="header">
                    <div class="pro-check">
                        <el-checkbox v-model="isChecked" @change="checkAll">全选</el-checkbox>
                    </div>
                    <div class="pro-img"></div>
                    <div class="pro-name">商品名称</div>
                    <div class="pro-price">单价</div>
                    <div class="pro-num">数量</div>
                    <div class="pro-total">小计</div>
                    <div class="pro-action">操作</div>
                </li>
                <!-- 购物车表头END -->

                <!-- 购物车列表 -->
                <li class="product-list" v-for="(item, index) in getShoppingCart" :key="item.id">
                    <div class="pro-check">
                        <el-checkbox v-model="item.check" @change="cartStore.checkChange(index)"></el-checkbox>
                    </div>
                    <div class="pro-img">
                        <router-link :to="{ path: '/details', query: { productID: item.id } }">
                            <img :src="item.product_picture" />
                        </router-link>
                    </div>
                    <div class="pro-name">
                        <router-link :to="{ path: '/details', query: { productID: item.id } }">{{
            item.product_name
        }}</router-link>
                    </div>
                    <div class="pro-price">{{ item.product_selling_price }}元</div>
                    <div class="pro-num">
                        <!-- <el-input-number size="small" v-model"item.num" @change="handleChange($event, index, item.id)"
                            :min="1" :max="maxNum"></el-input-number> -->
                        <el-input-number v-model="item.num" :min="1" :max="10" size="small"
                            @change="handleChange(item.num, index, item.id)" />
                    </div>
                    <div class="pro-total pro-total-in">
                        {{ item.product_selling_price * item.num }}元
                    </div>
                    <div class="pro-action">
                        <!-- <el-popover placement="right" title="主题设置" trigger="hover" :width="300">
                            <p>确定删除吗？</p>
                            <div style="text-align: right; margin: 10px 0 0">
                                <el-button type="primary" size="mini"
                                    @click="deleteItem($event, item.id, item.productID)">确定</el-button>
                            </div>
                            <el-icon>
                                <Close />
                            </el-icon>
                        </el-popover> -->
                        <el-icon @click="deleteItem(item.id)">
                            <Close />
                        </el-icon>
                    </div>
                </li>
                <!-- 购物车列表END -->
            </ul>
            <div style="height: 20px; background-color: #f5f5f5"></div>
            <!-- 购物车底部导航条 -->
            <div class="cart-bar">
                <div class="cart-bar-left">
                    <span>
                        <router-link to="/goods">继续购物</router-link>
                    </span>
                    <span class="sep"> |</span>
                    <span class="cart-total">
                        共
                        <span class="cart-total-num">{{ getShoppingCart.length }}</span>件商品
                        <!-- ，已选择 <span class="cart-total-num">{{ total.count }}</span> 件 -->
                    </span>
                </div>
                <div class="cart-bar-right">
                    <span>
                        <span class="total-price-title">合计：</span>
                        <span class="total-price">{{ total.price }}元</span>
                    </span>
                    <div @click="payProduct()"
                        :class="getShoppingCart.length > 0 ? 'btn-primary' : 'btn-primary-disabled'">
                        结算
                    </div>
                </div>
            </div>
            <!-- 购物车底部导航条END -->
        </div>
        <!-- 购物车主要内容区END -->

        <!-- 购物车为空的时候显示的内容 -->
        <div v-else class="cart-empty">
            <div class="empty">
                <h2>您的购物车还是空的！</h2>
                <p>快去购物吧！</p>
            </div>
        </div>
        <!-- 购物车为空的时候显示的内容END -->
    </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import axios from "axios";
import { Plus, Close, InfoFilled } from "@element-plus/icons-vue";
// pinia
// 导入 pinia 中的storeToRefs
import { storeToRefs } from "pinia";
import { useCartStore } from "@/stores/cart";
import { ElMessage, ElMessageBox } from "element-plus";
const cartStore = useCartStore();
let { getShoppingCart, isChecked, total } = storeToRefs(cartStore);

import router from "@/router";
// 定义商品最大数量为10
const maxNum = 10;

// 结算
const payProduct = () => {
    // 提示用户删除成功
    ElMessage({
        message: "结算成功",
        type: "success",
    });
    // 跳转到支付页面
    router.push({ path: "/" });
};

// 全选
const checkAll = () => {
    if (isChecked.value) {
        // 不选
        cartStore.unAll();
    } else {
        // 全选
        cartStore.all();
    }
};

// 获取购物车数据
const getShoppingCartData = () => {
    const urlShop = "http://localhost:3000/shopCat";
    axios.get(urlShop).then((res) => {
        console.log("打印一下axios获取的数据：", res.data);
        // if (res.data.code !== 200) return;
        // 复制给getShoppingCart的数组
        // getShoppingCart.push(...res.data);
        // 赋值给vuex中的购物车数据
        cartStore.addCart(res.data);
        // 打印一下购物车数据
        console.log("打印一下购物车数据", res.data);
    });
};

// 删除购物车中的商品
const deleteItem = (id) => {
    console.log("打印一下删除商品的id：", id);
    ElMessageBox.confirm("确定删除吗？", "删除商品", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            // 发送请求，删除数据库中的商品
            const urlDel = "http://localhost:3000/shopCat/" + id;
            axios.delete(urlDel).then((res) => {
                console.log("打印一下删除后的数据：", res.data);
                // 删除成功后，重新获取购物车数据
                getShoppingCartData();
            });
            ElMessage.success({
                message: "删除成功",
            });
        })
        .catch(() => {
            ElMessage.info({
                message: "已取消删除",
            });
        });
};
// 生命周期函数
onBeforeMount(() => {
    getShoppingCartData();
});

// 定义商品数量发生改变时的变量
const handleChange = (currentValue, key, productID) => {
    // 打印一下数量改变时发生改变的
    console.log("打印一下数量改变时发生改变的：", currentValue, key, productID);
    // 发送请求，修改数据库中的商品数量
    const urlNum = "http://localhost:3000/shopCat/" + productID;
    axios.patch(urlNum, { num: currentValue }).then((res) => {
        console.log("打印一下修改后的数据：", res.data);
    });
};

// 打印一下购物车数据
console.log("打印一下购物车数据", getShoppingCart);
</script>

<style scoped>
a {
    text-decoration: none;
}

li {
    list-style: none;
}

.shoppingCart {
    background-color: #f5f5f5;
    padding-bottom: 20px;
}

/* 购物车头部CSS */
.shoppingCart .cart-header {
    height: 64px;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;
    margin-bottom: 20px;
}

.shoppingCart .cart-header .cart-header-content {
    width: 1225px;
    margin: 0 auto;
}

.shoppingCart .cart-header p {
    font-size: 28px;
    line-height: 58px;
    float: left;
    font-weight: normal;
    color: #424242;
}

.shoppingCart .cart-header span {
    color: #757575;
    font-size: 12px;
    float: left;
    height: 20px;
    line-height: 20px;
    margin-top: 30px;
    margin-left: 15px;
}

/* 购物车头部CSS END */

/* 购物车主要内容区CSS */
.shoppingCart .content {
    width: 1225px;
    margin: 0 auto;
    background-color: #fff;
}

.shoppingCart .content ul {
    background-color: #fff;
    color: #424242;
    line-height: 85px;
}

/* 购物车表头及CSS */
.shoppingCart .content ul .header {
    height: 85px;
    padding-right: 26px;
    color: #424242;
}

.shoppingCart .content ul .product-list {
    height: 100px;
    padding: 15px 26px 15px 0;
    border-top: 1px solid #e0e0e0;
}

.shoppingCart .content ul .pro-check {
    float: left;
    height: 85px;
    width: 110px;
}

.shoppingCart .content ul .pro-check .el-checkbox {
    font-size: 16px;
    margin-left: 24px;
}

.shoppingCart .content ul .pro-img {
    float: left;
    height: 85px;
    width: 120px;
}

.shoppingCart .content ul .pro-img img {
    height: 80px;
    width: 80px;
}

.shoppingCart .content ul .pro-name {
    float: left;
    width: 380px;
}

.shoppingCart .content ul .pro-name a {
    color: #424242;
}

.shoppingCart .content ul .pro-name a:hover {
    color: #ff6700;
}

.shoppingCart .content ul .pro-price {
    float: left;
    width: 140px;
    padding-right: 18px;
    text-align: center;
}

.shoppingCart .content ul .pro-num {
    float: left;
    width: 190px;
    text-align: center;
}

.shoppingCart .content ul .pro-total {
    float: left;
    padding-right: 81px;
    text-align: right;
}

.shoppingCart .content ul .pro-total-in {
    color: #ff6700;
}

.shoppingCart .content ul .pro-action {
    float: left;
    width: 80px;
    text-align: center;
}

.shoppingCart .content ul .pro-action i:hover {
    color: #ff6700;
}

/* 购物车表头及CSS END */

/* 购物车底部导航条CSS */
.shoppingCart .cart-bar {
    width: 1225px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
}

.shoppingCart .cart-bar .cart-bar-left {
    float: left;
}

.shoppingCart .cart-bar .cart-bar-left a {
    line-height: 50px;
    margin-left: 32px;
    color: #757575;
}

.shoppingCart .cart-bar .cart-bar-left a:hover {
    color: #ff6700;
}

.shoppingCart .cart-bar .cart-bar-left .sep {
    color: #eee;
    margin: 0 20px;
}

.shoppingCart .cart-bar .cart-bar-left .cart-total {
    color: #757575;
}

.shoppingCart .cart-bar .cart-bar-left .cart-total-num {
    color: #ff6700;
}

.shoppingCart .cart-bar .cart-bar-right {
    float: right;
}

.shoppingCart .cart-bar .cart-bar-right .total-price-title {
    color: #ff6700;
    font-size: 14px;
}

.shoppingCart .cart-bar .cart-bar-right .total-price {
    color: #ff6700;
    font-size: 30px;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary {
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #ff6700;
    color: #fff;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
    float: right;
    width: 200px;
    text-align: center;
    font-size: 18px;
    margin-left: 50px;
    background: #e0e0e0;
    color: #b0b0b0;
}

.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
    background-color: #f25807;
}

/* 购物车底部导航条CSS END */
/* 购物车主要内容区CSS END */

/* 购物车为空的时候显示的内容CSS */
.shoppingCart .cart-empty {
    width: 1225px;
    margin: 0 auto;
}

.shoppingCart .cart-empty .empty {
    height: 300px;
    padding: 0 0 130px 558px;
    margin: 65px 0 0;
    background: url(../assets/cart-empty.png) no-repeat 124px 0;
    color: #b0b0b0;
    overflow: hidden;
}

.shoppingCart .cart-empty .empty h2 {
    margin: 70px 0 15px;
    font-size: 36px;
}

.shoppingCart .cart-empty .empty p {
    margin: 0 0 20px;
    font-size: 20px;
}

/* 购物车为空的时候显示的内容CSS END */
</style>
