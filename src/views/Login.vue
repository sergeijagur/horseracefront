<template>
  <div>
    <div v-if="userAdditionalDiv">
      <button v-on:click="moveToRelevantPage" type="button" class="btn btn-primary btn-lg">Play the game</button>
    </div>
    <br>
    <br>

    <input placeholder="username" v-model="username">
    <br>
    <br>
    <input placeholder="password" type="password" v-model="password"><br>
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
      userId: sessionStorage.getItem('userId'),
      firstName: "",
      lastName: "",
      displayLoginButton: true,
      displaySignUpButton: true,
      userAdditionalDiv: false
    }
  },
  methods: {

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
        sessionStorage.setItem('userId', response.data.id)
        alert("Welcome " + response.data.firstName + " " + response.data.lastName)
        sessionStorage.setItem('userId', response.data.id)
        this.moveToRelevantPage()

      }).catch(error =>
      {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },

    signUpRequest: function () {
       this.$router.push({name: 'SignupRoute'})
    },
    moveToRelevantPage: function () {
      this.$router.push({name: 'GameRoute', });
    },

    showUserView: function (userId) {
      userId = sessionStorage.getItem('userId')
      if (userId > 0) {
        this.userAdditionalDiv = true
      }
    },

  },
  mounted() {
    this.showUserView()
  }

}


</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>