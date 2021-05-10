<template>
  <div class="d-flex justify-content-center">
    <div class="col-12 col-md-8">
      <div class="card shadow-sm mt-3">
        <div class="card-header">
          <div class="d-flex justify-content-between">
            <p class="text-muted">Work list</p>
            <p class="text-end">{{TrafficWorkList.length}} toatal records</p>
          </div>
        </div>
        <div class="card-body table-responsive">
          <table class="table table-success table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">V Plate</th>
                <th scope="col">D Licens</th>
                <th scope="col">Catagory</th>
                <th scope="col">Subject?</th>
                <th scope="col">Where?</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(Record, index) in TrafficWorkList" :key="index">
                <th scope="row">{{index + 1}}</th>
                <td>{{Record.Plate}}</td>
                <td>{{Record.Licens}}</td>
                <td>{{Record.Catagory}}</td>
                <td>{{Record.Subject}}</td>
                <td>{{Record.Location}}</td>
              </tr>
            </tbody>
          </table>
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
      TrafficWorkList: [],
      ProfileType: '',
    }
  },
  created() {
    this.fetchTrafficWorkList()
  },
  methods: {
    fetchTrafficWorkList() {
      //this.ProfileInfo = [],
      firebase
        .firestore()
        .collection('Records')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().Recorder.Email == this.$route.params.id) {
              this.TrafficWorkList.push(doc.data())
            }
          })
        })
    },
  },
}
</script>

<style scoped>
</style>