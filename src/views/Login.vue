<template>
  <div>
    <input placeholder="username" v-model="username"><br>
    <input placeholder="password" v-model="password"><br>
    <br>
    <br>

    <div v-if="displayLoginButton">
      <button v-on:click="loginRequest" >Log In</button>
    </div>
    <br>
    <div >
      <button v-on:click="signUpRequest">Sign Up</button>
    </div>


  </div>

</template>

<script>
export default {
  name: "Login",

  data: function () {
    return {
      username: "",
      password: "",
      userId: 0,
      firstName: "",
      lastName: "",
      displayLoginButton: true,
      displaySignUpButton: true
    }
  },
  methods: {
    // loginRequest back endi vastu
     loginRequest: function () {
      this.$http.get("/log-in", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {

        this.userId = response.data.id
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        alert("Welcome " + response.data.firstName + " " + response.data.lastName)
        sessionStorage.setItem('userId', response.data.id)
        this.moveToRelevantPage()

      }).catch(error =>
      {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },

    signUpRequest: function () {
       this.$router.push({name: 'UserRoute'})
    },
    moveToRelevantPage: function () {

      this.$router.push({name: 'CustomerRoute', query: {firstName: this.firstName,
          lastName: this.lastName, userId: this.userId}});

      }
    },

}
</script>


<style scoped>

</style>