<template>
  <div>
    <div style="min-height: 540px;">
    <b-navbar toggleable="lg" type="dark" variant="info" class="p-3 fixed-top">
      <b-navbar-brand href="/SAdmin/" class="logo"><b>Traffic-Note</b></b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/SAdmin/">Home</b-nav-item>
          <b-nav-item to="/SAdmin/Deviants/">Deviants</b-nav-item>
          <b-nav-item to="/SAdmin/Records/">Records</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Traffics</em>
            </template>
            <b-dropdown-item to="/SAdmin/Registertraffic"
              >Register new traffic</b-dropdown-item
            >
            <b-dropdown-item to="/SAdmin/TrafficsList"
              >List of trafics</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Account</em>
            </template>
            <b-dropdown-item><nuxt-link :to="`/SAdmin/Admins/${user.email}`">Profile</nuxt-link> </b-dropdown-item>
            <b-dropdown-item to="/SAdmin/ChangePassword">Change password</b-dropdown-item
            >
            <li><hr class="dropdown-divider" /></li>
            <b-dropdown-item to="/SAdmin/AddNewAdmin">Add new Admin</b-dropdown-item>
            <b-dropdown-item to="/SAdmin/Admins/">Allowed Admins</b-dropdown-item>
            <li><hr class="dropdown-divider" /></li>
            <b-dropdown-item href="#" class="text-center"
             @click="signOut" >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <Nuxt />
    </div>
    <Footer />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data(){
      return{
        user: '',
      }
  },
  mounted(){
    firebase.auth().onAuthStateChanged(user =>{
      this.user = user;
    })
  },
  methods:{
    signOut(){
      firebase.auth().signOut().then(result => {
        this.user = '';
        this.$router.push('/');
      })
    },
  }
};
</script>

<style scoped>
.logo{
  font-family: 'Lucida Handwriting', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
</style>