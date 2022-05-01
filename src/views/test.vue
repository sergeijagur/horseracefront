<template>
  <div>
    <div>

      <!--  Kuvame pildi lisamise nuppu -->
      <div v-if="displayAddPictureButton">
        <h3>Lisa pilte</h3>
        <!--
          type="file"                       - teeb faili valimise meile lihtsaks
          @change="handleImage"             - paneb käima 'handleImage' meetodi kui valitakse fail.
          accept="image/x-png,image/jpeg"   - mis tüüpi faile me üldse näitame File Upload aknakeses
                                              hetkel lubame ainult .png ja .jpeg (ja nende alam vorme)
                                              kasutades "image/*" lubaksime kõiki tuntud pildi tüüpe
        -->
        <input type="file" @change="handleImage" accept="image/x-png,image/jpeg">
      </div>

      <!--  Kuvame kasutajale lisatavat pilti  -->
      <div v-if="displayInputPicture">
        <br>
        <br>
        <img :src="pictureExport.data"><br>
      </div>

      <!--  Kuvame kasutajale pildi lisamiseks vajalike väljasi ja pildi lisamise nupp  -->
      <div v-if="displayUploadPictureDetailsOptions">
        <br>
        <br>
        <input placeholder="pealkiri" v-model="pictureExport.title"><br>
        <input placeholder="kirjeldus" v-model="pictureExport.description"><br>
        <br>
        <br>
        <button v-on:click="sendImageDataToBackend">Upload To Database</button>
        <br>
      </div>

      <!--  Kuvame kasutajale piltide tabelit  -->
      <div v-if="displayPicturesInfoTable">
        <br>
        <br>
        <h3>Pildid:</h3>

        <table>
          <tr>
            <th>pealkiri</th>
            <th>kirjeldus</th>
            <th></th>
          </tr>
          <tr v-for="row in picturesByUserIdInfo">
            <td>{{ row.title }}</td>
            <td>{{ row.description }}</td>
            <td>
              <button v-on:click="findPictureByPictureId(row.pictureId)">Vaata</button>
            </td>
          </tr>
        </table>
      </div>

      <!--  Kuvame kasutajale valitud pilti  -->
      <div v-if="displaySelectedPicture">
        <div>
          <img :src="pictureImport.data">
        </div>
        <div>
          <h2>{{ pictureImport.title }}</h2>
        </div>
        <div>
          <h4>{{ pictureImport.description }}</h4>
        </div>
        <button v-on:click="backToMainView">Tagasi</button>
      </div>


      <!--      <img :src="piltBackendist">-->
      <!--      <br>-->
      <!--      <button v-on:click="requestLastImgFromBackend">Receive Last Image From Database</button>-->
      <!--   -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Customer",
  data() {
    return {
      firstName: this.$route.query.firstName,
      lastName: this.$route.query.lastName,
      userId: sessionStorage.getItem('userId'),
      pictureExport: {
        userId: sessionStorage.getItem('userId'),
        title: "",
        description: "",
        data: ""
      },
      pictureImport: {
        title: "",
        description: "",
        data: null
      },
      picturesByUserIdInfo: {},
      displayAddPictureButton: true,
      displayInputPicture: false,
      displayUploadPictureDetailsOptions: false,
      displayPicturesInfoTable: true,
      displaySelectedPicture: false,
      pilt: null,
      piltBackendist: null
    }
  },
  beforeMount() {
    this.findPicturesInfoByUserId()
  },
  methods: {
    handleImage(event) {
      this.displayInputPicture = true
      this.displayUploadPictureDetailsOptions = true

      const selectedImage = event.target.files[0];
      this.createBase64Image(selectedImage);
    },

    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pictureExport.data = reader.result;
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    },

    sendImageDataToBackend: function () {
      this.$http.post("/picture", this.pictureExport
      ).then(response => {
        this.displayInputPicture = false
        alert("pilt edukalt lisatud")
        this.pictureExport.title = ""
        this.pictureExport.description = ""
        this.findPicturesInfoByUserId()
      }).catch(error => {
        alert("viga pildi lisamisel")
      })
    },
    findPicturesInfoByUserId: function () {
      this.$http.get("/picture/info/all/by/userid", {
            params: {
              userId: this.userId
            }
          }
      ).then(response => {
        this.picturesByUserIdInfo = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    findPictureByPictureId: function (pictureId) {
      this.$http.get("/picture/by/pictureid", {
            params: {
              pictureId: pictureId
            }
          }
      ).then(response => {
        this.pictureImport.title = response.data.title
        this.pictureImport.description = response.data.description
        this.pictureImport.data = response.data.data
        this.hideAllDivs()
        this.displaySelectedPicture = true

      }).catch(error => {
        console.log(error)
      })
    },
    backToMainView: function () {
      this.hideAllDivs()
      this.displayAddPictureButton = true
      this.displayPicturesInfoTable = true
    }
    ,
    hideAllDivs: function () {
      this.displayAddPictureButton = false,
          this.displayInputPicture = false,
          this.displayUploadPictureDetailsOptions = false,
          this.displayPicturesInfoTable = false,
          this.displaySelectedPicture = false
    }
  }
}
</script>

<style scoped>

</style>