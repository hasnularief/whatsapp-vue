<template>
  <b-form @submit="handleSubmit">
    <b-form-group label="ID">
      <b-form-input v-model="id" type="text" required />
    </b-form-group>
    <b-form-group label="Name">
      <b-form-input v-model="name" type="text" required />
    </b-form-group>
    <b-button type="submit" variant="primary">Create</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      id: null,
      name: null,
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$store.commit("addContact", { id: this.id, name: this.name });
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>