/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: '商品',
    icon: 'shopping'
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/table/index'),
      name: 'index',
      meta: { title: '商品管理' }
    },
    {
      path: 'look',
      component: () => import('@/views/table/look'),
      name: 'look',
      hidden: true,
      meta: { title: '商品列表' }
    },
    {
      path: 'compile',
      component: () => import('@/views/table/compile'),
      name: 'compile',
      hidden: true,
      meta: { title: '商品列表' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/table/drag-table'),
      name: 'DragTable',
      meta: { title: '库存管理' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/table/inline-edit-table'),
      name: 'InlineEditTable',
      meta: { title: '规格值管理' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/table/complex-table'),
      name: 'ComplexTable',
      meta: { title: '商品分组' }
    }
  ]
}
export default tableRouter
