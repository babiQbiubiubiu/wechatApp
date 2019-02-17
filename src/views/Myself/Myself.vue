<template>
	<div class="myself">
		<div class="myself_box">
			<div class="myself_header">
				<div class="privacy_header">
					<div class="header_img"></div>
					<div class="header_wx">
						<h2 class="wx_name" @click="exitClick">{{$imconn.context.restTokenData.user.nickname}}</h2>
						<span class="wx_number">微信号:{{$imconn.context.restTokenData.user.username}}</span>
					</div>
					<div class="header_er" @click="textClick">
						<svg fill="#949494"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#QRcode"></use></svg>
					</div>
				</div>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg fill="#10aeff"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#photo"></use></svg>
					</div>
					<div class="like_text">相册</div>
				</router-link>
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#collect"></use></svg>
					</div>
					<div class="like_text">收藏</div>
				</router-link>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#burse"></use></svg>
					</div>
					<div class="like_text">钱包</div>
				</router-link>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg fill="#10aeff"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cardbag"></use></svg>
					</div>
					<div class="like_text">卡包</div>
				</router-link>
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#smile"></use></svg>
					</div>
					<div class="like_text">表情</div>
				</router-link>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg fill="#7586db"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#set"></use></svg>
					</div>
					<div class="like_text">设置</div>
				</router-link>
			</div>
		</div>
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'Myself',
		data() {
			return {
				$imconn: {},
				$imoption: {}
			}
		},
		methods: {
			exitClick() {
				this.$imconn.close()
				this.$imconn.listen({
					 onClosed: function (message) {
						 console.log('用户已下线')
					 }
				})
				this.$router.replace('/login')
			},
			textClick() {
				console.log(this.$imconn)
				console.log(this.$imoption)
			}
// 			loginClick() {
// 				this.$imoption.user = '13880283427';
// 				this.$imoption.pwd = '123456';
// 
// 				this.$imconn.open(this.$imoption);
// 				let _this = this;
// 				this.$imconn.listen({
// 				onOpened: function (message) {
// 					console.log('用户已上线')
// 					_this.getGroupOfWebIM();
// 					// 由于我们用的是聊天室，所以登录成功后必须加入聊天室
// 					_this.joinRoom();
// 				},
// 				onClosed: function (message) {
// 					console.log('用户已下线')
// 				},
// 				onEmojiMessage: function (message) {
// 					console.log('这儿接收到了表情')
// 				},
// 				onPictureMessage: function (message) {
// 					console.log('这儿接收到了图片')
// 				},
// 				onTextMessage: function (message) {
// 					// 每次接收信息都会在这儿监听到
// 					console.log('这儿接收到了文本信息');
// 					console.log(message)
// 				},
// 				onPresence: function ( message ) {
// 					// 加入聊调室后，这儿会被执行
// 					console.log('这儿是监听聊天室')
// 					_this.handlePresence(message)
// 				}
// 				})
// 			}
		}
	}
</script>

<style lang="scss">
.myself {
	position: fixed;
	left: 0;
	right: 0;
	top: 44px;
	bottom: 65px;
	background: #ebebeb;
	
	.myself_box {
		width: 100%;
		height: 100%;
	}
	
}
.myself_header {
	padding: 6px 20px;
	margin:25px 0;
	background: #fff;
	.privacy_header {
		display: flex;
		width: 100%;
		height: 64px;
		align-items: center;
		
		.header_img {
			flex: 0 0 64px;
			height: 100%;
			background: #ddd;
			margin-right: 10px;
		}
		.header_wx {
			flex: 1;
			.wx_name {
				color: #000;
				font-weight: 600;
				font-size: 18px;
			}
			.wx_number {
				color: #666;
				font-size: 14px;
			}
		}
		.header_er {
			flex: 0 0 24px;
			
			svg {
				width: 100%;
				height: 100%;
			}
		}
	}
}

.privacy_content {
	padding: 0 20px;
	background: #fff;
	margin-bottom: 25px;
	
	.find_like {
		margin: 5px 0;
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		
		.like_icon {
			flex: 0 0 33px;
			margin-right: 14px;
			
			svg {
				width: 100%;
				height: 100%;
				display: block;
				border-radius: 3px;
			}
		}
		.like_text {
			flex: 1;
			height: 100%;
			line-height: 50px;
			border-bottom: 1px solid #e0e0e0;
			font-size: 14px;
			font-weight: 500;
		}
// 		.like_text:last-child {
// 			border: none;
// 		}
	}
}

</style>
