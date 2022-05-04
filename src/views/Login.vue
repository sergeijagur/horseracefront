<template>
  <div>
    <div id="app">
      <div id="nav">
        | <router-link to="/">Home</router-link> |
        <div v-if="signOutDiv">
          <a href="#" v-on:click="signOut" style="float: right" class="badge badge-light">Sign Out</a></div>
        <div v-if="linkViewDiv">
          <router-link to="/log-in">Login</router-link> |
          <router-link to="/signup">Sign Up</router-link> |
        </div>
        </div>
      <router-view/>
    </div>
    <div v-if="userAdditionalDiv">
      <button v-on:click="moveToRelevantPage" type="button" class="btn btn-success btn-lg">Play the game</button>
      <br>
      <br>
    </div>
    <br>
    <div>
      <div class="d-inline-flex p-2">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text">Username</label>
          </div>
          <input type="text" v-model="username">
        </div>
      </div>
    </div>
    <div>
      <div class="d-inline-flex p-2">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text">Password</label>
          </div>
          <input type="password" v-model="password">
        </div>
      </div>
    </div>
    <br>
    <div v-if="displayLoginButton">
      <button v-on:click="loginRequest" type="button" class="btn btn-secondary">Log In</button>
    </div>
    <br>
    <div >
      <button v-on:click="signUpRequest" type="button" class="btn btn-secondary">Sign Up</button>
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
      signOutDiv: false,
      userAdditionalDiv: false,
      linkViewDiv: true
    }
  },
  methods: {
     loginRequest: function () {
      this.$http.get("/log-in", {
            params: {
              username: this.username,
              password: this.password
            }}
      ).then(response => {
        this.userId = response.data.id
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        sessionStorage.setItem('userId', response.data.id)
        alert("Welcome " + response.data.firstName + " " + response.data.lastName)
        this.moveToHomePage()
      }).catch(error =>
      {alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },
    signUpRequest: function () {
       this.$router.push({name: 'SignupRoute'})
    },
    moveToRelevantPage: function () {
      this.$router.push({name: 'GameRoute', });
    },
    moveToHomePage: function () {
       this.$router.push({name: 'HomeRoute'})
    },
    showUserView: function (userId) {
      userId = sessionStorage.getItem('userId')
      if (userId > 0) {
        this.userAdditionalDiv = true
        this.linkViewDiv = false
      }
    },
    signOut: function () {
      sessionStorage.clear()
      window.location.reload()
    }
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
