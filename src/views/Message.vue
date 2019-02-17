<template>
	<div class="message">
		<div class="message_box">
			<div v-if="isAjax">请求中</div>
			<mu-list textline="two-line" v-else>
				<div v-for="(f,index) in msgFriendsList" :key="f._id" class="list-box"  v-if="messageList[index].list != ''">
					<v-touch @swipeleft="turnLeft(f._id)" @swiperight="turnRemove" @tap="itemClick(f)">
						<mu-list-item avatar class="item" :class="{remove:f._id===nowId}" button :ripple="false">
						  <mu-list-item-action class="bulid">
							<mu-avatar>
								<img :src="`${baseUrl}${f.avatar}`">
								<mu-badge class="message_ball" :content="f.unreadNum+''" color="red" circle v-show="f.unreadNum"></mu-badge>
							</mu-avatar>
						  </mu-list-item-action>
						  <mu-list-item-content>
							<mu-list-item-title>{{f.sdasd ? f.sdasd : f.name}}</mu-list-item-title>
							<mu-list-item-sub-title>{{f.lastMessaage.msg}}</mu-list-item-sub-title>
						  </mu-list-item-content>
						  <mu-list-item-action>
							<mu-list-item-title class="time">{{f.lastMessaage.time|getTime}}</mu-list-item-title>
							<mu-icon color="rgba(0, 0, 0, 0.54)" value="notifications_off"></mu-icon>
						  </mu-list-item-action>
						</mu-list-item>
					</v-touch>
					<div class="show-btn">
						<span @click="toppingClick(f._id)" class="topping" :class="messageList[index].toTop == true?'cancel':''">{{messageList[index].toTop == true? '取消':'置顶'}}</span>
						<span @click="deleteClick(f._id)">删除</span>
					</div>
				</div>
			</mu-list>
		</div>
		<router-view/>
	</div>
</template>

<script>
	import {mapActions, mapGetters, mapState} from 'vuex'
	import {timeDesc} from '../config/date'
	
	export default {
		name: 'Message',
		data() {
			return {
				nowId: null
			}
		},
		computed: {
			...mapState(['baseUrl', 'isAjax', 'messageList']),
			...mapGetters(['msgFriendsList']),
		},
		filters: {
			getTime(val) {
				return timeDesc(val)
			}
		},
		methods: {
			...mapActions(['chatview']),
			turnLeft(id) {
				this.nowId = id
				// console.log('左滑')
			},
			turnRemove() {
				this.nowId = null
				// console.log('移除')
			},
			itemClick(friend) {
				// console.log(friend)
				this.chatview(friend)
				this.turnRemove()
				this.$router.replace('/friends/'+friend._id+'/chatview')
			},
			deleteClick(id) {
				// console.log('删除')
				this.$store.commit('DELETD_MESSAGE', id)
			},
			toppingClick(userid) {
				this.$store.commit('TOPPING_MESSAGE', userid)
				this.turnRemove()
			}
		}
	}
</script>

<style lang="scss" scoped>
.message {
	position: fixed;
	left: 0;
	right: 0;
	top: 44px;
	bottom: 65px;
	background: #fff;
	overflow: auto;
	
	.message_box {
		width: 100%;
		height: 100%;
	}
}
.mu-list {
	padding: 0;
}
.bulid {
	position: relative;
	
	.mu-avatar {
		border-radius: .222rem;
		.message_ball {
			position: absolute;
			top: .15rem;
			right: .15rem;
		}
	}
}
.mu-item-action {
	.mu-item-title {
		margin-top: .333rem;
		font-size: .595rem;
		text-align: right;
	}
	.material-icons {
		font-size: .888rem;
	}
	.icon_list {
		margin-top: 36px;
	}
}
.mu-avatar {
	img {
		border-radius: 4px;
	}
}


.list-box {
	position: relative;
	
	.show-btn {
		position: absolute;
		top: 0;
		right: 0;
		
		span {
			display: inline-block;
			width: 2.111rem;
			height: 100%;
			line-height: 72px;
			color: #fff;
			text-align: center;
			font-size: .626rem;
		}
		span:nth-child(2) {
			background: red;
		}
		.topping {
			background: #007AFF;
		}
		.cancel {
			background: #000000;
			// background: rgba(7, 17, 27, 0.2);
		}
	}
}
.item {
	background: #fff;
	position: relative;
	transition: all .3s linear;
	z-index: 10;
	border-bottom: 1px solid #e0e0e0;
}
.item.remove {
	transform: translateX(-4.222rem);
}
</style>
