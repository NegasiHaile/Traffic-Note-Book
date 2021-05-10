<template>
    <div style="margin-top: 90px;">
  <nuxt-child></nuxt-child>
</div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
    export default {
      layout: "Traffic",

      data(){
        return{
          LogedInUser:{
              Email: '',
              PhoneNo: '',
              ProffName: '',
              FullName: '',
        },

        logedin: '',
        }
      },
        computed: {
    Deviants() {
      return this.$store.state.Deviants
    },
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
    // alert(this.$store.state.Defiant) // loads on the page load
      },

  methods:{
    TrafficDtail(){
       var Accounts = this.$store.state.AccountsInfo
       var index = Accounts.findIndex(Account => Account.Email == this.logedin.email)
       this.LogedInUser.PhoneNo = Accounts[index].PhoneNo
       this.LogedInUser.Email = Accounts[index].Email;
       this.LogedInUser.ProffName = Accounts[index].ProffName;
       this.LogedInUser.FullName = Accounts[index].FName + " "+ Accounts[index].MName;
       alert('Recorder Detail: ' + this.LogedInUser.FullName)
    },
  }


    }
</script>

<style lang="scss" scoped>

</style>