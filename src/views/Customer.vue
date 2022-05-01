<template>
  <div>
<!--    <h1>Siia tuleb admin lehekülg</h1>-->
<!--    <h3>Eesnimi </h3> <span>{{firstName}}</span>-->
<!--    <h3>Perekonna nimi </h3> <span>{{lastName}}</span>-->
<!--    <h3>ID </h3> <span>{{userId}}</span>-->

    <img src="https://media.istockphoto.com/vectors/gallop-on-horses-vector-id514459091?k=20&m=514459091&s=612x612&w=0&h=E2NpsxemJtHeHd0qSKAhnPOSJWRSaNiCEUNj_uIEtc0=" alt="">

    <br>
    <br>
    <br>

    <div v-if="mainDiv">
      <button v-on:click="toAddNewHorse" type="button" class="btn btn-secondary btn-sm m-3" >Add new horse</button>
      <button v-on:click="toAddNewRace" type="button" class="btn btn-secondary btn-sm m-3">Create new race</button>
      <button type="button" class="btn btn-secondary btn-sm m-3">Show all race results</button>
      <br>
      <br>
      <button type="button" class="btn btn-success btn-lg">Play game</button>
    </div>

    <div v-if="addHorseDiv">
      <input placeholder="Name" v-model="horseInfoRequest.name"><br><br>
      <input placeholder="Color" v-model="horseInfoRequest.color"><br>
      <br><br>
      <button v-on:click="addNewHorse" type="button" class="btn btn-secondary btn-sm m-3" >Add new horse</button>
    </div>

    <div v-if="addRaceDiv">
      <input placeholder="Name" v-model="horseInfoRequest.name"><br><br>
      <input placeholder="Color" v-model="horseInfoRequest.color"><br>
      <br><br>
      <button v-on:click="addNewRace" type="button" class="btn btn-secondary btn-sm m-3" >Add new horse</button>
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
      },

      raceInfoRequest: {

      },
      mainDiv: true,
      addHorseDiv: false,
      addRaceDiv: false,
      horseId: 0,
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

    toMainView: function () {
      this.mainDiv = true
      this.addHorseDiv = false
       },

    addNewHorse: function () {
      this.$http.post("/horse/new-horse", this.horseInfoRequest
      ).then(response => {
        alert("New horse added")
        this.horseId = response.data.id
        this.name = response.data.name
        this.color = response.data.color
        this.toMainView()
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },

    addNewRace: function () {
      this.$http.post("/horse/new-horse", this.horseInfoRequest
      ).then(response => {
        alert("New horse added")
        this.horseId = response.data.id
        this.name = response.data.name
        this.color = response.data.color
        this.toMainView()
      }).catch(error => {
        alert(error.response.data.title + ". " + error.response.data.detail)
      })
    },



    },

}
</script>

<style scoped>

</style>