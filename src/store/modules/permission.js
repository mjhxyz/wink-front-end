import Layout from '@/layout'
import { constantRoutes } from '@/router'
import { getMenuTree } from '@/api/menu'

const state = {
  routes: [],
  addRoutes: []
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(async resolve => {
      // 远程读取菜单
      const result = await getMenuTree()
      const menuTree = result.data.items
      const accessedRoutes = []
      // 遍历树形结构，生成路由
      function buildTree(tree) {
        const route = {
          path: `/menu/${tree.code}`,
          redirect: tree.redirect,
          props: route => {
            return {
              setting: tree.setting,
              menuCode: tree.code
            }
          },
          name: tree.code,
          meta: { title: tree.name, icon: 'tree' },
          children: []
        }
        if (tree.type === 'singletable') {
          route.component = () => import('@/components/tables/Singletable/temp')
        }

        if (tree.type === 'dir') {
          if (tree.parent_id === 0) {
            route.component = Layout
          } else {
            route.component = () => import('@/views/layout')
          }
          for (let i = 0; i < tree.children.length; i++) {
            const child = tree.children[i]
            route.children.push(buildTree(child))
          }
        }
        return route
      }
      for (let i = 0; i < menuTree.length; i++) {
        const tree = menuTree[i]
        const route = buildTree(tree)
        accessedRoutes.push(route)
      }

      // 404 page must be placed at the end !!!
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
