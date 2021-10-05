<template>
  <div>
    <person-form></person-form>
    <location-form></location-form>
    <contacts-form></contacts-form>
    <relations-form></relations-form>
  </div>
</template>

<script>
import PersonForm from "@/components/parts/personForm";
import LocationForm from "@/components/parts/locationForm";
import ContactsForm from "@/components/parts/ContactsForm";
import RelationsForm from "@/components/parts/RelationsForm";
export default {
  name: "EditPerson",
  components: {RelationsForm, ContactsForm, LocationForm, PersonForm},

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