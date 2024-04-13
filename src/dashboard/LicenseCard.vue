<template>
  <div class="card">
    <div class="card-header azur-gradient">
      <h5 class="card-title">Licensing</h5>

    </div>

    <div class="card-body">
      <div class="d-flex justify-content-between flex-wrap">
        <!--          <p class="card-text">{{ name }}</p>-->
        <span class="badge bg-light text-dark fs-5">{{ name }}</span>

        <div v-if="html_url">
          <a :href="html_url" class="btn btn-outline-primary" target="_blank">Info</a>
        </div>
      </div>
      
      <br>

      <div class="row row-cols-1 row-cols-xl-2 g-3">
        <div class="card-body col">
          <p class="card-text">Permissions</p>
        </div>
        <div class="col d-flex flex-wrap align-items-center">
              <span v-for="perm in permissions">
                <span class="badge rounded-pill bg-primary">{{perm}}</span>
              </span>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-xl-2 g-3">
        <div class="card-body col">
          <p class="card-text">Conditions</p>
        </div>
        <div class="col d-flex flex-wrap align-items-center">
              <span v-for="cond in conditions">
                <span class="badge rounded-pill bg-warning">{{cond}}</span>
              </span>
        </div>
      </div>
      <div class="row row-cols-1 row-cols-xxl-2 g-3">
        <div class="col card-body">
          <p class="card-text">Limitations</p>
        </div>
        <div class="col d-flex flex-wrap align-items-center">
              <span v-for="limit in limitations">
                <span class="badge rounded-pill bg-danger">{{limit}}</span>
              </span>
        </div>
      </div>
      
      
      <br>
      <div class="accordion">
        <div class="accordion-item">
          <h5 class="accordion-header" id="description">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              License Description
            </button>
          </h5>

          <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
            <div class="accordion-body">
              {{body}}
            </div>
          </div>
        </div>
      </div>
      
      

<!--      <div v-else>-->
<!--        <p class="card-text">No license information available.</p>-->
<!--      </div>-->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: null,
    },
    description: String,
    html_url: {
      type: String,
      default: null,
    },
    permissions : Array,
    conditions : Array,
    limitations : Array,
    body : String,
  },
};
</script>

<style scoped>
/* Your styles here */
</style>
