<template>
  <div class="card">
    <div class="card-header">
      <h5 class="card-title">Citations</h5>
    </div>
    
    <div class="card-body">
      <div class="accordion accordion-flush" id="accordionCitations">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-citations-headingOne">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" 
                    data-bs-target="#flush-citations-collapseOne" aria-expanded="false" aria-controls="flush-citations-collapseOne">
              Show Citations
            </button>
          </h2>
          <div id="flush-citations-collapseOne" class="accordion-collapse collapse" 
               aria-labelledby="flush-citations-headingOne" data-bs-parent="#accordionCitations">
            <div class="accordion-body">
              <!-- List of citations -->
              <ul class="list-group" v-if="citationsData">
                <li class="list-group-item d-flex justify-content-between align-items-start" 
                    v-for="item in citationsData.citations"
                >
                  <div class="ms-2 me-auto">
<!--                    <div class="fw-bold">{{item.style_fullname}}</div>-->
                    <p class="card-text">{{item.citation}}</p>
                  </div>
                  <div>
                    <p class="text-muted">{{item.style_fullname}}</p>
                  </div>
<!--                  <span class="badge bg-primary rounded-pill">14</span>-->
                </li>
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
    citationsData : {
      type : Object,
      required : true
    }
  }
}
</script>

<style scoped>

</style>