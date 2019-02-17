<template>
  <div id="app">
		<!-- <router-link tag="div" to="/login" class="login_box">
			<div class="login">登录</div>
		</router-link> -->
		<div class="top-nav" @click="addNewFriend">
			<top-nav/>
		</div>
		<div class="tabbar">
				<FootTabNav/>
		</div>
    <router-view/>
  </div>
</template>

<script>
	import FootTabNav from './components/FootTabNav'
	import TopNav from './components/TopNav'
	import {mapActions} from 'vuex'
	
	export default {
		name: 'App',
		data() {
			return {
				friendArr: []
			}
		},
		created() {
			this.$nextTick(() => {
// 				this.$imoption.user = this.validateForm.username     // '13880283427';
// 				this.$imoption.pwd =  this.validateForm.password      //    '123456';
				this.$imconn.listen({
					onOpened: function(login) {
						console.log('用户已上线')
					},
					onClosed: function(Offline) {
						alert('用户已下线')
					},
					onPresence: (get) => {
						console.log('收到好友请求')
						// console.log(get)
						this.friendArr.push(get)
						this.addNewFriend(this.friendArr)
	// 					for (let i in message) {
	// 						let data = {}
	// 						data.name = i
	// 						this.addFriends.push(data)
	// 					}
						// console.log(this)
						// this.handlePresence(this.addFriends)
					},
	// 				onEmojiMessage: function (message) {
	// 					console.log('这儿接收到了表情')
	// 				},
	// 				onPictureMessage: function (message) {
	// 					console.log('这儿接收到了图片')
	// 				},
					onTextMessage: function (message) {
						// 每次接收信息都会在这儿监听到
						console.log('这儿接收到了文本信息');
						console.log(message)
					},
	// 				onPresence: function ( message ) {
	// 					// 加入聊调室后，这儿会被执行
	// 					console.log('这儿是监听聊天室')
	// 					_this.handlePresence(message)
	// 				}
				})
			})
		},
		methods: {
			...mapActions(['addNewFriend'])
		},
		components: {
			FootTabNav,
			TopNav,
		}
	}
</script>

<style lang="scss" scoped>
#app {
	position: fixed;
	width: 100%;
	height: 100%;
}
.tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
