<script lang="ts" setup>
import {ref, onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router';
const router = useRouter();
const currentBG = ref()

onMounted(() => {
  if (router.currentRoute.value.meta.backgroundColor) {
    currentBG.value = router.currentRoute.value.meta.backgroundColor
  }
})
</script>

<template>
  <div :class="`text-center  bg-${currentBG} pa-5`">
    <h1>Subscribe to the newsletter now</h1>
    <p>Enter your email id below and get amazing newsletter every week</p>
    <div class="w-50 mx-auto my-5" >
      <VTextField hide-details="auto" label="email Address" placeholder="email@email.com" type="email" variant="solo" clearable></VTextField>
    </div>
  </div>
</template>