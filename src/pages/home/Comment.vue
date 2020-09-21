<template>
  <div class="commentPage">
    <div class="comments">
      <div class="all">
        <span class="s1">5.0</span>
        <p>综合评分</p>
        <span class="s2">高于周边商家96%</span>
      </div>
      <div class="scores">
        <p>
          <span>菜品质量</span>
          <van-rate
            v-model="value"
            allow-half
            void-icon="star"
            size="15"
            gutter="5px"
            color="#FE9A02"
            readonly
          />
          <span class="s4">4.5</span>
        </p>
        <p>
          <span>服务态度</span>
          <van-rate
            v-model="value"
            allow-half
            void-icon="star"
            size="15"
            gutter="5px"
            color="#FE9A02"
            readonly
          />
          <span class="s4">4.5</span>
        </p>
        <p>
          <span>送达时间</span>
          <span class="s3">20分钟</span>
        </p>
      </div>
    </div>
    <div class="else">
      <van-tabs type="card" color="#fec301" active-background="#fec301" title-active-color="#000">
        <van-tab title="全部24"></van-tab>
        <van-tab title="满意"></van-tab>
        <van-tab title="不满意"></van-tab>
      </van-tabs>
      <div class="usercomment" v-for="(item,index) in list" :key="index">
        <div class="headimg">
          <img style="width:50px;height:50px;border-radus:50%" :src="item.avatar" alt />
        </div>
        <div class="userscore">
          <p class="p1">
            <span>{{item.username}}</span>
            <span class="s11">{{item.rateTime}}</span>
          </p>
          <p>
            <van-rate
              v-model="item.score"
              allow-half
              void-icon="star"
              size="15"
              gutter="5px"
              color="#FE9A02"
              readonly
            />
            <span class="s11" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
          </p>
          <p>{{item.text}}</p>
          <p class="p2">
            <span v-for="(rice,index) in item.recommend" :key="index">{{rice}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getrate } from "@/api/apis";
import { gettime } from "@/utils/utils";
export default {
  data() {
    return {
      value: 4.5,
      list: [],
    };
  },
  created() {
    getrate().then((res) => {
      let arr = res.data.data;
      for (const obj of arr) {
        obj.rateTime = gettime(obj.rateTime);
      }
      this.list = arr;
    });
  },
};
</script>

<style lang="less" scoped>
.commentPage::-webkit-scrollbar {
  width: 0;
}
.commentPage {
  height: 100%;
  overflow: scroll;
  .comments {
    padding: 30px 0px;
    display: flex;
    font-size: 14px;
    height: 80px;
    background: #fff;
    .all {
      text-align: center;
      flex: 3;
      border-right: 1px solid #ccc;
      padding: 0 15px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .s1 {
        font-size: 28px;
        color: #fec301;
      }
      .s2 {
        font-size: 12px;
        color: #a3a3a3;
      }
    }
    .scores {
      flex: 5;
      padding: 0 15px;

      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .van-rate {
        margin: 0 10px;
      }
      .s3 {
        color: #a3a3a3;
        margin-left: 10px;
      }
      .s4 {
        color: #fec301;
      }
    }
  }
  .else {
    margin-top: 20px;
    padding: 15px 0;
    background: #fff;
    .usercomment {
      display: flex;
      padding: 30px 15px 0 15px;
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
          font-size: 12px;
        }
        .p2 {
          span {
            display: inline-block;
            padding: 1px 3px;
            color: #ccc;
            border: 1px solid #ccc;
            font-size: 12px;
            margin:0 2px 2px 0;
          }
        }
      }
    }
  }
}
</style>