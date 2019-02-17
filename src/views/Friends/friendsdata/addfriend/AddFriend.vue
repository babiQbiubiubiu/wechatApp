<template>
	<div class="add_friend">
		<TopNav crossover="添加朋友"></TopNav>
		<div class="add_list">
			<div class="search_box">
				<div class="search_icon" @click="searchAdd">
					<svg class="icon-search" fill="#bbb">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
					</svg>
				</div>
				<div class="search_input">
					<input type="text" placeholder="微信号/QQ号/手机号" v-model="inputAdd">
				</div>
			</div>
			<div class="my_info">我的微信号:{{$imconn.context.restTokenData.user.username}}</div>
			<div>列表</div>
		</div>
	</div>
</template>

<script>
	import TopNav from '../../../../components/TopNav.vue'
	
	export default {
		name: 'AddFriend',
		data() {
			return {
				inputAdd: ''
			}
		},
		methods: {
			searchAdd() {
				console.log(this.inputAdd)
				// 添加好友
				this.$imconn.subscribe({
					to: this.inputAdd,
					// Demo里面接收方没有展现出来这个message，在status字段里面
					message: '加个好友呗!'   
				})
			}
			// 发送好友聊天
// 			sendTxt() {
// 				var id = this.$imconn.getUniqueId();                 // 生成本地消息id
// 				var msg = new WebIM.message('txt', id);      // 创建文本消息
// 				msg.set({
// 					msg: this.inputAdd,                  // 消息内容
// 					to: 111111,                          // 接收消息对象（用户id）
// 					roomType: false,
// 					success: function (id, serverMsgId) {
// 						console.log('send private text Success');
// 					},
// 					fail: function(e){
// 						console.log("Send private text error");
// 						}
// 					});
// 				msg.body.chatType = 'singleChat';
// 				this.$imconn.send(msg.body);
// 			}
		},
		components:{TopNav}
	}
</script>

<style lang="scss" scoped>
	.add_friend {
		z-index: 20;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.add_list {
		margin-top: 44px;
		
		.search_box {
			padding: 0 20px;
			height: 50px;
			border-top: 1px solid #e0e0e0;
			border-bottom: 1px solid #e0e0e0;
			box-sizing: border-box;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			
			.search_icon {
				flex: 0 0 22px;
				height: 100%;
				
				.icon-search {
					width: 100%;
					height: 100%;
				}
			}
			.search_input {
				flex: 1;
				height: 100%;
				
				input {
					width: 100%;
					height: 100%;
					padding-left: 10px; 
					outline: none;
					border: none;
					color: #bbb;
				}
			}
		}
		.my_info {
			padding: 20px 0 40px 0;
			background: #eeeeee;
			text-align: center;
			font-size: 14px;
		}
		
	}
</style>
