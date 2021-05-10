<template>
  <div class="container">
    <div class="card shadow-lg">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h6 class="h6">List of all Admins</h6>
          <p class="muted">{{AminsInfo.length}} Admins</p>
        </div>
      </div>
      <div class="card-body" style="max-height: 500px; overflow-y: scroll">
        <div class="card">
          <div class="table-responsive">
            <table class="table table-hover" style="width: 100%">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Proff Name</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Responsibilty</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(Admin, index) in AminsInfo" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ Admin.ProffName }}</td>
                  <td>{{ Admin.FName }} {{ Admin.MName }} </td>
                  <td>{{ Admin.Gender }}</td>
                  <td>{{ Admin.PhoneNo }}</td>
                  <td>{{ Admin.Email }}</td>
                  <td>{{ Admin.Responsibility }}</td>
                  <td>{{ Admin.AccountStatus }}</td>
                  <td>
                    <nuxt-link
                      :to="`/SAdmin/Admins/${Admin.Email}`"
                      class="btn btn-sm btn-outline-info"
                      >Detail</nuxt-link
                    >
                    <a href=""
                      class="btn btn-sm btn-outline-success"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card-footer"></div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      AminsInfo: [],
    }
  },
  created() {
    this.fetchTraffics()
  },

  methods: {
    fetchTraffics() {
      firebase
        .firestore()
        .collection('AccountsInfo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().AccountType == 'Admin') {
              this.AminsInfo.push(doc.data())
            }
          })
        })
    },

    modalActivate() {},
  },
}
</script>

<style scoped>
</style>