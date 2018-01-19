<template>
  <div class="col-lg-4">
    <div class="card bg-primary text-center card-form">
      <div class="card-body">
        <h3>Sign Up Today!</h3>
        <p>Please fill out this form.</p>

        <form>
          <div class="form-group">  
            <input type="text" class="form-control form-control-lg" placeholder="Username" >
          </div>

          <div class="form-group">  
            <input type="text" class="form-control form-control-lg" placeholder="Email" >
          </div>
          
          <div class="form-group">  
            <input type="text" class="form-control form-control-lg" placeholder="Password" >
          </div>
          
          <div class="form-group">  
            <input type="text" class="form-control form-control-lg" placeholder="Confirm Password" >
          </div>

          <button class="btn btn-outline-light btn-block">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SignupForm'
  }
</script>