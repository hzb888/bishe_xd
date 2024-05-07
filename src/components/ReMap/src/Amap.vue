<script setup lang="ts">
import { reactive, getCurrentInstance, onBeforeMount, onUnmounted } from "vue";
import { deviceDetection } from "@pureadmin/utils";
import AMapLoader from "@amap/amap-jsapi-loader";
import { mapJson } from "@/api/mock";
import car from "@/assets/car.png";

export interface MapConfigureInter {
  on: Fn;
  destroy?: Fn;
  clearEvents?: Fn;
  addControl?: Fn;
  setCenter?: Fn;
  setZoom?: Fn;
  plugin?: Fn;
}

defineOptions({
  name: "Amap"
});

defineExpose({
  start,
  stop
});


let MarkerCluster;
let map: MapConfigureInter;
let test_marker;
let lineArr = [
  [117.076251, 33.628544],
  [117.078829, 33.638671]
];

const instance = getCurrentInstance();

const mapSet = reactive({
  loading: deviceDetection() ? false : true
});

function start() {
  console.log("start===================")
  test_marker.moveAlong(lineArr, {
    // 每一段的时长
    duration: 50000,//可根据实际采集时间间隔设置
    // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
    autoRotation: true,
  });
}

function stop() {
  console.log("stop===================")
  test_marker.stopMove()
}

// 地图创建完成(动画关闭)
const complete = (): void => {
  if (map) {
    map.on("complete", () => {
      mapSet.loading = false;
    });
  }
};

onBeforeMount(() => {
  if (!instance) return;
  const { MapConfigure } = instance.appContext.config.globalProperties.$config;
  const { options } = MapConfigure;

  AMapLoader.load({
    key: MapConfigure.amapKey,
    version: "2.0",
    plugins: ["AMap.MarkerCluster", "AMap.Polyline", "AMap.MoveAnimation"]
  })
    .then(AMap => {
      // 创建地图实例
      map = new AMap.Map(instance.refs.mapview, options);

      //地图中添加地图操作ToolBar插件
      map.plugin(["AMap.ToolBar", "AMap.MapType"], () => {
        map.addControl(new AMap.ToolBar());
        //地图类型切换
        map.addControl(
          new AMap.MapType({
            defaultType: 0
          })
        );
      });
      // 绘制轨迹
      var polyline = new AMap.Polyline({
        map: map,
        path: [[117.076251, 33.628544], [117.078829, 33.638671]],
        showDir: true,
        strokeColor: "#28F",  //线颜色
        // strokeOpacity: 1,     //线透明度
        strokeWeight: 6,      //线宽
        // strokeStyle: "solid"  //线样式
      });
      test_marker = new AMap.Marker({
        map: map,
        position: lineArr[0],
        icon: "https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png",
        offset: new AMap.Pixel(-13, -26),
      });
      var passedPolyline = new AMap.Polyline({
        map: map,
        strokeColor: "#AF5",  //线颜色
        strokeWeight: 6,      //线宽
      });

      test_marker.on('moving', function (e) {
        passedPolyline.setPath(e.passedPath);
        map.setCenter(e.target.getPosition(), true)
      });

      // marker.moveAlong([117.076251, 33.628544], [117.078829, 33.638671], {
      //   // 每一段的时长
      //   duration: 500,//可根据实际采集时间间隔设置
      //   // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
      //   autoRotation: true,
      // });

      // MarkerCluster = new AMap.MarkerCluster(map, [], {
      //   // 聚合网格像素大小
      //   gridSize: 80,
      //   maxZoom: 14,
      //   renderMarker(ctx) {
      //     const { marker, data } = ctx;
      //     if (Array.isArray(data) && data[0]) {
      //       const { driver, plateNumber, orientation } = data[0];
      //       const content = `<img style="transform: scale(1) rotate(${360 - Number(orientation)
      //         }deg);" src='${car}' />`;
      //       marker.setContent(content);
      //       marker.setLabel({
      //         direction: "bottom",
      //         //设置文本标注偏移量
      //         offset: new AMap.Pixel(-4, 0),
      //         //设置文本标注内容
      //         content: `<div> ${plateNumber}(${driver})</div>`
      //       });
      //       marker.setOffset(new AMap.Pixel(-18, -10));
      //       marker.on("click", ({ lnglat }) => {
      //         map.setZoom(13); //设置地图层级
      //         map.setCenter(lnglat);
      //       });
      //     }
      //   }
      // });

      // 获取模拟车辆信息
      // mapJson()
      //   .then(({ data }) => {
      //     const points: object = data.map(v => {
      //       return {
      //         lnglat: [v.lng, v.lat],
      //         ...v
      //       };
      //     });
      //     if (MarkerCluster) MarkerCluster.setData(points);
      //   })
      //   .catch(err => {
      //     console.log("err:", err);
      //   });

      complete();
    })
    .catch(() => {
      mapSet.loading = false;
      throw "地图加载失败，请重新加载";
    });
});

onUnmounted(() => {
  if (map) {
    // 销毁地图实例
    map.destroy() && map.clearEvents("click");
  }
});
</script>

<template>
  <div id="mapview" ref="mapview" v-loading="mapSet.loading" />
</template>

<style lang="scss" scoped>
#mapview {
  height: calc(100vh - 86px);
}

:deep(.amap-marker-label) {
  border: none !important;
}
</style>
