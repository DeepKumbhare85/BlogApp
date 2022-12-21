<script setup lang="ts">
import { ref } from "vue"
import { RouterLink, RouterView } from 'vue-router'
const isActive = ref<boolean>();
</script>

<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink> 
        <router-link :to="{name:'newsletter'}">Newsletter</router-link>   
      </nav>
    </div>
  </header>
  <v-container>
    <RouterView />
  </v-container>
</template>

<style scoped>
nav{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  
}
nav a{
  text-decoration: none;
  /* background-color:crimson; */
  color:black;
  padding:0.5rem;
  font-size: large;
  border-radius: 0.3rem;

}

nav a.router-link-exact-active{
  background-color:crimson;
  color:white;
}

</style>
