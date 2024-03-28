<template>
  <div id="main-title">
<!--    <h1 class="title text-center mt-5">Search for Repos</h1>-->

    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <a class="navbar-brand" href="/">GitDash</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <!-- NAVBAR -->
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <!-- SEARCH -->
            <li class="nav-item">
              <div v-if="state === 'search'">
                <a class="nav-link active" aria-current="page">Search</a>
              </div>
              <div v-else>
                <a class="nav-link" aria-current="page" href="/search">Search</a>
              </div>
            </li>
            
            <!-- DASHBOARD -->
            <li class="nav-item">
              <div v-if="state === 'dashboard'">
<!--                <a class="nav-link active" aria-current="page">Search</a>-->
                <a class="nav-link active">Dashboard</a>
              </div>
              <div v-else>
<!--                <a class="nav-link active" aria-current="page" href="#">Search</a>-->
                <a class="nav-link disabled">Dashboard</a>
              </div>
            </li>
            
            <!-- HELP -->
            <li class="nav-item">
              <div v-if="state === 'help'">
                <a class="nav-link active" aria-current="page">Help</a>
              </div>
              <div v-else>
                <a class="nav-link" aria-current="page" href="/help">Help</a>
              </div>
            </li>
            
<!--            <li class="nav-item">-->
<!--              <a class="nav-link disabled">Disabled</a>-->
<!--            </li>-->
          </ul>
          
          <span class="navbar-text">
            Joshua Severn
          </span>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    state: String
  }
}
</script>

<style scoped>

</style>