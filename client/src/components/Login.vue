<template>
  <div class="align-items-center d-flex container" style="height: 100vh;">
    <b-form @submit="handleSubmit" class="w-100">
      <b-form-group label="Enter Your ID">
        <b-form-input v-model="id" type="text" required />
      </b-form-group>
      <b-button type="submit" variant="primary" class="mr-2">Login</b-button>
      <b-button type="reset" variant="secondary" @click="createNewId">Create a New ID</b-button>
    </b-form>
  </div>
</template>

<script>
import { v4 as uuidV4 } from "uuid";

export default {
  data() {
    return {
      id: null,
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$emit("onIdSubmit", this.id);
    },
    createNewId() {
      this.$emit("onIdSubmit", uuidV4());
    },
  },
};
</script>

<style></style>
