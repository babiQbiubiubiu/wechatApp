<template>
	<div class="search_box">
		<TopNav crossover=" ">
			<div slot="searchpart">
				<div class="searchpart" >
					<div class="searchpart_svg">
						<svg fill="#fff">
						    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
						</svg>
					</div>
					<div class="searchpart_input">
						<input type="text" :placeholder="reminder" v-model="str"/>
					</div>
				</div>
			</div>
		</TopNav>
		<div class="search_content">
			<div class="all_content">
				<h2 class="search_title">搜索指定内容</h2>
				<ul class="search_list">
					<li v-for="item in search" @click="changeClick(item)">{{item}}</li>
				</ul>
				<mu-list textline="two-line">
				  <div class="list" v-for="friend in searchFriends" :key="friend._id">
				    <router-link :to="`/friends/${friend._id}/chatview`">
				      <mu-list-item class="item" avatar button @click="openFriendView(friend)">
				        <mu-list-item-action>
				          <mu-avatar :size="40">
				            <img :src="`${baseUrl}${friend.avatar}`">
				          </mu-avatar>
				        </mu-list-item-action>
				        <mu-list-item-content>
				          <mu-list-item-title>{{friend.sdasd ? friend.sdasd : friend.name}}</mu-list-item-title>
				        </mu-list-item-content>
				      </mu-list-item>
				      <mu-divider inset></mu-divider>
				    </router-link>
				  </div>
				</mu-list>
			</div>
		</div>
	</div>
</template>

<script>
	import TopNav from './TopNav'
	import {mapState, mapActions} from 'vuex'
	
	export default {
		name: 'Search',
		data() {
			return {
				reminder: '搜索',
				str: ''
			}
		},
		computed: {
			...mapState({
				search: 'search',
				baseUrl: 'baseUrl',
				searchFriends(state) {
					if(!this.str.trim()) {
						return
					}
					return state.data.friends.filter(f => {
						let reg = new RegExp(this.str, 'img')
						return reg.test(f.name)
					})
				}
			})
		},
		methods: {
			...mapActions(['sendParToChar']),
			changeClick(item) {
				this.reminder = '搜索'+ item
			},
			openFriendView(friend) {
				this.sendParToChar(friend)
				this.$router.replace({path:"`/friends/${friend._id}/chatview`"})
			}
		},
		components: {TopNav}
	}
</script>

<style lang="scss" scoped>
	.search_box {
		background-color: #ebebeb;
		position: relative;
	}
	.searchpart {
		width: 100%;
		height: 28px;
		display: flex;
		border-bottom: 1px solid #45c01a;
		
		.searchpart_svg {
			flex: 0 0 18px;
			height: 100%;
			margin-right: 10px;
			
			svg {
				width: 100%;
				height: 100%;
			}
		}
		.searchpart_input {
			flex: 1;
			height: 100%;
			color: #666;
			
			input {
				width: 100%;
				height: 100%;
				border: none;
				color: #fff;
				background-color: #373b3e;
				font-size: 14px;
				outline: none;
			}
		}
	}
	.search_content {
		position: fixed;
		top: 44px;
		bottom: 60px;
		left: 0;
		right: 0;
		
		.all_content {
			width: 100%;
			height: 100%;
			background-color: #ebebeb;
			
			.search_title {
				padding: 20px 0;
				text-align: center;
				font-size: 18px;
				color: #b1b1b1;
			}
			.search_list {
				padding: 0 35px;
				
				li {
					width: 33.333%;
					margin-bottom: 50px;
					float: left;
					border-right: 1px solid #dadada;
					color: #45c01a;
					font-size: 14px;
					text-align: center;
				}
				li:nth-child(3n) {
					border: none;
				}
			}
		}
	}
</style>
