<template>
  <b-list-group flush>
    <b-list-group-item
      v-for="(conversation, index) in _conversations"
      href="#"
      :key="index"
      :active="selected == index"
      @click="openConversation(index)"
    >{{ conversation.recipients.map(r => r).join(", ")}}</b-list-group-item>
  </b-list-group>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
    };
  },

  methods: {
    openConversation(index) {
      this.selected = index;
      this.$store.commit("openConversation", index);
    },
  },
};
</script>

<style>
</style>