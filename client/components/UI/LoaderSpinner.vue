<script setup lang="ts">
interface Props {
  size?: string;
  color?: string;
}

const props = withDefaults(defineProps<Props>(), {
  color: "#9f9fa1",
  size: "50px",
});
</script>

<template>
  <div class="wrapper__spinner">
    <span class="loader"></span>
  </div>
</template>

<style lang="scss">
.wrapper__spinner {
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  width: v-bind(size);
  height: v-bind(size);
  border: 5px solid v-bind(color);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
