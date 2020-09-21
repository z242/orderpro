<template>
  <div class="abouthome">
    <!-- 头部 -->
    <div class="header">
      <img
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1598093736018&di=47b0517e374c11455421eb44c6002cad&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fforum%2Fw%3D580%2Fsign%3De416f47509b30f24359aec0bf894d192%2F4d1f5fce3bc79f3d6743bb24bca1cd11728b2923.jpg"
        alt
        style="width:100%;height:100%"
      />
      <div class="movebox">
        <div class="move">
          <div class="headimg">
            <img :src="ip+merchantobj.avatar" alt />
          </div>
          <div class="headContent">
            <p>
              <span class="s1">品牌</span>
              <span class="s2">{{merchantobj.name}}</span>
            </p>
            <p>{{merchantobj.description}}</p>
            <p style="display:flex;align-items:center">
              <span class="s3">减</span>
              <span class="s4">{{merchantobj.bulletin}}</span>
              <span @click="show = true" class="s5">5个></span>
            </p>
          </div>
        </div>
      </div>
    </div>


    <!-- 蒙层 -->
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click="show = false">
        <div class="store">
          <p>千转(高新店)</p>
          <van-rate
            v-model="value"
            allow-half
            void-icon="star"
            size="26"
            gutter="10px"
            color="#FE9A02"
            readonly
          />
        </div>
        <van-divider>优惠信息</van-divider>
        <div class="discount">
          <p>
            <span class="s1">减</span>单人精彩套餐
          </p>
          <p>
            <span class="s2">折</span>vc无限次果汁全场8折
          </p>
          <p>
            <span class="s2">折</span>在线支付满28减5
          </p>
          <p>
            <span class="s3">特</span>特价商品8折抢购
          </p>
          <p>
            <span class="s3">特</span>单人特色套餐
          </p>
        </div>
        <van-divider>商家公告</van-divider>
        <div
          class="announce"
        >尊敬的客官,端午攻略:①6月1日当天在评论区分享童年趣事赠6元无门槛红包②下单时在订单备注出填写【六一儿童节快乐】随机赠送"回忆杀爆款玩具",数量有限,送完即止.提前预祝大小宝宝节日开心.</div>
      </div>
    </van-overlay>

    <!-- 通知消息 -->
    <div class="tell">
      <van-notice-bar left-icon="volume-o" :scrollable="false" background="#f7f7f7">
        <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
          <van-swipe-item>今日折扣低至8折</van-swipe-item>
          <van-swipe-item>购买特定商品赠送指定奶茶</van-swipe-item>
        </van-swipe>
      </van-notice-bar>
    </div>


    <!-- 菜单切换 -->
    <div class="titletab">
      <van-tabs v-model="active" color="#fec301">
        <van-tab title="商品" to="/"></van-tab>
        <van-tab title="评价" to="/home/comment"></van-tab>
        <van-tab title="商家" to="/home/merchant"></van-tab>
      </van-tabs>
    </div>

    <!-- 路由 -->
    <router-view></router-view>
  </div>
</template>
<script>
import { getmerchant,ip } from "@/api/apis";
export default {
  data() {
    return {
      active: 0,
      show: false,
      value: 5,
      merchantobj: {},

      ip:'',

    };
  },
  created() {
    this.ip=ip;
    getmerchant().then((res) => {
      let obj=res.data.data;
      obj.avatar=obj.avatar.substring(21);
      this.merchantobj = obj;
    });
  },
};
</script>

<style lang="less">
.abouthome {
  background: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  .header {
    width: 100%;
    position: relative;
    height: 150px;
    .movebox {
      width: 100%;

      position: absolute;
      bottom: -80px;
      .move {
        margin: 0 auto;
        width: 90%;
        background: #fff;
        border-radius: 5px;
        padding: 10px;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        > .headimg {
          height: 80px;
          border-radius: 5px;
          img {
            width: 80px;
            height: 80px;
            border-radius: 5px;
          }
        }
        .headContent {
          font-size: 14px;
          margin-left: 5px;
          > p {
            height: 28px;
          }
          .s1 {
            display: inline-block;
            padding: 3px 5px;
            background: #04593a;
            font-size: 12px;
            color: #fff;
            margin-right: 10px;
            border-radius: 3px;
          }
          .s2 {
            font-weight: bold;
            font-size: 18px;
          }
          .s3 {
            display: inline-block;
            padding: 3px 5px;
            background: rgb(216, 88, 88);
            border-radius: 3px;
            font-size: 12px;
            color: #fff;
            margin-right: 5px;
          }
          .s4 {
            display: inline-block;
            width: 175px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .s5 {
            display: inline-block;
            padding: 3px 10px;
            border-radius: 10px;
            background: #ccc;
          }
        }
      }
    }
  }
  .titletab {
    padding-top: 80px;
    background: #f7f7f7;
  }
  .tell {
    position: relative;
    bottom: -80px;
    .notice-swipe {
      height: 40px;
      line-height: 40px;
    }
  }
  
}
.wrapper {
  height: 100%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  font-size: 18px;
  .store {
    // margin-bottom: 30px;
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    p {
      font-size: 22px;
    }
    .van-rate {
      margin: 10px 0;
    }
  }
  .discount {
    flex: 4;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;
    font-size: 15px;
    span {
      display: inline-block;
      padding: 0 2px;
      background: #fff;
      font-size: 14px;
      margin-right: 5px;
    }
    .s1 {
      color: rgb(216, 88, 88);
    }
    .s2 {
      color: #72bcdc;
    }
    .s3 {
      color: #72db95;
    }
  }
  .announce {
    font-size: 15px;
    flex: 4;
    letter-spacing: 2px;
    line-height: 28px;
  }
  .van-divider {
    font-size: 18px;
    color: #fff;
  }
}

</style>