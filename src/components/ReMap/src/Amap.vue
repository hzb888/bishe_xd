<script setup lang="ts">
import { ref, reactive, getCurrentInstance, onBeforeMount, onUnmounted } from "vue";
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

let MarkerCluster;
let map: MapConfigureInter;

const instance = getCurrentInstance();

const mapSet = reactive({
  loading: deviceDetection() ? false : true
});

let debug = ref(null);

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
    plugins: ["AMap.MarkerCluster"]
  })
    .then(AMap => {
      // 创建地图实例
      map = new AMap.Map(instance.refs.mapview, options);

      //地图中添加地图操作ToolBar插件
      map.plugin(["AMap.ToolBar", "AMap.MapType", "AMap.Geolocation"], () => {
        map.addControl(new AMap.ToolBar());
        //地图类型切换
        map.addControl(
          new AMap.MapType({
            defaultType: 0
          })
        );
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, // 是否使用高精度定位，默认：true
          timeout: 10000, // 设置定位超时时间，默认：无穷大
          offset: [80, 20],  // 定位按钮的停靠位置的偏移量
          convert: true,
          zoomToAccuracy: true,  //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          position: 'RB' //  定位按钮的排放位置,  RB表示右下
        })

        map.addControl(geolocation);

        geolocation.getCurrentPosition(function (status, result) {
          if (status == 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });

        function onComplete(data) {
          console.log("onComplete", data)
          debug.value = JSON.stringify(data);
          // data是具体的定位信息
        }

        function onError(data) {
          console.log("onError", data)
          debug.value = JSON.stringify(data);
          // 定位出错
        }
      });

      MarkerCluster = new AMap.MarkerCluster(map, [], {
        // 聚合网格像素大小
        gridSize: 80,
        maxZoom: 14,
        renderMarker(ctx) {
          const { marker, data } = ctx;
          if (Array.isArray(data) && data[0]) {
            const { driver, plateNumber, orientation } = data[0];
            const content = `<img style="transform: scale(1) rotate(${360 - Number(orientation)
              }deg);" src='${car}' />`;
            marker.setContent(content);
            marker.setLabel({
              direction: "bottom",
              //设置文本标注偏移量
              offset: new AMap.Pixel(-4, 0),
              //设置文本标注内容
              content: `<div> ${plateNumber}(${driver})</div>`
            });
            marker.setOffset(new AMap.Pixel(-18, -10));
            marker.on("click", ({ lnglat }) => {
              map.setZoom(13); //设置地图层级
              map.setCenter(lnglat);
            });
          }
        }
      });

      // 获取模拟车辆信息
      mapJson()
        .then(({ data }) => {
          const points: object = data.map(v => {
            return {
              lnglat: [v.lng, v.lat],
              ...v
            };
          });
          if (MarkerCluster) MarkerCluster.setData(points);
        })
        .catch(err => {
          console.log("err:", err);
        });

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
  <div> 111{{ debug }}</div>
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
