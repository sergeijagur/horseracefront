<template>
  <div>
    <img src="https://t4.ftcdn.net/jpg/00/79/71/07/360_F_79710743_BoORxIHT4mNHhmeldg8mk1JtlklRFteH.jpg" alt="">
   <br>
   <br>

    <div v-if="mainViewDiv">
    <h1>Welcome to Horse Racing Online Game</h1>
    <br>
    <br>
    <button v-on:click="getRaceResults" type="button" class="btn btn-success btn-lg m-3">Show previous race results</button>
    <button v-on:click="getAllHorsesList" type="button" class="btn btn-primary btn-lg m-3">Show all registered horses</button>
    <br>
    <br>
    <button v-on:click="moveToLoginPage" type="button" class="btn btn-warning btn-lg m-3">Login</button>
    <button v-on:click="moveToSignUpPage" type="button" class="btn btn-info btn-lg m-3">Sign Up</button>
    </div>
    <div v-if="horseTableDiv">
      <button v-on:click="toMainView" type="button" class="btn btn-light">Back</button>
      <br>
      <br>
      <table class="table table-hover">
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
      <table class="table table-hover">
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

      mainViewDiv: true,
      horseTableDiv: false,
      allRaceResultDiv: false,
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
            console.log(response.data)
          })
          .catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
    },
    getAllHorsesList: function () {
      this.$http.get('/horse/all-horses')
          .then(response => {
            this.mainViewDiv = false
            this.horseTableDiv = true
            this.horseList = response.data
            console.log(response.data)
          })
          .catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
    }

  }

}







</script>

