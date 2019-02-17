import Vue from 'vue'
import Router from 'vue-router'
import Message from '../views/Message' // 路由微信消息数据
import FriendsData from '../views/Friends/friendsdata/FriendsData' // 通讯录好友个人数据
import NewFriend from '../views/Friends/friendsdata/NewFriend' // 通讯录新的朋友
import AddFriend from '../views/Friends/friendsdata/addfriend/AddFriend' // 新的朋友添加朋友
import More from '../views/Friends/friendsdata/more/More' // 通讯录好友的更多信息
import ChatView from '../views/Friends/friendsdata/chatview/ChatView' //聊天视图
import Remark from '../views/Friends/friendsdata/remark/Remark' // 通讯录好友的朋友圈
import FriendCircle from '../views/Friends/friendsdata/friendcircle/FriendCircle' // 通讯录好友的朋友圈
import MyCircle from '../views/Find/mycircle/MyCircle'  // 自己的朋友圈

Vue.use(Router)

export default new Router({
  routes: [
    {
		path: '/message',
		name: 'message',
		component: Message
    },
    {
		path: '/friends',
		name: 'friends',
		component: () => import('../views/Friends/Friends.vue'),
		children: [{
			path: 'newfriend',
			component: NewFriend,
			children: [{
				path: 'addfriend',
				component: AddFriend
			}]
		},{
			path: '/friends/:id',
			component: FriendsData,
			children:[
				{
					path:'/friends/:id/more',
					component: More
				},
				{
					path: '/friends/:id/remark',
					component: Remark
				},
				{
					path: '/friends/:id/friendcircle',
					component: FriendCircle
				},
				{
					path: '/friends/:id/chatview',
					component: ChatView
				}
			]
		}]
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('../views/Find/Find.vue'),
			children: [{
				path: 'circle',
				component: MyCircle
			}]
			
    },
    {
      path: '/myself',
      name: 'myself',
      component: () => import('../views/Myself/Myself.vue')
    },
		{
			path: '/login',
			name: 'login',
			component: () => import('../components/Login.vue')
		},
		{
		  path: '/regis',
		  name: 'regis',
		  component: () => import('../components/Regis.vue')
		},
		{
		  path: '/search',
		  name: 'search',
		  component: () => import('../components/Search.vue')
		}
  ]
})
