<template>
	<div>
		<div class="top_nav" v-if="crossover">
			<div class="nav_svg" @click="goBack">
				<svg fill="#fff"> 
					<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#back"></use>
				</svg>
			</div>
			<span class="nav_line">|</span>
			<div class="nav_text">{{crossover}}</div>
			<slot name='person'></slot>
			<slot name='camera'></slot>
			<slot name='addfriend'></slot>
			<slot name='searchpart'></slot>
		</div>
		<!-- 默认导航 -->
		<div class="nav_style" v-else>
			<div class="title">{{navTitle?navTitle:'微信'}}</div>
			<div class="icon">
				<router-link to='/search' class="searchlink" tag="div">
					<svg class="icon-search" fill="#fff">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#search"></use>
					</svg>
				</router-link>
				<div class="addlink" @click="clickAdd">
					<svg class="icon-search">
						<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#add"></use>
					</svg>
				</div>
			</div>
		</div>
		<!-- <mu-appbar>
		    <div class="title">{{navTitle?navTitle:'微信'}}</div>
		    <mu-button slot="right" flat>
		        <mu-icon color="#fff" value="search"></mu-icon>
		    </mu-button>
			<mu-button slot="right" flat  @click="clickAdd">
			    <mu-icon color="#fff" value="add"></mu-icon>
			</mu-button>
		</mu-appbar> -->
		<!-- 默认导航END -->
		<!-- +号点击展示 -->
		<div class="select_list" v-show="list">
			<div class="cover" @click="clickDel"></div>
			<div class="content">
				<ul>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff">
								<use xlink:href="#wxspeak">
									<svg viewBox="0 0 1024 1024" id="wxspeak" width="100%" height="100%">
										<path d="M512 190.464c-205.824 0-372.736 143.36-372.736 321.536 0 66.56 23.552 128 63.488 179.2l-63.488 141.312 162.816-56.32c59.392 34.816 132.096 56.32 209.92 56.32 205.824 0 372.736-143.36 372.736-321.536 0-176.128-166.912-320.512-372.736-320.512z" fill="#fff" p-id="14668"></path>
									</svg>
								</use>
							</svg>
						</section>
						<section class="selectext">
							发起群聊
						</section>
					</router-link>
					<router-link to='/friends/newfriend/addfriend' tag="li" class="selectpart_li" @click.native="liClick">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xlink:href="#addfriend">
									<svg viewBox="0 0 1024 1024" id="addfriend" width="100%" height="100%">
										<path d="M815.663044 781.930779c-44.225247-92.710518-362.246301-85.757153-241.070474-226.907916 39.671535-46.6249 81.499176-109.61042 81.499176-177.099511 0-121.955586-81.158415-221.082234-180.976818-221.082234-99.722212 0-181.076078 99.126648-181.076078 221.082234 0 67.490114 25.568329 112.74276 76.650751 175.924755C454.934307 678.199253 179.477674 687.307701 137.846508 776.006859c-12.341073 26.348088-14.499226 46.774303-14.304797 70.328765 0 3.038196-0.289596 6.170536 1.226944 8.667404 1.517563 2.451842 3.869121 3.968381 6.418176 3.968381l686.876889 0c2.449795 0 4.848425-1.517563 6.317892-3.968381 1.517563-2.496867 1.224898-5.582135 1.224898-8.667404C826.098721 819.986513 822.569338 796.378839 815.663044 781.930779z" p-id="70862"></path>
										<path d="M937.190889 491.418242l-91.044576 0 0-91.033319c0-12.592806-10.223852-22.772656-22.760376-22.772656-12.570293 0-22.760376 10.17985-22.760376 22.772656l0 91.033319-91.045599 0c-12.580526 0-22.772656 10.17985-22.772656 22.782889 0 12.536524 10.19213 22.762423 22.772656 22.762423l91.045599 0 0 91.044576c0 12.558014 10.190083 22.738887 22.760376 22.738887 12.536524 0 22.760376-10.17985 22.760376-22.738887l0-91.044576 91.044576 0c12.580526 0 22.760376-10.224876 22.760376-22.762423C959.952288 501.599116 949.771415 491.418242 937.190889 491.418242z" p-id="70863"></path>
									</svg>
								</use>
							</svg>
						</section>
						<section class="selectext">
							添加朋友
						</section>
					</router-link>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xlink:href="#onesweep">
									<svg viewBox="0 0 1024 1024" id="onesweep" width="100%" height="100%">
										<path d="M65.18307 216.824257c0 0-22.681582-149.579737 192.772468-153.814178C473.415728 58.775638 496.092193 245.039879 496.092193 245.039879l181.439352 0c0 0 42.517349 8.468882 41.104163 59.269895-1.417279 50.801013-35.438117 49.384757-35.438117 49.384757l-423.823751 0.010233c0 0-51.02614-1.417279-52.443419 57.847499-1.418302 59.269895 9.93528 148.144038-60.951187 148.168598-48.198745 0.020466-49.610908-57.863872-49.610908-57.863872L65.18307 216.824257 65.18307 216.824257zM65.18307 216.824257" p-id="83225"></path>
										<path d="M958.954053 802.390763c0 0 22.679535 149.584853-192.774515 153.814178-215.46019 4.235464-238.136655-182.028776-238.136655-182.028776L346.603531 774.176165c0 0-42.522466-8.468882-41.10314-59.269895 1.416256-50.797943 35.437094-49.39499 35.437094-49.39499l423.819658 0c0 0 51.024094 1.415232 52.448536-57.854663 1.418302-59.264778-9.936303-148.135852 60.951187-148.162458 48.189535-0.013303 49.611931 57.854663 49.611931 57.854663L958.954053 802.390763 958.954053 802.390763zM958.954053 802.390763" p-id="83226"></path>
									</svg>
								</use>
							</svg>
						</section>
						<section class="selectext">
							扫一扫
						</section>
					</router-link>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xlink:href="#receipt">
									<svg viewBox="0 0 1024 1024" id="receipt" width="100%" height="100%">
										<path d="M512.325632 64.024576c-247.600128 0-448.321536 200.722432-448.321536 448.32256 0 247.600128 200.722432 448.321536 448.321536 448.321536s448.321536-200.722432 448.321536-448.321536C960.647168 264.747008 759.92576 64.024576 512.325632 64.024576zM704.043008 472.11008l0 64.004096L576.03584 536.114176l0 64.003072 128.008192 0 0 64.004096L576.03584 664.121344l0 103.9872L448.026624 768.108544l0-103.9872L320.018432 664.121344l0-64.004096 128.008192 0 0-64.003072L320.019456 536.114176l0-64.004096 117.02784 0L320.02048 355.08224l58.514432-58.514432 133.496832 133.49888 133.497856-133.497856 58.514432 58.514432L587.017216 472.11008 704.043008 472.11008z" p-id="73488"></path>
									</svg>
								</use>
							</svg>
						</section>
						<section class="selectext">
							收付款
						</section>
					</router-link>
					<router-link to='' tag="li" class="selectpart_li">
						<section class="selectsvg">
							<svg fill="#fff"> 
								<use xlink:href="#help">
									<svg viewBox="0 0 1024 1024" id="help" width="100%" height="100%">
										<path d="M911.655306 176.355567 112.344694 176.355567c-26.438139 0-47.870264 21.430078-47.870264 47.869241l0 575.548338c0 26.437116 21.432125 47.871287 47.870264 47.871287l799.310611 0c26.438139 0 47.870264-21.434172 47.870264-47.871287l0-575.548338C959.52557 197.785645 938.093445 176.355567 911.655306 176.355567zM828.134077 347.707167 512.001023 573.518099l-316.136124-225.812979c-10.774391-7.695263-13.270235-22.669302-5.573949-33.444716l0.001023 0c7.696286-10.773368 22.669302-13.271258 33.443693-5.573949l288.265356 205.906603 288.263309-205.90251c10.774391-7.697309 25.747407-5.199419 33.443693 5.573949C841.404312 325.037864 838.909491 340.009857 828.134077 347.707167z" p-id="75418"></path>
									</svg>
								</use>
							</svg>
						</section>
						<section class="selectext">
							帮助与反馈
						</section>
					</router-link>
				</ul>
			</div>
		</div>
		<!-- +号点击展示END -->
		<!-- <router-view/> -->
</div>
	
</template>

<script>
	import {mapGetters} from 'vuex'
	
	export default {
		name: 'TopNav',
		props: ['crossover', 'user'],
		data() {
			return {
				list: false
			}
		},
		computed: {
			...mapGetters(['navTitle'])
		},
		methods: {
			clickAdd() {
				this.list = !this.list
			},
			clickDel() {
				this.list = !this.list
			},
			liClick() {
				setTimeout(() => {
					this.list = false
				},1000)
			},
			goBack() {
				// console.log(this.user)
				this.$route.path == '/friends/'+this.user+'/chatview' ? this.$router.push('/message') : window.history.go(-1)
			}
		}
	}
</script>

<style lang="scss">
	.nav_style {
		width: 100%;
		height: 44px;
		padding: 0 15px;
		background-color: #373b3e;
		display: flex;
		align-items: center;
		
		.title {
			flex: 1;
			font-size: 16px;
			color: #FFFFFF;
		}
		.icon {
			float: right;
			.searchlink, .addlink {
				display: inline-block;
				width: 20px;
				height: 20px;
				margin: 0 5px;
				
				svg {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	
	.top_nav {
		z-index: 9;
		position: fixed;
		top: 0;
		left: 0;
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
			flex: 1;
			font-size: 16px ;
			color: #fff;
		}
	}
	.select_list {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 188;
		left: 0;
		top: 0;
		
		.cover {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 200;
		}
		
		.content {
			z-index: 201;
			float: right;
			position: relative;
			top: 1.735rem;
			margin-top: .678rem;
			margin-right: .333rem;
			width: 8.5333333333rem;
			// height: 3rem;
			background: #373b3e;
			border-radius: .222rem;
			
			ul {
				width: 100%;
			}
		}
		.content:before {
			content: '';
			display: inline-block;
			width: 0;
			height: 0;
			border: .4444rem solid #373B3E;
			border-left-color: transparent;
			border-right-color: transparent;
			border-top: none;
			position: absolute;
			top: -0.3844rem;
			right: .5555rem;
			border-radius: .5rem;
		}
	}
	.selectpart_li {
		width: 100%;
		height: 1.96267rem;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid #2f3336;
		color: #fff;
		font-size: 0.64rem;
		
		.selectsvg {
			width: 0.96rem;
			height: 0.93867rem;
			margin: 0 0.7466666667rem;
			
			svg {
				width: 100%;
				height: 100%;
				z-index: 200;
			}
		}
	}
	.selectpart_li:last-child {
		border: none;
	}
</style>
