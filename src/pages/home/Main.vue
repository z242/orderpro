<template>
  <div class="main">
    <div class="left">
      <div>
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            :title="cates.name"
            v-for="(cates,index) in initcatelist_X"
            @click="tabchange(index)"
            :key="index"
          />
        </van-sidebar>
      </div>
    </div>
    <div class="right">
      <div>
        <div v-for="(cates,index) in initcatelist_X" :key="index" :id="index">
          <h4>{{cates.name}}</h4>
          <div class="item" v-for="(item) in cates.foods" :key="item.id">
            <div style="width:80px;border-radius:5px;height:80px">
              <img
                @click="clickto(item.id)"
                style="width:80px;border-radius:5px;height:80px"
                :src="ip+item.imgUrl"
                alt
              />
            </div>
            <div class="more">
              <h3>{{item.name}}</h3>
              <p class="s1">月售{{item.sellCount}} 好评率{{item.rating}}%</p>
              <div class="shopcar">
                <p>
                  <span class="s3">￥{{item.price}}</span>
                  <span class="s2">￥99.4</span>
                </p>
                <p class="control">
                  <button class="rec" v-show="item.nums!=0" @click="clickchange(item.id,-1)">-</button>
                  <span v-show="item.nums!=0">{{item.nums}}</span>
                  <button @click="clickchange(item.id,+1)">+</button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车 -->
    <div class="desc" @click="showPopup">
      <van-icon name="cart-circle" size="50" :color="shopcar_X.length>0?'#FEC301':'#666'" />
      <div class="price">
        <span class="spri">￥{{count}}</span>
        <p>另需配送费￥4元|支持自取</p>
      </div>
      <p v-show="shopcar_X.length==0" style="color:#fff;padding-right:10px">￥20元起送</p>
      <p
        v-show="shopcar_X.length>0&&count<20"
        style="color:#fff;padding-right:10px"
      >还差￥{{20-count}}元起送</p>
      <p v-show="count>=20" style="color:#fff">
        <span
          style="display:inline-block;width:80px;height:60px;background:#FEC301;line-height:60px;text-align:center;font-size:14px;color:#000;border-bottom-right-radius:30px;;border-top-right-radius:30px"
        >去结算</span>
      </p>
    </div>

    <!-- 弹出框 -->
    <div style="z-index:66" id="alert">
      <van-popup
        v-model="isshow"
        round
        position="bottom"
        :style="{ maxHeight: '60%', minHeight: '30%' }"
      >
        <p
          style="height:30px;background:#FEDD6E;font-size:14px;text-align:center;line-height:30px;"
        >下单立减5元</p>
        <div class="sinitem" v-for="shop in shopcar_X" :key="shop.id">
          <img style="width:60px;border-radius:5px;height:60px;" :src="ip+shop.imgUrl" alt />
          <div class="more">
            <h3>{{shop.name}}</h3>
            <p class="s1">月售{{shop.sellCount}} 好评率{{shop.rating}}%</p>
            <div class="shopcar">
              <p>
                <span class="s3">￥{{shop.price}}</span>
                <span class="s2">￥99.4</span>
              </p>
              <p class="control">
                <button class="rec" v-show="shop.nums!=0" @click="clickchange2(shop.id,-1)">-</button>
                <span v-show="shop.nums!=0">{{shop.nums}}</span>
                <button @click="clickchange2(shop.id,+1)">+</button>
              </p>
            </div>
          </div>
        </div>
        <p style="height:70px;background:#fff"></p>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getitems, ip } from "@/api/apis";
import BScorll from "better-scroll";
export default {
  data() {
    return {
      ip: "",

      activeKey: 0,
      nums: "",
      isshow: false,
    };
  },
  computed: {
    //关于商品列表
    initcatelist_X() {
      return this.$store.state.catelist;
    },
    //关于购物车
    shopcar_X() {
      return this.$store.getters.shopcar;
    },
    //总价
    count() {
      let total = 0;
      this.initcatelist_X.map((res) => {
        res.foods.map((data) => {
          total += data.nums * data.price; //不用加等只会显示最后一个商品的价格哦
        });
      });

      return total;
    },

    //右边提到计算属性
    getarea() {
      let arr = [];
      let total = 0;
      for (let i = 0; i < this.initcatelist_X.length; i++) {
        let curHeight = document.getElementById(i).offsetHeight;
        arr.push({ startY: total, endY: total + curHeight, index: i });
        total += curHeight;
      }

      return arr;
    },
  },
  methods: {
    //弹出框
    clickchange2(itemid, number) {
      this.$store.commit("changenum", { itemid, number });

      if (this.shopcar_X.length <= 0) {
        this.isshow = false; //不能给大盒子设置display:none  || 高度 皆无效
      }
    },
    //是否显示弹出框
    showPopup() {
      if (this.shopcar_X.length > 0) {
        this.isshow = true;
      }
    },

    //左边
    tabchange(index) {
      this.rightBScorll.scrollToElement(document.getElementById(index), 600);
    },
    //跳到详情页
    clickto(itemid) {
      this.initcatelist_X.map((obj) => {
        obj.foods.map((res) => {
          if (res.id == itemid) {
            localStorage.sellCount = res.sellCount;
            localStorage.price = res.price;
            localStorage.name = res.name;
            localStorage.rating = res.rating;
            localStorage.imgUrl = res.imgUrl;
            localStorage.goodsDesc = res.goodsDesc;
            localStorage.ratings = JSON.stringify(res.ratings);
          }
        });
      });
      this.$router.push("/Details");
    },
    //点击改变商品数量
    clickchange(itemid, number) {
      this.$store.commit("changenum", { itemid, number });
    },
    getmore() {
      //获取商品信息
      getitems().then((res) => {
        let arr = res.data.goodsList;

        arr.map((res) => {
          res.foods.map((data) => {
            data.imgUrl = data.imgUrl.substring(21);
            data.nums = 0;
          });
        });
        this.$store.commit("initcatelist", arr);
      });
    },
  },
  created() {
    this.ip = ip;
    this.getmore();//初始化
  },
  mounted() {
    //获取滚动条
    this.leftBScorll = new BScorll(document.querySelector(".left"), {
      click: true,
    });
    this.rightBScorll = new BScorll(document.querySelector(".right"), {
      click: true,
      probeType: 3,
    });

    //右边
    this.rightBScorll.on("scroll", (obj) => {
      let _y = Math.abs(obj.y); //y当前位置
      for (const item of this.getarea) {
        if (_y >= item.startY && _y < item.endY) {
          this.activeKey = item.index;
        }
      }
    });
  },
};
</script>

<style lang="less" scoped>
.sinitem {
  display: flex;
  padding: 15px 10px;
  font-size: 12px;
  .more {
    margin-left: 10px;
    flex: 1;
    h3 {
      font-size: 14px;
    }
    .s1,
    .s2 {
      color: #a3a3a3;
    }
    .s1 {
      margin-bottom: 5px;
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
        font-size: 16px;
        font-weight: bold;
      }
      .control {
        display: flex;
        align-items: center;
        span {
          margin: 0 5px;
        }
        button {
          width: 24px;
          height: 24px;
          border: none;
          outline: none;
          text-align: center;
          line-height: 24px;
          background: #fec301;
          border-radius: 5px;
          font-size: 24px;
          align-self: flex-end;
        }
        .rec {
          background: #fff;
          border: 1px solid #fec301;
        }
      }
    }
  }
}
.desc {
  z-index: 888;
  font-size: 12px;
  width: 95%;
  background: #222222;
  color: #7f7f7f;
  height: 60px;
  border-radius: 60px;
  position: fixed;
  bottom: 10px;
  left: 10px;
  padding: 0 0 0 10px;
  box-sizing: border-box;

  display: flex;
  justify-content: space-between;
  align-items: center;
  .price {
    flex: 1;
    border-left: 3px solid #fff;
    margin-left: 10px;
    padding-left: 10px;
    .spri {
      color: #fff;
      font-size: 18px;
    }
  }
}
.main {
  height: 100%;
  flex: 1;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  .left {
    width: 80px;
    overflow: scroll;
    .van-sidebar-item__text {
      font-size: 12px;
    }
  }
  .left::-webkit-scrollbar {
    width: 0;
  }
  .right::-webkit-scrollbar {
    width: 0;
  }
  .right {
    flex: 1;
    overflow: scroll;
    font-size: 12px;
    h4 {
      line-height: 40px;
      text-indent: 10px;
      font-size: 12px;
    }
    .item {
      display: flex;
      background: #fff;
      align-items: flex-start;
      padding: 15px 10px;
    }
    .more {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;
      flex: 1;
      h3 {
        font-size: 14px;
      }
      .s1,
      .s2 {
        color: #a3a3a3;
      }
      .s1 {
        margin-bottom: 20px;
      }
      .shopcar {
        flex: 3;
        display: flex;
        justify-content: space-between;
        .s2 {
          text-decoration: line-through;
          margin-left: 10px;
        }
        .s3 {
          color: #f44c22;
          font-size: 16px;
          font-weight: bold;
        }
        .control {
          display: flex;
          align-items: center;
          span {
            margin: 0 5px;
          }
          button {
            width: 24px;
            height: 24px;
            border: none;
            outline: none;
            text-align: center;
            line-height: 24px;
            background: #fec301;
            border-radius: 5px;
            font-size: 24px;
            align-self: flex-end;
          }
          .rec {
            background: #fff;
            border: 1px solid #fec301;
          }
        }
      }
    }
  }
}
</style>