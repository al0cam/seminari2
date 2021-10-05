<template>
  <div>
    <b-button
        class="mainButtonStyle"
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="visible = !visible"
        ref="cardButton"
    >
      Button
    </b-button>
    <b-collapse id="collapse-4" v-model="visible" class="mt-2">
      <b-card>
        <b-card-header>
          <h1 ref="cardTitle">Header</h1>
        </b-card-header>
        <b-card-body>
          <slot ref="formSlot" name="form"/>
          <slot ref="formSlot" name="form1"/>
        </b-card-body>
      </b-card>
    </b-collapse>
  </div>
</template>

<script>

export default {
  name: "cardTemplate",
  data(){
    return{
      visible: false,
    }
  },
  methods:{
    buttonChangeState(buttonSave, buttonEdit, inputArray)
    {
      console.log("lesgooo")
      if(buttonEdit.textContent == "Edit")
      {
        buttonEdit.textContent = "Cancel";
        buttonSave.hidden = false;
        buttonEdit.classList.add("buttonColorChangeRed")
      }
      else
      {
        buttonEdit.textContent = "Edit";
        buttonSave.hidden = true;
        buttonEdit.classList.remove("buttonColorChangeRed")
      }

      inputArray.forEach(value => {
        let item = document.getElementById(value)
        item.disabled = !item.disabled;
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
.mainButtonStyle
{
  margin-left: 10%;
  width: 80%;
  font-size: 230%;
  background: #53AC89;
}
</style>