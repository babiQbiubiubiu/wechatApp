import * as types from './mutation-types'

export default {
	async getAllData({commit}, axios) {
        commit(types.REFRESH_AJAX, true) // 正在请求
        let self = await axios.get('/api/self')
        self = self.data.data
        let friends = await axios.get('/api/friends')
        friends = friends.data.data
		let circle = await axios.get('/api/circle')
		circle = circle.data.data
		// console.log(circle)
        commit(types.RECEIVE_DATA, {self, friends, circle})
        commit(types.REFRESH_AJAX, false) //请求完毕
    },
	chatview({commit}, item) {
		// 获取当前聊天用户的信息
        commit(types.RECEIVE_CURRENT_USER, item)
		// console.log(item)
        // 打开聊天页面
        commit(types.TOGGLE_CHATVIEW, true)
	},
	sendMessage({commit}, msg) {
		commit(types.ADD_MESSAGE, msg)
	},
	getNewMessage({commit}, {axios, id, msg}) {
		return new Promise(resolve => {
			axios.get(`/api/robot?id=${id}&msg=${msg}`).then(
				(res) => {
					let data = JSON.parse(res.data.data) // 将json字符串转化为对象
					// console.log(data)
					commit(types.GET_NEW_MESSAGE, {msg: data.text, id, time: new Date().getTime()})
					resolve() //异步函数执行完毕
				}
			)
		})
	},
	sendNewCircle({commit}, {petname, statements, avatar, time, like, comment, reviewshow, reviewhide, criticism, flag, suporthtml}) {
		commit(types.ADD_NEW_CIRCLE, {petname, statements, avatar, time, like, comment, reviewshow, reviewhide, criticism, flag, suporthtml})
		// console.log({petname, statements, time})
	},
	addNewFriend({commit}, newFriend) {
		commit(types.ADD_NEW_FRIEND, newFriend)
		// console.log(newFriend)
	},
	sendParToChar({commit}, search) {
		commit(types.SEARCH_FRIENDS, search)
	}
}