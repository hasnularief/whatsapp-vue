import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const PREFIX = 'WHATSAPP-VUE-';

const setStorage = (key, value) => {
  const prefixedKey = PREFIX + key;
  localStorage.setItem(prefixedKey, JSON.stringify(value));
};

const getStorage = (key, value) => {
  const prefixedKey = PREFIX + key;
  const jsonValue = localStorage.getItem(prefixedKey);
  if (jsonValue != null && jsonValue != 'undefined') {
    return JSON.parse(jsonValue);
  }

  return value;
};

const addMessageToConversation = (
  prevConversations,
  { recipients, text, sender }
) => {
  console.log('RECIPIENT', recipients);
  console.log('TEXT', text);
  console.log('SENDER', sender);
  let madeChange = false;
  const newMessage = { sender, text };
  const newConversations = prevConversations.map((conversation) => {
    if (arrayEquality(conversation.recipients, recipients)) {
      madeChange = true;
      return {
        ...conversation,
        messages: [...conversation.messages, newMessage],
      };
    }
    return conversation;
  });

  const conversations = madeChange
    ? newConversations
    : [...prevConversations, { recipients, messages: [newMessage] }];

  return conversations;
};

const store = new Vuex.Store({
  state: {
    contacts: null,
    id: null,
    conversations: null,
    selectedConversationIndex: null,
  },
  mutations: {
    setId(state, val) {
      state.id = val;
      setStorage('id', state.id);
    },
    addContact(state, val) {
      state.contacts.push(val);
      setStorage('contacts', state.contacts);
    },
    setContacts(state, val) {
      state.contacts = val;
      setStorage('contacts', state.contacts);
    },

    openConversation(state, index) {
      state.selectedConversationIndex = index;
    },

    createConversation(state, recipients) {
      state.conversations = [
        ...state.conversations,
        { recipients, messages: [] },
      ];
      setStorage('conversations', state.conversations);
    },

    sendMessage(state, { recipients, text }) {
      //socket.emit('send-message', { recipients, text });

      state.conversations = addMessageToConversation(state.conversations, {
        recipients,
        text,
        sender: state.id,
      });
      setStorage('conversations', state.conversations);
    },

    addMessageToConversation(state, val) {
      state.conversations = addMessageToConversation(state.conversations, val);
      setStorage('conversations', state.conversations);
    },
  },

  getters: {
    getContacts: (state) => {
      if (!state.contacts) state.contacts = getStorage('contacts', []);
      return state.contacts;
    },

    getConversations: (state) => {
      if (!state.conversations)
        state.conversations = getStorage('conversations', []);
      return state.conversations;
    },

    getId: (state) => {
      if (!state.id) state.id = getStorage('id', null);
      return state.id;
    },

    getSelectedConversation: (state) => {
      if (state.selectedConversationIndex == null) return null;
      return state.conversations[state.selectedConversationIndex];
    },
  },
});

export default store;

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;
  a.sort();
  b.sort();

  return a.every((element, index) => {
    return element === b[index];
  });
}
