<template>
  <div class="list-group list-group-flush">
    <div v-for="contact in _contacts" :key="contact.id" class="list-group-item">{{ contact.name}}</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>