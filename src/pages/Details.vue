<template>
  <div>
    <div class="itemdetail">
      <img
        style="width:100%;height:280px"
        :src="ip+imgUrl"
        alt
      />
      <div class="more">
        <h3>{{name}}</h3>
        <p class="s1">月售{{sellCount}} 好评率{{rating}}%</p>
        <div class="shopcar">
          <p>
            <span class="s3">￥{{price}}</span>
            <span class="s2">￥99.4</span>
          </p>
          <p class="car">加入购物车</p>
        </div>
      </div>
    </div>
    <div class="announce">
      <h2>商品介绍</h2>
      <p>{{goodsDesc}}</p>
    </div>
    <div class="else">
      <van-tabs type="card" color="#fec301" active-background="#fec301" title-active-color="#000">
        <van-tab title="全部90"></van-tab>
        <van-tab title="推荐50"></van-tab>
        <van-tab title="吐槽40"></van-tab>
      </van-tabs>
      <div class="usercomment"  v-for="(item,index) in ratings" :key="index">
        <div class="headimg">
          <img
            style="width:50px;height:50px;border-radus:50%"
            :src="item.avatar"
            alt
          />
        </div>
        <div class="userscore">
          <p class="p1">
            <span>{{item.username}}</span>
            <span class="s11">{{item.rateTime}}</span>
          </p>
          <p>{{item.text==''?'该用户未评价':item.text}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {gettime} from '@/utils/utils'
import {ip} from '@/api/apis'
export default {
  data() {
    return {
      ip:'',

      value:5,
      imgUrl:'',
      price:'',
      rating:'',
      sellCount:'',
      name:'',
      goodsDesc:'',
      ratings:[]
    };
  },
  created(){
    this.ip=ip;

    this.imgUrl=localStorage.imgUrl;
    this.price=localStorage.price;
    this.name=localStorage.name;
    this.rating=localStorage.rating;
    this.sellCount=localStorage.sellCount;
    this.goodsDesc=localStorage.goodsDesc;
    let arr=JSON.parse(localStorage.ratings);
    arr.map(item=>{
      item.rateTime=gettime(item.rateTime);
    })
    this.ratings=arr
  }
}
</script>

<style lang="less" scoped>
.itemdetail {
  background: #fff;
  .more {
    font-size: 14px;
    padding: 20px 10px;
    h3 {
      font-size: 18px;
    }
    .s1,
    .s2 {
      color: #a3a3a3;
    }
    .s1 {
      margin:2px 0 10px;
    }
    .shopcar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .s2 {
        text-decoration: line-through;
        margin-left: 10px;
      }
      .s3 {
        color: #f44c22;
        font-size: 20px;
        font-weight: bold;
      }
      .car {
        padding: 10px 15px;
        background: #fec301;
        border-radius: 30px;
        font-weight: bold;
      }
    }
  }
}
.announce {
  margin: 20px 0;
  background: #fff;
  padding: 10px;
  font-size: 14px;
  h2 {
    font-size: 18px;
    margin-bottom: 20px;
    font-weight: normal;
  }
  p {
    letter-spacing: 2px;
    line-height: 28px;
  }
}
.else {
  margin-top: 20px;
  padding: 15px 0;
  background: #fff;
  .usercomment {
    display: flex;
    padding: 30px 15px 5px;
    .headimg {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      overflow: hidden;
      margin-right: 10px;
    }
    .userscore {
      flex: 1;
      font-size: 14px;
      p {
        margin-bottom: 10px;
      }
      .p1 {
        display: flex;
        justify-content: space-between;
      }
      .s11 {
        color: #a3a3a3;
        margin-left: 8px;
      }
      .p2 {
        span {
          display: inline-block;
          padding: 1px 3px;
          color: #ccc;
          border: 1px solid #ccc;
          font-size: 12px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>