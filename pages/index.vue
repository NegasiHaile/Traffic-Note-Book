<template>
<!-- This is log in page -->
  <div class="container-filud" style="margin-top: 90px">
    <div class="col-12">
      <div class="d-flex justify-content-center">

        <div class="col-12 col-md-6">
        <div class="card shadow-lg">
          <div class="author">
            <a class="text-uppercase text-primary">
              <!-- <img class="avatar border-gray" src="@/assets/images/TrafficAvater.png" alt="" /> -->
              <img
                class="avatar border-gray"
                src="~assets/images/TrafficAvater.png"
                alt="Traffic Icon"
              />
            </a>
          </div>
          <div class="mb-1">
            <p class="h4 text-center">WELCOME</p>
          </div>
          <div class="d-flex justify-content-center">
            <form @submit.prevent="logIN" class="col-12 col-md-11 mb-3">
              <div class="mb-2">
                <label for="formGroupExampleInput" class="form-label"
                  >Email Address</label
                >
                <input
                  type="email"
                  class="form-control"
                  id="formGroupExampleInput"
                  placeholder="Traffic@gmail.com"
                  v-model="userName"
                  required
                />
              </div>
              <div class="mb-2">
                <label for="formGroupExampleInput2" class="form-label"
                  >Password</label
                >
                <input
                  type="password"
                  class="form-control"
                  id="formGroupExampleInput2"
                  placeholder="********"
                  v-model="passWord"
                  required
                />
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="gridCheck"
                  />
                  <label class="form-check-label" for="gridCheck">
                    Remember me
                  </label>
                </div>
              </div>

              <div class="d-flex justify-content-center">
                <div class="col-10 col-md-8">
                  <button type="submit" class="btn btn-primary w-100">{{logInbutton}}</button>
                </div>
              </div>
            </form>
          </div>
          <div class="card-footer">
            <a href="#" class="text-decoration-none"
              @click="forgotPassword">Forgate Password?</a
            >
          </div>
        </div>
      </div>
      </div>
      
      <div class="d-flex justify-content-center">
        <div class="col-12 col-md-6">
        <p class="title tnb-font">Traffic-Note-Book</p>
        <p class="tnb-font">This application belongs to the Ethiopian Traffic police office
           which is purposed to manage road traffic violations, crimes, collisions, and other records.
        </p>
      </div>
      </div>

    
    <b-modal id="bv-modal-downDefiant-warning" centered title="Down Defiant" button-size="sm">
    <template #modal-title>
      <h6>{{alertMessage.title}}</h6>
    </template>
    <template #default="{ }">
      <small>{{alertMessage.message}}
      </small>
    </template>

    <template #modal-footer="{ }">
          
         <b-button class="btn-sm ml-2" variant="danger" @click="hideModal()">Close</b-button>
    </template>
  </b-modal>


  </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data() {
    return {
      userName: '',
      passWord: '',

      user: '',
      users: '',

      accountType: '',
      accountStatus: '',

      logInbutton: 'LogIn',

      alertMessage:{
          title: 'Somthing went wrong, Try again!',
          message: '',
      },
    };
  },

  created(){
    firebase.auth().onAuthStateChanged(user =>{
      this.user = user;
    }),

      firebase.firestore().collection("AccountsInfo").get().then((res) =>{
      res.forEach(x => {
        this.$store.commit('setAccountInfo', x.data())
      });
    })
  },
  methods: {
    logIN(){
      this.logInbutton = 'Processing ...';
      this. TypeOfAccount();
      if(this.userName && this.passWord){
        firebase.auth().signInWithEmailAndPassword(this.userName, this.passWord).then(user => {
          if(this.accountType == "Traffic" && this.accountStatus == 'Active'){
            this.$router.push('/traffic');
          }
          else if(this.accountType == "Admin" && this.accountStatus == 'Active'){
            this.$router.push('/SAdmin');
          }
          else{
          this.logInbutton = 'LogIn';
          this.title= 'Connection bloked with your account!',
          this.alertMessage.message = 'This account is either it is blocked or something change made to it, So please contact the admin!';
          this.showModal();
          }
        }).catch(err =>{
          this.logInbutton = 'LogIn';
          this.alertMessage.message = err;
          this.showModal();
        })
      }
      else{
         this.alertMessage.message = 'Empty field please enter your password & Password correctly!';
          this.showModal();
      }
    },
    
    forgotPassword(){
      firebase.auth().sendPasswordResetEmail(this.userName).then(() => {
          this.alertMessage.title= 'Done !',
          this.alertMessage.message = 'Reset password is sent to your email, Please go a head and reset it from there!';
          this.showModal();
      }).catch(err => {
         this.alertMessage.message = err;
          this.showModal();
      })
    },

   TypeOfAccount(){
     var Accounts = this.$store.state.AccountsInfo;
     var index = Accounts.findIndex(Account => Account.Email == this.userName);

     if(index >= 0){
       this.accountType= Accounts[index].AccountType;
       this.accountStatus = Accounts[index].AccountStatus;
      //  return (Accounts[index].AccountType);
     }
     else{
     }
     
    },

    showModal(){
        this.$bvModal.show('bv-modal-downDefiant-warning')
    },

    hideModal(){
        this.$bvModal.hide('bv-modal-downDefiant-warning')
    },
  }

};
</script>

<style>
.title {
  display: block;
  font-weight: 300;
  font-size: 60px;
  color: #35495e;
  letter-spacing: 1px;
  text-align: center;
}
.tnb-font{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
/* .footer {
  min-height: 800px;
} */
</style>
