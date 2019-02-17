<template>
	<div class="my_circle">
		<TopNav crossover="朋友圈">
			<div class="camera" slot="camera" @click="showMyself">
				<svg fill="#fff" class="icon-camera">
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#camera"></use>
				</svg>	
			</div>
		</TopNav>
		<div class="circle_box">
			<div class="my_info" ref="myView">
				<div class="my_background">轻触更换图片</div>
			</div>
			<div class="header_box">
				<div class="header_img">
					<img :src="`${baseUrl}${self.avatar}`" width="100%" height="100%">
				</div>
			</div>
			<div class="friend_info">
				<ul>
					<li v-for="item in circle" class="friends_data" :key="item._id">
						<div class="friends_img">
							<img :src="`${baseUrl}${item.avatar}`" width="42px" height="42px">
						</div>
						<div class="friends_txt">
							<h2 class="txt_name">{{item.petname}}</h2>
							<p class="txt_content">{{item.statements}}</p>
							<div class="txt_time">
								<span>{{item.time}}</span>
								<svg class="button_svg"  @click="likeClick(item)">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#comment"></use>
								</svg>
								<div class="btn_good" v-if="item.criticism" :class="{show_like: item.reviewshow, hide_like: item.reviewhide}">
									<div class="like" @click="loveClick(item)">
										<svg fill="#fff" :class="{love: lovesvg}">
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#like"></use>
										</svg>
										<span>{{item.suporthtml}}</span>
									</div>
									<div class="comment" @click="commentThing(item)">
										<svg fill="#fff">
											<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#discuss"></use>
										</svg>
										<span>评论</span>
									</div>
								</div>
							</div>
							<div class="message_box" v-show="item.like.length > 0 || item.comment.length > 0">
								<svg class="retext_trigon" fill="#efefef">
									<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#trigon"></use>
								</svg>
								<div class="message_like" v-show="item.like.length > 0" :class="{like_text: item.comment.length>0}">
									<svg class="retext_like_svg" fill="#8792b0">
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#like"></use>
									</svg>
									<span class="retext_like_span" v-for="(value,i) in item.like" :key="i">{{value}} <i>,</i> </span>
								</div>
								<div class="message_text" v-show="item.comment.length > 0">
									<ul>
										<li v-for="i in item.comment" :key="i._id" class="comment_text">
											<span>{{i.remarks ? i.remarks : i.petname}}:</span>
											{{i.commentext}}
										</li>
									</ul>
								</div>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="input_box" v-if="inputBeing">
			<input class="input_txt" placeholder="评论" v-model="inputText" @input="contentBeing"></input>
			<svg class="svg_smile"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#face"></use></svg>
			<span class="send_btn" :class="{change_btn: sendBeing}" @click="sendClick">发送</span>
		</div>
		<TopCamera v-if="myInfo" :myInfo="myInfo" @change-show="changeShow"></TopCamera>
	</div>
</template>

<script>
	import TopNav from '../../../components/TopNav'
	import BScroll from 'better-scroll'
	import {mapState} from 'vuex'
	import TopCamera from './TopCamera'
	
	export default {
		name: 'MyCircle',
		data() {
			return {
				myViewScroll: null, // Bscroll滚动
				lovesvg: false, // 点赞svg放大
				timer:null, // 定时器
				timers:null, // 点赞定时器
				inputText: '', // 评论输入内容
				inputBeing: false, // 点击评论展示
				sendBeing: false, // 评论发送按钮
				commentObj: {}, //评论内容
				showBeing: false, // 点赞评论显示
				myInfo: false, // 发表自己的朋友圈
			}
		},
		computed:{
			...mapState({
				baseUrl: 'baseUrl',
				circle: state => state.data.circle,
				self: state => state.data.self
			})
		},
		created() {
			this.$nextTick(() => {
				this._initMyViewScroll()
			})
		},
		methods: {
			_initMyViewScroll() {
				if (!this.myViewScroll) {
					this.myViewScroll = new BScroll(this.$refs.myView, {
						click: true
					})
				} else {
					this.myViewScroll.refresh()
				}
			},
			likeClick(item) {
				if(item.flag){
					this.commentShow(item)
				}else{
					this.commentHide(item)
				}
			},
			loveClick(item) {
				this.likediv=true
				clearTimeout(this.timers)
				this.timers=setTimeout(()=>{
					this.likediv=false
				},200)
				this.commentHide(item)
				if(item.suporthtml == "赞"){
					item.suporthtml="取消"
					item.like.push(this.self.petname)
					console.log(this.self)
				}else{
					item.suporthtml="赞"
					item.like.pop(this.self.petname)
				}
			},
			commentShow(item) {
				this.showBeing = true
				item.criticism=true
				item.reviewshow=true
				item.reviewhide=false
				item.flag=false
			},
			commentHide(item) {
				this.showBeing = false
				item.reviewshow=false
				item.reviewhide=true
				this.timer=setTimeout(() => {
					clearTimeout(this.timer)
					item.criticism=false
				},1000)
				item.flag=true
			},
// 			inputHide() {
// 				let b = (JSON.stringify(this.commentObj) == '{}')
// 				console.log(b)
// 			},
			contentBeing() {
				this.inputText ? this.sendBeing = true : this.sendBeing = false
			},
			commentThing(item) { // 评论
				this.inputBeing = true
				this.commentObj = item
				// console.log(this.commentObj.comment)
			},
			sendClick() {
				if (this.sendBeing) {
					if (this.inputText) {
						this.commentObj.comment.push({
							petname: this.self.petname,
							commentext: this.inputText
						})
					}
				}
				this.inputText = ''
				this.inputBeing = false
				this.sendBeing = false
			},
			showMyself() {
				this.myInfo = true
			},
			changeShow() { // 反向传值
				this.myInfo = false
			}
		},
		components: {
			TopNav,
			TopCamera
		}
	}
</script>

<style lang="scss" scoped>
	.my_circle {
		z-index: 200;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		width: 100%;
		height: 100%;
		background: #fff;
		overflow: auto;
		// opacity: .5;
	}
	.camera {
		flex: 0 0 22px;
		height: 100%;
		.icon-camera {
			width: 100%;
			height: 100%;
		}
	}
	.circle_box {
		margin-top: 44px;
		
		.my_info {
			position:relative;
			width: 100%;
			height: 180px;
			overflow: hidden;
			
			.my_background {
				z-index: 1;
				width: 100%;
				height: 200px;
				line-height: 200px;
				background: #000;
				opacity: .6;
				color: #fff;
				text-align: center;
			}
		}
		.header_box {
			width: 100%;
			height: 40px;
			position: relative;
			.header_img {
				z-index: 9;
				position: absolute;
				right: 20px;
				bottom: 10px;
				width: 80px;
				height: 80px;
				background: #fff;
				overflow: hidden;
				box-sizing: border-box;
				border: 1px solid #e2e2e2;
			}
		}
		
		
	}
	.friends_data {
		padding: 12px 20px;
		display: flex;
		width: 100%;
		border-bottom: 1px solid #e2e2e2;
		
		.friends_img {
			flex:  0 0 42px;
			margin-right: 8px;
			height: 100%;
		}
		.friends_txt {
			flex: 1;
			
			.txt_name {
				font-size: 16px;
				color: #8792b0;
				padding-top: 1px;
			}
			.txt_content {
				margin-top: 2px;
				font-size: 14px;
				color: #333;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 6;
				word-break: break-all;
			}
			.txt_time {
				position: relative;
				padding-top: 12px;
				display: flex;
				justify-content: space-between;
				
				span {
					color: #666;
					font-size: 12px;
				}
				
				svg {
					width: 22px;
					height: 15px;
				}
				.btn_good {
					position: absolute;
					width: 193px;
					height: 40px;
					background: #373b3e;
					box-sizing: border-box;
					border-radius: 4px;
					display: flex;
					align-items: center;
					right: 30px;
					top: 1px;
					animation: flipInX 1s 1 ease-in-out both;
					
					.like, .comment {
						position: relative;
						width: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						
						svg {
							width: 16px;
							height: 16px;
							margin-right: 5px;
						}
						span {
							font-size: 14px;
							color: #fff;
						}
					}
					.like {
						border-right: 2px solid #2f3336;
						.love {
							animation: pulse 0.5s;
						}
					}
				}
				.hide {
					display: none;
				}
				.btn_good:after {
					content: '';
					border: 8px solid #373b3e;
					width: 0;
					height: 0;
					border-right: none;
					border-top: 8px solid transparent;
					border-bottom: 8px solid transparent;
					position: absolute;
					right: -7px;
					
				}
				.show_like {
					animation: flipInX 1s 1 ease-in-out both;
				}
				.hide_like {
					animation: flipOutX 1s 1 ease-in-out both;
				}
			}
		}
	}
	.message_box  {
		margin-top: 3px;
		
		.retext_trigon {
			width: 20px;
			height: 10px;
			margin-left: 10px;
			display: block;
		}
		.message_like {
			padding: 8px;
			background: #efefef;
			
			.retext_like_svg {
				width: 12px;
				height: 12px;
				margin-right: 5px;
			}
			.retext_like_span {
				color: #8792b0;
				font-size: 12px;
			}
			.retext_like_span:last-child {
				i {
					display: none;
				}
			}
		}
	}
	.like_text {
		border-bottom: 1px solid #e2e2e2;
	}
	
	.message_text {
		background: #efefef;
		
		ul {
			padding: 8px;
			
			.comment_text {
				border: none;
				color: #333;
				font-size: 13px;
				padding-bottom: 3px;
				
				span {
					color: #8792b0;
				}
			}
		}
	}
	.input_box {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background: #ebebeb;
		padding: 10px 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.input_txt {
			flex: 1;
			border: none;
			height: 35px;
			background: #ebebeb;
			border-bottom: 2px solid #18ae17;
			font-size: 16px;
			color: #333;
			outline: none;
			padding-left: 5px;
		}
		.svg_smile {
			width: 35px;
			height: 35px;
			margin: 0 5px;
		}
		.send_btn {
			padding: 0 8px;
			line-height: 35px;
			color: #d2d2d2;
			border-color: 1px solid #d7d7d7;
			border-radius: 4px;
			font-size: 14px;
		}
		.change_btn {
			background: #18ae17;
			color: #fff;
			border-color: 1px solid #3e8d3e;
		}
	}
</style>
