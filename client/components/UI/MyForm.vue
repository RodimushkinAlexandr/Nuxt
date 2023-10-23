<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "search"): void;
  //Разное поведение формы, можно по клику производить search
  //можно в родительском компоненте привязать watch к value input и сразу делать search
}>();

const input = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit("update:modelValue", value);
  },
});
</script>

<template>
  <form class="myForm" @submit.prevent>
    <MyInputText v-model="input" />
    <MyButton @click="$emit('search')">
      <slot></slot>
    </MyButton>
  </form>
</template>

<style lang="scss">
.myForm {
  display: flex;
  align-items: center;
  gap: 5px;
  max-width: 500px;
  width: 100%;
}
</style>
