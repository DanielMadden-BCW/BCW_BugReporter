<template>
  <div class="col">
    <form @submit.prevent="postBug">
      <input placeholder="Title"
             v-model="form.title"
             required
      /><br />
      <input placeholder="Description"
             v-model="form.description"
             required
      /><br />
      <button type="submit">
        Post Bug
      </button>
    </form><br />
    <button @click="filter('open')">
      Sort by open
    </button><br />
    <button @click="filter()">
      Sort by closed
    </button>
    <bug-component v-for="bug in bugs" :key="bug.id" :bug="bug"></bug-component>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { bugService } from '../services/BugService'
import { AppState } from '../AppState'
import BugComponent from '../components/BugComponent.vue'
import { useRouter } from 'vue-router'
// import { api } from '../services/AxiosService'
export default {
  components: { BugComponent },
  name: 'Home',
  setup() {
    const router = useRouter()
    onMounted(async() => {
      bugService.getBugs()
    })
    // const allBugs = computed(() => AppState.bugs)
    const bugs = computed(() => AppState.filteredBugs)
    const filter = (type) => {
      if (type === 'open') AppState.filteredBugs = computed(() => AppState.bugs.sort((a, b) => a.closed - b.closed))
      else AppState.filteredBugs = computed(() => AppState.bugs.sort((a, b) => b.closed - a.closed))
    }
    const form = reactive({
      title: '',
      description: ''
    })
    const postBug = async() => {
      const id = await bugService.createBug(form)
      router.push('/bug/' + id)
    }
    return {
      bugs,
      filter,
      form,
      postBug
    }
  }
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
</style>
