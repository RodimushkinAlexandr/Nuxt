<script></script>
<template>
  <div class="index__wrapper">
    <h1 class="index__title">Hello World</h1>
    <NuxtLink to="/Movies" id="routerLink">Let's go look for movies</NuxtLink>
  </div>
</template>

<style lang="scss">
.index__wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 100vh;
}
.index__title {
  font-size: 40px;
  color: #2c4464;
}
</style>
