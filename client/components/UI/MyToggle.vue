<script setup lang="ts">
const props = defineProps<{
  isColumn: boolean;
}>();

const emit = defineEmits<{
  (e: "update:isColumn", value: boolean): void;
}>();

const toggle = () => {
  emit("update:isColumn", !props.isColumn);
};
</script>

<template>
  <div @click="toggle" :class="{ column: isColumn }" class="toggle">
    <SvgoIconDisplayList class="toggle__toggle" />
  </div>
</template>

<style scoped lang="scss">
.toggle {
  border: 1px solid #2c4464;
  flex: 0 0 auto;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: rotate(0deg);
  transition: all ease 0.3s;

  &.column {
    transform: rotate(90deg);
  }

  &__toggle {
    width: 80%;
    height: 80%;
    color: #2c4464;
    margin-bottom: 0;
  }
}
</style>
