import Vue from 'vue';
import io from 'socket.io-client';
Vue.mixin({
  computed: {
    _id() {
      return this.$store.getters.getId;
    },
    _conversations() {
      return this.$store.getters.getConversations;
    },
    _contacts() {
      return this.$store.getters.getContacts;
    },
    _selectedConversation() {
      return this.$store.getters.getSelectedConversation;
    },
  },

  mounted() {
    if (this._id && this.socket) {
      this.socket = io('http://localhost:5000', { query: { id: this._id } });
    }
  },

  destroyed() {
    if (this.socket) this.socket;
  },
});
