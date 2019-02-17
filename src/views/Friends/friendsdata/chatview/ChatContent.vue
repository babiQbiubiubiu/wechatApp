<template>
	<div class="msg_content">
		<div class="msg" v-for="msg in msgList" :key="msg.time" :class="{self:msg.self}">
			<div class="header_img">
				<img :src="msg.self?`${baseUrl}${self.avatar}`:`${baseUrl}${friend.avatar}`" width="100%" height="100%">
			</div>
			<div class="mes_chat">{{msg.msg}}</div>
		</div>
		<div ref="bottom"></div>
	</div>
</template>

<script>
	import {mapState} from 'vuex'
	
	export default {
		name: 'ChatContent',
		computed: mapState({
			baseUrl: 'baseUrl',
            friend: 'currentUser',
            self: state => state.data.self,
            msgList: state => state.currentMsgList.list
		})
	}
</script>

<style lang="scss" scoped>
	.msg_content {
		margin-top: 5px;
		
		.msg {
			position: relative;
			width: 100%;
		    padding: 5px 15px;
		    box-sizing: border-box;
		    font-size: 0;
			
			
			.header_img {
				display: inline-block;
				width: 40px;
				height: 40px;
				border-radius: 4px;
				overflow: hidden;
				background: #fff;
			}
		}
	}
	
	.mes_chat {
		display: inline-block;
		vertical-align: top;
		margin-left: 15px;
		padding: 10px;
		border-radius: 4px;
		line-height: 20px;
		word-wrap: break-word;
		font-size: 14px;
		background: #fff;
		position: relative;
	}
	.mes_chat:before {
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		left: -10px;
		border: 10px solid #fff;
		border-left: none;
		border-top: 6px solid transparent;
		border-bottom: 6px solid transparent;
	}
	
	.msg.self {
		text-align: right;
		.header_img {
			float: right;
			margin-left: 15px;
		}
		.mes_chat {
			background: #9fe658;
			text-align: left;
		    color: #000;
		}
		.mes_chat:before {
			border: none;
		}
		.mes_chat:after {
			content: '';
			width: 0;
			height: 0;
			position: absolute;
			right: -10px;
			border: 10px solid #9fe658;
			border-right: none;
			border-top: 6px solid transparent;
			border-bottom: 6px solid transparent;
		}
	}
</style>
