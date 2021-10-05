<template>
  <div>
    <card-template #form ref="cardTemplate">
      <b-table striped hover  ref="table" :items="contacts" :fields="fields">
        <template #cell(idContactType)="row">
          <span>{{idContactType[row.item.idContactType]}}</span>
        </template>
        <template #cell(Actions)="row">
          <b-button @click="setAndShowModal($bvModal, row)" class="buttonEdit">Edit</b-button>
          <b-button @click="deleteItem(row.item.idContact)" class="buttonDelete">Delete</b-button>
        </template>
      </b-table>
      <b-button ref="newContactButton" @click="$bvModal.show('insertContactModal')" class="btn btn-primary">New contact</b-button>
    </card-template>

    <b-modal id="insertContactModal" ref="insertContactModal" @ok="$refs.modalInsertSubmit.click();">
      <b-form ref="modalForm" @submit="insertContact" >
        <b-form-group
            id="input-group-contactType"
            label="Contact type:"
            label-for="input-contactType"
        >
          <b-form-select
              ref="input-contactType"
              id="input-contactType"
              v-model="newContact.idContactType"
              :options="idContactType"
              required
          ></b-form-select>
        </b-form-group>
        <b-form-group
            id="input-group-contact"
            label="Contact:"
            label-for="input-contact"
            description="Enter your contact"
        >
          <b-form-input
              ref="input-contact"
              id="input-contact"
              type="text"
              v-model="newContact.contact"
              placeholder="Enter contact"
              required
          ></b-form-input>
        </b-form-group>
        <b-button ref="modalInsertSubmit" type="submit" hidden> </b-button>
      </b-form>
    </b-modal>

    <b-modal id="editContactModal" ref="editContactModal" @ok="$refs.modalEditSubmit.click(); $forceUpdate()">
      <b-form ref="modalForm" @submit="editContact">
        <b-form-group
            id="input-group-contactType"
            label="Contact type:"
            label-for="input-contactType"
        >
          <b-form-select
              ref="input-contactType"
              id="input-contactType"
              v-model="editExistingContact.idContactType"
              :options="idContactType"
              required
          ></b-form-select>
        </b-form-group>
        <b-form-group
            id="input-group-contact"
            label="Contact:"
            label-for="input-contact"
            description="Enter your contact"
        >
          <b-form-input
              ref="input-contact"
              id="input-contact"
              type="text"
              v-model="editExistingContact.contact"
              placeholder="Enter contact"
              required
          ></b-form-input>
        </b-form-group>
        <b-button hidden ref="modalEditSubmit" type="submit"></b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import CardTemplate from "@/components/parts/cardTemplate";

export default {
  name: "contactsForm",
  components: {CardTemplate},
  data(){
    return{
      contacts:{},
      newContact:{
        idPerson: this.$route.params.id,
        idContactType: null,
        contact:''
      },
      editExistingContact:{
        idContact:'',
        idPerson: this.$route.params.id,
        idContactType:'null',
        contact:''
      },
      fields:[
        {key:'idContactType'},
        {key:"contact"},
        {key:"Actions"}
      ],
      idContactType:{
        null: 'Choose',
        1: 'facebook',
        2: 'skype',
        3: 'tel',
        4: 'email',
        5: 'jabber',
        6: 'web'
      },
      modalContactType: null,
      modalContact: null
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
    insertContact(event) {
      event.preventDefault()
      axios.post("http://localhost:8080/contacts/", this.newContact)
          .then((res)=>{
            console.log(res)
            this.getPersonsContacts()
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
    editContact(event) {
      event.preventDefault()
      axios.put("http://localhost:8080/contacts/", this.editExistingContact)
          .then((res)=>{
            console.log(res)
            this.getPersonsContacts()
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
            const index = this.contacts.findIndex(contact=>contact.idContact == id);
            if (~index){
              this.contacts.splice(index,1);
            }
          })
    },
    setAndShowModal($bvModal, row)
    {
      this.editExistingContact.idContact = row.item.idContact
      this.editExistingContact.idContactType = row.item.idContactType
      this.editExistingContact.contact = row.item.contact
      $bvModal.show('editContactModal')
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
.buttonEdit
{
  margin-left: 2%;
  background: #238484;
}
.buttonDelete
{
  margin-left: 2%;
  background: #921b1b;
}
</style>