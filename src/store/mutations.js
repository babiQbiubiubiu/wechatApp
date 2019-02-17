import * as types from './mutation-types'

export default {
	[types.CHANGE_NAV_TITLE](state, title) {
		state.headerTitle = title
	},
	[types.RECEIVE_DATA](state, self) {
		state.data = self
		// console.log(self)
	},
	[types.REFRESH_AJAX](state, status) {
		state.isAjax = status
	},
	[types.DELETD_MESSAGE](state, id) {
		let record = state.messageList.find(m => m._id === id) //找到对应好友聊天消息数据
		if (!record) {
			return
		}
		let index = state.messageList.indexOf(record) // 获取对应消息的下标
		state.messageList.splice(index, 1)
	},
	[types.TOPPING_MESSAGE](state, userId) {
		let user = state.messageList.find(n => n._id === userId)
		if(!user) {
			return
		}
		let userIndex = state.messageList.indexOf(user)
		let num = 0
		if(!user.toTop) {
			num++
// 			console.log(num)
			let msg = state.messageList.splice(userIndex, 1)
			state.messageList.unshift(msg[0])
			user.toTop = true
			// console.log(user.toTop)
		} else {
		  let message = state.messageList.splice(userIndex, 1)
		  // state.messageList.splice(num-1, 0, message[0])
		  state.messageList.push(message[0])
		  console.log(num)
		  user.toTop = false
		  // console.log(user.toTop)
		}
// 互相对调
// state.messageList[userIndex] = state.messageList.splice(0, 1, state.messageList[userIndex])[0]
		
		
// 		if (!record.toTop) {
// 		  let msg = state.messageList.splice(index, 1)
// 		  state.messageList.unshift(msg[0])
// 		  record.toTop = true
// 		  //console.log(state.messageList.toTop);
// 
// 		
	},
	[types.RECEIVE_CURRENT_USER](state, user) {
        state.currentUser = user // 指定当前聊天用户
        // 获取聊天记录
        let record = state.messageList.find(m => m._id === user._id)
        if (!record) {
            // 当前好友没有与用户没有聊天记录,向messageList添加一条对应的聊天记录
            record = {
                _id: user._id,
                list: []
            }
            state.messageList.push(record)
        } else {
            record.list.forEach(m => m.read = true)
        }
        state.currentMsgList = record
    },
	[types.TOGGLE_CHATVIEW](state, val) {
		state.chat = val
	},
	[types.ADD_MESSAGE](state, msg) {
		state.currentMsgList.list.push(msg)
	},
	[types.GET_NEW_MESSAGE](state, {msg, id, time}) {
		// 根据id返回对应好友的聊天消息数组
		let record = state.messageList.find(m => m._id === id)
		if(!record) {
			return
			record = {
				_id: id,
				list: []
			}
			state.messageList.push(record)
		}
		let read = state.currentUser._id === id && state.chat
		record.list.push({
			msg,
			time,
			read
		})
	},
	[types.ADD_NEW_CIRCLE](state, {petname, statements, avatar, time, like, comment, reviewshow, reviewhide, criticism, flag, suporthtml}) {
		let circle = state.data.circle
		circle.unshift({
			petname: petname,
			statements: statements,
			avatar: avatar,
			time: time,
			like: [],
			comment: [],
			reviewshow: reviewshow,
			reviewhide: reviewhide,
			criticism: criticism,
			flag: flag,
			suporthtml: suporthtml
		})
		// console.log(circle)
	},
	[types.ADD_NEW_FRIEND](state, newFriend) {
		state.newFriend = (newFriend)
		console.log(state.newFriend)
	},
	[types.SEARCH_FRIENDS](state, user) {
		state.currentUser = user
		let record = state.messageList.find(f => f._id === user._id)
		if (!record) {
		  record = {
			_id: user._id,
			list: []
		  }
		  state.messageList.push(record)
		}else{
		  record.list.forEach(f => f.read = true)
		}
		state.currentMsgList = record
	}
}