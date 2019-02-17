<template>
	<div class="find">
		<div class="find_box">
			<div class="privacy_content privacy_top">
				<router-link tag="div" to="/find/circle" class="find_like">
					<div class="like_icon">
						<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#friendcircle"></use></svg>
					</div>
					<div class="like_text">朋友圈</div>
				</router-link>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg fill="#10aeff"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#onesweeptwo"></use></svg>
					</div>
					<div class="like_text">扫一扫</div>
				</router-link>
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shark"></use></svg>
					</div>
					<div class="like_text">摇一摇</div>
				</router-link>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#nearby"></use></svg>
					</div>
					<div class="like_text">附近的人</div>
				</router-link>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg fill="#10aeff"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shopping"></use></svg>
					</div>
					<div class="like_text">购物</div>
				</router-link>
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#games"></use></svg>
					</div>
					<div class="like_text">游戏</div>
				</router-link>
			</div>
			<div class="privacy_content">
				<router-link tag="div" to="" class="find_like">
					<div class="like_icon">
						<svg fill="#7586db"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#small"></use></svg>
					</div>
					<div class="like_text">小程序</div>
				</router-link>
			</div>
		</div>
			<router-view/>
		</div>
</template>

<script>
	export default {
		name: 'Find'
	}
</script>

<style lang="scss" scoped>
.find {
	position: fixed;
	left: 0;
	right: 0;
	top: 44px;
	bottom: 65px;
	background: #ebebeb;
	
	.find_box {
		width: 100%;
		height: 100%;
		overflow: auto;
	}
}
.privacy_content {
	margin-top: 25px;
	padding: 0 20px;
	background: #fff;
	margin-bottom: 25px;
	
	.find_like {
		margin: 5px 0;
		width: 100%;
		height: 50px;
		display: flex;
		align-items: center;
		
		.like_icon {
			flex: 0 0 33px;
			height: 100%;
			margin-right: 14px;
			
			svg {
				width: 100%;
				height: 100%;
				display: block;
				border-radius: 3px;
			}
		}
		.like_text {
			flex: 1;
			height: 100%;
			line-height: 50px;
			border-bottom: 1px solid #e0e0e0;
			font-size: 14px;
			font-weight: 500;
		}
// 		.like_text:last-child {
// 			border: none;
// 		}
	}
}
</style>
