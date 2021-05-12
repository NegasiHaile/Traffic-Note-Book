<template>
  <div>
    <div class="card shadow-lg">
      <div class="card-header bg-info">
        <div class="d-flex justify-content-between">
          <h6 class="h6 text-light">
            {{ $route.params.type }} List of records
          </h6>
          <p class="text-light">{{ Records.length }} Total Records</p>
        </div>
      </div>
      <div class="card-body" style="max-height: 550px; overflow-y: scroll">
        <b-input-group class="mb-2">
          <b-form-input type="search" placeholder="Search for record" v-model="search"></b-form-input>
          <b-input-group-append>
            <b-button variant="info">Search</b-button>
          </b-input-group-append>
        </b-input-group>
          <div class="table-responsive">
            <table class="table table-sm table-hover" style="width: 100%">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">D Plate</th>
                  <th scope="col">Driver License</th>
                  <th scope="col">Catagory</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Location</th>
                  <th scope="col">date</th>
                  <th scope="col">Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(Record, index) in searchRecords" :key="index">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>{{ Record.Plate }}</td>
                  <td>{{ Record.Licens }}</td>
                  <td>{{ Record.Catagory }}</td>
                  <td>{{ Record.Subject }}</td>
                  <td>{{ Record.Location }}</td>
                  <td>{{ Record.RecordDate }}</td>
                  <td>
                    <a href="#" @click="show_RecordDetail_Modal(Record)">See Detail</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
      <div class="card-footer"></div>
    </div>
    <b-modal
      id="bv-modal-downDefiant-warning"
      size="lg"
      centered
      hide-footer
      title="Down Defiant"
      button-size="sm"
    >
      <template #modal-title>
        <h6>Record ID: {{Record.id}}</h6>
      </template>
      <template #default="{}">
        <div class="row border-bottom">
          <div class="col-md-6">
            <div class="d-flex justify-content-between">
              <p>* Vehicle Plate:</p><p><b>{{Record.Plate}}</b></p>
            </div>
            <div class="d-flex justify-content-between">
              <p>* Driver Licens:</p><p><b>{{Record.Licens}}</b></p>
            </div>
            <div class="d-flex justify-content-between">
              <p>* Record Catagory:</p><p><b>{{Record.Catagory}}</b></p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="d-flex justify-content-between">
              <p>* Record Subject:</p><p><b>{{Record.Subject}}</b></p>
            </div>
            <div class="d-flex justify-content-between">
              <p>* Where this happen?:</p><p><b>{{Record.Location}}</b></p>
            </div>
            <div class="d-flex justify-content-between">
              <p>* When it's recorded:</p><p><b>{{Record.RecordDate}}</b></p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="mt-3">
          <h5 class="h5 border-bottom pb-2">Discription of the record</h5>
          <p class="text-muted mt-1">{{Record.Discription}}</p>
        </div>
          </div>
          <div class="col-md-6">
            <div class="mt-3">
          <h5 class="h5 border-bottom pb-2">Who recorded this?</h5>
          <div class="d-flex justify-content-between mt-1">
            <p class="text-muted">Full Name</p>
            <p class="text-muted">{{Record.Recorder.ProffName}} {{Record.Recorder.FullName}}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-muted">Phone Number</p>
            <p class="text-muted">{{Record.Recorder.PhoneNo}}</p>
          </div>
          <div class="d-flex justify-content-between">
            <p class="text-muted">Email</p>
            <p class="text-muted">{{Record.Recorder.Email}}</p>
          </div>
        </div>
          </div>
        </div>
      </template>

    </b-modal>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      Records: [],
      Record:[],
      
      search: '',
    }
  },

  created() {
    this.fetchRecords()
  },

    computed:{
    searchRecords(){
      return this.Records.filter((record) => {
        return record.Plate.toLowerCase().includes(this.search.toLowerCase()
        ) || record.Licens.toLowerCase().includes(this.search.toLowerCase()
        ) || record.Catagory.toLowerCase().includes(this.search.toLowerCase()) ;
      })
    }
  },
  methods: {
    fetchRecords() {
      firebase
        .firestore()
        .collection('Records')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.Records.push(doc.data())
          })
        })
    },
    show_RecordDetail_Modal(Record) {
      this.Record = Record;
      this.$bvModal.show('bv-modal-downDefiant-warning')
    },
    hideModal(rcrdindex) {
      ;(this.index = rcrdindex),
        this.$bvModal.hide('bv-modal-downDefiant-warning')
    },
  },
}
</script>

<style scoped>
</style>