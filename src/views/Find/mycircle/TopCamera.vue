<template>
	<!-- 发表朋友圈 -->
	<div class="camera">
		<div class="my_nav">
			<div class="my_svg" @click="showIf">
				<svg fill="#fff"> 
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
				</svg>
			</div>
			<span class="my_line">|</span>
			<div class="my_text">发表文字</div>
			<div class="my_publish" @click="pushStr">发表</div>
		</div>
		<div class="text_content">
			<textarea placeholder="这一刻的想法..." v-model="textStr"></textarea>
		</div>
		<ul class="icon_box">
			<li class="li_content">
				<div class="li_icon">
					<svg> 
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#local"></use>
					</svg>
				</div>
				<div class="">
					所在位置
				</div>
			</li>
			<li class="li_content">
				<div class="li_icon">
					<svg> 
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#ren"></use>
					</svg>
				</div>
				<div class="li_text">
					谁可以看
				</div>
			</li>
			<li class="li_content">
				<div class="li_icon">
					<svg> 
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#remind"></use>
					</svg>
				</div>
				<div class="li_text">
					提醒谁看
				</div>
			</li>
			<li class="li_content">
				<div class="li_icon">
					<svg> 
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#qqzone"></use>
					</svg>
				</div>
				<div class=""></div>
			</li>
		</ul>
	</div>
</template>

<script>
	import {mapState, mapActions} from 'vuex'
	import {timeDesc} from '../../../config/date'
	
	export default {
		name: 'TopCamera',
		props: ['myInfo'],
		data() {
			return {
				textStr: '',
				myPublish: []
			}
		},
		computed: {
			...mapState({
				circle: state => state.data.circle,
				self: state => state.data.self
			})
		},
		methods: {
			...mapActions(['sendNewCircle']),
			showIf() {
				this.$emit('change-show', this.changeShow)
			},
			pushStr() {
				if (!this.textStr) {
					return
				} else {
					this.sendNewCircle(
						{
							petname: this.self.petname,
							statements:this.textStr,
							avatar: this.self.avatar,
							time: timeDesc(new Date().getTime()),
							like: [],
							comment: [], 
							reviewhide: false,
							criticism: false,
							flag: true,
							suporthtml: '赞'
						}
					)
					// console.log(this.textStr)
					// console.log(this.circle)
					this.showIf()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.camera {
		z-index: 11;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #FFFFFF;
		overflow: auto;
		// opacity: .5;
		
		.my_nav {
			position: relative;
			padding: 0 15px;
			width: 100%;
			height: 44px;
			background-color: #373b3e;
			display: flex;
			align-items: center;
			
			.my_svg {
				flex: 0 0 26px;
				height: 100%;
				
				svg {
					width: 100%;
					height: 100%;
				}
			}
			.my_line {
				margin:0 14px;
				font-size: 22px;
				color: #2e3235;
			}
			.my_text {
				flex: 1;
				font-size: 16px ;
				color: #fff;
			}
			.my_publish {
				padding: 5px 8px;
				color: #18ae17;
				font-size: 16px;
			}
		}
	}
	.text_content {
		textarea {
			width: 100%;
			padding: 20px;
			height: 200px;
			outline: none;
			border: none;
		}
	}
	.icon_box {
		padding: 0 20px;
		
		.li_content {
			display: flex;
			align-items: center;
			width: 100%;
			height: 50px;
			
			.li_icon {
				flex: 0 0 24px;
				height: 100%;
				margin-right: 20px;
				
				svg {
					width: 100%;
					height: 100%;
				}
			}
			.li_text {
				flex: 1;
				height: 50px;
				line-height: 50px;
				font-size: 14px;
				color: #000;
			}
		}
		.li_content:nth-child(1), .li_content:nth-child(4) {
			border-top: 1px solid #e2e2e2;
		}
		.li_text {
			border-top: 1px solid #e2e2e2;
		}
	}
</style>
