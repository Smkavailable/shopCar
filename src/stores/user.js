import { defineStore } from 'pinia'
export const useUserStore = defineStore({
    id: 'user',
    state: () => {
        return {
            userInfo: {}
        }
    },
    actions: {
        // 给userInfo赋值
        setUserInfo(params) {
            console.log("这是pinia中的注册对象的参数");
            console.log(params);
            // 赋值给userInfo
            this.userInfo = params;
            console.log("这是pinia中的注册对象的userInfo");
            console.log(this.userInfo);
        }

    },
    // 开启数据缓存
    persist: {
        enabled: true,
        strategies: [{
            key: 'userInfo',
            storage: localStorage,
        }]
    }
})