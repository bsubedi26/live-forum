<template>
  <div class="fixed-top">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark d-flex">
        <a style="flex: 1" href="#home" class="navbar-brand">Live Forum</a>
        <div class="d-none d-md-block">
          <ul class="navbar-nav">
            <li class="nav-item"><a class="text-white nav-link">Home</a></li>
            <li class="nav-item"><a class="text-white nav-link">Explore</a></li>
            <li class="nav-item"><a class="text-white nav-link">Create</a></li>
            <li class="nav-item"><a class="text-white nav-link">Share</a></li>
          </ul>
        </div>

      <!-- HAMBURGER MENU TOGGLER FOR MOBILE -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

    </nav>

      <!-- MOBILE MENU LINKS -->
    <div class="collapse navbar-collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <ul class="navbar-nav text-center">
          <!-- <li class="nav-item"><a class="text-white nav-link">Hidden</a></li> -->
          <li class="nav-item"><a class="text-white nav-link">Home</a></li>
          <li class="nav-item"><a class="text-white nav-link">Explore</a></li>
          <li class="nav-item"><a class="text-white nav-link">Create</a></li>
          <li class="nav-item"><a class="text-white nav-link">Share</a></li>
        </ul>
      </div>
    </div>
      
  </div>
</template>

<script>
  export default {
    name: 'Navbar'
  }
</script>

<style lang="scss">
  $blue: #008ed6;

  .navbar {
    border-bottom: $blue solid 4px;
  }
</style>



