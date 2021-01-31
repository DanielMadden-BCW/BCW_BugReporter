import { computed, reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  bugs: [],
  filteredBugs: computed(() => AppState.bugs),
  bug: {},
  bugNotes: []
})
