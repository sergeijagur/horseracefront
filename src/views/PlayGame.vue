<template>
  <div >



  <div >
    <button v-on:click="getAllHorsesList" type="button" class="btn btn-primary btn-lg">Show all horses</button>
    <br>

    <br>
    <br>
    <button v-on:click="selectRaceHorses" type="button" name="btn" class="btn btn-secondary btn-sm m-3" >Select horses</button>


  </div>

  <div v-if="horseTableDiv">
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
      horseTableDiv: true

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

    selectRaceHorses: function () {
      if (this.raceHorses.length >= 6 && this.raceHorses.length <= 16) {
        this.horseTableDiv = false
      } else
      alert('You can select minimum 6 and maximum 16 horses')
    },

}
 }
</script>
