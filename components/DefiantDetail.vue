<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="col-12 col-md-6">
        <div class="card shadow lg" v-for="(dfnt, index) in Defiant" :key="index">
          <div class="card-header">
            <div class="d-flex justify-content-between">
                <h6>Record ID: <b>{{ $route.params.id }}</b></h6> 
                <small v-if="defiantStatus == 'Active'">
                    <button id="show-btnu" class="btn btn-sm btn-danger" 
                @click="showConfModal(dfnt,'bv-modal-downDefiant-warning')" >
                Down this Defiant</button>
                </small>
                <small v-else><p> Status: <b>{{dfnt.data().Status}}</b></p></small>
            </div>
          </div>
          <div class="card-body">
            <div>
                <div class="d-flex justify-content-between">
                <p>* Vehcle plate (Identifier):</p>
                <b>{{ dfnt.data().Plate }}</b>
              </div>
              <div class="d-flex justify-content-between">
                <p>* Subject of this record:</p>
                <b>{{ dfnt.data().Subject }}</b>
              </div>
              <div class="d-flex justify-content-between">
                <p>* Where this is happen:</p>
                <b>{{ dfnt.data().Location }}</b>
              </div>
              <div class="border-bottom d-flex justify-content-between">
                <p>* When is this Recorded:</p>
                <b>{{ dfnt.data().RecoredDate }}</b>
              </div>
                <div class="d-block mt-1">
                    <h6>* Discription (reason) of the record</h6>
                    <p>{{dfnt.data().Discription}}</p>
              </div>
                <div class="border-bottom mt-4">
                    <h5 class="text-center">Who Exposed this Defiant</h5>
              </div>
              <div class="mt-2">
                  <div class="mt-2">
                          <div class="d-flex justify-content-between">
                              <p>* Full name</p><p><b><i>{{dfnt.data().Recorder.ProffName}}</i></b> {{dfnt.data().Recorder.FullName}}</p>
                          </div>
                          <div class="d-flex justify-content-between">
                              <p>* Phone Number</p><p>{{dfnt.data().Recorder.PhoneNo}}</p>
                          </div>
                          <div class="d-flex justify-content-between">
                              <p>* Email </p><p>{{dfnt.data().Recorder.Email}}</p>
                          </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>


    <b-modal id="bv-modal-downDefiant-warning" centered title="Down Defiant" button-size="sm">
    <template #modal-title>
      <h6>Arae you sure about this?</h6>
    </template>
    <template #default="{ }">
      <small>Geting down a defiant means: you have catch the defiant and you can biring it 
          to the nearest police office and other traffics will not take a focus on this defiant any more.
          and you will be responsible for it.
          <b>So can you do this?</b>
      </small>
    </template>

    <template #modal-footer="{ }">
          
     <b-button class="btn-sm mr-3" variant="info" @click="downDefiant()">Yes I can</b-button>
         <b-button class="btn-sm ml-2" variant="danger" @click="hideModal()">No I can't</b-button>
    </template>
  </b-modal>
</div>
  </div>
</template>

<script>
import firebase from 'firebase/app'
export default {
  // head(){
  //   return{
  //     title: `${this.Defaint.data().Subject} -Traffic-Note-Book`,
  //   }
    
  // },
  data() {
    return {
      Defiant: [],
      defiantStatus: '',
      defiantDocId: '',
    }
  },
  created() {
    this.fetchDefiant()
  },
  methods: {
    fetchDefiant() {
        this.Defiant = [],
      firebase
        .firestore()
        .collection('deviants')
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (doc.data().id == this.$route.params.id) {
              this.Defiant.push(doc)
              this.defiantStatus = doc.data().Status
            }
          })
        })
    },

    downDefiant(){
        var definatid = firebase.firestore().collection("deviants").doc(this.defiantDocId);
        return definatid.update({
            Status: 'Down'
        })
        .then(() => {
            this.hideModal()
            this.fetchDefiant()
        })
        .catch((error) => {
            alert( error);
        });
    },

    showConfModal(Defaint, modalId){
      this.defiantDocId = Defaint.id;
      this.$bvModal.show(modalId)
    },

    hideModal(){
        this.$bvModal.hide('bv-modal-downDefiant-warning')
    }
  },
}
</script>

<style scoped>
</style>