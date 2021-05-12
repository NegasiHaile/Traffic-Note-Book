<template>
  <div class="container mb-4">
    <div v-bind:class="alrtTyp.dsply">
      <b-alert show dismissible v-bind:class="alrtTyp.type">
        {{alrtTyp.message}} <nuxt-link to="/traffic/Records"> Find the list</nuxt-link> <b>&rArr;</b>
      </b-alert>
    </div>
    <div class="card shadow-sm">
      <div class="card-header">
        <h5 class="text-center text-muted">Create Record</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="createRecord" class="col-12 mb-3">
          <div class="row">
            <div class="col-md-4 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Vehcle Id"
                aria-label="Vehcle Id"
                v-model="NewRecord.Plate"
                required
              />
            </div>
            <div class="col-md-4 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Driver Licens Id"
                aria-label="Driver Licens Id"
                v-model="NewRecord.Licens"
                required
              />
            </div>

            <div class="col-md-4 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Where? (Location)"
                v-model="NewRecord.Location"
                required
              />
            </div>
            <div class="col-md-5 mt-3">
              <select
                id="RecordCatagory"
                class="form-control form-select"
                v-model="NewRecord.Catagory"
                required
              >
                <option disabled selected>Record Catagory</option>
                <option value="Violation">Violation</option>
                <option value="Collision">Collision</option>
                <option value="Crime">Crime</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div class="col-md-7 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Record Sub Catagory"
                v-model="NewRecord.Subject"
                required
              />
            </div>
            <div class="col-md-12 mt-3">
              <textarea
                class="form-control"
                placeholder="Write somthing about how the event happen and more!."
                id="recordDiscription"
                style="height: 100px"
                v-model="NewRecord.Discription"
                required
              ></textarea>
            </div>
            <div class="col-12">
              <div class="d-flex justify-content-center">
                <div class="col-10 col-md-3 mt-3">
                  <button type="submit" class="btn btn-info w-100">{{saveRecordBtn}}</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
export default {
  data() {
    return {
      NewRecord:{
          id: '',
          Plate: '',
          Licens: '',
          Location: '',
          Catagory: '',
          Subject: '',
          Discription: '',
          RecordDate: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
          Recorder:{
            Email: '',
            PhoneNo: '',
            ProffName: '',
            FullName: '',
        },
      },

      logedin: '',

      saveRecordBtn: 'Save Record',

      alrtTyp:{
          dsply: 'd-none',
          type: 'alert-success',
          message: ''
      }
    }
  },

  computed() {
    this.TrafficDtail();
  },
  
  mounted() {
      firebase.auth().onAuthStateChanged(user =>{
        this.logedin = user;
      }),

      firebase.firestore().collection("AccountsInfo").get().then((res) =>{
      res.forEach(x => {
        this.$store.commit('setAccountInfo', x.data())
      });
    })
    },

  methods:{
    createRecord(){
      this.saveRecordBtn = 'Saveing...';
      this.generateId();
      this.TrafficDtail();
        firebase.firestore().collection("Records").add(this.NewRecord).then((res) =>{
            this.resetfields()
           }).then(() =>{
             this.saveRecordBtn = 'Save Record';
              this.alrtTyp.dsply= 'd-block',
              this.alrtTyp.type= 'alert-success',
              this.alrtTyp.message= 'This record is added to the database successfuly'
           }).catch(err => {
             this.saveRecordBtn = 'Save Record';
              this.alrtTyp.dsply= 'd-block',
              this.alrtTyp.type= 'alert-danger',
              this.alrtTyp.message= err
        })
    },

    TrafficDtail(){
       var Accounts = this.$store.state.AccountsInfo
       var index = Accounts.findIndex(Account => Account.Email == this.logedin.email)
       this.NewRecord.Recorder.PhoneNo = Accounts[index].PhoneNo
       this.NewRecord.Recorder.Email = Accounts[index].Email;
       this.NewRecord.Recorder.ProffName = Accounts[index].ProffName;
       this.NewRecord.Recorder.FullName = Accounts[index].FName + " "+ Accounts[index].MName;
       console.log('Recorder Email: ' + Accounts[index].Email)
    },

     generateId(){
        var length = 9,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        for (var i = 0, n = charset.length; i < length; ++i) {
          retVal += charset.charAt(Math.floor(Math.random() * n));
          }
          this.NewRecord.id = retVal;
    },

    resetfields(){
        Object.assign(this.$data, this.$options.data())
    },
  }
}
</script>

<style lang="scss" scoped></style>
