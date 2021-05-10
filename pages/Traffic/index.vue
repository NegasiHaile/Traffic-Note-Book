<template>
    <div class="container-fluid mt-5">
        <div class="col-12">
            <p class="text-center">Welcome : {{user.email}}</p>
            <div class="border-bottom mb-2">
                <h4 class="texr-start">Dashboard</h4>
            </div>
            <div class="row">
                <div class="col-md-8">
                    <div class="shadow-sm">
                        <p class="text-start">Horizontal form
                            Create horizontal forms with the grid by adding the .row class to form groups and using the .col-*-* classes to specify the width of your labels and controls. Be sure to add .col-form-label to your s as well so they’re vertically centered with their associated form controls.
                            
                            At times, you maybe need to use margin or padding utilities to create that perfect alignment you need. For example, we’ve removed the padding-top on our stacked radio inputs label to better align the text baseline.</p>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                        <div class="border-bottom p-2">
                            <h6 class="text-center">May solve my problem</h6>
                        </div>
                        <div class="card-body">
                            <p class="text muted">1, Building user account with Nuxt, Vue, and Firebase</p>
                            <p class="text muted">Colision: Meskel Adebabay bad stuation</p>
                            <p class="text muted">Colision: Meskel Adebabay bad stuation</p>
                            <p class="text muted">Colision: Meskel Adebabay bad stuation</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
    export default {
      layout: "Traffic",

      props: [''],
      data() {
        return {
          user: '',
        }
      },  

      mounted(){
        firebase.auth().onAuthStateChanged(user =>{
          this.user = user;
    })
      }
    }
</script>


<style scoped>

</style>