/**
 * 内置 meta role 数据
 */
import { parseTime } from '@/utils/index'

// 用户表 meta
export const roleMeta = {
  code: 'role',
  table: 'role',

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
      label: '角色名称',
      name: 'name',
      // width: 100,
      align: 'center',
      placeholder: '请输入角色名称',
      required: true, // 是否必填
      max_length: 10, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: '角色描述',
      name: 'desc',
      // width: 100,
      align: 'center',
      placeholder: '请输入角色描述',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 2 // 最小长度
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
