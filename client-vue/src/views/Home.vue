<template>
  <div id="home">
    <Navbar></Navbar>

    <HeaderSection></HeaderSection>
    

    <ExploreSection></ExploreSection>
    <CreateSection></CreateSection>
    <Footer></Footer>
    
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import HeaderSection from '@/components/HeaderSection.vue';
import ExploreSection from '@/components/ExploreSection.vue';
import CreateSection from '@/components/CreateSection.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'Home',
  components: {
    Navbar,
    HeaderSection,
    ExploreSection,
    CreateSection,
    Footer
  },
  data () {
    return {
    
    }
  }
}
</script>

<style lang="scss">
  $bg-color: #333;
  $font-color: #fff;
  $dark-overlay: rgba(0,0,0,0.7);
  $blue-color: #008ed6;

  body {
    background: $bg-color;
    color: $font-color;
  }

  // HOME
  #home-section {
    background: url("../assets/images/home-overlay.jpg") no-repeat;
    min-height: 700px;
    background-size: cover;
    background-attachment: fixed;
  }
  .dark-overlay {
    background-color: $dark-overlay;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 700px;
  }
  .home-inner {
    padding-top: 150px;
  }
  .card-form {
    opacity: 0.8;
  }

  .fa-check {
    background-color: white;
    color: black;
    border-radius: 4px;
    padding: 5px;
  }

  // EXPLORE
  #explore-section {
    background: $bg-color;
  }
  #explore-connect-section {
    background: white;
  }

  // #image-phone {
  //   background: url("../assets/images/phone.jpeg");
  //   min-height: 500px;
  //   background-size: cover;
  //   background-attachment: fixed;
  // }

  // CREATE
  #create-section {
    background: $blue-color;
  }
  #create-passion-section {
    background: $bg-color;
  }

</style>
