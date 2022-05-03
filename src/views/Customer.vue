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
      <button v-on:click="moveToRelevantPage" type="button" class="btn btn-primary btn-lg">Play the game</button>
    </div>
    <br>
    <br>

    <img src="https://media.istockphoto.com/vectors/gallop-on-horses-vector-id514459091?k=20&m=514459091&s=612x612&w=0&h=E2NpsxemJtHeHd0qSKAhnPOSJWRSaNiCEUNj_uIEtc0=" alt="">
    <br>
    <br>
    <br>
    <div v-if="mainDiv">
      <button v-on:click="toAddNewHorse" type="button" class="btn btn-secondary btn-sm m-3" >Add new horse</button>
      <button v-on:click="toAddNewRace" type="button" class="btn btn-secondary btn-sm m-3">Create new race</button>
      <button v-on:click="toRaceResults" type="button" class="btn btn-secondary btn-sm m-3">Show all race results</button>
      <br>
      <br>
      <div v-if="playButtonDiv">
      <button v-on:click="moveToRelevantPage" type="button" class="btn btn-success btn-lg">Play game</button>
      </div>
    </div>

    <div v-if="addHorseDiv">
      <input placeholder="Name" v-model="horseInfoRequest.name"><br><br>
      <input placeholder="Color" v-model="horseInfoRequest.color"><br>
      <br><br>
      <button v-on:click="addNewHorse" type="button" class="btn btn-secondary btn-sm m-3" >Add new horse</button>
      <br>
      <button v-on:click="toMainView" type="button" class="btn btn-secondary btn-sm m-3" >Back</button>
    </div>

    <div v-if="addRaceDiv">
      <input placeholder="Name" v-model="raceInfoRequest.name"><br><br>
      <input placeholder="Place" v-model="raceInfoRequest.place"><br><br>
      <input type="date" v-model="raceInfoRequest.date">
      <br><br>
      <button v-on:click="addNewRace" type="button" class="btn btn-secondary btn-sm m-3" >Add new race</button>
      <br>
      <button v-on:click="toMainView" type="button" class="btn btn-secondary btn-sm m-3" >Back</button>
    </div>


    <div v-if="resultButtonDiv" >
      <button v-on:click="getRaceResults" type="button" class="btn btn-primary btn-lg">Show all result</button>
      <br>
      <br>
      <br>
    </div>
    <div v-if="allRaceResultDiv" >
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

<!--            <td><button v-on:click.once="horsesId.push(customer.id)" type="button" class="btn btn-secondary btn-lg">Lisa</button></td>-->
            <!--          <td><button v-on:click ="horsesId.splice(horsesId.indexOf(customer), 1)" type="button" class="btn btn-secondary btn-lg">Eemalda</button></td>-->
          </tr>
          </tbody>
        </table>

<!--        <td><button v-on:click="saveDataToSessionStorage" type="button" class="btn btn-secondary btn-lg">edasta</button></td>-->

        <br>
        <br>
      <button v-on:click="toMainView" type="button" class="btn btn-secondary btn-sm m-3" >Back</button>
    </div>


  </div>

</template>

<script>
export default {
  name: "Admin",
  data: function () {
    return {
      horseInfoRequest: {
        userId: sessionStorage.getItem('userId'),
        name: '',
        color: '',
        linkViewDiv: true
      },

      raceInfoRequest: {
        userId: sessionStorage.getItem('userId'),
        name: '',
        place: '',
        date: '',

      },
      mainDiv: true,
      addHorseDiv: false,
      addRaceDiv: false,
      allRaceResultDiv: false,
      resultButtonDiv: false,
      userAdditionalDiv: false,
      playButtonDiv: true,
      horseId: 0,
      raceId: 0,
      raceResults: {},
      userId: this.$route.query.userId,
      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName
    }

    },

  methods: {
    toAddNewHorse: function () {
      this.mainDiv = false
      this.addHorseDiv = true
       },

    toAddNewRace: function () {
      this.mainDiv = false
      this.addRaceDiv = true
    },

    toRaceResults: function () {
      this.mainDiv = false
      this.allRaceResultDiv = true
      this.resultButtonDiv = true
    },

    toMainView: function () {
      this.mainDiv = true
      this.addHorseDiv = false
      this.addRaceDiv = false
      this.allRaceResultDiv = false
      this.resultButtonDiv = false
       },

    getRaceResults: function () {
      this.$http.get('/race-result/all')
          .then(response => {
            this.resultButtonDiv = false
            this.raceResults = response.data
            console.log(response.data)
          })
          .catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
    },


    addNewHorse: function () {
      this.$http.post("/horse/new-horse", this.horseInfoRequest
      ).then(response => {

        alert("New horse added")
        this.horseId = response.data.id
        this.toMainView()
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },

    addNewRace: function () {
      this.$http.post("/race/new-race", this.raceInfoRequest
      ).then(response => {
        alert("New race added")
        this.raceId = response.data.id
        sessionStorage.setItem('raceId', response.data.id)
        this.toMainView()
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },
    moveToRelevantPage: function () {
      this.$router.push({name: 'GameRoute', query: { userId: this.userId, raceId: this.raceId}});
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

<style scoped>

</style>