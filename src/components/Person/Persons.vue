<template>
<div>
  <b-container>
    <h1>List of persons</h1>
    <b-table striped hover :items="persons" :fields="fields">
      <template #cell(actions)="row">
        <b-button @click="viewItem(row.item.idPerson)" class="buttonView">View</b-button>
        <b-button @click="editItem(row.item.idPerson)" class="buttonEdit">Edit</b-button>
        <b-button @click="deleteItem(row.item.idPerson)" class="buttonDelete">Delete</b-button>
      </template>
    </b-table>

  </b-container>
</div>
</template>

<script>
import axios from 'axios';
export default {
name: "Persons.vue",
  data(){
    return {
    persons:[], errors: [],
    fields:[
      {key:"idPerson", sortable: true},
      {key:"nickname"},
      {key:"firstname"},
      {key:"lastname"},
      {key:"birthday"},
      {key:"height"},
      {key:'gender'},
      {key:"actions"}
    ]}
  },
  created() {
    axios.get("http://localhost:8080/persons")
    .then(response => {
          this.persons = response.data
          this.persons.forEach(person=> {person.birthday = new Date(person.birthday).toISOString().substr(0, 10), console.log(person)})

        }
    )
    .catch(e => (this.errors.push(e)))
  },
  mounted() {
  },
  methods:{
  deleteItem(id){
    axios.delete("http://localhost:8080/persons/"+id)
    .then(response=>{
      console.log(response);
      const index =this.persons.findIndex(person=>person.idPerson ==id);
      if (~index){
        this.persons.splice(index,1);
      }
    })
  },
  editItem(id){
    this.$router.push({path:"/editperson/"+id})
  },
  viewItem(id){
  this.$router.push({path:"/viewPerson/"+id})
  }

  }
}
</script>

<style scoped>
.buttonView
{
  margin-left: 2%;
  background: #6f8bdb;
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