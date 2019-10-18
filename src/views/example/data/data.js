const obj = {
  guide: [
    {
      'label': '姓名',
      'prop': 'user_name',
      'w': 100,
      "sortable":false
    }, {
      'label': '手机号',
      'prop': 'mobile',
      'w': 100,
      "sortable":false
    }, {
      'label': '角色',
      'prop': 'role',
      'w': 100,
      "sortable":false
    }, {
      'label': '所属店铺',
      'prop': 'store_name',
      'w': 100,
      "sortable":false
    }, {
      'label': '顾客账号',
      'prop': 'relation_user',
      'w': 100,
      "sortable":false
    }, {
      'label': '状态',
      'prop': 'status',
      'w': 100,
      "sortable":false
    }
  ],
  invitation: [
    {
      'label': '姓名',
      'prop': 'user_name',
      "sortable":false
    }, {
      'label': '手机号',
      'prop': 'mobile',
      "sortable":false
    }, {
      'label': '角色',
      'prop': 'role',
      "sortable":false
    }, {
      'label': '所属店铺',
      'prop': 'store_name',
      "sortable":false
    }, {
      'label': '邀请者',
      'prop': 'create_user_name',
      "sortable":false
    }, {
      'label': '发送时间',
      'prop': 'created_at',
      "sortable":true
    }
  ],
  role: [
    {
      'label': '角色',
      'prop': 'role_name'
    }, {
      'label': '权限',
      'prop': 'description'
    }, {
      'label': '店铺权限',
      'prop': 'store_permission'
    }, {
      'label': '手机App',
      'prop': 'is_app'
    }
  ]
}
export default obj
