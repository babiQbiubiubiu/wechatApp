<template>
	<div class="new_friend">
		<TopNav crossover="新的朋友">
			<router-link to='/friends/newfriend/addfriend' class="add_link" slot="addfriend" tag="div">
				添加朋友
			</router-link>
		</TopNav>
		<div class="add_list" v-if="newFriend.length > 0">
			  <mu-divider inset></mu-divider>
			  <mu-list textline="two-line">
				<mu-list-item avatar button :ripple="false" v-for="(item, index) in newFriend" :key="index">
				  <mu-list-item-action>
					<mu-avatar color="yellow600">
					  <mu-icon value="insert_chart"></mu-icon>
					</mu-avatar>
				  </mu-list-item-action>
				  <mu-list-item-content>
					<mu-list-item-title>{{item.from}}</mu-list-item-title>
					<mu-list-item-sub-title>{{item.status ? item.status : '!'}}</mu-list-item-sub-title>
				  </mu-list-item-content>
				  <mu-list-item-action>
					<mu-button @click="handlePresence(item)" :disabled="item.chatroom">
					  {{item.chatroom == true ? '已添加' : '添加'}}
					</mu-button>
				  </mu-list-item-action>
				</mu-list-item>
			  </mu-list>
		</div>
		<router-view/>
	</div>
</template>

<script>
	import TopNav from '../../../components/TopNav.vue'
	import {mapState} from 'vuex'
	
	export default {
		name: 'AddFriend',
		computed: {
			...mapState(['newFriend'])
		},
		methods: {
			handlePresence(e) {
				//对方收到请求加为好友
				// console.log(e)
				if (e.type === 'subscribe') {
					/*同意添加好友操作的实现方法*/
					this.$imconn.subscribed({
					  to: e.from,
					  message : 'good'
					})
					this.$imconn.subscribe({//需要反向添加对方好友
					  to: e.to,
					  message : 'well'
					})
				e.chatroom = true
				}
			}
		},
		components: {
			TopNav
		}
	}
</script>

<style>
	.new_friend {
		/* z-index: 999; */
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
	}
	.add_link {
		text-align: right;
		flex: 0 0 80px;
		font-size: 14px;
		color: #FFFFFF;
	}
	.add_list {
		margin-top: 44px;
	}
</style>
