<script setup lang="ts">
interface Props {
  modelValue: string;
  placeholder?: string;
}
withDefaults(defineProps<Props>(), {
  placeholder: "Enter text",
});

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<template>
  <input
    type="text"
    :value="modelValue"
    :placeholder="placeholder"
    @input="
      $emit('update:modelValue', ($event.target as HTMLInputElement).value)
    "
  />
</template>
<style lang="scss" scoped>
input {
  background-color: rgba(51, 51, 51, 0.5);
  color: #d2d0cc;
  padding: 14px;
  width: 100%;
  border-radius: 8px;
  font-size: inherit;
  box-shadow: 0px 5px 30px 9px rgba(0, 0, 0, 0.64);

  &::placeholder {
    color: #d2d0cc;
  }
}
</style>
