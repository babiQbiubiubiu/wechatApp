<template>
	<div class="login_box">
		<h2 class="title">注册</h2>
		<mu-form ref="form" :model="validateForm" class="mu-demo-form">
			<mu-form-item label="微信号" prop="username" :rules="usernameRules">
				<mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="用户昵称" prop="nickname" :rules="nicknameRules">
				<mu-text-field v-model="validateForm.nickname" prop="nickname"></mu-text-field>
			</mu-form-item>
			<mu-form-item label="密码" prop="password" :rules="passwordRules">
				<mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
			</mu-form-item>
			<mu-form-item prop="isAgree" :rules="argeeRules">
				<mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
			</mu-form-item>
			<mu-form-item>
				<mu-button color="primary" @click="regisClick">提交</mu-button>
				<mu-button @click="clear">重置</mu-button>
			</mu-form-item>
		</mu-form>
		<router-view />
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			$imregis: {
				username: '',
				nickname: '',
				password: ''
			},
			$regisconn: {},
			usernameRules: [
				{ validate: val => !!val, message: '必须填写微信号' },
				{ validate: val => val.length >= 3, message: '用户名长度大于3' }
			],
			nicknameRules: [
				{ validate: val => !!val, message: '必须填写用户昵称' },
				{ validate: val => val.length >= 3, message: '用户昵称长度大于3' }
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
				nickname: '',
				password: '',
				isAgree: false
			}
		};
	},
	methods: {
		regisClick() {
			let regis = { 
				username: this.validateForm.username,
				password: this.validateForm.password,
				nickname: this.validateForm.nickname,
				appKey: WebIM.config.appkey,
				success: function (re) {
					console.log('注册成功')
				},  
				error: function (err) { 
					console.log('注册失败,请重新注册')
				}, 
				apiUrl: WebIM.config.apiURL
			}
			this.$imconn.registerUser(regis)
			setTimeout(() => {
				this.$router.replace('/login')
			},2000)
		},
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
.title {
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
