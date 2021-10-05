<template>
  <div>
    <card-template #form ref="cardTemplate">
      <b-table striped hover  ref="table" :items="relations" :fields="fields">
        <template #cell(nickname)="row">
          <span>{{personsKeyPair[row.item.idPerson2]}}</span>
        </template>
        <template #cell(firstName)="row">
          <span>{{persons[row.item.idPerson2].firstname}}</span>
        </template>
        <template #cell(lastName)="row">
          <span>{{persons[row.item.idPerson2].lastname}}</span>
        </template>
        <template #cell(idRelationType)="row">
          <span>{{idRelationType[row.item.idRelationType]}}</span>
        </template>
        <template #cell(Description)="row">
          <span>{{row.item.description}}</span>
        </template>
        <template #cell(Actions)="row">
          <b-button @click="setAndShowModal($bvModal, row)" class="buttonEdit">Edit</b-button>
          <b-button @click="deleteItem(row.item.idRelation)" class="buttonDelete">Delete</b-button>
        </template>
      </b-table>
      <b-button ref="newRelationButton" @click="$bvModal.show('insertModal')" class="btn btn-primary">New description</b-button>
    </card-template>

    <b-modal id="insertModal" ref="insertModal" @ok="$refs.modalInsertSubmit.click();">
      <b-form ref="modalForm" @submit="insert" >
        <b-form-group
            id="input-group-person2"
            label="Person:"
            label-for="input-person2"
        >
          <b-form-select
              ref="input-person2"
              id="input-person2"
              v-model="newRelation.idPerson2"
              :options="personsKeyPair"
              required
          ></b-form-select>
        </b-form-group>
        <b-form-group
            id="input-group-relationType"
            label="Contact type:"
            label-for="input-relationType"
        >
          <b-form-select
              ref="input-relationType"
              id="input-relationType"
              v-model="newRelation.idRelationType"
              :options="idRelationType"
              required
          ></b-form-select>
        </b-form-group>
        <b-form-group
            id="input-group-description"
            label="Description:"
            label-for="input-description"
            description="Enter your description"
        >
          <b-form-input
              ref="input-description"
              id="input-description"
              type="text"
              v-model="newRelation.description"
              placeholder="Enter description"
          ></b-form-input>
        </b-form-group>
        <b-button ref="modalInsertSubmit" type="submit" hidden> </b-button>
      </b-form>
    </b-modal>

    <b-modal id="editModal" ref="editModal" @ok="$refs.modalEditSubmit.click()">
      <b-form ref="modalForm" @submit="edit">
        <b-form-group
            id="input-group-contactType"
            label="Contact type:"
            label-for="input-contactType"
        >
          <b-form-select
              ref="input-contactType"
              id="input-contactType"
              v-model="editExistingRelation.idPerson2"
              :options="personsKeyPair"
              required
          ></b-form-select>
        </b-form-group>
        <b-form-group
            id="input-group-relationType"
            label="Relation type:"
            label-for="input-relationType"
        >
          <b-form-select
              ref="input-relationType"
              id="input-relationType"
              v-model="editExistingRelation.idRelationType"
              :options="idRelationType"
              required
          ></b-form-select>
        </b-form-group>
        <b-form-group
            id="input-group-description"
            label="Description:"
            label-for="input-description"
            description="Enter your description"
        >
          <b-form-input
              ref="input-description"
              id="input-description"
              type="text"
              v-model="editExistingRelation.description"
              placeholder="Enter description"
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
  name: "relationsForm",
  components: {CardTemplate},
  data(){
    return{
      persons:null,
      personsKeyPair:{null: 'Choose'},
      relations:{},
      newRelation:{
        idPerson1: this.$route.params.id,
        idPerson2: null,
        idRelationType: null,
        description:''
      },
      editExistingRelation:{
        idRelation:'',
        idPerson1: this.$route.params.id,
        idPerson2: '',
        idRelationType: null,
        description: 'brr'
      },
      fields:[
        {key:'Nickname'},{key:'firstName'},{key:'lastName'},
        {key:'idRelationType'},
        {key:"Description"},
        {key:"Actions"}
      ],
      idRelationType:{
        null: 'Choose',
        1: 'friend',
        2: 'enemy',
        3: 'partner',
        4: 'colleague',
        5: 'acquaintance',
        6: 'lover',
        7: 'family',
        8: 'spouse'
      },
      modalContactType: null,
      modalContact: null
    }
  },
  created() {
    this.getPersonsRelations();
    this.getPersons()
  },
  mounted() {
    this.$refs.cardTemplate.$refs.cardButton.textContent = 'Relations'
    this.$refs.cardTemplate.$refs.cardTitle.textContent = 'Relations'
  },
  methods:{
    getPersons(){
      axios.get("http://localhost:8080/persons")
          .then((response)=> {
            // response.data.map(sugma=>console.log(sugma))
            this.persons = response.data;
            // console.log(this.persons)
            this.persons.map((bruh, index) =>
                this.personsKeyPair[index] = bruh.nickname)
            this.getPersonsRelations()

          });
    },
    getPersonsRelations(){
      axios.get("http://localhost:8080/relations/"+ this.$route.params.id)
          .then((response)=> {
            this.relations = response.data;
          });
    },
    insert(event) {
      event.preventDefault()
      axios.post("http://localhost:8080/relations/", this.newRelation)
          .then((res)=>{
            console.log(res)
            this.getPersonsRelations()
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
    edit(event) {
      event.preventDefault()
      axios.put("http://localhost:8080/relations/", this.editExistingRelation)
          .then((res)=>{
            console.log(res)
            this.getPersonsRelations()
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
      axios.delete("http://localhost:8080/relations/"+id)
          .then(response=>{
            console.log(response);
            const index = this.relations.findIndex(description=>description.idRelation == id);
            if (~index){
              this.relations.splice(index,1);
            }
          })
    },
    setAndShowModal($bvModal, row)
    {
      this.editExistingRelation.idRelation = row.item.idRelation
      this.editExistingRelation.idPerson2 = row.item.idPerson2
      this.editExistingRelation.idRelationType = row.item.idRelationType
      this.editExistingRelation.description = row.item.description
      $bvModal.show('editModal')
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