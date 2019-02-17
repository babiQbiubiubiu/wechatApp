<template>
  <div class="data_view">
		<div class="data_box">
			<!-- 头部导航 -->
			<TopNav crossover="详细资料"></TopNav>
			<!-- 头部导航END -->
			<!-- 好友资料 -->
			<div class="friends_content">
				<div class="content_main">
					<div class="main_img"></div>
					<div class="main_txt">
						<h2>{{friendInfo.sdasd ? friendInfo.sdasd : friendInfo.name}}</h2>
						<span>微信号:{{friendInfo._id}}</span>
					</div>
				</div>
				<div class="content_tag">
					<router-link :to="`/friends/${$route.params.id}/remark`" tag="div">
						设置备注和标签
					</router-link>
				</div>
				<div class="content_info">
					<div class="area">
						<div class="area_left">地区</div>
						<div class="area_right">{{friendInfo.district}}</div>
					</div>
					<div class="album">
						<div class="album_txt">个人相册</div>
						<router-link :to="`/friends/${$route.params.id}/friendcircle`" tag="div" class="album_img">
							<img v-for="item in friendInfo.gallery" :src="item" width="100%" height="100%">
						</router-link>
					</div>
					<div class="more">
						<router-link :to="`/friends/${$route.params.id}/more`" class="more_text" tag="div">
							更多
						</router-link>
					</div>
				</div>
				<div class="send">
					<router-link :to="`/friends/${$route.params.id}/chatview`" @click.native="routerClick(friendInfo)" class="send_to" tag="div">
						发消息
					</router-link>
				</div>
			</div>
			<!-- 好友资料END -->
		</div>
		<router-view :user= "`${$route.params.id}`"/>
  </div>
</template>

<script>
	import TopNav from '../../../components/TopNav'
	import {mapActions, mapState} from 'vuex'
	export default {
		name: "FriendsData",
		props: ['friendInfo'],
		computed: mapState({
            friends: state => state.data.friends
        }),
		methods: {
			...mapActions(['chatview']),
			routerClick(id) {
				// console.log(id)
				this.chatview(id)
			}
		},
		components: {
			TopNav
		}
	}
</script>

<style lang="scss" scoped>
.data_view {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 200;
	background: #ddd;
		
	.data_box {
		width: 100%;
		height: 100%;
	}
}

.top_nav {
	padding: 0 15px;
	width: 100%;
	height: 44px;
	background-color: #373b3e;
	display: flex;
	align-items: center;
	
	.nav_svg {
		flex: 0 0 26px;
		height: 100%;
		
		svg {
			width: 100%;
			height: 100%;
		}
	}
	.nav_line {
		margin:0 14px;
		font-size: 22px;
		color: #2e3235;
	}
	.nav_text {
		font-size: 16px ;
		color: #fff;
	}
}

.friends_content {
	margin-top: 44px;
	
	.content_main {
		padding: 13px 15px;
		width: 100%;
		height: 97px;
		background: #fff;
		display: flex;
		align-items: center;
		
		.main_img {
			flex: 0 0 70px;
			height: 70px;
		}
		.main_txt {
			flex: 1;
			color: #000;
			
			h2 {
				font-size: 14px;
			}
			span {
				font-size: 12px;
			}
		}
	}
	.content_tag {
		margin: 22px 0;
		padding: 13px 15px;
		background: #fff;
		font-size: 14px;
		color: #000;
	}
	.content_info {
		padding: 13px 15px;
		background: #fff;
		color: #000;
		font-size: 14px;
		
		.area {
			display: flex;
			padding-bottom: 22px;
			
			.area_right {
				margin-left: 60px;
				color: #666;
			}
		}
		.album {
			display: flex;
			align-items: center;
			padding: 22px 0;
			border-top: 1px solid #e2e2e2;
			border-bottom: 1px solid #e2e2e2;
			
			.album_img {
				width: 100%;
				margin-left: 28px;
				height: 66px;
				padding: 8px 0;
				
				img {
					margin: 0 5px;
					width: 60px;
					height: 50px;
				}
			}
		}
		.more {
			padding-top: 22px;
			width: 100%;
		}
	}
	.send {
		padding: 22px 24px 0 24px;
		.send_to {
			width: 100%;
			height: 50px;
			line-height: 50px;
			display: block;
			border-radius: 5px;
			background: #1aad16;
			border: 1px solid #3e8d3e;
			font-size: 16px;
			text-align: center;
			color: #fff;
		}
	}
}
</style>
