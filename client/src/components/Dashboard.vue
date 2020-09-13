<template>
  <div class="d-flex" style="height: 100vh">
    <sidebar />
    <open-conversation v-if="_selectedConversation" />
  </div>
</template>

<script>
import Sidebar from './Sidebar.vue';
import OpenConversation from './OpenConversation.vue';

export default {
  components: {
    Sidebar,
    OpenConversation,
  },
  data() {
    return {
      socket: true,
    };
  },

  mounted() {
    this.socket.on('receive-message', (val) => {
      this.$store.commit('addMessageToConversation', val);
    });
  },

  beforeDestroy() {
    this.socket.off('receive-message');
  },
};
</script>

<style></style>
