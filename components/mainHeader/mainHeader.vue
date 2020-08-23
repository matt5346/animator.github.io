<template>
  <div class="header">
    <div class="container">
      <div class="header__inner">
        <nuxt-link tag="a" to="/">
          <img class="header__logo" src="~/assets/logo.png">
        </nuxt-link>
        <nav class="nav">
          <ul class="nav__inner">
            <nuxt-link tag="a" to="/create">
              <li class="nav__inner-item">
                Create
              </li>
            </nuxt-link>
            <nuxt-link tag="a" to="/">
              <li class="nav__inner-item">
                Home
              </li>
            </nuxt-link>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
/**
	 * Export
	 */
export default {
	name: 'mainHeader'
}
</script>

<style lang="scss">
	@import './style.scss';
</style>
