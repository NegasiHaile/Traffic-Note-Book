<template>
  <div class="d-flex justify-content-center" style="margin-top: 35px">
    <div class="col-md-8">
      <div class="card shadow-lg">
        <div class="card-body">
          <div class="author">
            <a class="text-uppercase text-primary">
              <img
                class="avatar border-gray"
                src="~assets/images/TrafficAvater.png"
                alt="traffic "
              />
            </a>
          </div>

          <div class="col-12" v-for="info in ProfileInfo" :key="info.Email">
            <div class="d-flex justify-content-between border-bottom">
              <p class="text-center">{{info.ProffName}}: {{info.FName}}</p>
              <p>* From: {{info.RegisrationDate}}</p>
            </div>
            <div class="row mt-2 border-bottom">
              <div class="col-md-6">
                <div class="d-flex justify-content-between">
                  <p>*Profftional Name:</p>
                  <p>{{info.ProffName}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>*First Name:</p>
                  <p>{{info.FName}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>* Midle Name:</p>
                  <p>{{info.MName}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>* Last Name:</p>
                  <p>{{info.LName}}</p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="d-flex justify-content-between">
                  <p>* Gender:</p>
                  <p>{{info.Gender}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>* Phone number:</p>
                  <p>{{info.PhoneNo}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>* Email:</p>
                  <p>{{info.Email}}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <p>* Responsibility:</p>
                  <p>{{info.Responsibility}}</p>
                </div>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-12 col-md-6">
                <p>Address: {{info.Address}}</p>
              </div>

              <div class="col-12 col-md-6">
                <p class="text-end">
                  Account: <b class="text-success">{{info.AccountStatus}}</b>
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
  data() {
    return {
      ProfileInfo: [],
      ProfileType: '',
    }
  },
  created() {
    this.fetchProfileInfo()
  },
    methods: {
    fetchProfileInfo() {
        //this.ProfileInfo = [],
      firebase
        .firestore()
        .collection('AccountsInfo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().Email == this.$route.params.id) {
              this.ProfileInfo.push(doc.data())
              this.ProfileType = doc.data().AccountType
            }
          })
        })
    },
}
}
</script>

<style lang="scss" scoped>
</style>