<template>
	<div class="chatview_box">
		<TopNav :crossover="currentUser.name" :user="currentUser._id">
			<router-link to='' class="person_link" slot="person" tag="div">
				<svg fill="#fff" class="icon-search">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#person"></use>
				</svg>	
			</router-link>
		</TopNav>
		<div class="chat_content" ref="msgView" @click="contentClick">
			<ChatContent ref="chatContent"></ChatContent>
		</div>
		<footer class="footer">
			<div class="chat_box">
				<div class="chat_audio">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#voice"></use>
					</svg>
				</div>
				<div class="chat_input">
					<input type="text" :class="{light: inputLight}" @input="inputClick" v-model="value"/>
				</div>
				<div class="chat_smile">
					<svg>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#face"></use>
					</svg>
				</div>
				<div class="chat_send">
					<div class="send" v-if="inputLight" @click="sendMsg">发送</div>
					<svg v-else>
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#addthing"></use>
					</svg>
				</div>
			</div>
		</footer>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	import TopNav from '../../../../components/TopNav'
	import ChatContent from './ChatContent'
	import {mapState, mapActions} from 'vuex'
	
	export default {
		name: 'ChatView',
		props: ['user'],
		data() {
			return {
				value: '',
				inputLight: false
			}
		},
		created() {
			this.$nextTick(() => {
				this._initMsgViewScroll()
			})
		},
		methods: {
			_initMsgViewScroll() {
				if (!this.msgScroll) {
					this.msgScroll = new BScroll(this.$refs.msgView, {
						click: true
					})
				} else {
					this.msgScroll.refresh()
				}
			},
			...mapActions(['sendMessage', 'getNewMessage']),
			sendMsg() {
				if(!this.value.trim()) {
					return
				}
				let msg = this.value
				let time = new Date().getTime()
				let msgItem = {msg, time, self: true, read: true}
				this.sendMessage(msgItem)
				this.value = ''
				this.scrollToBottom()
				// 将当前信息发送给服务器,等待好友回复功能
				this.getNewMessage({id: this.currentUser._id, msg, axios: this.axios})
                    .then(() => {
                        // 将action封装成promise对象保证 网络数据请求完毕更新vuex的store后,调用then方法
                        this.scrollToBottom()
                    })
			},
			scrollToBottom() {
				this.$nextTick(() => {
                    // 当聊天消息增加时(发生改变时)会引起页面重新渲染,$nextTick等待页面及子组件因数据发生该变重新渲染完毕时
                    // 重新计算better-scroll内容高度
                    this.msgScroll.refresh()
                    let bottomEl = this.$refs.chatContent.$refs.bottom
					// console.log(bottomEl)
                    //使用better-scroll的scrollToElement API滑动到聊天内容区的最底部
                    this.msgScroll.scrollToElement(bottomEl, 300)
                })
			},
			inputClick(e) {
				if(!this.value) {
					this.inputLight = false
				}
				this.inputLight = true
			},
			contentClick() {
				if (this.value) {
					this.inputLight = true
				} else {
					this.inputLight = false
				}
			}
		},
		computed: mapState(['currentUser']),
		components: {
			TopNav,
			ChatContent
		}
	}
</script>

<style lang="scss">
	.chatview_box {
		z-index: 888;
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: #DDDDDD;
		
		.chat_content {
			position: absolute;
			top: 44px;
			bottom: 53px;
			left: 0;
			right: 0;
			overflow: hidden;
		}
	}
	.person_link {
		flex: 0 0 22px;
		height: 100%;
		.icon-search {
			width: 100%;
			height: 100%;
		}
	}
	
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 0 15px;
		width: 100%;
		background: #f3f3f3;
		border-top: 1px solid #e0e0e0;
		
		
		.chat_box {
			display: flex;
			align-items: center;
			height: 52px;
			
			.chat_audio, .chat_smile, .chat_send {
				flex: 0 0 35px;
				height: 100%;
				margin-right: 8px;
				
				svg {
					width: 100%;
					height: 100%;
				}
			}
			.chat_send {
				margin: 0;
				position: relative;
				.send {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 42px;
					height: 32px;
					line-height: 32px;
					background: #16af17;
					color: #fff;
					font-size: 14px;
					text-align: center;
					border-radius: 4px;
				}
			}
			.chat_input {
				flex: 1;
				margin-right: 8px;
				
				input {
					padding: 0 8px;
					width: 100%;
					height: 28px;
					line-height: 28px;
					border: none;
					font-size: 14px;
					color: #000;
					border-bottom: 1px solid #e0e0e0;
					outline: none;
					background: #f3f3f3;
				}
				.light {
					border-bottom: 1px solid #19ad17;
				}
			}
		}
	}
</style>
