<script>
export default {
  props:{
    // details: Object
    avatar_url: String,
    login: String,
    type: String,
    html_url: String
  }
}
// "owner": {
//   "login": "openai",
//       "id": 14957082,
//       "node_id": "MDEyOk9yZ2FuaXphdGlvbjE0OTU3MDgy",
//       "avatar_url": "https://avatars.githubusercontent.com/u/14957082?v=4",
//       "gravatar_id": "",
//       "url": "https://api.github.com/users/openai",
//       "html_url": "https://github.com/openai",
//       "followers_url": "https://api.github.com/users/openai/followers",
//       "following_url": "https://api.github.com/users/openai/following{/other_user}",
//       "gists_url": "https://api.github.com/users/openai/gists{/gist_id}",
//       "starred_url": "https://api.github.com/users/openai/starred{/owner}{/repo}",
//       "subscriptions_url": "https://api.github.com/users/openai/subscriptions",
//       "organizations_url": "https://api.github.com/users/openai/orgs",
//       "repos_url": "https://api.github.com/users/openai/repos",
//       "events_url": "https://api.github.com/users/openai/events{/privacy}",
//       "received_events_url": "https://api.github.com/users/openai/received_events",
//       "type": "Organization",
//       "site_admin": false
// }

</script>

<template>
  <div class="card">
    <div class="row">
      <div class="col-md-2">
        <div v-if="avatar_url">
          <a :href=html_url target="_blank"><img :src='avatar_url' class="img-fluid rounded-start" :alt=login></a>
        </div>
        <div v-else>
          <img src="https://placehold.co/400" class="img-fluid rounded-start" alt="placeholder">
        </div>

      </div>
      <div class="col-md-6">
        <div class="card-body">
          <h5 class="card-title">{{login}}</h5>
          <p class="card-text">{{type}}</p>
<!--          <p class="card-text"><small class="text-muted">Created {{repoData.created_at}}</small></p>-->
<!--          <p class="card-text"><small class="text-muted">Last Updated {{repoData.updated_at}}</small></p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>