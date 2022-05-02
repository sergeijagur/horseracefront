<template>
  <div >



  <div >
    <button v-on:click="getAllHorsesList" type="button" class="btn btn-primary btn-lg">Show all result</button>
    <br>
    <br>
    <br>

    {{raceHorses}}
  </div>

  <div >
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

        <!--            <td><button v-on:click.once="horsesId.push(customer.id)" type="button" class="btn btn-secondary btn-lg">Lisa</button></td>-->
        <!--          <td><button v-on:click ="horsesId.splice(horsesId.indexOf(customer), 1)" type="button" class="btn btn-secondary btn-lg">Eemalda</button></td>-->
      </tr>
      </tbody>
    </table>

    <!--        <td><button v-on:click="saveDataToSessionStorage" type="button" class="btn btn-secondary btn-lg">edasta</button></td>-->

    <br>
    <br>
    <button type="button" name="btn" class="btn btn-secondary btn-sm m-3" >Back</button>
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


}
 }
</script>
