<template>
  <div>
    <div id="app">
      <div id="nav">
        | <router-link to="/">Home</router-link> |
        <div v-if="signOutDiv">
          <a href="#" v-on:click="signOut" style="float: right" class="badge badge-light">Sign Out</a></div>
        <div v-if="linkViewDiv">
          | <router-link to="/log-in">Login</router-link> |
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
    <div v-if="mainViewDiv">
      <h1>Welcome to Horse Racing Online Game</h1>
    </div>
    <div>
    <img src="https://t4.ftcdn.net/jpg/00/79/71/07/360_F_79710743_BoORxIHT4mNHhmeldg8mk1JtlklRFteH.jpg" alt="">
    </div>
    <div v-if="mainViewDiv">
    <button v-on:click="getRaceResults" type="button" class="btn btn-info btn-lg m-3">Show all race results</button>
    <button v-on:click="getAllHorsesList" type="button" class="btn btn-info btn-lg m-3">Show all horses</button>
    <div v-if="loginButtonsDiv">
      <button v-on:click="moveToLoginPage" type="button" class="btn btn-secondary btn-lg m-3">Login</button>
      <button v-on:click="moveToSignUpPage" type="button" class="btn btn-secondary btn-lg m-3">Sign Up</button>
    </div>
      <div v-if="userButtonDiv">
        <button v-on:click="getUserRaceResults" type="button" class="btn btn-warning btn-lg m-3">Show your race results</button>
        <button v-on:click="getUserHorsesList" type="button" class="btn btn-warning btn-lg m-3">Show your horses</button>
      </div>
    </div>
    <div v-if="horseTableDiv">
      <button v-on:click="toMainView" type="button" class="btn btn-light">Back</button>
      <br>
      <br>
      <table class="table table-hover" style="width: auto" align="center">
        <thead>
        <tr >
          <th scope="col">Horse name</th>
          <th scope="col">Horse color</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="horse in horseList" >
          <td>{{ horse.name }}</td>
          <td>{{ horse.color}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="allRaceResultDiv" >
      <button v-on:click="toMainView" type="button" class="btn btn-light">Back</button>
      <br>
      <br>
      <table class="table table-hover" style="width: auto" align="center">
        <thead>
        <tr >
          <th scope="col">Race name</th>
          <th scope="col">Race place</th>
          <th scope="col">Race date</th>
          <th scope="col">Winner</th>
          <th scope="col">Second place</th>
          <th scope="col">Third place</th>
          <th scope="col"  ></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="raceResult in raceResults" >
          <td >{{ raceResult.raceName }}</td>
          <td>{{ raceResult.racePlace}}</td>
          <td>{{ raceResult.raceDate}}</td>
          <td>{{ raceResult.winnerHorse }}</td>
          <td>{{ raceResult.secondPlaceHorse }}</td>
          <td>{{ raceResult.thirdPlaceHorse }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: function () {
    return {
      userId: sessionStorage.getItem('userId'),
      mainViewDiv: true,
      horseTableDiv: false,
      allRaceResultDiv: false,
      userAdditionalDiv: false,
      userButtonDiv: false,
      linkViewDiv: true,
      signOutDiv: false,
      loginButtonsDiv: true,
      horseList: []
    }
  },
  methods: {
    moveToLoginPage: function () {
      this.$router.push({name: 'LoginRoute'});
    },
    toMainView: function () {
      this.mainViewDiv = true
      this.horseTableDiv = false
      this.allRaceResultDiv = false
    },
    moveToSignUpPage: function () {
      this.$router.push({name: 'SignupRoute'});
    },
    getRaceResults: function () {
      this.$http.get('/race-result/all')
          .then(response => {
            this.allRaceResultDiv = true
            this.mainViewDiv = false
            this.raceResults = response.data
          }).catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
    },
    getUserRaceResults: function () {
      this.$http.get('/race-result/user-id',{
        params: {
          userId : sessionStorage.getItem('userId')
        }
      }).then(response => {
            this.allRaceResultDiv = true
            this.mainViewDiv = false
            this.raceResults = response.data
          }).catch(error => alert("You don't have any race results"))
    },
    moveToRelevantPage: function () {
      this.$router.push({name: 'GameRoute', });
    },
    getAllHorsesList: function () {
      this.$http.get('/horse/all-horses',{
        params: {
          userId : sessionStorage.getItem('userId')
        }
      }).then(response => {
            this.mainViewDiv = false
            this.horseTableDiv = true
            this.horseList = response.data
          }).catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
    },
    getUserHorsesList: function () {
      this.$http.get('/horse/user-id',{
        params: {
          userId : sessionStorage.getItem('userId')
        }
      })
          .then(response => {
            this.mainViewDiv = false
            this.horseTableDiv = true
            this.horseList = response.data
          }).catch(error => alert("You don't have any horses"))
    },
    showUserView: function (userId) {
      userId = sessionStorage.getItem('userId')
      if (userId > 0) {
        this.userAdditionalDiv = true
        this.userButtonDiv = true
        this.signOutDiv = true
        this.linkViewDiv = false
        this.loginButtonsDiv = false
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


