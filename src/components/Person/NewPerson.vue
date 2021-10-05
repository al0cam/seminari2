<template>
  <div>
    <b-container>
      <h1>New Person</h1>
      <b-form ref="newPersonForm" @submit="onSubmit" class="inputMargins">
        <b-form-group
            id="input-group-nickname"
            label="Nickname:"
            label-for="input-nickname"
            description="The usual names you are called"
        >
          <b-form-input
              id="input-nickname"
              v-model="newPerson.nickname"
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
              id="input-firstName"
              v-model="newPerson.firstName"
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
              id="input-lastName"
              v-model="newPerson.lastName"
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
              id="input-birthDay"
              v-model="newPerson.birthday"
              type="date"
              placeholder="Enter birthday"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
            id="input-group-height"
            label="Height:"
            label-for="input-height"
            description="Enter your height"
        >
          <b-form-input
              id="input-height"
              v-model="newPerson.height"
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
              id="input-gender"
              v-model="newPerson.gender"
              :options="[
                  {value: 'null', text: 'Choose'},
                  {value: 'male', text: 'Male'},
                  {value: 'female', text: 'Female'},
                  {value: 'other', text: 'Other'}]"

              required
          ></b-form-select>
        </b-form-group>
        <b-button ref="button" type="submit" variant="primary">Submit</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'NewPerson',
  data(){
    return {
      newPerson:{
        nickname:"",
        lastname:"",
        firstname:"",
        location:"",
        birthday:"",
        height:0,
        gender:"null"
      }
    }
  },
  methods:{
    onSubmit(event) {
      event.preventDefault()
      axios.post("http://localhost:8080/persons",this.newPerson)
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inputMargins div, button
{
  margin: 1%;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
