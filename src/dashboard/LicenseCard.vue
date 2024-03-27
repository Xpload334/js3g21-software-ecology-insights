<template>
  <div class="card">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title">Licensing</h5>
      </div>
      
    </div>

    <div class="card-body">
      <div class="d-flex justify-content-between flex-wrap">
        <!--          <p class="card-text">{{ name }}</p>-->
        <span class="badge bg-light text-dark fs-5">{{ name }}</span>

        <div v-if="html_url">
          <a :href="html_url" class="btn btn-primary" target="_blank">Info</a>
        </div>
      </div>
      
      <br>
      
      <ul class="list-group">
        <!-- Perms -->
        <li class="list-group-item">
          <div class="fw-bold">Permissions</div>
          
          <div class="d-flex flex-wrap">
          <span v-for="perm in permissions">
            <span class="badge rounded-pill bg-primary">{{perm}}</span> &nbsp
          </span>
          </div>
        </li>

        <!-- Conditions -->
        <li class="list-group-item">
          <div class="fw-bold">Conditions</div>

          <div class="d-flex flex-wrap">
          <span v-for="cond in conditions">
            <span class="badge rounded-pill bg-warning">{{cond}}</span> &nbsp
          </span>
          </div>
        </li>

        <!-- Limitations -->
        <li class="list-group-item">
          <div class="fw-bold">Limitations</div>

          <div class="d-flex flex-wrap">
          <span v-for="limit in limitations">
            <span class="badge rounded-pill bg-danger">{{limit}}</span> &nbsp
          </span>
          </div>
        </li>
      </ul>
      
      <br>
      
      <div class="accordion">
        <div class="accordion-item">
          <h5 class="accordion-header" id="description">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
              Description
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
