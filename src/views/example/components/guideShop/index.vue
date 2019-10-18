<template>
  <div class="mangeFrom">
    <div>
      <el-form
        ref="formInline"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        label-width="180"
      >
        <el-form-item label="手机号">
          <el-input v-model="formInline.mobile" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="所属店铺">
          <el-select v-model="formInline.store_id" placeholder="请选择">
            <el-option v-for="ele in listSech" :key="ele.id" :label="ele.name" :value="ele.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formInline.role_id" placeholder="请选择">
            <el-option
              v-for="ele in roleArr"
              :key="ele.id"
              :label="ele.description"
              :value="ele.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="顾客账号">
          <el-select v-model="formInline.relation_user_status" placeholder="请选择">
            <el-option label="未关联" :value="0" />
            <el-option label="已关联" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option label="冻结" :value="0" />
            <el-option label="正常" :value="1" />
          </el-select>
        </el-form-item>
        <div class="mright" style="text-align: right">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <tabImg :table-data="userlist" :list="guild" />
  </div>
</template>
<script>
import { getListSeach, getDescList, getUserList } from '@/api/shopArcade.js'
import tabImg from '../Imgtabs'
import arr from '../../data/data.js'
export default {
  components: { tabImg },
  data() {
    return {
      listSech: [],
      roleArr: [],
      userlist: [],
      guild: arr.guide,
      type: 2,
      formInline: {
        mobile: '',
        store_id: '',
        role_id: '',
        relation_user_status: '',
        status: ''
      },
      fromdata: { type: 2, page: 1, status: '[0,1]' },
      roledata: { mall_id: 61500, type: 2, page: 1 }
    }
  },
  computed: {},
  created() {
    this.getUserLists()
    this.getListSeachs()
    this.getDescLists()
  },
  mounted() {},
  methods: {
    async getListSeachs() {
      const result = await getListSeach({ type: this.type })
      this.listSech = result.stores
    },
    // Select楼层
    async getDescLists() {
      const result = await getDescList(this.roledata)
      this.roleArr = result.list
    },
    async getUserLists() {
      const result = await getUserList(this.fromdata)
      this.userlist = result.list
    },
    onSubmit() {
      // 搜索
      const obj = {}
      for (const k in this.formInline) {
        if (this.formInline[k]) {
          obj[k] = this.formInline[k]
        }
      }
      this.$emit('sechfn', Object.assign(this.fromdata, obj))
    },
    onReset() {
      // 重置表单
      const arr = Object.keys(this.formInline)
      arr.forEach(item => {
        this.formInline[item] = ''
      })
      Object.assign(this.fromdata, this.formInline)
    }
  }
}
</script>
