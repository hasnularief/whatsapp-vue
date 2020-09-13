<template>
  <div>
    <dashboard v-if="_id" />
    <login v-if="!_id" @onIdSubmit="setId" />
  </div>
</template>

<script>
import Dashboard from "./components/Dashboard.vue";
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    Dashboard,
    Login,
  },

  data() {
    return {};
  },

  methods: {
    setId(id) {
      this.$store.commit("setId", id);
    },
  },
};
</script>
