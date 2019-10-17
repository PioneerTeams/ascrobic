<template>
  <div class="sticky">
    <div class="sticky-top">
      <span>维他命商城后台</span>
      <span>&gt;</span>
      <span>营销</span>
      <span>&gt;</span>
      <span>店内促销</span>
    </div>
    <div class="sticky-content">
      <div class="sticky-con-top">
        <h3 class="sticky-title">店内促销</h3>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row v-for="(item, index) in formList" :key="index" type="flex">
            <el-col v-for="(value, key) in item" :key="key" :span="4" class="form-item">
              <el-form-item :label="value.label" class="form-label">
                <component
                  :is="value.is"
                  v-model="form[value.name]"
                  :type="value.type"
                  :range-separator="value.swparator"
                  :start-placeholder="value.alery"
                  :end-placeholder="value.last"
                  :placeholder="value.placeholder"
                >
                  <!-- <! 根据value.is判断渲染Ipt组件还是select组件 ---->
                  <el-option
                    v-for="(v,k) in floorList"
                    v-show="value.name == 'floor_id'"
                    :key="k.id"
                    :label="v.name"
                    :value="v.id"
                  />
                  <el-option
                    v-for="(val) in value.list"
                    v-show="value.name == 'status'"
                    :key="val.name"
                    :label="val.name"
                    :value="val.value"
                  />
                  <el-option-group
                    v-for="group in cateGoryList"
                    v-show="value.name == 'category_id'"
                    :key="group.id"
                    :label="group.name"
                  >
                    <el-option
                      v-for="item in group.children"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-option-group>

                  <!-- <! 渲染下拉框的每一项 ---->
                </component>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item class="btn">
            <el-button type="primary" class="search" @click="submit">查询</el-button>
            <el-button type="primary" class="rest-info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="sticky-con-btm">
        <el-table :data="tableList" style="width: 100%">
          <el-table-column
            v-for="(item,index) in column"
            :key="index"
            :prop="item.prop"
            :label="item.label"
          />
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="handleClick(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          style="width:100%;"
          layout="prev, pager, next"
          :total="1000"
          @current-change="currentChange"
          @prev-click="prevChange"
          @next-click="nextChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'StickyDemo',
  components: {},
  data() {
    return {
      currentPage: 1,
      column: [
        {
          prop: 'vm_store_name',
          label: '店铺名称'
        },
        {
          prop: 'floor_name',
          label: '楼层'
        },
        {
          prop: 'summary',
          label: '店内促销'
        },
        {
          prop: 'activity_time_str',
          label: '活动时间'
        },
        {
          prop: 'status_str',
          label: '状态'
        }
      ],
      form: {
        vm_store_name: '',
        floor_id: '',
        category_id: '',
        status: '',
        start_data: '',
        end_data: ''
      },
      formList: [
        [
          {
            label: '店铺名',
            name: 'vm_store_name',
            placeholder: '请输入店铺名称',
            is: 'el-input'
          },
          {
            label: '楼层',
            name: 'floor_id',
            placeholder: '请输入楼层',
            is: 'el-select'
          },
          {
            label: '分类',
            name: 'category_id',
            placeholder: '请选择',
            is: 'el-select'
          },
          {
            label: '状态',
            name: 'status',
            placeholder: '请选择',
            is: 'el-select',
            list: [
              {
                name: '未开始',
                value: 0
              },
              {
                name: '生效',
                value: 1
              },
              {
                name: '已过期',
                value: 2
              }
            ]
          },
          {
            label: '开始时间',
            name: 'start_data',
            septarator: '~',
            type: 'daterange',
            alery: '最早开始时间',
            last: '最晚开始时间',
            is: 'el-date-picker'
          },
          {
            label: '结束时间',
            name: 'end_data',
            septarator: '~',
            type: 'daterange',
            alery: '最早结束时间',
            last: '最晚结束时间',
            is: 'el-date-picker'
          }
        ]
      ]
    }
  },
  computed: {
    ...mapState('sticky', ['floorList', 'cateGoryList', 'tableList'])
  },
  methods: {
    ...mapActions('sticky', [
      'getFloorList',
      'getCateGoryList',
      'getTableList'
    ]),

    submit() {
      
      const {
        vm_store_name,
        floor_id,
        category_id,
        status,
        start_data,
        end_data
      } = this.form
      const obj = {}
      for (const key in this.form) {
        if (this.form[key]) {
           if(this.form['start_data']){
             this.form['start_data'].forEach((item,index)=>{
               obj[`start_data[${index}]`]=item.toLocaleDateString().replace(/\//g,"-")
             })
           }else if(this.form['end_data']) {
               this.form['end_data'].forEach((item,index)=>{
               obj[`end_data[${index}]`]=item.toLocaleDateString().replace(/\//g,"-")
             })
           }else{
              obj[key] = this.form[key]
           }
          this.getTableList({ page: this.currentPage, ...obj })
        }
      }
      // this.getTableList({
      //   page: this.currentPage,
      //   vm_store_name,
      //   floor_id,
      //   category_id,
      //   status,
      //   'start_data[0]': start_data[0],
      //   'start_data[1]': start_data[1],
      //   'end_data[0]': end_data[0],
      //   'end_data[1]': end_data[1]
      // })
    },
    reset() {
      const obj = Object.entries(this.form).map(item => {
        return [item[0], '']
      })
      obj.forEach((item) => {
        this.form[item[0]] = item[1]
      })

      this.getTableList({ page: this.currentPage })
    },
    handleClick(data) {},
    currentChange(page) {
      this.currentPage = page
      this.getTableList({ page })
    },
    prevChange(page) {
      this.currentPage = page
      this.getTableList({ page })
    },
    nextChange(page) {
      this.currentPage = page
      this.getTableList({ page })
    }
  },
  created() {
    this.getTableList({ page: this.currentPage })
  },
  mounted() {
    this.getFloorList()
    this.getCateGoryList()
  }
}
</script>

<style >
@import url("./scss/sticky/index.scss");
.el-row {
  display: flex;
  flex-wrap: wrap;
}
.form-item {
  width: auto;
  margin: 10px 0;
}
.search {
  display: inline-block;
  background: #3ec6b6;
  border: 1px solid #3ec6b6;
  color: #fff;
  border-radius: 4px;
  text-align: center;
  width: 60px;
  height: 35px;
  padding: 6px 15px;
}

.rest-info {
  display: inline-block;
  color: #3c3c3c;
  border-radius: 4px;
  border: 1px solid #e8e8e8;
  background: white;
  width: 60px;
  height: 35px;
  padding: 6px 15px;
}
.btn {
  display: flex;
  justify-content: flex-end;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
