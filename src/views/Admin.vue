<template>
  <div>
    <h1>Siia tuleb admin lehekülg</h1>
    <h3>Eesnimi </h3> <span>{{firstName}}</span>
    <h3>Perekonna nimi </h3> <span>{{lastName}}</span>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data: function () {
    return {
      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName
    }
  },
}
</script>

<style scoped>

</style>