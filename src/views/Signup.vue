<template>
<div>
  <div id="app">
    <div id="nav">
      | <router-link to="/">Home</router-link> |
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
          <label class="input-group-text">First name</label>
        </div>
        <input type="text" v-model="userInfoRequest.firstName">
      </div>
    </div>
  </div>
  <div>
    <div class="d-inline-flex p-2">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Last name</label>
        </div>
        <input type="text" v-model="userInfoRequest.lastName">
      </div>
    </div>
  </div>
  <div>
    <div class="d-inline-flex p-2">
      <div class="input-group mb-3">
        <div class="input-group-prepend">
          <label class="input-group-text">Username</label>
        </div>
        <input type="text" v-model="userInfoRequest.username">
      </div>
    </div>
  </div>
  <div>
    <div>
      <div class="d-inline-flex p-2">
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <label class="input-group-text">Password</label>
          </div>
          <input type="password" v-model="userInfoRequest.password">
        </div>
      </div>
    </div>
  </div>
  <br>
  <div >
    <button v-on:click="addNewUser" type="button" class="btn btn-secondary">Sign Up</button>
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
      lastName: '',
      userAdditionalDiv: false,
      linkViewDiv: true
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
        this.moveToHomePage()
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
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

