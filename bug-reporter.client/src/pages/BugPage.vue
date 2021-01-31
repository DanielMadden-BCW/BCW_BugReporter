<template lang="">
  <div>
    <div id="bug">
      <h1 v-if="!bug.closed" style="color: red">
        OPEN
      </h1>
      <h1 v-if="bug.closed" style="color: green">
        CLOSED
      </h1>
      <button v-if="account.id === bug.creatorId && !bug.closed" @click="closeBug">
        Close Bug
      </button>
      <h1 :contenteditable="account.id === bug.creatorId && !bug.closed"
          @blur="updateTitle"
      >
        {{ bug.title }}
      </h1>
      <p :contenteditable="account.id === bug.creatorId && !bug.closed"
         @blur="updateDescription"
      >
        {{ bug.description }}
      </p>
    </div>

    <div id="notes" class="col">
      <form @submit.prevent="postNote">
        <input placeholder="Body"
               v-model="form.body"
               required
        /><br />
        <button type="submit">
          Post Bug
        </button>
      </form><br />
      <note-component v-for="note in notes" :key="note.id" :note="note"></note-component>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { noteService } from '../services/NoteService'
import { AppState } from '../AppState'
import { useRoute } from 'vue-router'
export default {
  setup() {
    const route = useRoute()
    const bug = computed(() => AppState.bug)
    const notes = computed(() => AppState.bugNotes)
    const account = computed(() => AppState.account)
    const form = reactive({
      body: '',
      bug: route.params.id
    })
    onMounted(() => {
      bugService.getBug(route.params.id)
      noteService.getNotes(route.params.id)
    })
    const postNote = async() => {
      await noteService.createNote(form)
    }
    const updateTitle = async(e) => {
      bugService.editBug({ title: e.target.innerText }, route.params.id)
    }
    const updateDescription = async(e) => {
      bugService.editBug({ description: e.target.innerText }, route.params.id)
    }
    const closeBug = async() => {
      if (window.confirm('Are you sure you\'d like to close the bug?')) {
        bugService.closeBug(route.params.id)
      }
    }
    return {
      bug,
      notes,
      form,
      postNote,
      account,
      updateTitle,
      updateDescription,
      closeBug
    }
  }
}
</script>
<style lang="">

</style>
