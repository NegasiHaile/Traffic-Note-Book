<template>
  <div>
    <div class="card shadow-sm">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h6 class="h6">List of Traffics</h6>
          <p class="muted">{{ AccountsInfo.length }} Traffics</p>
        </div>
      </div>
      <div class="card-body" style="max-height: 500px; overflow-y: scroll">
          <b-input-group class="mb-2">
          <b-form-input type="search" placeholder="Search for traffic" v-model="search"></b-form-input>
          <b-input-group-append>
            <b-button variant="info">Search</b-button>
          </b-input-group-append>
        </b-input-group>
          <div class="table-responsive">
            <table class="table table-sm table-hover" style="width: 100%">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Proff Name</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Middle Name</th>
                  <th scope="col">Last Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">responsibility</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Detail</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(Traffic, index) in AccountsInfo" :key="index">
                  <td scope="row">{{ index + 1 }}</td>
                  <td>{{ Traffic.data().ProffName }}</td>
                  <td>{{ Traffic.data().FName }}</td>
                  <td>{{ Traffic.data().MName }}</td>
                  <td>{{ Traffic.data().LName }}</td>
                  <td>{{ Traffic.data().Gender }}</td>
                  <td>{{ Traffic.data().Responsibility }}</td>
                  <td>{{ Traffic.data().PhoneNo }}</td>
                  <td>{{ Traffic.data().Email }}</td>
                  <td class="d-flex justify-content-between">
                    <nuxt-link
                      :to="`/SAdmin/TrafficsList/${Traffic.data().Email}`"
                      class="btn btn-sm btn-outline-info"
                      >Detail</nuxt-link
                    >
                    <a
                      href="#"
                      class="btn btn-sm btn-outline-success"
                      @click="showEiditTrafficModal(Traffic)"
                      >Edit</a
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>

    <b-modal
      id="bv-modal-Edit-traffic-Detail"
      size="lg"
      title="Edit traffic Detail"
      button-size="sm"
    >
      <template #modal-title>
        <small><a href="#" class="btn btn-sm btn-danger" v-if="AccountStatus == 'Active'"
         @click="blockAcountModal('bv-modal-update-AccountStatus')"> Block Account</a>
        <a href="#" class="btn btn-sm btn-info" v-else
         @click="activateAcountModal('bv-modal-update-AccountStatus')"> Activate Account</a></small>
      </template>
      <template #default="{}">
        <form class="row">
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
            <div class="col-md-6 mt-3 d-none">
              <input
                type="email"
                class="form-control"
                placeholder="Traffic Email"
                aria-label="Traffic Email"
                v-model="Traffic.Email"
                required
              />
            </div>
            <div class="col-md-6 mt-3">
              <input
                type="text"
                class="form-control"
                placeholder="Traffic Full Address"
                aria-label="Traffic Full Address"
                v-model="Traffic.Address"
              />
            </div>
            <br />
            <!-- <div class="col-md-6 mt-3">
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-info">Submit Traffic Detail</button>
              </div>
            </div> -->
          </form>
      </template>

      <template #modal-footer="{}">
        <b-button  class="btn-sm ml-2" variant="info" @click="svae_TrafficDetaile_Changes"
          >Save changes</b-button
        >
        <b-button class="btn-sm ml-2" variant="secondary" @click="hideModal('bv-modal-Edit-traffic-Detail')"
          >Cancel</b-button
        >
      </template>
    </b-modal>

    <b-modal id="bv-modal-update-AccountStatus" modal-class="sucess" title="Down Defiant" button-size="sm">
    <template #modal-title>
      <h6>{{modalMessage.title}}?</h6>
    </template>
    <template #default="{ }">
      <small><b>N.B: </b>{{modalMessage.message}}
      </small>
    </template>

    <template #modal-footer="{ }">
          
          <b-button class="btn-sm ml-2" variant="danger" v-if="AccountStatus == 'Active'" @click="updateAccountStatus('bv-modal-update-AccountStatus', 'Blocked')">YES</b-button>
          <b-button class="btn-sm ml-2" variant="success" v-else @click="updateAccountStatus('bv-modal-update-AccountStatus', 'Active')">YES</b-button>
          <b-button class="btn-sm ml-2" variant="secondary" @click="hideModal('bv-modal-update-AccountStatus')">NO</b-button>
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
      AccountsInfo: [],

      Traffic: [],

      ActiveTraffic: null,
      AccountStatus: null,

      search: '',

      modalMessage:{
          title: '',
          message: '',
      },
    }
  },
  created() {
    this.fetchTraffics()
  },

  methods: {
    fetchTraffics() {
       this.AccountsInfo = [],
      firebase
        .firestore()
        .collection('AccountsInfo')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().AccountType == 'Traffic') {
              this.AccountsInfo.push(doc)
            }
          })
        })
    },
  computed:{
    searchTraffics(){
      return this.AccountsInfo.filter((trfc) => {
        return trfc.data().FName.match(this.search);
        //  || traffic.data().PhoneNo.toLowerCase().includes(this.search.toLowerCase()
        // ) || traffic.data().Email.toLowerCase().includes(this.search.toLowerCase()) ;
      })
    }
  },

    svae_TrafficDetaile_Changes(){
      this.hideModal();
        var trafficUpdate = fsDB.collection("AccountsInfo").doc(this.ActiveTraffic);
        
        return trafficUpdate.update(this.Traffic)
        .then(() => {
          this.fetchTraffics();
          this.hideModal('bv-modal-Edit-traffic-Detail');
        })
        .catch((error) => {
            alert(error); 
        });
    },
    
    updateAccountStatus(modalId, change){
        var blockTrafficAccount = fsDB.collection("AccountsInfo").doc(this.ActiveTraffic);

        return blockTrafficAccount.update({
            AccountStatus: change
        })
        .then(() => {
            this.fetchTraffics();
            this.hideModal(modalId);
        })
        .catch((error) => {
            this.modalMessage.title = "Something went wrong, Please try again!"
            this.modalMessage.message = error;
        });
    },

    showEiditTrafficModal(Traffic) {
      this.$bvModal.show('bv-modal-Edit-traffic-Detail');
      this.Traffic = Traffic.data();
      this.ActiveTraffic = Traffic.id;
      this.AccountStatus = this.Traffic.AccountStatus;
    },

    blockAcountModal(modalId){
      this.modalMessage.title = "Are you sure you want to block this account!"
      this.modalMessage.message = "Bolcking traffic account is disabling the account of traffic purposed not to access the service of this application at all."
      this.showModal(modalId)
    },

    activateAcountModal(modalId){
      this.modalMessage.title = "Are you sure you want to Activate this account!"
      this.modalMessage.message = "Activateting an account is allowing a previously blocked taffic account to access, make change or add somthing to this application."
      this.showModal(modalId)
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

<style lang="scss" scoped>
</style>