<template>
  <div class="container mb-4" style="margin-top: 90px">
    <div class="col-12">
      <div class="row">
        <div class="col-10 col-md-8">
          <div v-bind:class="alrtTyp.dsply">
      <b-alert show dismissible v-bind:class="alrtTyp.type">
        {{alrtTyp.message}} <b>&rArr;</b>
      </b-alert>
    </div>
          <div class="card shadow-lg">
            <div class="card-header">
              <p class="text-start">Expose a defiant here</p>
            </div>
            <div class="card-body">
              <div class="mb-1">
                <form class="row" @submit.prevent="saveDefiant">
                  <div class="col-md-6 mt-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Vehcle Id"
                      v-model="NewDefiant.Plate"
                      required
                    />
                  </div>
                  <div class="col-md-6 mt-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Location"
                      aria-label="Location"
                      v-model="NewDefiant.Location"
                      required
                    />
                  </div>
                  <div class="col-md-12 mt-3">
                    <select
                      id="RecordCatagory"
                      class="form-control form-select"
                      v-model="NewDefiant.Subject"
                      required
                    >
                      <option disabled selected>Crime Subject</option>
                      <option value="Viloation">Viloation</option>
                      <option value="Collision">Collision</option>
                      <option value="Crime">Crime</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div class="col-md-12 mt-3">
                    <textarea
                      class="form-control"
                      placeholder="Write the Discription here."
                      id="recordDiscription"
                      style="height: 75px"
                      v-model="NewDefiant.Discription"
                    ></textarea>
                  </div>
                  <div class="col-12">
                    <div class="d-flex justify-content-center">
                      <div class="col-10 col-md-6 mt-3">
                        <button type="submit" class="btn btn-info w-100">
                          Expose Defiant                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="card-footer"></div>
          </div>
        </div>

        <div class="col-10 col-md-8 mt-3">
          <div class="card">
            <div class="card-header">
              <p class="text-muted">Deviants list</p>
            </div>
            <div
              class="card-body"
              style="max-height: 400px; overflow-y: scroll"
            >
              <div class="card">
                <div class="table-responsive">
                  <table class="table table-hover" style="width: 100%">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Plate</th>
                        <th scope="col">Event Location</th>
                        <th scope="col">Subject</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(defiant, index) in Deviants" :key="index">
                        <th scope="row">{{index}}</th>
                        <td>{{ defiant.Plate }}</td>
                        <td>{{ defiant.Location }}</td>
                        <td>{{ defiant.Subject }}</td>
                        <td>
                          <a
                            href="#"
                            class="text-danger"
                            @click="deleteDefiant(defiant, index)"
                            >Delete</a
                          >
                        </td>
                        <td><a href="#" @click="setNewId">See Detail</a></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import firebase from 'firebase/app';
import 'firebase/auth'

export default {

data() {
  
    return {
      NewDefiant:{
        id: this.generateId(),
        Plate: "",
        Location: "",
        Subject: "",
        Discription: "",
        Status: 'Active',
        RecoredDate: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        Recorder:{
          Email: '',
          PhoneNo: '',
          ProffName: '',
          FullName: '',
        },
      },

      alrtTyp:{
          dsply: 'd-none',
          type: 'alert-success',
          message: ''
      },

      logedin: '',
    };
  },

  computed() {
    this.TrafficDtail();
  },
  
  mounted() {
    firebase.auth().onAuthStateChanged(user =>{
      this.logedin = user;
    }),

    firebase.firestore().collection("deviants").get().then((res) =>{
      res.forEach(x => {
        this.$store.commit('setDefiant', x.data()) // logical error 
      });
    }),
    firebase.firestore().collection("AccountsInfo").get().then((res) =>{
      res.forEach(x => {
        this.$store.commit('setAccountInfo', x.data())
      });
    })
    // alert(this.$store.state.Defiant) // loads on the page load
      },

  methods: {

    saveDefiant() {
      this.getcurrentDate();
      this.TrafficDtail();
        firebase.firestore().collection("deviants").add(this.NewDefiant).then((res) =>{
            this.resetfields()
        }).then(() =>{
           this.$store.commit('addDefiant', this.NewDefiant)
           this.alrtTyp.dsply= 'd-block',
          this.alrtTyp.type= 'alert-success',
          this.alrtTyp.message= 'Defiant Exposed successfuly!'
        }).catch(err=> {
          this.alrtTyp.dsply= 'd-block',
          this.alrtTyp.type= 'alert-danger',
          this.alrtTyp.message= err
        })
        },

      TrafficDtail(){
       var Accounts = this.$store.state.AccountsInfo
       var index = Accounts.findIndex(Account => Account.Email == this.logedin.email)
       this.NewDefiant.Recorder.PhoneNo = Accounts[index].PhoneNo
       this.NewDefiant.Recorder.Email = Accounts[index].Email;
       this.NewDefiant.Recorder.ProffName = Accounts[index].ProffName;
       this.NewDefiant.Recorder.FullName = Accounts[index].FName + " "+ Accounts[index].MName;
       console.log('Recorder Detail: ' + Accounts[index].Email)
    },

      resetfields(){
        Object.assign(this.$data, this.$options.data())
    },


    setNewId(){
      alert(this.generateId())
      //this.TrafficDtail()
      // var newid = firebase.firestore().collection("deviants").doc(res.id)
      // alert (newid)

    },

    deleteDefiant(defiant, index) {
     var confirmed = confirm('Are you sure you want to delete this item?');
     if(confirmed){
       firebase.firestore().collection('deviants').doc(defiant.id).delete().then(() =>{
        this.$store.commit('deleteDefiant', index);
      })
     }
    },
    
    getcurrentDate(){
      var currentDate = new Date();
      var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      this.NewDefiant.RecordDate = currentDateWithFormat;
      //console.log(currentDateWithFormat);       
    },
       generateId(){
      var length = 9,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        return retVal;
    }
  },
};
</script>

<style scoped>
</style>