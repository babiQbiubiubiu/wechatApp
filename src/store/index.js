import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		headerTitle: '',
		baseUrl: process.env.BASE_URL,
		currentUser: {}, // 当前聊天对象
        currentMsgList: {}, // 当前聊天对象的聊天记录
		chat: false, //展示聊天页面
		data: {
			self: {},
			friends: [],
			circle: []
		},
		isAjax: false,
		// 消息列表
		messageList: [
			{
				_id: 1,
				toTop: false,
				list: [
						{msg: '你可以和我聊天', time: 1541051132303, read: false},
						{msg: '你今年几岁?', time: 1541051432303, read: false},
						{msg: '我今天80你呢?', time: 1541051832303, read: false}
				]
			}, // 五天以前 展示 日期 10-12
			{
				_id: 2,
				toTop: false,
				list: [
						{msg: '我会讲笑话', time: 1542002394524, read: true},
						{msg: '表达?', time: 1541051832303, read: true, self: true}
				]
			}, // 昨天
			{
				_id: 3, 
				toTop: false,
				list: [{msg: '在吗?', time: 1542072369522, read: false}]
			}, // 当前 展示时间          上午7:03
			{
				_id: 4,
				toTop: false,
				list: [{msg: '吃了吗?', time: 1541900394524, read: false}]
			} // 五天以内 展示星期几      星期天
		],
		eeMean:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#'],
		newFriend: [],
		search: ['朋友圈', '文章', '公众号', '小说', '音乐', '好友']
  },
  getters,
  mutations,
	actions
})
