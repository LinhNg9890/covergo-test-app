<template>
  <button class="btn border-none p-4 px-6 shadow-2xl hover:border-transparent rounded" :class="AddClass">
    {{Value}}
    <slot></slot>
  </button>
</template>

<script src="./ButtonBasic.js"></script>

<style></style>