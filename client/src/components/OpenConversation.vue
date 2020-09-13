<template>
  <div class="d-flex flex-column flex-grow-1">
    <div class="flex-grow-1 overflow-auto">
      <div
        class="d-flex flex-column align-items-starts justify-content-end px-3"
      >
        <div
          v-for="(message, index) in _selectedConversation.messages"
          :key="index"
          class="my-1 d-flex flex-column"
          :class="{
            'align-self-end align-items-end': message.sender == _id,
            'align-items-start': message.sender != _id,
          }"
        >
          <div
            class="rounded px-2 py-1"
            :class="{
              'bg-primary text-white': message.sender == _id,
              border: message.sender != _id,
            }"
          >
            {{ message.text }}
          </div>
          <div
            class="text-muted small"
            :class="{ 'text-right': message.sender == _id }"
          >
            {{ message.sender == _id ? 'You' : getSenderName(message.sender) }}
          </div>
        </div>
      </div>
    </div>
    <b-form @submit="handleSubmit">
      <b-input-group>
        <b-form-textarea
          v-model="text"
          rows="2"
          placeholder="Enter something..."
          style="resize: none"
        />
        <b-input-group-append>
          <b-button type="submit" variant="primary" :disabled="!text"
            >Send</b-button
          >
        </b-input-group-append>
      </b-input-group>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: null,
      socket: true,
    };
  },

  methods: {
    handleSubmit(e) {
      e.preventDefault();
      const message = {
        recipients: this._selectedConversation.recipients,
        text: this.text,
      };
      this.$store.commit('sendMessage', message);
      this.socket.emit('send-message', message);
      this.text = '';
    },

    getSenderName(id) {
      const sender = this._contacts.find((contact) => contact.id === id);
      return sender ? sender.name : id;
    },
  },
};
</script>

<style></style>
