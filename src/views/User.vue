<template>
<div>
  <div>
  <input placeholder="First Name" v-model="userInfoRequest.firstName"><br>
  <input placeholder="Last Name" v-model="userInfoRequest.lastName"><br>
  <input placeholder="username" v-model="userInfoRequest.username"><br>
  <input placeholder="password" v-model="userInfoRequest.password"><br>
  </div>
  <br>
  <div >
    <button v-on:click="addNewUser">Sign Up</button>
  </div>

</div>
</template>

<script>
export default {
  name: "User",

  data: function() {
    return {
      userInfoRequest: {
    firstName: '',
    lastName: '',
    username: '',
    password: '',
     },
     userId: '',
      firstName: '',
      lastName: ''
    }
  },
  methods: {
    addNewUser: function () {
      this.$http.post("/user/new-user", this.userInfoRequest
      ).then(response => {
        alert("New user added")
        this.userId = response.data.id
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        sessionStorage.setItem('userId', response.data.id)
        this.moveToRelevantPage()
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },

    moveToRelevantPage: function () {
      this.$router.push({name: 'AdminRoute', query: {firstName: this.firstName,
          lastName: this.lastName, userId: this.userId}});
    },
    },

}
</script>

<style scoped>

</style>