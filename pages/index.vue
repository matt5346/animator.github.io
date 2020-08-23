<template>
  <div class="main">
    <div class="container">
      <h1 class="section-title">
        Svg animation
      </h1>
      <div class="main-demo">
        <img class="main-demo__item" src="~/assets/first.svg" alt="">
        <img class="main-demo__item" src="~/assets/second.svg" alt="">
      </div>
      <div class="main-link-box">
        <router-link to="/create" tag="a" class="main-link --home">
          <span>Go create</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
	name: 'Home'
}
</script>
