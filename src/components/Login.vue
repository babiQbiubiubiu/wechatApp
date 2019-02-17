<template>
	<div class="login_box">
		<h2 class="login_title" @click="textClick">登录</h2>
			<mu-form ref="form" :model="validateForm" class="mu-demo-form">
				<mu-form-item label="微信号" prop="username" :rules="usernameRules">
					<mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
				</mu-form-item>
				<mu-form-item label="密码" prop="password" :rules="passwordRules">
					<mu-text-field
						type="password"
						v-model="validateForm.password"
						prop="password"
					></mu-text-field>
				</mu-form-item>
				<mu-form-item prop="isAgree" :rules="argeeRules">
					<mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
				</mu-form-item>
				<mu-form-item>
					<mu-button color="primary" @click="login">提交</mu-button>
					<mu-button @click="clear">重置</mu-button>
					<router-link to="/regis" class="regis">注册</router-link>
				</mu-form-item>
			</mu-form>
		<router-view />
	</div>
</template>

<script>
	import {mapActions} from 'vuex'
	
export default {
	name: 'Login',
	data() {
		return {
			usernameRules: [
				{ validate: val => !!val, message: '必须填写微信号' },
				{ validate: val => val.length >= 3, message: '用户名长度大于3' }
			],
			passwordRules: [
				{ validate: val => !!val, message: '必须填写密码' },
				{
					validate: val => val.length >= 3 && val.length <= 10,
					message: '密码长度大于3小于10'
				}
			],
			argeeRules: [{ validate: val => !!val, message: '必须同意用户协议' }],
			validateForm: {
				username: '',
				password: '',
				isAgree: false,
			},
			addFriends: []
		}
	},
	methods: {
		textClick() {
			console.log(this.addFriends)
		},
		login() {
			this.$imoption.user = this.validateForm.username     // '13880283427';
			this.$imoption.pwd =  this.validateForm.password      //    '123456';
			this.$imconn.open(this.$imoption);
		},
		//收到联系人订阅请求的处理方法，具体的type值所对应的值请参考xmpp协议规范
// 		handlePresence(e) {
// 			console.log(e)
// 		  //对方收到请求加为好友
// 		  if (e.type === 'subscribe') {
// 		  
// 			/*同意添加好友操作的实现方法*/
// 			this.$imconn.subscribed({
// 			  to: 'username',
// 			  message : '[resp:true]'
// 			});
// 			this.$imconn.subscribe({//需要反向添加对方好友
// 			  to: e.from,
// 			  message : '[resp:true]'
// 			});
// 		  }
// 		},
		clear() {
			this.$refs.form.clear();
			this.validateForm = {
				username: '',
				password: '',
				isAgree: false
			};
		}
	}
};
</script>

<style lang="scss" scoped>
.login_box {
	z-index: 99;
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	background: #eee;
	padding: 80px 15px;
}
.login_title {
	text-align: center;
	font-size: 24px;
	font-weight: 600;
}
.mu-demo-form {
	width: 100%;
	max-width: 460px;
}
.mu-form-item__focus,
.mu-checkbox-checked,
.mu-input__focus {
	color: #1aad16;
}
.mu-primary-color {
	color: #fff;
	background-color: #1aad16;
}
.regis {
	color: #1aad16;
}
</style>