<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue';
import Category from './components/Category.vue';
import Card from './components/Card.vue';
import backend from './composables/fetcher';
import { Product } from './business/interface';

const {
  categories,
  leaderBoards,
  getAllProducts,
  getProductLeaderBoard
} = backend();

const products = ref(getAllProducts());
const selectedProduct = ref<Product | null>(null);
const selectedProductLeaderboard = ref<any[] | null>(null)

function showProduct(product: Product) {
  selectedProduct.value = product;
}

function closeProduct() {
  selectedProduct.value = null;
}

watch(selectedProduct, () => {
  console.log("watcher");
  
  if (selectedProduct.value) {
    selectedProductLeaderboard.value = getProductLeaderBoard(selectedProduct.value.id) || null;
  console.log(selectedProductLeaderboard.value)
    return;
  } 
  selectedProductLeaderboard.value = null;
})
</script>

<template>
<div class="category" @click="closeProduct">
  <Card v-for="(product, idx) in products" :key="idx" :product="product" @click.stop="showProduct(product)" />
</div>
<div class="info__leaderboard">
  
<Card v-if="selectedProduct" extended-info :product="selectedProduct" :leaderboard="selectedProductLeaderboard" @click="closeProduct" />
</div>
</template>

<style>
body::-webkit-scrollbar {
  width: 15px;
}
 
body::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}
 
body::-webkit-scrollbar-thumb {
  background-color: darkgrey;
  border-radius: 50px;
  width: 10px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  margin-left: auto;
}

.category {
  width: 90vw;
  margin-left: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
	flex-direction: row;
	flex-wrap: wrap;
}

</style>
