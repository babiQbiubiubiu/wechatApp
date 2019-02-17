<template>
	<!--  ref="friendLoop" -->
	<div>
		<div v-if="isAjax">请求中</div>
		<div class="friends" ref="lists" v-else>
			<div class="scroll_box">
				<div class="friends_box">
					<div class="friends_top">
						<ul>
							<router-link tag="li" to="/friends/newfriend" class="find_like" ref="friendLoop">
								<div class="like_icon">
									<svg> 
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#newfriend"></use>
									</svg>
								</div>
								<div class="like_text">新的朋友</div>
							</router-link>
							<router-link tag="li" to="" class="find_like">
								<div class="like_icon">
									<svg>
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#groupchat"></use>
									</svg>
								</div>
								<div class="like_text">群聊</div>
							</router-link>
							<router-link tag="li" to="" class="find_like">
								<div class="like_icon">
									<svg>
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#label"></use>
									</svg>
								</div>
								<div class="like_text">标签</div>
							</router-link>
							<router-link tag="li" to="" class="find_like">
								<div class="like_icon">
									<svg>
										<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#accounts"></use>
									</svg>
								</div>
								<div class="like_text">公众号</div>
							</router-link>
						</ul>
					</div>
					
					<div class="hx_friendlist">
						<!-- <mu-paper :z-depth="1" class="demo-list-wrap"> -->
						  <mu-list>
							<mu-list-item avatar button :ripple="false" v-for="(item, index) in hxFriendsList" :key="index">
							  <mu-list-item-action>
								<mu-icon value="star" color="pink"></mu-icon>
							  </mu-list-item-action>
							  <mu-list-item-title>{{item.name}}</mu-list-item-title>
							</mu-list-item>
						  </mu-list>
						<!-- </mu-paper> -->
						
						<!-- <ul>
							<li v-for="(item, index) in hxFriendsList" :key="index">{{item.name}}</li>
						</ul> -->
					</div>
					
					<div class="friends_name">
						<ul class="friends_name_box">
							<li class="name_box" v-for="(key, index) in firstCord" :key="index" ref="friendarr">
								<h2 class="name_key">{{key}}</h2>
								<ul class="name_means">
									<router-link :to="`/friends/${i._id}`" tag="li" v-for="i in friends" :key="i._id" v-if="key === i.value" class="friend_id" @click.native="infoClick(i)">
										<div class="name_img">
											<img :src="`${baseUrl}${i.avatar}`">
										</div>
										<div class="name_txt">{{i.sdasd ? i.sdasd : i.name}}</div>
									</router-link>
								</ul>
							</li>
						</ul>
						<div class="all_friends">共有{{friends.length}}位联系人</div>
					</div>
				</div>
			</div>
			<div class="key_ee">
				<div class="key_box">
					<dl class="ee_count">
						<dd  v-for="(first,index) in firstCord" :key="index" @click="goElement(index)" :class="{active:index == currentIndex}">{{first}}</dd>
					</dl>
				</div>
			</div>
			<router-view :friendInfo='friendInfo'/>
		</div>
	</div>
</template>

<script>
	import {mapGetters, mapState, mapActions} from 'vuex'
	import BScroll from 'better-scroll'
	
	export default {
		name: 'Friends',
		data() {
			return {
				friendInfo: '',
				lists: null,
				currentIndex: 0,
				friendsHeightArr: [],
				hxFriendsList: []
			}
		},
		computed: {
			...mapGetters(['firstCord']),
			...mapState({
				baseUrl: 'baseUrl',
				eeMean: 'eeMean',
				friends: state => state.data.friends,
				isAjax: 'isAjax'
			})
		},
		created() {
			this.$nextTick(() => {
				this._initFriendsScroll()
				this._initListHeight()
				this.$imconn.getRoster({
				  success: ( roster ) => {
					for ( var i = 0, l = roster.length; i < l; i++ ) {
					  var ros = roster[i];    
					  //ros.subscription值为both/to为要显示的联系人，此处与APP需保持一致，才能保证两个客户端登录后的好友列表一致
					  if ( ros.subscription === 'both' || ros.subscription === 'to' ) {
						  this.hxFriendsList.push(ros)
						  // console.log(this.hxFriendsList)
					  }
					}
				  }
				})
			})
		},
		methods: {
			infoClick(all) {
				this.friendInfo = all
				console.log(this.friendInfo)
			},
			goElement(index){
				console.log(index)
				let currentEl = this.$refs.friendarr[index]
				this.friendsScroll.scrollToElement(currentEl,10)
			},
			_initListHeight() {
				let y = 0
				this.friendsHeightArr.push(y)
				// 生成不同好友偏移量范围数组
				for (let i = 0; i < this.$refs.friendarr.length; i++) {
					let li = this.$refs.friendarr[i]
					y += li.clientHeight
					this.friendsHeightArr.push(y)
				}
			},
			refreshCurrentIndex(y) {
				y = parseInt(-y)
				for (let i = 0; i < this.friendsHeightArr.length - 1; i++) {
					let nowHeight = this.friendsHeightArr[i]
					let nextHeight = this.friendsHeightArr[i+1]
					if (y >= nowHeight && y < nextHeight) {
						this.currentIndex = i
						break
					}
				}
			},
			_initFriendsScroll() {
				if (!this.friendsScroll) {
					this.friendsScroll = new BScroll(this.$refs.lists, {
						click: true, // 允许点击
						probeType: 3 // 滑动监听
					})
					// 添加滑动监听
					this.friendsScroll.on('scroll', ({y}) => {
					// this.scrollY = Math.abs(parseInt(y))
					this.refreshCurrentIndex(y)
					})
				} else {
				  this.friendsScroll.refresh() // 更新滚动组件
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.friends {
	position: fixed;
	left: 0;
	right: 0;
	top: 44px;
	bottom: 65px;
	background: #fff;
	overflow: auto;
	
	.friends_box {
// 		width: 100%;
// 		height: 100%;
		
		.friends_top {
			// width: 100%;
			padding: 0 20px;
		}
	}
}
.find_like {
	margin: 5px 0;
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	
	.like_icon {
		flex: 0 0 37px;
		margin-right: 8px;
		
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
// 	.like_text:last-child{
// 		border:0;
// 	}
}

.friends_name {
	// height: 400px;
	overflow: hidden;
	
	.friends_name_box {
		.name_box {
			width: 100%;
			
			.name_key {
				display: block;
				width: 100%;
				height: 25px;
				line-height: 25px;
				padding-left: 14px;
				background: #ebebeb;
				color: #8a8a8a;
				font-size: 14px;
			}
			.name_means {
				padding: 0 20px;
				background: #fff;
			}
		}
	}
	.all_friends {
		width: 100%;
		height: 40px;
		line-height: 40px;
		background: #ebebeb;
		text-align: center;
		color: #8a8a8a;
		font-size: 14px;
	}
}

.friend_id {
	margin: 5px 0;
	width: 100%;
	height: 50px;
	display: flex;
	align-items: center;
	
	.name_img {
		flex: 0 0 37px;
		height: 100%;
		position: relative;
		margin-right: 8px;
		
		img {
			width: 37px;
			height: 37px;
			position: absolute;
			top: 50%;
			transform: translateY(-50%);
		}
	}
	.name_txt {
		flex: 1;
		height: 100%;
		line-height: 50px;
		border-bottom: 1px solid #e0e0e0;
		font-size: 14px;
		font-weight: 500;
		color: #2a2a2a;
	}
}
.key_ee {
	position: fixed;
	top: 44px;
	bottom: 65px;
	right: 0;
	
	.key_box {
		position: relative;
		display: block;
		width: 30px;
		height: 100%;
		
		.ee_count {
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 18px;
			text-align: center;
			font-family: Arial,'Hiragino Sans GB',Microsoft Yahei,Helvetica Neue,Helvetica,sans-serif !important;
			
			dd {
				font-size: 12px;
			}
			.active {
				background: #07c359;
				color: #fff;
			}
		}
	}
}
</style>
