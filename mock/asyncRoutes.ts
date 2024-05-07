// 模拟后端动态生成路由
import { defineFakeRoute } from "vite-plugin-fake-server/client";

/**
 * roles：页面级别权限，这里模拟二种 "admin"、"common"
 * admin：管理员角色
 * common：普通角色
 */
const permissionRouter = {
  path: "/permission",
  meta: {
    title: "menus.purePermission",
    icon: "ep:lollipop",
    rank: 10
  },
  children: [
    {
      path: "/permission/page/index",
      name: "PermissionPage",
      meta: {
        title: "menus.purePermissionPage",
        roles: ["admin", "common"]
      }
    },
    {
      path: "/permission/button/index",
      name: "PermissionButton",
      meta: {
        title: "menus.purePermissionButton",
        roles: ["admin", "common"],
        auths: [
          "permission:btn:add",
          "permission:btn:edit",
          "permission:btn:delete"
        ]
      }
    }
  ]
};

const userRouter = {
  path: "/user",
  meta: {
    title: "用户管理",
    icon: "ep:lollipop",
    rank: 10
  },
  children: [
    {
      path: "/user/index",
      name: "user-user",
      meta: {
        title: "用户列表"
      }
    }
  ]
};

const orderRouter = {
  path: "/order",
  meta: {
    title: "运动数据",
    icon: "ep:lollipop",
    rank: 8
  },
  children: [
    {
      path: "/order/index",
      name: "order-order",
      meta: {
        title: "运动数据"
      }
    }
  ]
};

const sortRouter = {
  path: "/sort",
  meta: {
    title: "排行榜",
    icon: "ep:lollipop",
    rank: 8
  },
  children: [
    {
      path: "/sort/index",
      name: "sort-sort",
      meta: {
        title: "排行榜"
      }
    }
  ]
};

const mapRouter = {
  path: "/map",
  meta: {
    title: "地图管理",
    icon: "ep:lollipop",
    rank: 8
  },
  children: [
    {
      path: "/map/map/index",
      name: "map-map",
      meta: {
        title: "地图"
      }
    }
  ]
};

export default defineFakeRoute([
  {
    url: "/get-async-routes",
    method: "get",
    response: () => {
      return {
        success: true,
        data: [userRouter, mapRouter, orderRouter, sortRouter]
      };
    }
  }
]);
