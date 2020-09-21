<template>
  <div class="aside">
    <div class="salebox">
      <div class="sale">
        <div class="store">
          <p>千转(高新店)</p>
          <p class="salescore">
            <van-rate
              v-model="value"
              allow-half
              void-icon="star"
              size="20"
              gutter="8px"
              color="#FE9A02"
              readonly 
            />
            <span class="s1">(661)</span>
            <span class="s1">月售1000单</span>
          </p>
        </div>
        <div class="love">
          <span class="s2">❤</span>
          <p>已收藏</p>
        </div>
      </div>
      <div class="aboutsend">
        <div>
          <span>起送价</span>
          <p>
            <span class="nums">20</span>元
          </p>
        </div>
        <div>
          <span>商家配送</span>
          <p>
            <span class="nums">8</span>元
          </p>
        </div>
        <div>
          <span>平均配送时间</span>
          <p>
            <span class="nums">20</span>分钟
          </p>
        </div>
      </div>
    </div>
    <div class="discount">
      <div class="announce">
        <h2>活动与公告</h2>
        <p>尊敬的客官,端午攻略:①6月1日当天在评论区分享童年趣事赠6元无门槛红包②下单时在订单备注出填写【六一儿童节快乐】随机赠送"回忆杀爆款玩具",数量有限,送完即止.提前预祝大小宝宝节日开心.</p>
      </div>
      <div class="morecount">
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 5,
    };
  },
};
</script>

<style lang="less" scoped>
.aside::-webkit-scrollbar {
    width: 0;
  }
.aside{
  height: 100%;
  overflow: scroll;
  .salebox {
  padding: 20px;
  background: #fff;
  .sale {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #a3a3a3;

    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
    .store {
      font-size: 14px;
      > p:first-child {
        font-size: 18px;
        font-weight: bold;
        color: #000;
      }
      .salescore {
        display: flex;
        align-items: center;
        .van-rate {
          margin: 10px 0;
        }
        .s1 {
          margin-left: 10px;
        }
      }
    }
    .love {
      text-align: center;
      font-size: 14px;
      .s2 {
        font-size: 24px;
        color: #ff3300;
      }
    }
  }
  .aboutsend {
    color: #a3a3a3;
    font-size: 12px;
    margin-top: 20px;

    display: flex;
    justify-content: space-around;
    text-align: center;
    span {
      font-size: 14px;
    }
    .nums {
      color: #000;
      font-size: 18px;
    }
    p {
      margin-top: 10px;
    }
  }
}
.discount {
  margin-top: 20px;
  background: #fff;
  padding: 20px;
  font-size: 14px;
  .announce {
    padding-bottom: 20px;
    border-bottom: 1px solid #f3f4f6;
    h2 {
      font-size: 18px;
      margin-bottom: 20px;
      font-weight: normal;
    }
    p {
      color: #ff3300;
      letter-spacing: 2px;
      line-height: 28px;
    }
  }
  .morecount{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0;
    p{
        height: 40px;
    }
    span {
      display: inline-block;
      padding: 1px 3px;
      color: #fff;
      font-size: 14px;
      margin-right: 5px;
    }
    .s1 {
        font-size: 13px;
      background: rgb(216, 88, 88);
    }
    .s2 {
      background: #72bcdc;
        font-size: 13px;
    }
    .s3 {
      background: #72db95;
        font-size: 13px;
    }
  }
}
}

</style>