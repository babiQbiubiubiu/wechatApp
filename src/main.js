import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store'
import './config/rem'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTouch from 'vue-touch'
import Muse from './muse-ui-config'

// 引入环信
require('./config/webim.config.js')
let WebIM = require('easemob-websdk');

const conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true
})

const options = {
  apiUrl: WebIM.config.apiURL,
  user: '1',
  pwd: '123456', // 待会会进行覆盖
  appKey: WebIM.config.appkey,
  success:function (re) {
    console.log('登陆成功')
	router.replace('/message')
  },
  error:function (err) {
    alert('请输入正确的微信号和密码')
	console.log(err)
  }
}

Vue.prototype.$imconn = conn
Vue.prototype.$imoption = options

// 引入环信 END

Vue.use(Muse)
Vue.use(VueAxios, axios)
Vue.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// 网络请求获取全部数据
store.dispatch('getAllData', axios)

// 全局路由守卫监听页面跳转修改navTitle
router.beforeEach((to, from, next) => {
    store.commit('CHANGE_NAV_TITLE', to.name)
    next()
})

router.replace('/login')