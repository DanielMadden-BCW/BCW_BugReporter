<template lang="">
  <div class="card row mx-5 my-3 p-3" @click="travel">
    <!-- <router-link :to="`/bug/${bug.id}`"> -->
    <h4 v-if="!bug.closed" style="color: red">
      OPEN
    </h4>
    <h4 v-if="bug.closed" style="color: green">
      CLOSED
    </h4>
    <h1>{{ bug.title }}</h1>
    <p>{{ bug.description }}</p>
    Updated on {{ date.toLocaleString('default', { month: 'short' }) }} {{ date.getDate() }} at {{ date.getHours() > 12 ? date.getHours() - 12 : date.getHours() }}:{{ date.getMinutes() }} {{ date.getHours() > 12 ? 'PM' : 'AM' }}
    <!-- </router-link> -->
  </div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
  props: { bug: { type: Object, required: true } },
  setup(props) {
    const router = useRouter()
    const travel = () => { router.push(`/bug/${props.bug.id}`) }
    const date = new Date(props.bug.updatedAt)
    return {
      travel,
      date
    }
  }
}
</script>
<style lang="">

</style>
