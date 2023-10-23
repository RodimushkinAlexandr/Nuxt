<script setup lang="ts">
interface Props {
  background?: string;
  backgroundHover?: string;
  fontSize?: number;
  color?: string;
  hoverColor?: string;
  borderColor?: string;
  borderColorHover?: string;
}

const props = withDefaults(defineProps<Props>(), {
  background: "#2c4464",
  backgroundHover: "#2c4464",
  fontSize: 16,
  color: "aliceblue",
  hoverColor: "aliceblue",
  borderColor: "#2c4464",
  borderColorHover: "#2c4464",
});
</script>

<template>
  <button class="btn">
    <slot>Search</slot>
  </button>
</template>
<style lang="scss" scoped>
.btn {
  background-color: v-bind(background);
  font-size: v-bind(fontSize);
  color: v-bind(color);
  border: 1px solid v-bind(borderColor);
  padding: 14px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 3px;
  flex: 0 0 auto;
  box-shadow: 0px 5px 30px 9px rgba(0, 0, 0, 0.24);
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: v-bind(backgroundHover);
    color: v-bind(hoverColor);
    border-color: v-bind(borderColorHover);
  }
}
</style>
