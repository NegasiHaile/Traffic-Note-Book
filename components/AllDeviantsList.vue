<template>
  <div class="card shadow-lg">
      <div class="card-header">
        <div class="d-flex justify-content-between">
          <h6 class="text-muted">
            {{ $route.params.type }} List of Deviants
          </h6>
          <p class="text-muted">{{ Deviants.length }}  Deviants</p>
        </div>
      </div>
      <div class="p-1" style="max-height: 500px; overflow-y: scroll">
        <b-input-group class="mb-2">
          <b-form-input type="search" placeholder="Search for Defiant using plate, record subject or status" v-model="search"></b-form-input>
          <b-input-group-append>
            <b-button variant="info">Search</b-button>
          </b-input-group-append>
        </b-input-group>
    <div class="table-responsive">
      <table class="table table-sm table-hover">
        <thead>
          <tr>
            <th scope="col">Plate</th>
            <th scope="col">Event Location</th>
            <th scope="col">Subject</th>
            <th scope="col">Status</th>
            <th scope="col">Date</th>
            <!-- <th scope="col">By</th> -->
            <th scope="col">Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(defiant, index) in searchDeviants" :key="index">
            <td>{{ defiant.Plate }}</td>
            <td>{{ defiant.Location }}</td>
            <td>{{ defiant.Subject }}</td>
            <td>{{ defiant.Status }}</td>
            <td>{{ defiant.RecoredDate }}</td>
            <!-- <td>{{ defiant.Recorder.FullName }}</td> -->
            <td><nuxt-link :to="`/Traffic/Deviants/${defiant.id}`">See Detail</nuxt-link></td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
    <div class="card-footer">
    </div>

  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  head:{
    title: 'Deviants-list Traffic-Note-Book'
  },
  data() {
    return {
      Deviants: [],
      search: '',
    }
  },

  created() {
    this.fetchDeviants();
  },

  computed:{
    searchDeviants(){
      return this.Deviants.filter((defiant) => {
        return defiant.Plate.toLowerCase().includes(this.search.toLowerCase()
        ) || defiant.Subject.toLowerCase().includes(this.search.toLowerCase()
        ) || defiant.Status.toLowerCase().includes(this.search.toLowerCase()) ;
      })
    }
  },
  methods: {
    fetchDeviants() {
      firebase
        .firestore()
        .collection('deviants')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
                this.Deviants.push(doc.data())
          })
        })
    },
  },

}
</script>

<style scoped>
</style>