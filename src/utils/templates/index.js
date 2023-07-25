
/**
 * @description: 业务模板列表
 * name: 模板名称
 * path: 模板配置组件路径
 * description: 模板描述
 */

const TEMPLATE_LIST = [
  {
    code: 'singletable',
    name: '单表',
    description: '单表模板',
    settingComponent() {
      return import('@/components/Menusetting/Singletable')
    }
  },
  {
    code: 'masterslave',
    name: '主子表',
    description: '主子表模板',
    settingComponent() {
      return import('@/components/Menusetting/Masterslave')
    }
  }
]

export { TEMPLATE_LIST }
