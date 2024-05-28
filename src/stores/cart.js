import { defineStore } from 'pinia'
export const useCartStore = defineStore({
    id: 'cart',
    state: () => {
        return {
            getShoppingCart: [], // 购物车列表数据
            select:[],//选中的商品的id
        }
    },
    getters: {
        isChecked() {
            return this.select.length == this.getShoppingCart.length;
        },
        // 总价和数量
        total() {
            let total = {
                price: 0,
                count: 0
            }
            this.getShoppingCart.forEach(item => {
                if(this.select.indexOf(item.id) != -1){
                    total.price += item.product_selling_price * item.num;
                    total.count = this.select.length;
                }
            })
            return total;
        }
    },
    actions: {
        // 存储购物车数据
        addCart(list) {
            list.forEach(element => {
                element['check'] = true;
                this.select.push(element.id);
            });
            this.getShoppingCart = list;
        },
        // 全选
        all() {
            this.select = this.getShoppingCart.map(item => {
                item['check'] = true;
                return item.id;
            });
        },
        // 取消全选
        unAll() {
            this.getShoppingCart.forEach(item => {
                item['check'] = false;
            });
            this.select = [];
        },
        checkChange(index) {
            // 当前商品的id
            let id = this.getShoppingCart[index].id;
            // 去检查select中有没有包含
            let idx = this.select.indexOf(id);

            if (idx > -1) {
                //有
                this.getShoppingCart[index].check = false;
                this.select.splice(idx, 1);
            } else {
                // 没有
                this.getShoppingCart[index].check = true;
                this.select.push(id);
            }
        }
    },
})