/**
 * 内置 meta field 数据
 */
import { parseTime } from '@/utils/index'

// 用户表 meta
export const fieldMeta = {
  code: 'field',
  table: 'field',

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
      label: '字段编号',
      name: 'name',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段编号',
      required: true, // 是否必填
      max_length: 32, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      label: '字段名称',
      name: 'label',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段名称',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      label: 'Meta编码',
      name: 'meta_code',
      // width: 100,
      align: 'center',
      placeholder: '请输入Meta 编码',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'weight',
      label: '字段权重',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段权重',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'type',
      label: '字段类型',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段类型',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'width',
      label: '字段宽度',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段宽度',
      required: true, // 是否必填
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'align',
      label: '字段对齐方式',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段对齐方式',
      max_length: 10, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      name: 'placeholder',
      label: '字段占位符',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段占位符',
      required: false, // 是否必填
      max_length: 30, // 最大长度
      min_length: 2 // 最小长度
    },
    {
      name: 'required',
      label: '是否必填',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段是否必填',
      required: true, // 是否必填
      max_length: 1, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'is_hide',
      label: '是否隐藏',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段是否隐藏',
      required: true, // 是否必填
      max_length: 1, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'max_length',
      label: '字段最大长度',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段最大长度',
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'min_length',
      label: '字段最小长度',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段最小长度',
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'default_value',
      label: '字段默认值',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段默认值',
      max_length: 30, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'is_edit',
      label: '是否可编辑',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段是否可编辑',
      required: true, // 是否必填
      max_length: 1, // 最大长度
      min_length: 1 // 最小长度
    },
    {
      name: 'is_add',
      label: '是否可新增',
      // width: 100,
      align: 'center',
      placeholder: '请输入字段是否可新增',
      required: true, // 是否必填
      max_length: 1, // 最大长度
      min_length: 1 // 最小长度
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
