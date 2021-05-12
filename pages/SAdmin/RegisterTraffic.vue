<template>
  <div class="container mt-4 mb-4">
    <div v-bind:class="alrtTyp.dsply">
      <b-alert show dismissible v-bind:class="alrtTyp.type">
        {{alrtTyp.message}} <nuxt-link to="/SAdmin/TrafficsList"> Find the list</nuxt-link> <b>&rArr;</b>
      </b-alert>
    </div>
    <div class="card shadow-sm">
      <div class="card-header">
        <h4 class="text-center text-muted">Traffic Regstration</h4>
      </div>
      <div class="card-body">
        <div class="col-12 mt-3 mb-3">
          <form class="row" @submit.prevent="registerTraffic">
            <div class="col-md-4 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="First name"
                aria-label="First name"
                v-model="Traffic.FName"
                required
              />
            </div>
            <div class="col-md-4 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Middle name"
                aria-label="Middle name"
                v-model="Traffic.MName"
                required
              />
            </div>

            <div class="col-md-4 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Last name"
                aria-label="Last name"
                v-model="Traffic.LName"
                required
              />
            </div>
            <div class="col-md-4 mt-3">
              <div class="row">
                <div class="col-4">
                  <label class=""><b>Gender:</b></label>
                </div>
                <div class="form-check col-4">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios1"
                    value="Male"
                    v-model="Traffic.Gender"
                  />
                  <label class="form-check-label" for="gridRadios1">
                    Male
                  </label>
                </div>
                <div class="form-check col-4">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="gridRadios"
                    id="gridRadios2"
                    value="Female"
                    v-model="Traffic.Gender"
                  />
                  <label class="form-check-label" for="gridRadios2">
                    Female
                  </label>
                </div>
              </div>
            </div>
            <div class="col-md-4 mt-3">
              <select id="disabledSelect" class="form-control form-select" v-model="Traffic.ProffName" 
                required>
                <option value="unassigned" disabled selected>Proffessional name</option>
                <option value="Sagin">Sagin</option>
                <option value="Vice Sagine">Vice Sagin</option>
                <option value="Constable">Constable</option>
                <option value="Inspector">Inspector</option>
                <option value="Vice Inspector">Vice Inspector</option>
              </select>
            </div>
            
            <div class="col-md-4 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Responsiblity "
                aria-label="Proffessional name"
                v-model="Traffic.Responsibility"
              />
            </div>
            <div class="col-md-6 mt-3">
              <input
                type="number"
                class="form-control"
                placeholder="Phone Number"
                aria-label="Phone Number"
                v-model="Traffic.PhoneNo"
                required
              />
            </div>
            <div class="col-md-6 mt-3">
              <input
                type="email"
                class="form-control"
                placeholder="Traffic Email"
                aria-label="Traffic Email"
                v-model="Traffic.Email"
                required
              />
            </div>
            <div class="col-12 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Traffic Full Address"
                aria-label="Traffic Full Address"
                v-model="Traffic.Address"
              />
            </div>
            <br />
            <div class="col-md-6 mt-3">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Create Password"
                  :value="Traffic.Password"
                required
                />
                <label
                  class="btn btn-secondary input-group-text"
                  id="basic-addon1"
                @click="generatePassword">
                  <small>Auto Password</small>
                </label>
              </div>
            </div>
            <div class="col-md-6 mt-3">
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-info">Submit Traffic Detail</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div class="card-footer">
        <b-list-group-item class="d-flex align-items-center">
          <b-avatar
            variant="success"
            icon="people-fill"
            class="mr-3"
          ></b-avatar>
          <span class="mr-auto"
            >Registering new traffic means, Allowing the terffic to access this
            system much of another traffics can access.
          </span>
          <b-badge>!</b-badge>
        </b-list-group-item>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  data(){
    return{
      Traffic:{
        FName: '',
        MName: '',
        LName: '',
        Gender: '',
        ProffName: '',
        Responsibility: '',
        PhoneNo: '',
        Email: '',
        Address: '',
        Password: 'Traffic@123',
        AccountType: 'Traffic',
        AccountStatus: 'Active',
        RegisrationDate: '',
      },
      AccountsInfo: [],
      
      alrtTyp:{
        dsply: 'd-none',
        type: 'alert-success',
        message: ''
      },

    };
  },

   created() {
      this.CheckAccount();
  },

  methods: {
    registerTraffic(){

      this.getcurrentDate();
      var accountIndex = this.AccountsInfo.findIndex(Account => Account.Email == this.Traffic.Email)
      // alert(accountIndex)
      if(accountIndex == -1){
        firebase.auth().createUserWithEmailAndPassword(this.Traffic.Email, this.Traffic.Password).then(user =>{
              
            }).catch(err => {
              this.alrtTyp.dsply = 'd-block';
              this.alrtTyp.type = 'alert-danger';
              this.alrtTyp.message = err;
             } ),

              firebase.firestore().collection("AccountsInfo").add(this.Traffic).then((res) =>{
                  
              }).then(() =>{
                this.resetfields()
                this.CheckAccount();
                this.alrtTyp.dsply= 'd-block',
                this.alrtTyp.type= 'alert-success',
                this.alrtTyp.message= 'Traffic have been registered successfuly!'
              }).catch(err=> {
                this.CheckAccount();
                this.alrtTyp.dsply= 'd-block',
                this.alrtTyp.type= 'alert-danger',
                this.alrtTyp.message= err
              })
        }
        else{
          this.CheckAccount();
          this.alrtTyp.dsply = 'd-block';
          this.alrtTyp.type = 'alert-danger';
          this.alrtTyp.message = "There is an account with this email, please use another email!";
        }
    },

    CheckAccount(){
      firebase
        .firestore()
        .collection('AccountsInfo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              this.AccountsInfo.push(doc.data())
          })
        })
     
    },

    generatePassword(){
      var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        this.Traffic.Password = retVal;
    },

    getcurrentDate(){
      var currentDate = new Date();
      var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      this.Traffic.RegisrationDate = currentDateWithFormat;   
    },
    resetfields(){
        Object.assign(this.$data, this.$options.data())
    },
  }
};
</script>

<style scoped>
</style>