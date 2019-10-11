/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const marketing = {
  path: '/marketing',
  component: Layout,
  redirect: 'noRedirect',
  name: 'Marketing',
  meta: {
    title: '营销',
    icon: 'clipboard'
  },
  children: [
    {
      path: 'tinymce',
      component: () => import('@/views/marketing/tinymce'),
      name: 'TinymceDemo',
      meta: { title: '优惠券类型' }
    },
    {
      path: 'markdown',
      component: () => import('@/views/marketing/markdown'),
      name: 'MarkdownDemo',
      meta: { title: '优惠券管理' }
    },
    {
      path: 'json-editor',
      component: () => import('@/views/marketing/json-editor'),
      name: 'JsonEditorDemo',
      meta: { title: '优惠券发放记录' }
    },
    {
      path: 'split-pane',
      component: () => import('@/views/marketing/split-pane'),
      name: 'SplitpaneDemo',
      meta: { title: '优惠券使用记录' }
    },
    {
      path: 'avatar-upload',
      component: () => import('@/views/marketing/avatar-upload'),
      name: 'AvatarUploadDemo',
      meta: { title: '一口价' }
    },
    {
      path: 'dropzone',
      component: () => import('@/views/marketing/dropzone'),
      name: 'DropzoneDemo',
      meta: { title: '满减活动' }
    },
    {
      path: 'sticky',
      component: () => import('@/views/marketing/sticky'),
      name: 'StickyDemo',
      meta: { title: '店内促销' }
    },
    {
      path: 'count-to',
      component: () => import('@/views/marketing/count-to'),
      name: 'CountToDemo',
      meta: { title: '限购活动' }
    }
  ]
}

export default marketing
