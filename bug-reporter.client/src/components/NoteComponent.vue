<template lang="">
  <div class="card row mx-5 my-3 p-3">
    <p>{{ note.creatorEmail }}</p>
    <p :contenteditable="note.creatorId === accountId" @blur="editNote">
      {{ note.body }}
    </p>
    <button v-if="note.creatorId === accountId || note.bug.creatorId === accountId" @click="deleteNote">
      Delete
    </button>
  </div>
</template>
<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { noteService } from '../services/NoteService'
export default {
  props: { note: { type: Object, required: true } },
  setup(props) {
    const accountId = computed(() => AppState.account.id)
    const deleteNote = async() => {
      if (window.confirm('Are you sure?')) {
        noteService.deleteNote(props.note)
      }
    }
    const editNote = async(e) => {
      noteService.editNote({ body: e.target.innerText }, props.note)
    }
    return {
      accountId,
      deleteNote,
      editNote
    }
  }
}
</script>
<style lang="">

</style>
