<!-- 带有获取 button 的组件 -->
<script>
import { queryButtonList } from '@/api/wink/button'

export default {
  props: {
    menuCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      buttons: [] // 组件中的按钮
    }
  },
  async created() {
    const res = await queryButtonList(this.menuCode)
    const buttons = res.data
    // 初始处理一下数据, 构建 components
    buttons.forEach(item => {
      item.component = resolve => require([`/src/${item.ui}.vue`], resolve)
    })
    // 按照 order_num 排序 越小的越靠前
    buttons.sort((a, b) => a.order_num - b.order_num)
    this.buttons = buttons
  }
}
</script>
