<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <div class="card bg-danger">
        <div class="card-body">
          <h1 class="text-light" v-if="error.statusCode === 404">
        {{ error.statusCode }} Page not found
      </h1>
      <h1 class="text-light"  v-else>An error occurred 
        
      </h1>

      <div class="d-flex justify-content-center mt-4">
      <NuxtLink to="/" class="btn btn-sm btn-danger"
        >Back to login page</NuxtLink
      >
    </div>
    </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  layout: "error", // you can set a custom layout for the error page
};
</script>
<style scoped>
</style>