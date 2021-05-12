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
                  <td>{{ Admin.data().ProffName }}</td>
                  <td>{{ Admin.data().FName }} {{ Admin.MName }} </td>
                  <td>{{ Admin.data().Gender }}</td>
                  <td>{{ Admin.data().PhoneNo }}</td>
                  <td>{{ Admin.data().Email }}</td>
                  <td>{{ Admin.data().Responsibility }}</td>
                  <td>{{ Admin.data().AccountStatus }}</td>
                  <td>
                    <nuxt-link
                      :to="`/SAdmin/Admins/${Admin.data().Email}`"
                      class="btn btn-sm btn-outline-info"
                      >Detail</nuxt-link
                    >
                    <a href="#" @click="showEiditAdminModal(Admin)"
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

        <b-modal
      id="bv-modal-Edit-traffic-Detail"
      size="lg"
      title="Edit traffic Detail"
      button-size="sm"
    >
      <template #modal-title>
        Edit Admin Detail
      </template>
      <template #default="{}">
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
                  disabled
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
              <div class="col-md-6">
                <select id="disabledSelect" class="form-control form-select" v-model="Admin.AccountStatus" 
                required>
                <option value="Active">Active</option>
                <option value="Blocked">Block</option>
              </select>
              <small>Account status</small>
              </div>

            </div>
          </form>
      </template>

      <template #modal-footer="{}">
        <b-button  class="btn-sm ml-2" variant="info" @click="svae_AdminDetaile_Changes"
          >Save changes</b-button
        >
        <b-button class="btn-sm ml-2" variant="secondary" @click="hideModal('bv-modal-Edit-traffic-Detail')"
          >Cancel</b-button
        >
      </template>
    </b-modal>

        <b-modal id="bv-modal-adminUpdate-ntf" hide-header modal-class="sucess" title="Down Defiant" button-size="sm">
 
    <template #default="{ }">
      <small><b>N.B: </b>{{updateMessage}}
      </small>
    </template>

    <template #modal-footer="{ }">
          <b-button class="btn-sm ml-2" variant="info" @click="hideModal('bv-modal-adminUpdate-ntf')">Cancel</b-button>
    </template>
  </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
var fsDB = firebase.firestore();
export default {
  data() {
    return {
      AminsInfo: [],
      Admin: [],

      ActiveAdmin: '',
      AccountStatus: '',

      updateMessage: ''
    }
  },
  created() {
    this.fetchAdmins()
  },

  methods: {
    fetchAdmins() {
      this.AminsInfo = [],
      firebase
        .firestore()
        .collection('AccountsInfo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().AccountType == 'Admin') {
              this.AminsInfo.push(doc)
            }
          })
        })
    },
    showEiditAdminModal(Admin) {
      this.$bvModal.show('bv-modal-Edit-traffic-Detail');
      this.Admin = Admin.data();
      this.ActiveAdmin = Admin.id;
      this.AccountStatus = this.Admin.AccountStatus;
    },

    svae_AdminDetaile_Changes(){
      this.hideModal();
        var AdminUpdate = fsDB.collection("AccountsInfo").doc(this.ActiveAdmin);
        
        return AdminUpdate.update(this.Admin)
        .then(() => {
          this.fetchAdmins();
          this.hideModal('bv-modal-Edit-traffic-Detail');
          this.updateMessage = 'Adminstrator detail has been updated successfully';
          this.showModal('bv-modal-adminUpdate-ntf');
        })
        .catch((error) => {
            alert(error); 
        });
    },

    showModal(modalId){
      this.$bvModal.show(modalId);
    },

    hideModal(moadalId) {
      this.$bvModal.hide(moadalId)
    },


  },
}
</script>

<style scoped>
</style>