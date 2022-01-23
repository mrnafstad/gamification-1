<template>
<div>
	<div v-if="extendedInfo" class="overlay"></div>
  <div class="card" :class="{'card-extended' : extendedInfo, 'with-leaderboard' : leaderboard}">
    <img :src="product.image" class="card-image">
    <div class="card-info">
			<span v-if="!extendedInfo">
			<h4 class="card-info__type">
				{{ titleCase(product.type) }}
			</h4>
			<h3 class="card-info__title">
				{{ titleCase(product.title) }}
			</h3>
			</span>
			<span v-else style="
				display: flex;
    	justify-content: space-between;
    	align-items: center;
			">
				<h2 class="card-info__title">
					{{ titleCase(product.title) }}
				</h2>
							<h3 class="card-info__type">
					{{ titleCase(product.type) }}
				</h3>
			</span>
    </div>
		<div v-if="extendedInfo" class="card-info__extended">
			<div>
				<h5>Description</h5>
				{{ product.description }}
			</div>
			<div>
				<h5>Supported platforms</h5>
				<div v-for="(platform, idx) in product.platforms" :key="idx">
					{{ platform }}
				</div>
			</div>
		</div>
		<div v-if="leaderboard">
			<h5 style="margin: auto">Leaderboard</h5>
			<span class="leaderboard-header">
				<span>User</span>
				<span>Score</span>
			</span>
			<div 
				v-for="entry in leaderboard.entries" 
				:key="entry.userId" 
				class="leaderboard" 
				:class="{
					'first-place' : entry.rank === 1, 
					'second-place' : entry.rank === 2, 
					'third-place' : entry.rank === 3,
					'users-entry' : isUsersEntry(entry)
				}">
				<div class="user">
					<img :src="entry.image">
					{{entry.userName}}
				</div>
				{{ entry.score }}
			</div>
		</div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Product } from "../business/interface";

const props = defineProps<{
	product: Product;
	extendedInfo?: boolean;
	leaderboard?: any;
}>()

function isUsersEntry(entry: any) {
	if (!props.leaderboard) return;
	const isUserEntry = props.leaderboard.myEntry.userId === entry.userId;
	return isUserEntry
}

function titleCase(str: string) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}
</script>

<style scoped lang="scss">

.overlay {
	height: 100vh;
	z-index: 10;
	width: 100vw;
	background-color: rgba(0,0,0, 0.25);
	position: fixed;
	top: 0;
	left: 0;
}
	.card-extended {
		position: fixed;
		top: 50vh;
		left: 50vw;
		transform: translateY(-50%) translateX(-50%);
		z-index: 100;
		height: 85vh;
		overflow-y: auto;
		&::-webkit-scrollbar {
			width: 10px;
		}
		
		&::-webkit-scrollbar-track {
			box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		}
		
		&::-webkit-scrollbar-thumb {
			background-color: darkgrey;
			border-radius: 50px;
			width: 10px;
		}
		width: 70vw !important;
		background-color: white;
		box-shadow: none !important;
  	border: 1.5px solid rgba(150, 150, 150, 1);
		&:active {
			opacity: 1 !important;
		}
		.card-image {
			width:50%;
			border-radius: 0;
		}
		.card-info__extended {
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					margin: 20px;
					div {
						text-align: left;
						max-width: 70%;
					}
		}
		&.with-leaderboard {
			.card-image {
				height: 50px;
				border-radius: 50%;
			}
			.card-info {
				span {

					display: flex;
				flex-direction: row;
				justify-content: space-between;
				}
			}

			.leaderboard {
				&.first-place {
					background-color:gold;
				}
				&.second-place {
					background-color: silver;
				}
				&.third-place {
					background-color:  #CD7F32;
				}
				&.users-entry {
					animation: anim;
					animation-duration: 1s;
					animation-iteration-count: infinite;
					animation-direction: alternate;
					animation-timing-function: linear;
					background-color: pink;
				}
				@keyframes anim {
					to {
						background-color: white;
					}
				}
				.user {
					display: flex;
					flex-direction: row;
					align-items: center;
					img {
						height: 30px;
					border-radius: 50%;
					margin-right: 10px;
				}
					}
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				padding: 5px;
				margin: 5px;
				border-radius: 4px;
				&-header {
									display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 0 15px 0 55px;
				border-bottom: 1px solid rgba(148, 148, 148, 0.5);
				}
			}
		}

	}
.card {
  border-radius: 5px;
  border: 1.5px solid rgba(148, 148, 148, 0.7);
  box-shadow: 3px 3px rgba(148, 148, 148, 0.7);
  cursor: pointer;
	transition: all 0.2s ease-in-out;
	margin: 5px;
	width: 230px;
	&-image {
		border-radius: 4px 4px 0 0 ;
		width: 100%;
		object-fit: contain;
	}
	&-info {
		padding: 10px;
		text-align: left;
		&__type {
			color: rgba(148, 148, 148, 0.5)
		}
	}
	&:hover {
		box-shadow: 3px 3px rgba(148, 148, 148, 1);
		border: 1.5px solid rgba(150, 150, 150, 1);
	}
	&:active {
		opacity: 0.6;
		border: 1.5px solid rgba(155, 155, 155, 1);
	}
}

</style>