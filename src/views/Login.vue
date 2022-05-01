<template>
  <div>
    <input placeholder="kasutaja nimi" v-model="username"><br>
    <input placeholder="parool" v-model="password"><br>
    <br>
    <br>

    <!--  siis kui vaja, kuvatakse "logi sisse" nuppu  -->
    <div v-if="displayLoginButton">
      <button v-on:click="loginRequest">logi sisse</button>
    </div>

    <!-- kuvatakse rippmenüüd, siis kui kasutajal on rohkem kui 1 kastutaja rolli -->
    <div v-if="rolesSize > 1">
      <select v-model="selectedRole">
        <option v-for="option in options" :value="option.roleId">{{ option.roleName }}</option>
      </select>
      <br>
      <br>
      <button v-on:click="moveToRelevantPage(selectedRole)">logi sisse rolliga</button>
    </div>

    <!--  save data näite nupud on ära peidetud, pane true kui soovid neid näha  -->
    <div v-if="false">
      <br>
      <br>
      <button v-on:click="saveDataToLocalStorage">Salvesta andmed LOCAL storage alla</button>
      <br>
      <br>
      <button v-on:click="saveDataToSessionStorage">Salvesta andmed SESSION storage alla</button>
    </div>

  </div>

</template>

<script>
export default {
  name: "Login",

  // defineeritakse selle view komponendi muutujad
  data: function () {
    return {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      options: {},
      selectedRole: 0,
      rolesSize: 0,
      roleId: 0,
      displayLoginButton: true
    }
  },
  methods: {
    // loginRequest back endi vastu
     loginRequest: function () {
      this.$http.get("/login/in", {
            params: {
              userName: this.username,
              password: this.password
            }
          }
      ).then(response => {
        // väärtustatakse mõned selle view komponendi muutujad
        this.firstName = response.data.firstName
        this.lastName = response.data.lastName
        this.rolesSize = response.data.roles.length

        // valitakse sissetulevast sõmumist rollide massiivi esimese elemendi roleID
        this.selectedRole = response.data.roles[0].roleId

        // tehakse üks alert sõnum
        alert("Tere tulemast " + response.data.firstName + " " + response.data.lastName)


        // salvestab userId sessionStorage alla
        sessionStorage.setItem('userId', response.data.userId)

        // Kui kasutajal on rohkem kui 1 roll küljes (e.g. mari, 123)
        if (this.rolesSize > 1) {
          this.displayLoginButton = false;
          this.options = response.data.roles
        } else {
          // Kui kasutajal on vaid 1 roll küljes (e.g. mari, 123)
          this.roleId = response.data.roles[0].roleId;
          this.moveToRelevantPage(this.roleId);
        }
      }).catch(error => {
        alert(error.response.data.message + " Error code: " + error.response.data.errorCode)
      })
    },
    moveToRelevantPage: function (selectedRole) {
      switch (selectedRole) {
        case 1:
          // liigutakse admin lehele.
          // Näide, kuidas antakse kaasa infot järgmisele lehele request parameetritega
          this.$router.push({name: 'AdminRoute', query: {firstName: this.firstName, lastName: this.lastName}});
          break;
        case 2:
          // liigutakse customer lehele.
          alert("Go to customer page")
          this.$router.push({name: 'CustomerRoute'});
          break;
          //  jne.....
      }
    },
    saveDataToLocalStorage: function () {
      // salvestab localStorage alla key 'roleSelected' ja  selectedRole stringi väärtuse
      localStorage.setItem('roleSelected', this.selectedRole)
      // salvestab localStorage alla key 'roleOptions' ja teeb 'options' objekti JSON stringiks
      localStorage.setItem('roleOptions', JSON.stringify(this.options))
    },
    saveDataToSessionStorage: function () {
      // salvestab sessionStorage alla key 'roleSelected' ja  selectedRole stringi väärtuse
      sessionStorage.setItem('roleSelected', this.selectedRole)
      // salvestab sessionStorage alla key 'roleOptions' ja teeb 'options' objekti JSON stringiks
      sessionStorage.setItem('roleOptions', JSON.stringify(this.options))

    }
  }
}
</script>


<style scoped>

</style>