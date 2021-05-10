<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center">
      <h1 v-if="error.statusCode === 404">
        {{ error.statusCode }} Page not found
      </h1>
      <h1 v-else>An error occurred {{error}}
        <br>
        {{ error.statusCode }}
      </h1>
    </div>

    <div class="d-flex justify-content-center mt-4">
      <NuxtLink to="/" class="btn btn-sm btn-danger"
        >Back to Home page</NuxtLink
      >
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