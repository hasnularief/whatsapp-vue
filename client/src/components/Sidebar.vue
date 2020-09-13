<template>
  <div class="d-flex flex-column" style="width: 250px">
    <b-tabs class="flex-grow-1 border-right overflow-auto">
      <b-tab title="Conversations" active @click="activeKey = CONVERSATIONS_KEY">
        <conversations />
      </b-tab>
      <b-tab title="Contacts" @click="activeKey = CONTACTS_KEY">
        <contacts />
      </b-tab>
    </b-tabs>
    <div class="p-2 border-top border-right small">
      Your ID:
      <span class="text-muted">{{_id}}</span>
    </div>
    <b-button
      variant="primary"
      v-b-modal.modal-1
    >New {{conversationsOpen ? "Conversation" : "Contact"}}</b-button>
    <b-modal id="modal-1" hide-footer>
      <template v-slot:modal-title>New {{ conversationsOpen ? "Conversation" : "Contact"}}</template>
      <new-conversation-modal
        v-if="activeKey == CONVERSATIONS_KEY"
        @close="$bvModal.hide('modal-1')"
      />
      <new-contact-modal v-if="activeKey == CONTACTS_KEY" @close="$bvModal.hide('modal-1')" />
    </b-modal>
  </div>
</template>


<script>
import Contacts from "./Contacts.vue";
import Conversations from "./Conversations.vue";
import NewContactModal from "./NewContactModal.vue";
import NewConversationModal from "./NewConversationModal.vue";

export default {
  components: {
    Contacts,
    Conversations,
    NewConversationModal,
    NewContactModal,
  },
  data() {
    return {
      CONVERSATIONS_KEY: "conversations",
      CONTACTS_KEY: "contacts",
      activeKey: "conversations",
    };
  },

  computed: {
    conversationsOpen() {
      return this.activeKey === this.CONVERSATIONS_KEY;
    },
  },

  methods: {},
};
</script>

<style>
</style>