import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        catelist: [],

    },
    mutations: {
        //初始化数据
        initcatelist(state, sendarr) {
            state.catelist = sendarr
        },

        //增减数量
        changenum(state, obj) {
            state.catelist.map((data) => {
                data.foods.map((res) => {
                    if (res.id == obj.itemid) {
                        res.nums += obj.number;
                        return
                    }
                });
            });
        }

    },
    getters: {
        //购物车
        shopcar(state) {
            let arr = [];
            state.catelist.filter(res => {
                res.foods.filter(data => {
                    if (data.nums > 0) {
                        arr.push(data);
                    }
                })
            })
            return arr
        }
    }


})