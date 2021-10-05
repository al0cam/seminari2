<template>
  <div>
    <card-template #form ref="cardTemplate">
      <b-form ref="rowForm" @submit="onSubmit" id="rowForm">
        <b-button ref="submitButton" hidden type="submit"></b-button>
      </b-form>
      <b-table striped hover :items="contacts" :fields="fields">
        <template #cell(idContactType)="row">
          <b-form-select
              form="rowForm"
              id="input-gender"
              v-model="row.item.idContactType"
              :options="idContactType"
              required
          ></b-form-select>
<!--          <input ref="{{row.item.id}}" :value="contactType[row.value.toString()]">-->
        </template>
        <template #cell(contact)="row">
          <b-input required form="rowForm" :value="row.value.toString()"></b-input>
        </template>
        <template #cell(Actions)="row">
          <b-button @click="$refs.submitButton.click()">Save</b-button>
          <b-button @click="deleteItem(row.item.id)" class="buttonDelete">Delete</b-button>
        </template>
      </b-table>
    </card-template>

  </div>
</template>

<script>
import axios from "axios";
import CardTemplate from "@/components/parts/cardTemplate";

export default {
  name: "contactsFormOLD",
  components: {CardTemplate},
  data(){
    return{
      person:{},
      contacts:{},
      fields:[
        {key:'idContactType'},
        {key:"contact"},
        {key:"Actions"}
      ],
      idContactType:{
        1: 'facebook',
        2: 'skype',
        3: 'tel',
        4: 'email',
        5: 'jabber',
        6: 'web'
      },
      visible: false
    }
  },
  created() {
    this.getPersonsContacts();
  },
  mounted() {
    this.$refs.cardTemplate.$refs.cardButton.textContent = 'Contacts'
    this.$refs.cardTemplate.$refs.cardTitle.textContent = 'Contacts'
  },
  methods:{
    getPersonsContacts(){
      axios.get("http://localhost:8080/contacts/"+ this.$route.params.id)
          .then((response)=> {
            this.contacts = response.data;
          });
    },
    onSubmit(event) {
      event.preventDefault()
      console.log(this.contacts)
      axios.put("http://localhost:8080/contacts/", this.contacts)
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
    deleteItem(id){
      axios.delete("http://localhost:8080/contacts/"+id)
          .then(response=>{
            console.log(response);
            const index =this.contacts.findIndex(contact=>contact.id == id);
            if (~index){
              this.persons.splice(index,1);
            }
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