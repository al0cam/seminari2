<template>
  <div>
    <card-template #form ref="cardTemplate">
      <b-form id="formLocation" @submit="onSubmit" class="inputMargins">
        <b-form-group
            id="input-group-city"
            label="City:"
            label-for="input-city"
            description="The city you live in"
        >
          <b-form-input
              disabled
              id="input-city"
              ref="input-city"
              v-model="location.city"
              type="text"
              placeholder="Enter city"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-streetName"
            label="Street Name:"
            label-for="input-streetName"
            description="The street name"
        >
          <b-form-input
              disabled
              ref="input-streetName"
              id="input-streetName"
              v-model="location.streetName"
              type="text"
              placeholder="Enter street name"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-streetNumber"
            label="Street Number:"
            label-for="input-streetNumber"
            description="Street number"
        >
          <b-form-input
              disabled
              ref="input-streetNumber"
              id="input-streetNumber"
              v-model="location.streetNumber"
              type="number"
              placeholder="Enter street number"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-zip"
            label="Zip:"
            label-for="input-zip"
            description="Enter zip"
        >
          <b-form-input
              disabled
              id="input-zip"
              ref="input-zip"
              v-model="location.zip"
              type="number"
              placeholder="Enter zip"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-country"
            label="Country:"
            label-for="input-country"
            description="Enter country"
        >
          <b-form-input
              disabled
              ref="input-contry"
              id="input-country"
              v-model="location.country"
              type="text"
              placeholder="Enter country"
              required
          ></b-form-input>
        </b-form-group>

        <b-button ref="buttonSave" id="buttonSave" class="buttonColorChangeGreen" type="submit" hidden variant="primary">Save</b-button>
      </b-form>
      <button ref="buttonEdit" class="btn btn-primary" id="buttonEdit"
              v-on:click="$refs.cardTemplate.buttonChangeState($refs.buttonSave,$refs.buttonEdit,inputArray)">Edit</button>

    </card-template>
  </div>
</template>

<script>
import axios from "axios";
import CardTemplate from "@/components/parts/cardTemplate";

export default {
  name: "locationForm",
  components: {CardTemplate},
  data(){
    return{
      person:{},
      location:{},
      inputArray: ['input-country', 'input-city','input-streetName',
        'input-streetNumber','input-zip']
    }
  },
  created() {
    this.getPerson();
  },
  mounted() {
    this.$refs.cardTemplate.$refs.cardButton.textContent = 'Location'
    this.$refs.cardTemplate.$refs.cardTitle.textContent = 'Location'
  },
  methods:{
    getPerson(){
      axios.get("http://localhost:8080/persons/"+this.$route.params.id)
          .then((response)=> {
            this.person = response.data;
            this.getPersonsLocation();
          });
    },
    getPersonsLocation(){
      axios.get("http://localhost:8080/locations/"+this.person.location)
          .then((response)=> {
            this.location = response.data;
          });
    },
    onSubmit(event) {
      event.preventDefault()
      axios.put("http://localhost:8080/locations/",this.location)
          .then((res)=>{
            console.log(res)
            //happy case
          })
          .catch((error)=>{
            console.log("error: " + error)
            //error.response.status, show error message
          })
          .finally(()=>{
            //performed in all cases
          })
    }
  }
}
</script>
<style scoped>
.buttonColorChangeRed
{
  background: #921b1b;
}
.buttonColorChangeGreen
{
  background: #42b983;
}
.inputMargins div, button
{
  margin: 1%;
}
</style>