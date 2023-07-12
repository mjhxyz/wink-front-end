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
            let accessedRoutes = []
            // 遍历树形结构，生成路由
            function buildTree(tree) {
                let route = {
                    path: `/menu/${tree.code}`,
                    component: () => import('@/components/tables/Singletable/wrapper'),
                    redirect: tree.redirect,
                    props: route => {
                        return {
                            setting: tree.setting
                        }
                    },
                    name: tree.code,
                    meta: { title: tree.name, icon: 'tree' },
                    children: []
                }
                if (tree.children && tree.children.length > 0) {
                    route.component = Layout
                    for (let i = 0; i < tree.children.length; i++) {
                        let child = tree.children[i]
                        route.children.push(buildTree(child))
                    }
                }
                return route
            }
            for (let i = 0; i < menuTree.length; i++) {
                let tree = menuTree[i]
                let route = buildTree(tree)
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
