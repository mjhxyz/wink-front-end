/**
 * 内置 meta'meta 数据
 */
import { parseTime } from '@/utils/index'

// meta 表 meta
export const metaMeta = {
  code: 'meta',
  table: 'meta',

  opBtn: true,
  opBtnEdit: true,
  opBtnDelete: true,
  opBtnDetail: true,

  navBtn: true,
  navBtnAdd: false,
  navBtnEdit: false,
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
      label: 'Meta名称',
      name: 'name',
      // width: 100,
      align: 'center',
      placeholder: '请输入Meta名称',
      required: true, // 是否必填
      max_length: 10, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: 'Meta编码',
      name: 'code',
      // width: 100,
      align: 'center',
      placeholder: '请输入Meta 编码',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: '映射表',
      name: 'table',
      // width: 100,
      align: 'center',
      placeholder: '请输入Meta 映射表',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: '主键名称',
      name: 'pk',
      // width: 100,
      align: 'center',
      placeholder: '请输入Meta 主键名称',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: '数据源',
      name: 'source',
      // width: 100,
      align: 'center',
      placeholder: '请输入Meta 数据源',
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
