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
        <div class="card-text">
          <p>Welcome!</p>
          
          <p>This web app is designed to help you quickly gather key information around any public repository on GitHub.
            You can do this to see who contributed to a project, find out how it has developed over time and get information
            on a repository's license and linked publications.</p>
          
          <p>Search for any User or Organisation on GitHub to get their list of projects. Press "Open Dashboard" to open
            the repository's software ecology dashboard in a new tab!</p>
          
          <p>Use the Activity Chart to compare the Commits and Issues since project creation. Use the Contributors Chart to see who the
            top contributors to the project were and how they compare to the rest of the developers.</p>
        </div>
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
              <button class="accordion-button collapsed" type="button" 
                      data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                <b>What is software ecology?</b>
              </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Software ecology is the field of research into software lifecycles and sustainability. Analysing a project's history, looking at
                what went well and what could be improved is a key way to make better software, and better software developers.
              </div>
            </div>
          </div>
  
          <!-- FAQ Item 2 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button class="accordion-button collapsed" type="button" 
                      data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <b>How do I find related repositories?</b>
              </button>
            </h2>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                On any user display, select the View User button to bring up a panel showing a user's statistics and related repositories.
                Projects are linked based on their matching Topics.
              </div>
            </div>
          </div>

          <!-- FAQ Item 3 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button class="accordion-button collapsed" type="button" 
                      data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                <b>Why isn't the graph or some other elements loading?</b>
              </button>
            </h2>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                Your connection may affect if a GitHub API request can be sent or data received. Use the Refresh buttons to reload data, 
                check your own Internet connection, and reload the page if necessary.
              </div>
            </div>
          </div>

          <!-- FAQ Item 4 -->
          <div class="accordion-item">
            <h2 class="accordion-header" id="heading4">
              <button class="accordion-button collapsed" type="button"
                      data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                <b>
                  Why does the graph sometimes get cut off?
                </b>
              </button>
            </h2>
            <div id="collapse4" class="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#faqAccordion">
              <div class="accordion-body">
                On very large projects, such as open source projects, the amount of issues may cause problems when constructing graph data.
                Be sure to switch to a view with a shorter time window, such as Three Months or One Month in order to see recent data.
              </div>
            </div>
          </div>
          
          
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
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Joshua Severn</div>
<!--              <p>Content for list item</p>-->
              <p><a href="mailto:js3g21@soton.ac.uk">js3g21@soton.ac.uk</a></p>
            </div>
            <span class="badge bg-primary rounded-pill">Student</span>&nbsp;
            <span class="badge bg-primary rounded-pill">Programmer</span>&nbsp;
            <span class="badge bg-primary rounded-pill">Designer</span>&nbsp;
            <span class="badge bg-primary rounded-pill">Coffee Maker</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Leslie Carr</div>
              <p><a href="mailto:lac@ecs.soton.ac.uk">lac@ecs.soton.ac.uk</a></p>
            </div>
            <span class="badge bg-primary rounded-pill">Professor</span>&nbsp;
            <span class="badge bg-primary rounded-pill">Supervisor</span>&nbsp;
            <span class="badge bg-primary rounded-pill">Web Scientist</span>&nbsp;
          </li>
        </ul>

        <br>
        
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Bootstrap</div>
              <!--              <p>Content for list item</p>-->
              <p><a href="https://getbootstrap.com">https://getbootstrap.com</a></p>
            </div>
            <span class="badge bg-success rounded-pill">Library</span>&nbsp;
            <span class="badge bg-success rounded-pill">Styles</span>&nbsp;
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Chart.js</div>
              <p><a href="https://www.chartjs.org">https://www.chartjs.org</a></p>
            </div>
            <span class="badge bg-success rounded-pill">Library</span>&nbsp;
            <span class="badge bg-success rounded-pill">Charts</span>&nbsp;
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">CiteAS</div>
              <p><a href="https://citeas.org">https://citeas.org</a></p>
            </div>
            <span class="badge bg-success rounded-pill">API</span>&nbsp;
            <span class="badge bg-success rounded-pill">Citations</span>&nbsp;
          </li>
        </ul>
      </div>

    </div>
    
    
  </div>
</template>

<script setup>
import MainTitle from "../components/MainTitle.vue";


</script>

<style scoped>

</style>