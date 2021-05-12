<template>
  <div class="container-fluid mt-5">
    <div class="col-12">
      <div class="mt-5 mb-5">
        <h2 class="text-center d-none"></h2>
      </div>
      <br />
      <div class="d-flex justify-content-center">
        <div class="col-12 col-md-8">
          <div class="card shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-center">
                <div class="col-10">
                  <div class="mt-5">
                    <h5 class="text-center">Welcome : {{ user.email }}</h5>
                  </div>
                  <p class="text-muted text-center mt-3">
                    You have logged into this application as a <b>Traffic</b>. That means you have a 
                    digital notebook which you can do everything you do with your hard notebook
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
      <div class="border-bottom mb-2">
        <h4 class="text-start">What this application can help you?</h4>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 mt-3">
          <div class="card shadow-sm">
            <div class="card-header bg-success">
              <div class="d-flex justify-content-center">
                <p class="text-light">Record violations</p>
              </div>
            </div>
            <div class="card-body">
              <p>
                You can Record violations, crimes, and other related illegal
                events made by drivers and their vehicles in this application
                instead of record the detail in a hard notebook , Then you can
                access that data from everywhere.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mt-3">
          <div class="card shadow-sm">
            <div class="card-header bg-danger">
              <div class="d-flex justify-content-center">
                <p class="text-light">Expose Defiant</p>
              </div>
            </div>
            <div class="card-body">
              <p>
                whenever a driver made a violation and escaped from you, Then
                you can expose that defiant using this application, and every
                traffic who have been allowed to access this application can get
                notified. Then everyone will take a look at that vehicle.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mt-3">
          <div class="card shadow-sm">
            <div class="card-header bg-primary">
              <div class="d-flex justify-content-center">
                <p class="text-light">Search vehicle records</p>
              </div>
            </div>
            <div class="card-body">
              <p>
                Using this application you can get a history of a vehicle; about
                what violations have made previously. So the only thing you have
                to do is go to the records list and
                <b><i>Enter the vehicle plate</i></b>
                in the search box, then it will list all related records.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4"></div>
        <!-- <div class="col-md-4">
                    <div class="card">
                        <div class="border-bottom p-2">
                            <h6 class="text-center">May solve my problem</h6>
                        </div>
                        <div class="card-body">
                            <p class="text muted">1, Building user account with Nuxt, Vue, and Firebase</p>
                            <p class="text muted">Colision: Meskel Adebabay bad stuation</p>
                            <p class="text muted">Colision: Meskel Adebabay bad stuation</p>
                            <p class="text muted">Colision: Meskel Adebabay bad stuation</p>
                        </div>
                    </div>
                </div> -->
      </div>
      <br />
      <br />
      <div class="border-bottom mb-2">
        <h4 class="text-start">Note your responsibility listed right below!</h4>
      </div>
      <div class="row">
        <div class="col-12 col-md-4 mt-3">
          <div class="card shadow-sm">
            <div class="card-header bg-secondary">
              <div class="d-flex justify-content-center">
                <p class="text-light">Be trustful </p>
              </div>
            </div>
            <div class="card-body">
              <p>
                You are allowed to this application means, you are trusted to works with this digital note
                book instead of with the hurd note book. Then in your work <b>Encode real data</b> 
                Never late somebody out of this record if he/she is a violant.
              </p>
            </div>
          </div>
        </div>
        <div class="col-12 col-md-4 mt-3">
          <div class="card shadow-sm">
            <div class="card-header bg-secondary">
              <div class="d-flex justify-content-center">
                <p class="text-light">Be Accountable </p>
              </div>
            </div>
            <div class="card-body">
              <p>
                For everything that you are doing with this application is been caught in the system,
                 So be careful about what you are recording, and then you will be asked for that by the administrator.
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  layout: 'Traffic',

  data() {
    return {
      user: '',
    }
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
    })
  },
}
</script>


<style scoped>
</style>