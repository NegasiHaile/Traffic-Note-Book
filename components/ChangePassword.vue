<template>
    <div class="d-flex justify-content-center">
            <div class="col-12 col-md-8" style="margin-top: 20px;">
                <div class="card shadow-sm">
                    <div class="card-body">
                            <div class="d-flex justify-content-center">
                                <div class="col-12">
                                    
                                <div class="d-flex justify-content-center">
                                    <div class="col-10">
                                    <p class="text-muted text-center">If you need to change
                                        your password hit the <b>Reseet Password</b> 
                                        button bellow we will send you the reset link to this:
                                         <b><i>{{user.email}}</i></b> email address.</p>
                                </div>
                                </div>
                                <div class="d-flex justify-content-center">
                                    <div class="col-10 col-md-8">
                                    <button class="btn btn-info w-100" @click="ReseetPassword"> Reset Passowrd</button>
                                </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <b-modal id="bv-modal-downDefiant-warning" centered title="Down Defiant" button-size="sm">
    <template #modal-title>
      <h6>{{alertMessage.title}}</h6>
    </template>
    <template #default="{ }">
      <small>{{alertMessage.message}}
      </small>
    </template>

    <template #modal-footer="{ }">
          
         <b-button class="btn-sm ml-2" variant="danger" @click="hideModal()">Close</b-button>
    </template>
  </b-modal>
        </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
    export default {

        data(){
            return{
                user: [],
                alertMessage:{
                title: 'Done!',
                message: '',
                 },
            }
        },

         created(){
            firebase.auth().onAuthStateChanged(user =>{
            this.user = user;
            });
         },

        methods: {
        ReseetPassword(){
            firebase.auth().sendPasswordResetEmail(this.user.email).then(() => {
                this.alertMessage.title= 'Done !',
                this.alertMessage.message = 'Reset password is sent to your email, Please go a head and reset it from there!';
                this.showModal();
            }).catch(err => {
                this.alertMessage.title= 'Reseting Faile !',
                this.alertMessage.message = err;
                this.showModal();
            })
            },
             showModal(){
        this.$bvModal.show('bv-modal-downDefiant-warning')
    },

    hideModal(){
        this.$bvModal.hide('bv-modal-downDefiant-warning')
    },
        }
    }
</script>

<style lang="scss" scoped>

</style>