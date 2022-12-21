<script setup lang="ts">
import axios from 'axios';
import { ref,computed,watch } from "vue";
import type { blog } from '../../type';
import {useRoute,useRouter} from 'vue-router'

const blogList = ref<blog[]>([]);
const totalArticle = ref();
const paginationLength = ref(4);
const blogsPerPage = ref(3);
const currentPage = ref(1);

const route = useRoute()
const router = useRouter();

const baseUrl = computed(()=>`http://localhost:3000/blogs/?_page=${currentPage.value}&_limit=${blogsPerPage.value}`);

const getBlogs = async () => {
  await axios.get(baseUrl.value)
    .then(res => {
      blogList.value = res.data;
      totalArticle.value = res.headers['x-total-count'];
    })
  paginationLength.value = Math.ceil(totalArticle.value / blogsPerPage.value)
  console.log(paginationLength.value);
}


if (Object.keys(route.query).length !== 0) {
  currentPage.value = Number(route.query._page);
  blogsPerPage.value = Number(route.query._limit);
}

watch([currentPage,blogsPerPage], () => {
  router.push({ query: {_page:currentPage.value,_limit:blogsPerPage.value} })
   getBlogs()
}, {immediate:true})
</script>

<template>
  <div v-for="blog in blogList" :key="blog.id" class="my-5">
    <v-card :title="blog.title" theme="dark" subtitle="Tech Blog" width="50%" class="mx-auto">
      <v-card-text>
        <v-row>
          <v-col cols="9">
            <p class="text-body-1 multiline-ellipsis">
              {{ blog.content }}
            </p>
            <div v-for="tag in blog.tags" class="mt-5 d-inline-block">
              <VBtn :to="{name:'taggedBlogs',params:{tag:tag}}" class="tag">{{ tag }}</VBtn>
            </div>
          </v-col>
          
          <v-col cols="3">
            <v-img src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_960_720.jpg"></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
          <v-btn :to="{ name: 'blogDetails', params: { slug: blog.slug } }" >Read Blog</v-btn>
      </v-card-actions>

    </v-card>
  </div>

  <div class="text-center">
    <VPagination v-model="currentPage" :length="paginationLength" />
  </div>
</template>

<style scoped>
.tag {
  cursor: pointer;
  text-transform: uppercase;
  padding: .5rem;
  margin-right: 10px;
  font-weight: bold;
  background-color: #FFC107;
  color: black;
  border-radius: .4rem;
}

.multiline-ellipsis {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}
</style>