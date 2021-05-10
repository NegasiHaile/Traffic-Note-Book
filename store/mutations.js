import Vue from 'vue'

export default {


  setAccountInfo(state, payload){
    state.AccountsInfo.push(payload);
  },
  /////////////////////////////////About traffic ///////////////////


  setRecors(state, payload){
    state.Records.push(payload);
  },

  deleteRecors(state, payload) {
    Vue.delete(state.Records, payload);
  },
  /////////////////////////////// Recors ///////////////////////////

  addDefiant(state, payload) {
    //alert(payload)
    state.Deviants.push({'id': payload.id, 'Plate': payload.Plate, 
    'Location': payload.Location, 'Subject': payload.Subject, 'Discription': payload.Discription, 'RcoredDate': payload.RcoredDate});
  },


  setDefiant(state, payload){
    state.Deviants.push(payload);
    
  },

  deleteDefiant(state, payload) {
    Vue.delete(state.Deviants, payload);
  }
////////////////////////////////////////////////

}
