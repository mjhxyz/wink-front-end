/**
 * 内置 meta 数据
 */
import { parseTime } from '@/utils/index'

// 用户表 meta
export const userMeta = {
  code: 'user',
  table: 'user',

  opBtn: true,
  opBtnEdit: true,
  opBtnDelete: true,
  opBtnDetail: true,

  navBtn: true,
  navBtnAdd: true,
  navBtnEdit: true,
  navBtnDelete: true,
  navBtnDetail: true,

  fields: [
    {
      label: 'ID',
      name: 'id',
      width: 100,
      align: 'center',
      // editable: 'readonly',
      editable: false,
      addible: false,
      type: {
        name: 'text'
      }
      // is_hide: true
    },
    {
      label: '用户名',
      name: 'name',
      // width: 100,
      align: 'center',
      placeholder: '请输入用户名',
      required: true, // 是否必填
      max_length: 10, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: '密码',
      name: 'password',
      type: {
        name: 'password'
      },
      placeholder: '请输入密码',
      required: true,
      max_length: 20,
      min_length: 6,
      editable: false,
      is_hide: true,
      is_hide_detail: true
    },
    {
      label: '确认密码',
      name: 'repassword',
      type: {
        name: 'password'
      },
      placeholder: '请再次输入密码',
      required: true,
      is_hide: true,
      is_hide_detail: true,
      editable: false,
      validate: (val, form) => {
        if (val !== form.password) {
          return '两次输入密码不一致'
        }
      }
    },
    {
      label: '角色',
      name: 'role',
      // width: 100,
      align: 'center',
      type: {
        name: 'meta-select', // 获取 meta 数据的 select
        params: {
          meta: 'role',
          value: 'id',
          label: 'name'
        }
      },
      // formatter: (val, row, index) => {
      //   if (val === 0) {
      //     return '普通用户'
      //   } else if (val === 1) {
      //     return '管理员'
      //   } else if (val === 2) {
      //     return '超级管理员'
      //   }
      // },
      default: 1,
      required: true
    },
    {
      label: '状态',
      name: 'status',
      width: 100,
      align: 'center',
      type: {
        name: 'select',
        params: [{ 'label': '启用', 'value': 1 }, { 'label': '禁用', 'value': 0 }]
      },
      placeholder: '请选择状态',
      default: 1,
      required: true
    },
    {
      label: '修改时间',
      name: 'update_time',
      width: 200,
      align: 'center',
      type: {
        name: 'datetime'
      },
      editable: 'readonly',
      required: true,
      default() {
        return parseTime(new Date())
      }
    },
    {
      label: '添加时间',
      name: 'add_time',
      width: 200,
      align: 'center',
      type: {
        name: 'datetime'
      },
      editable: 'readonly',
      placeholder: '请选择添加时间',
      validator: (val, row, index) => {
        if (val === '') {
          return '添加时间不能为空'
        }
      },
      required: true,
      default() {
        return parseTime(new Date())
      }
    }
  ]
}
