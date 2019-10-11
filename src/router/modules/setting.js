/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const settingRouter = {
  path: '/setting',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Setting',
  meta: {
    title: '设置',
    icon: 'example'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/setting/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '服务设置' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/setting/markdown'),
      name: 'MarkdownDemo',
      meta: { title: '商品设置' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/setting/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: '系统设置' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/setting/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: '登录设置' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/setting/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: '店铺设置' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/setting/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: '网店设置' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/setting/sticky'),
      name: 'StickyDemo',
      meta: { title: '订单设置' }
    }
  ]
}

export default settingRouter
