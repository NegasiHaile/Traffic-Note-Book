<template>
  <div class="container-fluid" style="margin-top: -45px;">
     <br />
      <div class="d-flex justify-content-center">
        <div class="col-12 col-md-8">
          <div class="card shadow-sm bg-info">
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div class="col-10">
                  <div class="mt-5">
                    <h5 class="text-center text-light"> {{ logedInAdmin.email }}</h5>
                    <h6 class="text-center mt-2"> Welcome: you have logged in as Adminstrator</h6>
                  </div>
                  <p class="text-center text-light mt-3">
                    As long as you accessed this application as an administrator you have, you have 
                    a hard responsibility, so be careful for these. Especially who  you are allowing to access this 
                    system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    <div class="col-12">
      <div class="border-bottom mb-2">
        <h4 class="texr-start">Dashboard</h4>
      </div>
      <div class="row">
        <div class="col-md-8 mt-3">
          <div class="col-12">
            <div class="shadow-sm p-2">
              <p class="text-start p-1">
                This is the Adminstrator page area. In this arae an adminstrator can have the
                responsibility to manage the whole tasks can be operated through, such as 
                <ul>
                    <li>Allow new traffic to to have an access to the traffic pages.</li>
                    <li>Allow another adminstrator to work in this area.</li>
                    <li>See every records and deep detail about every records.</li>
                </ul>

              </p>
            </div>
          </div>

          <div class="col-12 mt-3">
            <div class="row">
              <div class="col-12 col-md-6 mt-3">
                <div class="card shadow-sm">
                  <div class="card-header bg-info">
                    <div class="d-flex justify-content-between">
                      <p class="text-light">Number of Admins</p>
                      <h4 class="text-light">{{Admins.length}}</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <p>Adminstrators are classified in three resiponisibilities. 
                        First-leve, Second-leve and super-level which have different tasks</p>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6 mt-3">
                <div class="card shadow-sm">
                  <div class="card-header bg-success">
                    <div class="d-flex justify-content-between">
                      <p class="text-light">Number of traffics</p>
                      <h4 class="text-light">{{Traffics.length}}</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <p>There are {{Traffics.length}} registered traffics allowed to record data of violations 
                        crimes and collisions and otheres made by the drivers.
                    </p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 mt-3">
                <div class="card shadow-sm">
                  <div class="card-header bg-danger">
                    <div class="d-flex justify-content-between">
                      <p class="text-light"> Number of Records</p>
                      <h4 class="text-light">{{Records.length}}</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <p>This app sayas there are around {{Records.length}} recorded dats still know. </p>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-6 mt-3">
                <div class="card shadow-sm">
                  <div class="card-header bg-secondary">
                    <div class="d-flex justify-content-between">
                      <p class="text-light">Number of Defiant records</p>
                      <h4 class="text-light">{{Deviants.length}}</h4>
                    </div>
                  </div>
                  <div class="card-body">
                    <p>And also enabled to get for around {{Deviants.length}} deviants 
                        (Drivers try to escap after they made vilolation). </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 mt-3">
          <div class="col-12 mt-3">
            <div class="card">
              <div class="border-bottom p-2">
                <h6 class="text-center">Active and Recent Deviants</h6>
              </div>
              <div class="card-body">
                <p class="text muted" v-for='(deviant, index) in Deviants' :key='index'>
                  {{index}} 
                  <nuxt-link :to="`/SAdmin/Deviants/${deviant.id}`"
                    >: <span class="text-danger">{{deviant.Subject}}</span>/  {{deviant.Discription}}</nuxt-link
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase/app'

export default {
  head: {
      title: 'Admin Area-Traffic-Note-Book'
  },
    data(){
        return{
            Traffics: [],
            Admins: [],
            Records: [],
            Deviants: [],
            logedInAdmin: [],
            
        }
    },
  created(){
    this.loggedInUser()
    this.accountsAmount()
    this.recordsData()
},
  methods: {
    loggedInUser(){
      firebase.auth().onAuthStateChanged(user =>{
        this.logedInAdmin = user;
      })
    },
    accountsAmount() {
      firebase
        .firestore()
        .collection('AccountsInfo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().AccountType == 'Admin') {
              this.Admins.push(doc.data())
            } else if (doc.data().AccountType == "Traffic") {
              this.Traffics.push(doc.data())
            }
          })
        })
    },

    recordsData(){
        firebase
        .firestore()
        .collection('Records')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
             this.Records.push(doc.data())
          })
        }),
        firebase
        .firestore()
        .collection('deviants')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if(doc.data().Status == 'Active'){
             this.Deviants.push(doc.data())
            }
          })
        })
    },

  },

//   created() {
//       this.accountsAmount();
//   },

    getparamId() {
      return this.$route.params.type
    },
  };
</script>

<style lang="scss" scoped>
</style>