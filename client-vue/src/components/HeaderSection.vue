<template>
  <div>
    <header id="home-section">
      <div class="dark-overlay">
        <div class="home-inner">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 d-none d-lg-block">
                <h1 class="display-4">
                    Build <strong>social profiles</strong> and gain revenue & profits
                </h1>

                <div class="d-flex flex-row">
                  <div class="p-4">
                    <i class="fa fa-check mt-2"></i>
                  </div>
                  <div class="p-4">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                    </p>
                  </div>
                </div>
                  <div class="d-flex flex-row">
                  <div class="p-4">
                    <i class="fa fa-check mt-2"></i>
                  </div>
                  <div class="p-4">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis est at dolor quaerat.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officiis.
                    </p>
                  </div>
                </div>
              </div>
              <SignupForm></SignupForm>
            </div>
          </div>
        </div>
      </div>
    </header>

  </div>
  
</template>

<script>
import SignupForm from '@/components/SignupForm.vue';

export default {
  name: 'HeaderSection',
  components: {
    SignupForm
  }
}
</script>