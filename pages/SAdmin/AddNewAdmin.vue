<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="col-12 col-md-10 col-lg-8">
        <div v-bind:class="alrtTyp.dsply">
          <b-alert show dismissible v-bind:class="alrtTyp.type">
            {{alrtTyp.message}} <nuxt-link to="/SAdmin/Admins"> Find the list</nuxt-link> <b>&rArr;</b>
          </b-alert>
        </div>
        <div class="card shadow-sm">
          <div class="card-header">
            <p class="text-center text-muted">
              Add new addmin who can work in this area.
            </p>
          </div>
          <form @submit.prevent="addNewAdmin" class="card-body">
            <div class="row">
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Full name"
                  v-model="Admin.FName"
                  required
                />
              </div>
              
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Full name"
                  v-model="Admin.MName"
                  required
                />
              </div>
              <div class="col-md-4 mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Full name"
                  v-model="Admin.LName"
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <select id="disabledSelect" class="form-control form-select" v-model="Admin.ProffName" 
                required>
                <option value="unassigned" disabled selected>Proffessional name</option>
                <option value="Sagin">Sagin</option>
                <option value="Vice Sagin">Vice Sagin</option>
                <option value="Constable">Constable</option>
                <option value="Inspector">Inspector</option>
                <option value="Vice Inspector">Vice Inspector</option>
              </select>
              </div>
              <div class="col-md-6 mb-3">
                <div class="row">
                  <div class="col-4">
                    <label class="text-muted"><b>Gender:</b></label>
                  </div>
                  <div class="form-check col-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="Gender"
                      id="gridRadios1"
                      value="Male"
                      v-model="Admin.Gender"
                      checked
                    />
                    <label class="form-check-label" for="gridRadios1">
                      Male
                    </label>
                  </div>
                  <div class="form-check col-4">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="Gender"
                      id="gridRadios2"
                      value="Female"
                      v-model="Admin.Gender"
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Female
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="number"
                  class="form-control"
                  placeholder="Phone Number"
                  v-model="Admin.PhoneNo"
                  required
                />
              </div>
              <div class="col-md-6 mb-3">
                <input
                  type="email"
                  class="form-control"
                  placeholder="Email (TrafficAdmin@gmail.com)"
                  v-model="Admin.Email"
                  required
                />
              </div>
              <div class="col-12 mb-3">
                <div class="row">
                  <div class="col-12 col-md-3">
                    <label class="text-muted"><b>Responsibility:</b></label>
                  </div>
                  <div class="form-check col-4 col-md-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="Responsibility"
                      id="gridRadios1"
                      value="First-Level"
                      v-model="Admin.Responsibility"
                      checked
                    />
                    <label class="form-check-label" for="gridRadios1">
                      First Level
                    </label>
                  </div>
                  <div class="form-check col-4 col-md-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="Responsibility"
                      id="gridRadios2"
                      value="Second-Level"
                      v-model="Admin.Responsibility"
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Seond-level
                    </label>
                  </div>
                  <div class="form-check col-4 col-md-3">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="Responsibility"
                      id="gridRadios2"
                      value="Super-Level"
                      v-model="Admin.Responsibility"
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Super-level
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-12 mb-3">
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Create Password"
                    aria-label="cratrpassword"
                    required
                    v-model="Password"
                  />
                  <small @click="generatePassword"
                    class="btn btn-secondary input-group-text"
                    id="basic-addon1"
                  >
                    Auto password
                  </small>
                </div>
                <small class="text-muted">Create a password for the user by clicking the generate password 
                  button or choose a strong one and type it or by default (AdminTraffic@123)</small>
              </div>
              <div class="col-12">
                <div class="d-flex justify-content-center">
                  <div class="col-8 col-md-6">
                    <button type="submit" class="btn btn-info w-100">{{saveAdminDetailbtn}}</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="card-footer">
              <small>Read out right below to understand what tasks have the level of admin responsibilties.  </small>
          </div>

          <div class="col-12 mt-3">
              <small class="text-muted">
                  <ul class="row">
                      <li class="col-md-4">First-Level 
                          <ul>
                              <li>Access evey data</li>
                              <li>Manage Traffics Account</li>
                          </ul>
                      </li>
                      <li class="col-md-4">Second-Level 
                          <ul>
                              <li>All the First level can do</li>
                              <li>Add new traffic</li>
                          </ul>
                      </li>
                      <li class="col-md-4">Super-Level 
                          <ul>
                              <li>All the minor levels can do</li>
                              <li>Manage admin accounts </li>
                          </ul>
                      </li>
                  </ul>
              </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data(){
      return{
        Admin:{
          FName: '',
          MName: '',
          LName: '',
          Gender: '',
          ProffName: '',
          Responsibility: '',
          PhoneNo: '',
          Email: '',
          AccountType: 'Admin',
          AccountStatus: 'Active',
          RegisrationDate: '',
        },

        
        Password: 'Traffic@123',
        AccountsInfo: [],

        saveAdminDetailbtn: 'Save Admin Detail',  
        alrtTyp:{
          dsply: 'd-none',
          type: 'alert-success',
          message: ''
      },
      }
  },
   created() {
      this.CheckAccount();
  },

  methods:{
    addNewAdmin(){
      this.saveAdminDetailbtn = 'Saving ...'
      this.getcurrentDate();
      var accountIndex = this.AccountsInfo.findIndex(Account => Account.Email == this.Admin.Email)

      if(accountIndex == -1){
        firebase.auth().createUserWithEmailAndPassword(this.Admin.Email, this.Password).then(user =>{
              
            }).catch(err => {
              this.alrtTyp.dsply = 'd-block';
              this.alrtTyp.type = 'alert-danger';
              this.alrtTyp.message = err;
             } ),

              firebase.firestore().collection("AccountsInfo").add(this.Admin).then((res) =>{
                  
              }).then(() =>{
                this.resetfields()
                this.CheckAccount();
                this.saveAdminDetailbtn = 'Save Admin Detail';
                this.alrtTyp.dsply= 'd-block',
                this.alrtTyp.type= 'alert-success',
                this.alrtTyp.message= 'Adminstrator have been registered successfuly!'
              }).catch(err=> {
                this.CheckAccount();
          this.saveAdminDetailbtn = 'Save Admin Detail';
                this.alrtTyp.dsply= 'd-block',
                this.alrtTyp.type= 'alert-danger',
                this.alrtTyp.message= err
              })
        }
        else{
          this.CheckAccount();
          this.saveAdminDetailbtn = 'Save Admin Detail';
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
        this.Password = retVal;
    },

    getcurrentDate(){
      var currentDate = new Date();
      var currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      this.Admin.RegisrationDate = currentDateWithFormat;   
    },
    resetfields(){
        Object.assign(this.$data, this.$options.data())
    },
  }

  
};
</script>

<style scoped>
</style>