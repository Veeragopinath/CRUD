<template>
  <div>
    <add-user :title="' EDIT USER'" @submitForm="editUser(user)"></add-user>
  </div>
</template>

<script>
import addUser from '~/components/addUser.vue'
export default {
  components: { addUser },
  data() {
    return {}
  },
  methods: {
    editUser(user) {},
  },
}
</script>

<style scoped>
</style>