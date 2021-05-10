<template>
  <div>
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
        class="p-3 fixed-top"
      >
        <b-navbar-brand class="logo"><b><nuxt-link class="nav-item text-light l-item" to="/Traffic">Traffic-Note</nuxt-link></b></b-navbar-brand>
          <b-navbar-brand class="defiantIcon"><b>
            <nuxt-link class="nav-item text-light notification" to="/Traffic">{{ActiveDeviants.length}}</nuxt-link></b>
            </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
              <!-- <nuxt-link class="nav-item" to="/Traffic">Home</nuxt-link> -->
            <b-nav-item><nuxt-link class="nav-item text-light l-item" to="/Traffic">Home</nuxt-link></b-nav-item>
            <b-nav-item-dropdown text="Deviants" right>
              <nuxt-link class="dropdown-item" to="/Traffic/ExposeDefiant">Expose Defiant</nuxt-link>
              <li><hr class="dropdown-divider" /></li>
              <!-- <b-dropdown-item :to="'/Traffic/Deviants/' + 'Active'">Active Deviants</b-dropdown-item>
              <b-dropdown-item :to="'/Traffic/Deviants/' + 'Down'">Down Deviants</b-dropdown-item> -->
              <li><hr class="dropdown-divider" /></li>
              <nuxt-link class="dropdown-item" to="/traffic/Deviants">Deviants list</nuxt-link>
            </b-nav-item-dropdown>
            
            <b-nav-item-dropdown text="Records" right>
              <nuxt-link class="dropdown-item" to="/traffic/CreateRecord">Make Record</nuxt-link>
              <li><hr class="dropdown-divider" /></li>
              <li><hr class="dropdown-divider" /></li>
              <nuxt-link class="dropdown-item" to="/traffic/Records">Records List</nuxt-link>
            </b-nav-item-dropdown>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item center to="/SAdmin/Profile"><small>{{user.email}}</small></b-nav-item> -->
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{user.email}}</em>
              </template>
              <nuxt-link class="dropdown-item" :to="`/Traffic/${user.email}`">Profile</nuxt-link>
              <nuxt-link class="dropdown-item" to="/Traffic/ChangePassword">Change password</nuxt-link>
              
              <li><hr class="dropdown-divider" /></li>
              <b-dropdown-item href="#" class="text-center"
               @click="signOut" >Sign Out</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    <div style="min-height: 540px">
      <Nuxt />
    </div>
    <div class="mt-2">
      <Footer />
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data(){
      return{
        user: '',
        ActiveDeviants: [],
      }
  },
    
  mounted(){
    firebase.auth().onAuthStateChanged(user =>{
      this.user = user;
    }),
    
    this.OnActiveDeviants();
  },
  methods:{
    OnActiveDeviants() {
      firebase
        .firestore()
        .collection('deviants')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().Status == 'Active') {
              this.ActiveDeviants.push(doc.data())
            }
          })
        })
    },

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
  font-family: 'Lucida Calligraphy', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.l-item:hover{
  text-decoration: none;
}
  .notification {
  background-color: rgb(212, 79, 79);
  color: white;
  text-decoration: none;
  padding: 4px 12px;
  position: relative;
  display: inline-block;
  border-radius: 50%;
  text-decoration: none;
}

</style>