<script lang="ts" setup>
import {ref,watch} from 'vue'
import axios from 'axios';
import type { blog } from '../../type';
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  slug: String,
})

let blogData = ref<blog>();

const blogDetail = async () => {
  await axios.get(`http://localhost:3000/blogs/?slug=${props.slug}`)
    .then(res => blogData.value = res.data[0])
}

console.log(route.query)

blogDetail()
</script>

<template>
  <div v-if="blogData">
    <h1>Blog Details  </h1>

    <div class="mx-auto w-50">
      <VImg  src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849822_960_720.jpg" alt="" />
    </div>

    <h1 class="text-center">{{ blogData.title }}</h1>
    <p>{{ blogData.content }}</p>

    <div v-for="tag in blogData.tags" class="mt-5 d-inline-block">
      <span class="tag">{{ tag }}</span>
    </div>
  </div>
</template>


<style scoped>
.tag {
  /* margin: 16px; */
  text-transform: uppercase;
  padding: 8px;
  margin-right: .625rem;
  font-weight: bold;
  background-color: #0741ff;
  color: rgb(255, 255, 255);
  border-radius: 6.4px;
}
</style>