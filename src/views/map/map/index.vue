<script setup lang="ts">
import { Amap } from "@/components/ReMap";
import { message } from "@/utils/message";
import { useRoute } from "vue-router";
import { addOrder } from "@/api/bishe";
import dayjs, { type Dayjs } from "dayjs";
import { useDetail } from "./hooks";

import { ref } from "vue";

defineOptions({
  name: "MapPage"
});

const { toDetail, router } = useDetail();
const { query } = useRoute();

const Amapref: any = ref(null);


async function runSport() {
  Amapref.value.start();
  // const res = await addOrder({
  //   UserID: "admin",
  //   SportID: query.Name,
  //   Distance: Math.floor(Math.random() * 1000) + "米",
  //   Status: 1,
  //   Time: Math.floor(Math.random() * 100) + "小时"
  // });
  // console.log("res", res);
  // if (res.Code == 10200) {
  //   message(`所有的可能性，都在你跑下去的路上。运动时注意安全哦~`, {
  //     type: "success",
  //     duration: 2000
  //   });
  //   setTimeout(() => {
  //     router.push({
  //       name: 'order-order',
  //     })
  //   }, 1000);
  // }
}

const FatherClick = async () => {
  Amapref.value.stop();
  const res = await addOrder({
    UserID: "admin",
    SportID: query.Name,
    Distance: Math.floor(Math.random() * 1000) + "",
    Status: 1,
    Time: Math.floor(Math.random() * 100) + ""
  });
  console.log("res", res);
  if (res.Code == 10200) {
    message(`所有的可能性，都在你跑下去的路上。运动时注意安全哦~`, {
      type: "success",
      duration: 2000
    });
    setTimeout(() => {
      router.push({
        name: 'order-order',
      })
    }, 1000);
  }
};




</script>

<template>
  <div class="">
    <div v-if="JSON.stringify(query) != '{}'" class="z-50 absolute">
      <p>运动项目 ： {{ query.Name }} </p>
      <p>运动类型 ： {{ query.Type }} </p>
      <el-button @click="runSport">
        开始模拟运动
      </el-button>
      <el-button @click="FatherClick">
        运动结束
      </el-button>
    </div>
    <Amap ref="Amapref" />
  </div>
</template>

<style scoped>
.main-content {
  margin: 2px 0 0 !important;
}
</style>
