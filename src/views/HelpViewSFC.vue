<template>
  <div>
    <MainTitle :state="'help'"/>
  </div>

  <div class="container" id="help">
    <!-- About -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">About</h2>
      </div>
      <div class="card-body">
        <p class="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie non leo in luctus. Cras a enim
          sed nisl tincidunt vestibulum. Mauris quis metus et risus iaculis suscipit. Etiam nisl purus, mattis eu quam
          quis, cursus ultricies ipsum. Nam vel facilisis nulla. Vivamus auctor fermentum posuere. Maecenas hendrerit non
          mauris eu hendrerit. Phasellus consequat metus nunc, sit amet malesuada purus vulputate nec. Cras pharetra nisl
          at turpis semper, nec condimentum dolor pellentesque.

          <br> Donec dapibus quis nibh quis finibus. Proin orci augue, blandit sit amet dolor a, placerat sagittis magna.
          Proin augue velit, condimentum quis eleifend id, dictum eu enim. Integer eleifend nisl tempor auctor dignissim.
          Proin ac imperdiet ante. Nulla maximus metus non dui placerat ornare. Nam in aliquam leo. Maecenas sed purus eu
          lorem mollis efficitur. Pellentesque a augue in metus congue molestie. Duis id suscipit nunc, et pellentesque
          enim. Suspendisse in dapibus mauris, eu dapibus odio. Mauris ullamcorper, lacus nec porttitor facilisis, lacus
          tellus gravida sapien, mollis ullamcorper libero urna vel erat. Fusce eleifend ex quis porttitor mattis. In hac
          habitasse platea dictumst.
        </p>
      </div>
      
    </div>
    
    <br>

    <!-- FAQ -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">FAQ</h2>
      </div>
      
      <div class="card-body">
        <div class="accordion" id="faqAccordion">
          <!-- FAQ Item 1 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Question 1: What is Lorem Ipsum?
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Answer 1: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </div>
            </div>
          </div>
  
          <!-- FAQ Item 2 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Question 2: Why do we use it?
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Answer 2: It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              </div>
            </div>
          </div>
  
          <!-- Add more FAQ items as needed -->
        </div>
      </div>
    </div>
    
    <br>
    
    <!-- Credits -->
    <div class="card">
      <div class="card-header">
        <h2 class="card-title">Credits</h2>
      </div>
      <div class="card-body">
        <p class="card-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque molestie non leo in luctus. Cras a enim
          sed nisl tincidunt vestibulum. Mauris quis metus et risus iaculis suscipit. Etiam nisl purus, mattis eu quam
          quis, cursus ultricies ipsum. Nam vel facilisis nulla. Vivamus auctor fermentum posuere. Maecenas hendrerit non
          mauris eu hendrerit. Phasellus consequat metus nunc, sit amet malesuada purus vulputate nec. Cras pharetra nisl
          at turpis semper, nec condimentum dolor pellentesque.

          <br> Donec dapibus quis nibh quis finibus. Proin orci augue, blandit sit amet dolor a, placerat sagittis magna.
          Proin augue velit, condimentum quis eleifend id, dictum eu enim. Integer eleifend nisl tempor auctor dignissim.
          Proin ac imperdiet ante. Nulla maximus metus non dui placerat ornare. Nam in aliquam leo. Maecenas sed purus eu
          lorem mollis efficitur. Pellentesque a augue in metus congue molestie. Duis id suscipit nunc, et pellentesque
          enim. Suspendisse in dapibus mauris, eu dapibus odio. Mauris ullamcorper, lacus nec porttitor facilisis, lacus
          tellus gravida sapien, mollis ullamcorper libero urna vel erat. Fusce eleifend ex quis porttitor mattis. In hac
          habitasse platea dictumst.
        </p>
      </div>

    </div>
    
    
  </div>
</template>

<script setup>
import MainTitle from "../components/MainTitle.vue";


</script>

<style scoped>

</style>