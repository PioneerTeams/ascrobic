/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '订单',
    icon: 'documentation'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/components-demo/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '订单管理' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/components-demo/markdown'),
      name: 'MarkdownDemo',
      meta: { title: '店铺订单' }

    },
    {
      path: 'markdown/detail/:sub_order_number',
      component: () => import('@/views/components-demo/markdownDetail'),
      name: 'MarkdownDetail',
      meta: { title: '店铺订单详情' },
      hidden: true
    },
    {
      path: 'json-editor',
      component: () => import('@/views/components-demo/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: '退款管理' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/components-demo/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: '整单退' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/components-demo/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: '发票管理' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/components-demo/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: '退款审核' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/components-demo/sticky'),
      name: 'StickyDemo',
      meta: { title: '财务退款' }
    }
    // {
    //   path: 'count-to',
    //   component: () => import('@/views/components-demo/count-to'),
    //   name: 'CountToDemo',
    //   meta: { title: 'Count To' }
    // },
    // {
    //   path: 'mixin',
    //   component: () => import('@/views/components-demo/mixin'),
    //   name: 'ComponentMixinDemo',
    //   meta: { title: 'Component Mixin' }
    // },
    // {
    //   path: 'back-to-top',
    //   component: () => import('@/views/components-demo/back-to-top'),
    //   name: 'BackToTopDemo',
    //   meta: { title: 'Back To Top' }
    // },
    // {
    //   path: 'drag-dialog',
    //   component: () => import('@/views/components-demo/drag-dialog'),
    //   name: 'DragDialogDemo',
    //   meta: { title: 'Drag Dialog' }
    // },
    // {
    //   path: 'drag-select',
    //   component: () => import('@/views/components-demo/drag-select'),
    //   name: 'DragSelectDemo',
    //   meta: { title: 'Drag Select' }
    // },
    // {
    //   path: 'dnd-list',
    //   component: () => import('@/views/components-demo/dnd-list'),
    //   name: 'DndListDemo',
    //   meta: { title: 'Dnd List' }
    // },
    // {
    //   path: 'drag-kanban',
    //   component: () => import('@/views/components-demo/drag-kanban'),
    //   name: 'DragKanbanDemo',
    //   meta: { title: 'Drag Kanban' }
    // }
  ]
}

export default componentsRouter
