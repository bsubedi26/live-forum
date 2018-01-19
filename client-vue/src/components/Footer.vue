<template>
  <div>

    <!-- FOOTER -->
    <footer id="main-footer" class="bg-light text-dark">
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="py-4">
              <p class="text-right">Copyright &copy; 2018
                <button data-toggle="modal" data-target="#contactModal" class="btn btn-outline-primary">Contact Us</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <!-- MODAL -->
    <div id="contactModal" class="modal fade text-dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="contactModalTitle">
              Contact Us
            </h5>
          </div>
          <div class="modal-body">
            <form>
              
              <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control">
              </div>
              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" class="form-control">
              </div>
              <div class="form-group">
                <label for="message">Message</label>
                <input type="text" class="form-control">
              </div>

            </form>
          </div>

          <div class="modal-footer">
            <button class="btn btn-primary btn-block">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Footer'    
  }
</script>

<style scoped>

</style>