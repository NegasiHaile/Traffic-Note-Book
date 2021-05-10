<template>
  <div class="col-12">
    <div class="border-bottom p-1">
      <h6 class="text-center">List of deviants</h6>
    </div>
    <div class="table-responsive shadow-sm">
      <a href="#" @click="fetchDeviants">Active | Down | All</a>
      <table class="table table-hover">
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
          <tr v-for="(defiant, index) in Deviants" :key="index">
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
</template>

<script>
import firebase from 'firebase/app'
export default {
  data() {
    return {
      Deviants: [],
    }
  },

  created() {
    this.fetchDeviants();
  },
  methods: {
    fetchDeviants() {
        var type = this.getparamId();
        // this.Deviants = '';
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

    getparamId(){
        return (this.$route.params.type)
        },

    deleteDefiant(defiant, index) {
     var confirmed = confirm('Are you sure you want to delete this item?');
     if(confirmed){
        firebase.firestore().collection('deviants').doc(defiant.id).delete().then(() =>{
        this.$store.commit('deleteDefiant', index);
      })
     }
    },
  },

}
</script>

<style scoped>
</style>