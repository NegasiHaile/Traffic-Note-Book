<template>
  <div>
      <b-navbar
        toggleable="lg"
        type="dark"
        variant="info"
        class="p-3 fixed-top"
      >
        <b-navbar-brand class="logo"><b><nuxt-link class="nav-item text-light l-item" to="/Traffic">Traffic-Note</nuxt-link></b></b-navbar-brand>
          
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/Traffic">Home</b-nav-item>
            
            <b-nav-item-dropdown text="Records" right>
              <b-dropdown-item class="dropdown-item" to="/traffic/CreateRecord">Make Record</b-dropdown-item>
              <li><hr class="dropdown-divider" /></li>
              <li><hr class="dropdown-divider" /></li>
              <b-dropdown-item class="dropdown-item" to="/traffic/Records">Records List</b-dropdown-item>
            </b-nav-item-dropdown>
            <b-nav-item-dropdown text="Deviants" right>
              <b-dropdown-item class="dropdown-item" to="/Traffic/ExposeDefiant">Expose Defiant</b-dropdown-item>
              <li><hr class="dropdown-divider" /></li>
              <li><hr class="dropdown-divider" /></li>
              <b-dropdown-item class="dropdown-item" to="/traffic/Deviants">Deviants list</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-navbar-brand title="Active Deviants"><b>
            <a href="#" v-b-toggle.sidebar-right class="nav-item notification" to="/Traffic">{{ActiveDeviants.length}}</a></b>
            </b-navbar-brand>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item center to="/SAdmin/Profile"><small>{{user.email}}</small></b-nav-item> -->
            <b-nav-item-dropdown right>
              <template #button-content>
                <em>{{user.email}}</em>
              </template>
              <b-dropdown-item class="dropdown-item" :to="`/Traffic/${user.email}`">Profile</b-dropdown-item>
              <b-dropdown-item class="dropdown-item" to="/Traffic/ChangePassword">Change password</b-dropdown-item>
              
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
    <div>
                <b-sidebar id="sidebar-right" title="Active Deviants" sidebar-class="border-right border-danger"  right shadow>
                <div class="px-3 py-2">
                    <div class="border-bottom mb-2">
                        <p>Active defiant is: Someone made a violation but escaped.</p>
                    </div>
                    <div class="mt-2 border-bottom" v-for="(actvDfynt, index) in ActiveDeviants" :key="index">
                        <h6 class="text-muted">{{actvDfynt.Subject}}/ {{actvDfynt.RecordDate}}</h6>
                        <nuxt-link :to="`/Traffic/Deviants/${actvDfynt.id}`"> {{actvDfynt.Discription}}</nuxt-link>
                    </div>
                    
                </div>
                </b-sidebar>
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
    
  created(){
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
    color: rgb(253, 62, 62);
    background-color: rgb(238, 238, 238);
    text-decoration: none;
    padding: 4px 12px;
    position: relative;
    display: inline-block;
    border-radius: 50%;
    border: none;
    text-decoration: none;
}
.notification:hover{
  
    color: rgb(238, 238, 238);
    background-color: rgb(211, 88, 88);
}

</style>