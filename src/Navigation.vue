<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" >
      <b-navbar-brand href="#" class="navBarMargin">NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav class="navBarStyling">
          <b-navbar-nav>
            <b-nav-item href="#/">Persons</b-nav-item>
            <b-nav-item href="#/newperson" >New Person</b-nav-item>
         </b-navbar-nav>

        <b-navbar-nav class="ml-auto searchAlign">
          <b-nav-form form-class="searchBox">
            <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
name: "NavigationBar"
}
</script>

<style scoped>
.searchAlign
{
  margin-left: auto;
  margin-right: 1%;
}
.navBarMargin
{
  margin: 0.5%;
}
.searchBox
{
  display: flex;
  flex-direction: row;
}
</style>