<template>
  <div>
    <back :title="title"> </back>
    <div class="container">
      <div class="item">
        <div class="left">收货人</div>
        <div class="right">
          <input type="text" v-model="form.name" placeholder="联系人姓名">
        </div>
      </div>
      <div class="item">
        <div class="left">联系电话</div>
        <div class="right">
          <input type="number" v-model="form.mobile" placeholder="联系人电话">
        </div>
      </div>
      <div class="item">
        <div class="left">收货地址</div>
        <div class="right" @click="locationPopVisible = true">
          <div class="location-container">
            <span>{{locationForm.provinceName}}</span>
            <img src="~images/information-more.png">
          </div>
          <div class="location-container">
            <span>{{locationForm.cityName}}</span>
            <img src="~images/information-more.png">
          </div>
          <div class="location-container">
            <span>{{locationForm.countyName}}</span>
            <img src="~images/information-more.png">
          </div>
        </div>
      </div>
      <div class="item">
        <div class="left">详细地址</div>
        <div class="right">
          <input type="text" v-model="form.address" placeholder="详细地址">
        </div>
      </div>

      <button class="save flex-center" @click="onSaveClick">保存</button>
    </div>

    <mt-popup v-if="tree" v-model="locationPopVisible"
            position="bottom"
            class="pop-flex-bottom">
      <mt-picker ref="picker" :slots="slots" :valueKey="'name'" @change="onPickerSelect">
      </mt-picker>
  </mt-popup>
  </div>
</template>

<script>
import Back from 'comp/index/back'
import { Picker, Popup, Toast } from 'mint-ui'
import { AddressService } from 'api/manage/address-service'

export default {
  components: {
    Back,
    Picker,
    Popup
  },

  data () {
    return {
      target: '',
      editData: '',
      id: '',
      form: {
        name: '',
        mobile: '',
        locationId: '',
        address: '',
        defaul: false
      },
      locationForm: {
        provinceName: '',
        cityName: '',
        countyName: '',
        area: ''
      },
      tree: [],
      slots: [],
      locationPopVisible: false
    }
  },

  methods: {
    onPickerSelect (picker, values) {
      // 第一次进来没有默认值的时候
      if (!values[0]) {
        console.log('select没有值')
      } else {
        // console.log(values)
        picker.setSlotValues(1, values[0].children)
        let town = []
        if (values[1]) {
          town = values[1].children
        }
        picker.setSlotValues(2, town)

        this.locationForm.provinceName = values[0].name
        this.locationForm.cityName = values[1].name
        this.locationForm.countyName = values[2].name
        this.locationForm.area = [values[0].id, values[1].id, values[2].id]
        this.form.locationId = values[2].id

        console.log(this.locationForm, this.form)
        // console.log(picker.getSlotValue(0), picker.getSlotValue(1), picker.getSlotValue(2))
        // console.log(values)
      }
    },

    onSaveClick () {
      if (!this.form.name) {
        return Toast('请填写收货人')
      }
      if (!this.form.mobile) {
        return Toast('请填写联系人电话')
      }

      if (!this.form.address) {
        return Toast('请填写详细地址')
      }

      console.log(this.form.locationId)

      if (this.target === 'new') {
        this.addressService.add({
          recipientName: this.form.name,
          mobile: this.form.mobile,
          countyId: this.form.locationId,
          address: this.form.address,
          area: this.locationForm.area,
          defaul: this.form.defaul
        }).then(res => res ? this.$router.go(-1) : '')
      } else {
        this.addressService.update({
          id: this.id,
          defaul: this.form.defaul,
          recipientName: this.form.name,
          mobile: this.form.mobile,
          countyId: this.form.locationId,
          address: this.form.address
        }).then(res => res ? this.$router.go(-1) : '')
      }
    }
  },

  computed: {
    title () {
      return this.target === 'new' ? '新增地址' : '修改地址'
    }
  },

  created () {
    this.addressService = new AddressService()
  },
  mounted () {
    this.addressService.tree('')
      .then(res => {
        if (res) {
          this.tree = res
          this.slots = [{
            flex: 1,
            values: this.tree,
            textAlign: 'center'
          }, {
            flex: 1,
            values: this.tree[0].children,
            textAlign: 'center'
          }, {
            flex: 1,
            values: this.tree[0].children[0].children,
            textAlign: 'center'
          }]

          this.$nextTick(() => {
            if (this.target === 'new') {
              this.$refs.picker.setValues([this.tree[0], this.tree[0].children[0], this.tree[0].children[0].children[0]])
              this.locationForm.provinceName = this.tree[0].name
              this.locationForm.cityName = this.tree[0].children[0].name
              this.locationForm.countyName = this.tree[0].children[0].children[0].name
              this.locationForm.area = [this.tree[0].id, this.tree[0].children[0].id, this.tree[0].children[0].children[0].id]
              this.form.locationId = this.tree[0].children[0].children[0].id
            } else {
              this.locationForm.provinceName = this.editData.province.name
              this.locationForm.cityName = this.editData.city.name
              this.locationForm.countyName = this.editData.county.name
              this.locationForm.area = [this.editData.province.id, this.editData.city.id, this.editData.county.id]
              let province = this.tree.filter(e => e.id === this.editData.province.id)[0]
              let city = province.children.filter(e => e.id === this.editData.city.id)[0]
              let county = city.children.filter(e => e.id === this.editData.county.id)[0]
              this.$refs.picker.setValues([province, city, county])
            }
          })
        }
      })
  },

  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      vm.target = to.query.target

      if (vm.target === 'edit') {
        vm.editData = JSON.parse(to.query.data)
        vm.id = vm.editData.id
        vm.form.name = vm.editData.recipientName
        vm.form.mobile = vm.editData.mobile
        vm.form.locationId = vm.editData.county.id
        vm.form.address = vm.editData.address
        vm.form.defaul = vm.editData.defaul
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.mint-popup-bottom {
  width: 100%;
}
</style>

<style lang="scss" scoped>
@import '~scss/shotcut';

.item {
  height: 0.88rem;
  border-bottom: 1px solid $border-gray;
  display: flex;
  align-items: center;
  padding-left: .3rem;
  font-size: 0.3rem;
  text-align: left;
  background: white;

  .left {
    width: 1.6rem;
    flex-shrink: 0;
  }

  .right {
    flex-grow: 1;
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      height: 100%;
    }

    .location-container {
      display: flex;
      justify-content: center;
      min-width: 1.2rem;
      height: .5rem;
      box-sizing: border-box;
      border: 1px solid $border-gray;
      background: #f5f5f5;
      font-size: 0.24rem;
      align-items: center;
      margin-right: 0.1rem;

      & > span {
        margin-right: .1rem;
      }

      & > img {
        transform: rotateZ(90deg);
        width: 0.16rem;
        height: 0.24rem;
      }
    }
  }
}

.container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 1.98rem; //( 头部1rem + 0.1rem的margin + 0.88rem的back)
  background: #f2f2f2;

  .save {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 6rem;
    height: 0.9rem;
    background: $text-green;
    color:white;
    border-radius: 4px;
    font-size: 0.36em;
    margin-top: 4rem;
  }
}
</style>
