<template>
  <div class="card h-100">
    <div class="card-header azur-gradient">
      <h5 class="card-title">Links</h5>
    </div>

    <div class="card-body">
      <div class="accordion accordion-flush" id="accordionLinks">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-links-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#flush-links-collapseOne" aria-expanded="false" 
                    aria-controls="flush-links-collapseOne">
              Show Links
            </button>
          </h2>
          <div id="flush-links-collapseOne" class="accordion-collapse collapse"
               aria-labelledby="flush-links-headingOne" data-bs-parent="#accordionLinks">
            <div class="accordion-body">
              <!-- List of citations -->
              <ul class="list-group" v-if="links.length > 0" v-for="item in links">
                <li class="card-text"><a :href=item>{{item}}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props:{
    links : {
      type : Array,
      required : true
    }
  }
}
</script>

<style scoped>

</style>