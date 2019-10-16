<template>
  <div class="detail">
    <!-- <Heads :title="detailList.name"></Heads> -->
    <el-tabs tab-position="left" style="height: auto;">
      <el-tab-pane label="基本信息" style="width: 400px;">
        基本信息
        <h3>店铺名称</h3>
        <!-- <p>{{ detailList.name }}</p> -->
        <h3>店铺电话</h3>
        <h3>楼层</h3>
        <!-- <p>{{ detailList.floor_name }}</p> -->
        <h3>所属分类</h3>
        <!-- <p>
                    <span
                        v-for="(item, index) in detailList.category_data"
                        :key="index"
                        >{{ item }}</span
                    >
                </p> -->
        <h3>位置</h3>
        <!-- <p>{{ detailList.address }}</p> -->
        <h3>LOGO</h3>
        <!-- <img
                  style="height: auto;width:100px"
                    v-if="detailList.r_logo_img"
                    :src="detailList.r_logo_img"
                    alt=""
                 /> -->
        <!-- <h3>背景图</h3> -->
        <!-- <img v-if="detailList.r_background_img"
                 style="height: auto;width:200px" :src="detailList.r_background_img" alt=""> -->
        <h3>店铺描述</h3>
        <!-- <p>{{ detailList.description }}</p> -->
      </el-tab-pane>
      <el-tab-pane label="匹配设置">
        匹配设置
        <!-- <p>{{detailList.matching_info}}</p> -->
      </el-tab-pane>
      <el-tab-pane label="e店铺设置">
        <!-- e店铺设置
              <p>{{detailList.e_store_info.titile}}</p> -->
        <div>
          <!-- <p v-for="(item,index) in detailList.e_store_info.titile_data" :key="index">{{item}}</p> -->

        </div>

      </el-tab-pane>
      <el-tab-pane label="团队">
        团队
        <!-- <h3>{{detailList.team_list.building}}</h3> -->
        <!-- <p v-for="(item,index) in detailList.team_list.building_data" :key="index">
               {{item}}
             </p>
              <h3>{{detailList.team_list.shopowner}}</h3>
             <p v-for="(item,index) in detailList.team_list.shopowner_data" :key="index">
               {{item}}
             </p>
               <h3>{{detailList.team_list.shopping}}</h3>
             <p v-for="(item,index) in detailList.team_list.shopping_data" :key="index">
               {{item}}
             </p> -->
      </el-tab-pane>
      <el-tab-pane label="店铺设置">
        <h3>店铺设置</h3>
        <p>删除店铺，店铺信息将被移除，不可恢复，删除店铺前，请确认e店铺已关闭</p>
        <el-button type="danger">删除店铺</el-button>
      </el-tab-pane>
      <el-tab-pane label="操作历史">操作历史</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style  lang="scss">
html,body{
  width: 100%;
  height: 100%;
   background: #fcfcfc;
}
.detail{
  width: 96%;
  height: 100%;
  background: #fff;
}
</style>
