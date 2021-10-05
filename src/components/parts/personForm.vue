<template>
  <div>
      <card-template #form ref="cardTemplate">
        <b-form ref="formTemplate" id="formTemplate" @submit="onSubmit" class="inputMargins">
          <b-form-group
              id="input-group-nickname"
              label="Nickname:"
              label-for="input-nickname"
              description="The usual names you are called"
          >
            <b-form-input
                disabled
                id="input-nickname"
                v-model="person.nickname"
                type="text"
                placeholder="Enter nickname"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-firstName"
              label="First Name:"
              label-for="input-firstName"
              description="The first name"
          >
            <b-form-input
                disabled
                id="input-firstName"
                v-model="person.firstname"
                type="text"
                placeholder="Enter first name"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-lastName"
              label="Last Name:"
              label-for="input-lastName"
              description="Your last name"
          >
            <b-form-input
                disabled
                id="input-lastName"
                v-model="person.lastname"
                type="text"
                placeholder="Enter last name"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-birthDay"
              label="Birthday:"
              label-for="input-height"
              description="Enter your birthday"
          >
            <b-form-input
                disabled
                id="input-birthDay"
                v-model="person.birthday"
                type="date"
                placeholder="Enter birthday"
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-height"
              label="Height:"
              label-for="input-height"
              description="Enter your height"
          >
            <b-form-input
                disabled
                id="input-height"
                v-model="person.height"
                type="number"
                placeholder="Enter height"
                required
            ></b-form-input>
          </b-form-group>
          <b-form-group
              id="input-group-gender"
              label="Gender:"
              label-for="input-gender"
          >
            <b-form-select
                disabled
                id="input-gender"
                v-model="person.gender"
                :options="[
                    {value: 'male', text: 'Male'},
                    {value: 'female', text: 'Female'},
                    {value: 'other', text: 'Other'}]"
                required
            ></b-form-select>
          </b-form-group>
          <b-button ref="buttonSave"  id="buttonSave" class="buttonColorChangeGreen" type="submit" hidden variant="primary">Save</b-button>
        </b-form>
        <button ref="buttonEdit" class="btn btn-primary" id="buttonEdit"
                v-on:click="$refs.cardTemplate.buttonChangeState($refs.buttonSave, $refs.buttonEdit, inputArray)"
        >Edit</button>

      </card-template>
  </div>
</template>

<script>
import axios from "axios";
import CardTemplate from "@/components/parts/cardTemplate";

export default {
  name: "personForm",
  components: {CardTemplate},
  data(){
    return{
      person:{},
      inputArray: ['input-nickname', 'input-firstName','input-lastName',
                    'input-birthDay','input-height','input-gender']
    }
  },
  created() {
    this.getPerson();
  },
  mounted() {
    this.$refs.cardTemplate.$refs.cardButton.textContent = 'Person'
    this.$refs.cardTemplate.$refs.cardTitle.textContent = 'Person'
  },
  methods:{
    getPerson(){
      axios.get("http://localhost:8080/persons/"+this.$route.params.id)
          .then((response)=> {
            this.person = response.data;
            // this.person.birthday = new Date(Number(this.person.birthday))
            this.person.birthday=  new Date(this.person.birthday).toISOString().substr(0, 10)
            console.log(this.person)
          });
    },

    onSubmit(event) {
      event.preventDefault()
      axios.put("http://localhost:8080/persons",this.person)
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
      },
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