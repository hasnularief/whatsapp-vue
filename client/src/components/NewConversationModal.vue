<template>
  <b-form @submit="handleSubmit">
    <b-form-checkbox
      class="my-2"
      v-for="contact in _contacts"
      :key="contact.id"
      :id="contact.id"
      v-model="selected"
      :name="contact.id"
      :value="contact.id"
    >{{ contact.name}}</b-form-checkbox>
    <b-button type="submit" variant="primary">Create</b-button>
  </b-form>
</template>

<script>
export default {
  data() {
    return {
      selected: [],
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$store.commit("createConversation", this.selected);
      this.$emit("close");
    },
  },
};
</script>

<style>
</style>