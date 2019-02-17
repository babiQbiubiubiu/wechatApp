const navTitleObj = {
	message: '微信',
	friends: '通讯录',
	find: '发现',
	myself: '我的'
}

export const navTitle = state => navTitleObj[state.headerTitle]
// 根据state消息数据生成,message页面列表数据,包含头像,用户名,未读消息等
export const msgFriendsList = state => {
	let result = []
	let friends = state.data.friends
	if (!friends) {
		return result
	}
	state.messageList.forEach(item => {
		let friednData = friends.find(f => f._id === item._id)
		let unreadNum = 0
		let lastMessaage = {}
		// console.log(item)
		item.list.forEach(m => {
			if (!m.read) {
				unreadNum++
			}
			lastMessaage = m
		})
		result.push({
			...friednData,
			unreadNum,
			lastMessaage
		})
	})
// console.log(result)
	return result
}

export const firstCord = state => {
	let record = state.data.friends.map(f => f.value)
	let arrKey = [...new Set(record)].sort(function(x,y) {
		return y-x
	})
	// console.log(arrKey)
	return arrKey
}