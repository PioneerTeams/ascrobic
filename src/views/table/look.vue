<template>
  <div class="content-action">
    <div class="wrap">
      <div class="title">
        <h3>{{ detail.brand_name }}</h3>
        <span>{{ detail.src_type_name }}商品</span>
      </div>
      <div class="type">
        <h3>商品类型</h3>
        <p>{{ detail.type_name }}</p>
      </div>
      <div class="box">
        <div class="basic">
          <h3>基本信息</h3>
          <div class="shopImg">
            <span>商品图</span>
            <div class="goods-img">
              <div class="image">
                <img v-for="item in detail.main_image" :key="item.path" :src="item.url" alt="">
                <p>建议尺寸：800 x 800像素,最多上传5张。</p>
              </div>
            </div>
          </div>
          <div class="list">
            <span>品牌</span>
            <span>{{ detail.brand_name }}</span>
          </div>
          <div class="list">
            <span>商品名</span>
            <span>{{ detail.name }}</span>
          </div>
          <div class="list">
            <span>商品款号</span>
            <span>{{ detail.code }}</span>
          </div>
          <div class="list">
            <span>吊牌价格</span>
            <span>{{ detail.price }}</span>
          </div>
          <div class="list">
            <span>商品分类</span>
            <span>{{ detail.standard_category_name }}</span>
          </div>
        </div>
        <div class="basic">
          <h3>价格库存</h3>
          <div class="list">
            <span>商品类型</span>
            <div class="typeRight">
              <div v-for="item in detail.sale_attr" :key="item.id" class="sku-item">
                <div class="list">
                  <span>规格名:</span>
                  <span>{{ item.name }}</span>
                </div>
                <div class="list">
                  <span>规格值:</span>
                  <div v-for="obj in item.values" :key="obj.id" class="list-item">
                    <span>{{ obj.name }}</span>
                    <div v-show="obj.image_url" class="list-item-img">
                      <img :src="obj.image_url" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="list">
            <span>品牌</span>
            <div class="typeRight">
              <el-table :data="tableData" style="width: 100%" :header-cell-style="{background:'#FAFAFA',color:'#606266'}">
                <el-table-column
                  v-for="(item,i) in title"
                  :key="i"
                  :prop="item.key"
                  :label="item.tit"
                  width="180"
                />
              </el-table>
            </div>
          </div>
        </div>
        <div class="basic">
          <h3>物流信息</h3>
          <div class="list">
            <span>配送方式</span>
          </div>
        </div>
        <div class="basic">
          <h3>商品信息</h3>
          <div class="list">
            <span>商品分类</span>
            <span v-for="item in detail.base_attr" :key="item.id">{{ item.values_str }}</span>
          </div>
          <div class="list">
            <span>详情图</span>
            <div class="detail-img">
              <img v-for="item in detail.detail_images" :key="item.path" :src="item.url" alt="">
            </div>
          </div>
          <div class="list">
            <span>商品描述</span>
            <span v-if="detail.description==''">暂无</span>
            <span v-else>{{ detail.description }}</span>
          </div>
        </div>
        <div class="basic">
          <h3>其他信息</h3>
          <div class="list">
            <span>上架时间</span>
            <span>{{ detail.publish_mode_name }} {{ detail.publish_time }}</span>
          </div>
          <div class="list">
            <span>上架时间</span>
            <span v-if="detail.unpublish_time==''">暂无</span>
            <span v-else>{{ detail.unpublish_time }}</span>
          </div>
          <div class="list">
            <span>售后服务</span>
            <span v-if="detail.return_status_name==''">暂无</span>
            <span v-else>{{ detail.return_status_name }}</span>
          </div>
        </div>
        <div class="basic">
          <h3>操作历史</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { tableSearch } from '@/api/commodity'
export default {
  data() {
    return {
      detail: {},
      tableData: [],
      title: [{
        tit: '颜色',
        key: 'color'
      }, {
        tit: '尺码',
        key: 'size'
      }, {
        tit: 'SKU编码',
        key: 'sku_code'
      }, {
        tit: '条形码',
        key: 'bar_code'
      }, {
        tit: '价格',
        key: 'price'
      }, {
        tit: '折扣价',
        key: 'discount_price'
      }, {
        tit: '库存',
        key: 'stock'
      }]
    }
  },
  mounted() {
    this.getLookList()
  },
  methods: {
    async getLookList() {
      tableSearch(this.$route.query).then(res => {
        this.detail = res.data
        const arr = res.data.sku_list.map(item => item.attr_list)
        const brr = []
        arr.forEach((item, index) => {
          const obj = {}
          obj.color = item[0].item_name
          obj.size = item[1].item_name
          brr.push(obj)
        })
        this.tableData = res.data.sku_list
        this.tableData.forEach((item, i) => {
          item.color = brr[i].color
          item.size = brr[i].size
        })
        console.log(this.tableData)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
    .content-action{
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding: 24px;
        background-color: #fcfcfc;
        .wrap{
            background: #fff;
            min-height: 600px;
            margin-top: 24px;
            padding: 24px;
        }
    }
    .title{
        padding: 24px;
        border-bottom: 1px solid #e8e8e8;
        h3{
            display: inline-block;
            margin-right: 10px;
        }
        span{
            display: inline-block;
            margin: 0 8px 0 0;
            padding: 0 7px;
            font-size: 12px;
            line-height: 20px;
            white-space: nowrap;
            background: #fafafa;
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            cursor: default;
        }
    }
    .type{
        padding: 24px;
        border-bottom: 1px solid #e8e8e8;
        h3{
            font-size: 18px;
        }
        p{
            margin-top: 24px;
            margin-bottom: 8px;
            font-size: 14px;
        }
    }
    .box{
        margin-top: 24px;
        .basic{
            padding: 24px;
            border-bottom: 1px solid #e8e8e8;
            h3{
                font-size: 18px;
            }
        }
    }
    .shopImg{
        width: 100%;
        margin-top: 24px;
        span{
            width: 108px;
            text-align: right;
            display: block;
        }
        .goods-img{
            margin-left: 108px;
            .image{
                img{
                    width: 120px;
                    height: 160px;
                    margin-right: 8px;
                    object-fit: contain;
                }
                p{
                    color: #a0a0a0;
                    margin-bottom: 8px;
                }
            }
        }
    }
    .list{
        width: 100%;
        margin-top: 24px;
        font-size: 14px;
        display: flex;
        color: rgba($color: #000000, $alpha: 0.65);
        span:first-child{
            width: 108px;
            text-align: right;
            display: inline-block;
        }
        span:nth-of-type(2){
            margin-left: 20px;
        }
        .typeRight{
            border: 1px solid #d9d9d9;
            border-radius: 4px;
            width: 90%;
            margin-left: 20px;
            padding: 24px;
        }
        .list-item{
            width: 120px;
            margin-right: 10px;
            padding-left: 10px;
            span{
                height: 32px;
                display: block;
                width: 120px;
                border: 1px solid #d9d9d9;
                line-height: 32px;
                border-radius: 4px;
                text-align: left;
                padding-left: 10px;
            }
            .list-item-img{
                width: 120px;
                height: 128px;
                padding: 10px;
                margin-top: 8px;
                background: #fff;
                border: 1px dashed #d9d9d9;
                border-radius: 2px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .detail-img{
            width: 80%;
            margin-left: 20px;
            img{
                width: 640px;
                height: 330px;
                margin-right: 8px;
                object-fit: contain;
            }
        }
    }
</style>
