<script setup lang="ts">
import { ErButton, ErPopconfirm } from 'toy-element';
</script>

<template>
  <er-popconfirm title="title">
    <template #default>
      <er-button>click me</er-button>
    </template>
    <template #reference>
      <er-button>reference</er-button>
    </template>
  </er-popconfirm>
</template>

<style scoped>
button {
  width: 200px;
  height: 200px;
}
</style>
