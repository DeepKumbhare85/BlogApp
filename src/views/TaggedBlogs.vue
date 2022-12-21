<script lang="ts" setup>
import { ref } from "vue"
import type {blog} from '../../type';
import axios from 'axios';
let props = defineProps(['tag']);
const blogList = ref<blog[]>([])
const fetch_data =async () => { 
  await axios.get(`http://localhost:3000/blogs?tags_like=${props.tag}`)
  .then(res=> blogList.value=res.data)
}
fetch_data()
</script>

<template>
  <div>
    <h1> Your Selected Tag is : {{ props.tag }}  </h1>

    <div v-for="blog in blogList" :key="blog.id" class="my-5">

      <v-card width="50%" class="mx-auto">
      <v-card-item>
        <v-card-title>
          {{ blog.title }}
        </v-card-title>
        <v-card-subtitle>Tech Blog</v-card-subtitle>
      </v-card-item>

      <v-card-text>
        <v-row>
          <v-col cols="8">
            <p class="text-body-1 multine-ellipsis">
              {{ blog.content }}
            </p>
            <div v-for="tag in blog.tags" class="mt-5 d-inline-block">
              <span class="tag">{{ tag }}</span>
            </div>
          </v-col>
          
          <v-col>
            <v-img src="https://cdn.pixabay.com/photo/2015/07/17/22/43/student-849825_960_720.jpg"></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <router-link :to="{ name: 'blogDetails', params: { slug: blog.slug } }" class="text-decoration-none">
          <v-btn  variant="outlined">Read Blog</v-btn>
        </router-link>
      </v-card-actions>

    </v-card>
    </div>

  </div>
</template>

<style scoped>
.multine-ellipsis {
  -webkit-box-orient: vertical;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
}

.tag {
  /* margin: 1rem; */
  text-transform: uppercase;
  padding: .5rem;
  margin-right: 10px;
  font-weight: bold;
  background-color: #FFC107;
  color: black;
  border-radius: .4rem;
}
</style>