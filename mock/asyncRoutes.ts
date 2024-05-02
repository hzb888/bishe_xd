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

const schoolRouter = {
  path: "/school",
  meta: {
    title: "学校管理",
    icon: "ep:lollipop",
    rank: 9
  },
  children: [
    {
      path: "/school/config/index",
      name: "school-config",
      meta: {
        title: "学校配置"
      }
    },
    {
      path: "/school/post/index",
      name: "school-post",
      meta: {
        title: "帖子列表"
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
    },
    {
      path: "/map/data/index",
      name: "map-data",
      meta: {
        title: "地图数据"
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
        data: [permissionRouter, schoolRouter, mapRouter]
      };
    }
  }
]);
