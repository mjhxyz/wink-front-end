/**
 * 内置 菜单 meta 数据
 */
import { parseTime } from '@/utils/index'

// 菜单 表 meta
export const menuMeta = {
  code: 'menu',
  table: 'ment',

  opBtn: true,
  opBtnEdit: true,
  opBtnDelete: true,
  opBtnDetail: true,

  navBtn: true,
  navBtnAdd: false,
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
      label: '菜单编码',
      name: 'code',
      // width: 100,
      align: 'center',
      placeholder: '请输入菜单编码',
      required: true, // 是否必填
      max_length: 255, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      label: '菜单名称',
      name: 'name',
      // width: 100,
      align: 'center',
      placeholder: '请输入菜单名称',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: '菜单类型',
      name: 'type',
      // width: 100,
      align: 'center',
      placeholder: '请输入菜单类型',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      label: '菜单权重',
      name: 'weight',
      // width: 100,
      align: 'center',
      placeholder: '请输入菜单权重',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      label: '父菜单ID',
      name: 'parent_id',
      // width: 100,
      align: 'center',
      placeholder: '请输入父菜单ID',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      label: '菜单配置',
      name: 'setting',
      // width: 100,
      align: 'center',
      placeholder: '请输入菜单配置',
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
      editable: false,
      addible: false,
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
      editable: false,
      addible: false,
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
