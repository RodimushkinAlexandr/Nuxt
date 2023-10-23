<script setup lang="ts">
import type { SvgoIconCloseRed } from "#build/components";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits<{
  (e: "update:show", value: boolean): void;
}>();

const hideDialog = () => {
  emit("update:show", false);
};
</script>

<template>
  <transition name="dialog">
    <div
      class="dialog"
      v-if="show"
      @click="hideDialog"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <div @click.stop class="dialog__list">
        <slot></slot>
        <SvgoIconCloseRed @click="hideDialog" class="top_close" />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.61);
  z-index: 100;
  display: flex;
  padding: 0px 10px;

  &__list {
    margin: auto;
    background-color: rgba(0, 0, 0, 0.85);
    border-radius: 15px;
    min-height: 70px;
    min-width: 300px;
    max-width: 700px;
    padding: 28px 0px;
    position: relative;

    .top_close {
      position: absolute;
      top: 9px;
      right: 11px;
      width: 20px;
      height: 20px;
      cursor: pointer;
      transition: all ease-in-out 0.3s;
      color: red;
    }
  }
}

@media (max-width: 768px) {
  .dialog {
    left: 0;
  }
}

.dialog-enter-from,
.dialog-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.25s ease;
}
</style>
