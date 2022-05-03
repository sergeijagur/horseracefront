<template>
  <div >
    <div id="app">
      <div id="nav">
        | <router-link to="/">Home</router-link> |
        <div v-if="linkViewDiv">
          <router-link to="/log-in">Login</router-link> |
          <router-link to="/signup">Sign Up</router-link> |
          <router-link to="/customer">ffffUp</router-link> |
        </div>
        </div>
      <router-view/>
    </div>

<div v-if="horseTableDiv">
  <div >
    <button v-on:click="getAllHorsesList" type="button" class="btn btn-primary btn-lg">Show all horses</button>
    <br>
    <br>
    <button v-on:click="getUserHorsesList" type="button" class="btn btn-primary btn-lg">Show your horses</button>
    <br>
    <br>
    <button v-on:click="selectRaceHorses" type="button" name="btn" class="btn btn-secondary btn-sm m-3" >Select horses</button>
  </div>
  <div>
    <table class="table table-hover">
      <thead>
      <tr >
        <th scope="col">Horse name</th>
        <th scope="col">Horse color</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="horse in horseList" >
        <td>{{ horse.name }}</td>
        <td>{{ horse.color}}</td>
        <td>
          <input v-model="raceHorses" type="checkbox" name="" id="" v-bind:value="horse.id">
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</div>


  </div>

</template>

<script>

export default {
  name: "About",
  data: function () {
    return {
      horseList: {},
      raceHorses: [],
      selected: "",
      userId: sessionStorage.getItem('userId'),
      horseTableDiv: true,
      linkViewDiv: true
    }
  },

  methods: {
  getAllHorsesList: function () {
    this.$http.get('/horse/all-horses')
        .then(response => {
          this.horseList = response.data
          console.log(response.data)
        })
        .catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
  },
    getUserHorsesList: function () {
      let userId = this.userId;
      this.$http.get('/horse/user-id', {
        params: {
          userId : this.userId
        }
      })
          .then(response => {
            this.horseList = response.data
            console.log(userId)
            console.log(response.data)
          })
          .catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
    },

    selectRaceHorses: function () {
      if (this.raceHorses.length >= 6 && this.raceHorses.length <= 16) {
        this.horseTableDiv = false
      } else
      alert('You can select minimum 6 and maximum 16 horses')
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