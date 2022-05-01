<template>
  <div class="about">
    <h1>testime local storaget</h1>

    <span>Valitud roll {{selected}}</span>
    <div>
      <select v-model="selected" >
        <option disabled value="">Vali roll</option>
        <option v-for="option in options" :value="option.roleId">{{option.roleName}}</option>
      </select>
      <br>
    </div>
    <br>
    <br>
    <button v-on:click="deleteDataToLocalStorage">Kustuta andmed local storage alt</button>
  </div>
</template>

<script>
export default {
  name: "About",
  data: function () {
    return {
      options: {},
      selected: ""
    }
  },
  beforeMount() {
    // todo: taasta roleSelected (string)
    // todo: taasta roleOptions (taasta objekt JSON'ist)
    this.selected = localStorage.getItem('roleSelected')
    this.options = JSON.parse(localStorage.getItem('roleOptions'))
  },
  methods: {
    deleteDataToLocalStorage: function () {
      // todo: kustuta roleSelected
      // todo: kustuta roleOptions
      localStorage.removeItem('roleSelected')
      localStorage.removeItem('roleOptions')
    }
  }

}
</script>
