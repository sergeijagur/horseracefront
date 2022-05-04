<template>
  <div >
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
    <img src="https://media.istockphoto.com/vectors/gallop-on-horses-vector-id514459091?k=20&m=514459091&s=612x612&w=0&h=E2NpsxemJtHeHd0qSKAhnPOSJWRSaNiCEUNj_uIEtc0=" alt="">
    <br>
    <br>
    <div v-if="playAgainButton">
      <button v-on:click="playAgain" type="button" class="btn btn-success btn-lg">Play again</button>
    </div>

    <div v-if="addRaceDiv">
      <div>
        <h2>Add race details</h2>
        <div class="d-inline-flex p-2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Race name</label>
            </div>
            <input type="text" v-model="raceInfoRequest.name">
          </div>
        </div>
      </div>
      <div>
        <div class="d-inline-flex p-2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Race place</label>
            </div>
            <input type="text" v-model="raceInfoRequest.place">
          </div>
        </div>
      </div>
      <div>
        <div class="d-inline-flex p-2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Race date</label>
            </div>
            <input type="date" v-model="raceInfoRequest.date">
          </div>
        </div>
      </div>
      <button v-on:click="addNewRace" type="button" class="btn btn-dark btn-lg m-3" >Add new race</button>
    </div>
    <div v-if="addHorseDiv">
      <div>
        <h2>Add your horse details</h2>
        <div class="d-inline-flex p-2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Horse name</label>
            </div>
            <input type="text" v-model="horseInfoRequest.name">
          </div>
        </div>
      </div>
      <div>
        <div class="d-inline-flex p-2">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text">Horse color</label>
            </div>
            <input type="text" v-model="horseInfoRequest.color">
          </div>
        </div>
      </div>
      <button v-on:click="addNewHorse" type="button" class="btn btn-dark btn-lg m-3" >Create new horse</button>
    </div>
<div v-if="horseTableDiv">
  <h2>Ad horses to race</h2>
  <div >
    <button v-on:click="getAllHorsesList" type="button" class="btn btn-dark btn-lg m-3">Show all horses</button>
    <button v-on:click="getUserHorsesList" type="button" class="btn btn-dark btn-lg m-3">Show your horses</button>
    <button v-on:click="toAddHorseView" type="button" class="btn btn-dark btn-lg m-3">Add new horse</button>
  </div>
  <div v-if="selectHorseButton">
    <br>
    <button v-on:click="selectRaceHorses" type="button" name="btn" class="btn btn-secondary btn-sm m-3" >Add selected horses to race</button>
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
    <div v-if="raceHorseTableDiv">
      <h2>Bet on horse</h2>
      <div >
        <button v-on:click="putBetOnHorse" type="button" class="btn btn-success btn-lg">PLAY!</button>
        <br>
        <br>
      </div>
      <div>
        <table class="table table-hover">
          <thead>
          <tr >
            <th scope="col">Horse name</th>
            <th scope="col">Horse color</th>
            <th scope="col">Your bet</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="horse in raceHorseList" >
            <td>{{ horse.name }}</td>
            <td>{{ horse.color}}</td>
            <td>
              <input v-model="bet" type="radio" name="bet" v-bind:value="horse.id" >
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

      horseList: {},
      bet: 0,
      raceHorseList: {},
      raceHorses: [],
      selected: "",
      horseId:0,
      raceId:0,
      userId: sessionStorage.getItem('userId'),
      addRaceDiv: true,
      addHorseDiv:false,
      horseTableDiv: false,
      selectHorseButton: false,
      raceHorseTableDiv: false,
      playAgainButton: false,
      linkViewDiv: true
    }
  },

  methods: {
  getAllHorsesList: function () {
    this.$http.get('/horse/all-horses')
        .then(response => {
          this.horseList = response.data
          this.selectHorseButton = true
        })
        .catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
  },
    getUserHorsesList: function () {
      this.$http.get('/horse/user-id', {
        params: {
          userId : this.userId
        }
      })
          .then(response => {
            this.horseList = response.data
            this.selectHorseButton = true
          })
          .catch(error => alert(error.response.data.title + ". " + error.response.data.detail))
    },
    selectRaceHorses: function () {
    let raceHorseRequest =
       {raceHorses: this.raceHorses}
      if (this.raceHorses.length >= 6 && this.raceHorses.length <= 16) {
        this.horseTableDiv = false;
        this.$http.post("/horse/race-horses", raceHorseRequest
        ).then(response => {
          alert("Horses added to race")
          this.raceHorseList = response.data
          this.horseTableDiv = false
          this.addHorseDiv = false
          this.raceHorseTableDiv = true
        }).catch(error => {
          alert(error.response.data.title + ". " + error.response.data.detail)
        })
      } else
        alert("You have to select minimum six and maximum 16 horses")

      // if (this.raceHorses.length < 6) {
      //   alert("You have to select minimum six horses")
      // } else if (this.raceHorses.length > 16) {
      //   alert("You can select maximum 16 horses")
      // } else
      //   this.horseTableDiv = false;
      // this.$http.post("/horse/race-horses", raceHorseRequest
      // ).then(response => {
      //   alert("Horses added to race")
      //   this.raceHorseList = response.data
      //   this.horseTableDiv = false
      //   this.addHorseDiv = false
      //   this.raceHorseTableDiv = true
    //   }).catch(error => {
    //     alert(error.response.data.title + ". " + error.response.data.detail)
    //   })


    },

    putBetOnHorse: function () {
    let raceAndBetRequest = {
          raceId: sessionStorage.getItem('raceId'),
          userId: sessionStorage.getItem('userId'),
          betOnHorseId: this.bet,
          raceHorses: this.raceHorses
      }
      this.$http.post("/horse-race/bet", raceAndBetRequest
      ).then(response => {
        if (response.data.win === true) {
          alert("YOU WIN!!!")
          this.playAgainButton = true
          this.bet = 0
          this.raceHorses = []

        } else
          alert("YOU LOSE!!!")
          this.playAgainButton = true
          this.bet = 0
          this.raceHorses = []


        // RESPONSE
        // private String raceName;
        // private String racePlace;
        // private LocalDate raceDate;
        // private Integer winnerHorse;
        // private Integer secondPlaceHorse;
        // private Integer thirdPlaceHorse;
        // private Boolean win = false;

        this.raceHorseTableDiv = false


      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },










    addNewRace: function () {
      this.$http.post("/race/new-race", this.raceInfoRequest
      ).then(response => {
        alert("New race added")
        this.raceId = response.data.id
        this.addRaceDiv = false
        this.horseTableDiv = true
        sessionStorage.setItem('raceId', response.data.id)
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },
    addNewHorse: function () {
      this.$http.post("/horse/new-horse", this.horseInfoRequest
      ).then(response => {
        alert("New horse added")
        this.horseId = response.data.id
        this.horseTableDiv = true
        this.addHorseDiv = false
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },
    playAgain: function () {
      this.playAgainButton = false
      this.addRaceDiv = true
    },

    showUserView: function (userId) {
      userId = sessionStorage.getItem('userId')
      if (userId > 0) {
        this.userAdditionalDiv = true
        this.linkViewDiv = false
      }
    },
    toAddHorseView: function () {
      this.horseTableDiv = false
      this.addHorseDiv = true
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