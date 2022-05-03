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
    <img src="https://t3.ftcdn.net/jpg/00/94/33/70/360_F_94337009_Ft8XuW2Xi0c1wH9izksukO5OZ14fXlIc.jpg" alt="">

    <br>
    <br>
    <div v-if="playAgainButton">
      <button v-on:click="playAgain" type="button" class="btn btn-primary btn-lg">Play again</button>
    </div>

    <div v-if="addRaceDiv">
      <input placeholder="Name" v-model="raceInfoRequest.name"><br><br>
      <input placeholder="Place" v-model="raceInfoRequest.place"><br><br>
      <input type="date" v-model="raceInfoRequest.date">
      <br><br>
      <button v-on:click="addNewRace" type="button" class="btn btn-secondary btn-sm m-3" >Add new race</button>
    </div>

    <div v-if="addHorseDiv">
      <input placeholder="Name" v-model="horseInfoRequest.name"><br><br>
      <input placeholder="Color" v-model="horseInfoRequest.color"><br>
      <br><br>
      <button v-on:click="addNewHorse" type="button" class="btn btn-secondary btn-sm m-3" >Add new horse</button>
    </div>



<div v-if="horseTableDiv">
  <div >

    <button v-on:click="getAllHorsesList" type="button" class="btn btn-primary btn-lg">Show all horses</button>
    <br>
    <br>
    <button v-on:click="getUserHorsesList" type="button" class="btn btn-primary btn-lg">Show your horses</button>
    <br>
    <br>
    <button v-on:click="toAddHorseView" type="button" class="btn btn-primary btn-lg">Add new horse</button>
  </div>

  <div v-if="selectHorseButton">
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

    <div v-if="raceHorseTableDiv">
      <div >
        <button v-on:click="putBetOnHorse" type="button" class="btn btn-primary btn-lg">BET</button>
        <br>
        <br>
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