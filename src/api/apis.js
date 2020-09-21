import axios from 'axios'

//请求基本路径
export const ip='http://127.0.0.1:5000';
// export const ip='http://172.20.10.6:5000';
// export const ip='http://192.168.1.40:5000'
// const ip='http://172.16.15.139:5000'

axios.defaults.baseURL=ip;

//获取商品信息
export var getitems=()=>axios.get('/goods/goods_list')

//获取店铺信息
export var getmerchant=()=>axios.get('/shop/seller')

//获取评分信息
export var getrate=()=>axios.get('/shop/ratings')
