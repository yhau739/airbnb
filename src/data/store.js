import { reactive, readonly } from 'vue';

// Reactive Object
const state = reactive({
  isLoggedIn: false,
  sessionUserId: 999
});

export const store = state;
