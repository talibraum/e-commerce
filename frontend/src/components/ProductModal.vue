<template>
    <div>
      <transition name="fade">
        <div v-if="isVisible" class="modal-overlay">
          <transition name="popup">
            <div v-if="isVisible" class="card modal-content">
                
              
  <img src="https://cdn-0.codingyaar.com/wp-content/uploads/bootstrap-4-card-image-left-demo-image.jpg" class="card-img-top" alt="...">
  
  <div class="card-body">
    <button @click="closeModal" type="button" class="close close-button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
    <h5 class="card-title">Card title</h5>
    <p class="card-text">price:</p>
   

  
</div>
              
            </div>
          </transition>
        </div>
      </transition>
      
    </div>
  </template>
  
  <script>
  export default {
    name: "ProductModal",
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 778;
  }
  
  .modal-content {
    background: white;
    padding: 10px;
    border-radius: 8px;
    width: 50em;
  }

  .close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
}
  .card {
  flex-direction: row;
}
.card-title{
    font-size: 3em;
    font-weight: bold;
}

.card-body{

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
        align-items: center;
}
.card img {
  width: 50%;
}

  
  /* Fade transition styles for the overlay */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0;
  }
  
  /* Popup transition styles for the modal content */
  .popup-enter-active, .popup-leave-active {
    transition: transform 0.3s, opacity 0.3s;
  }
  .popup-enter, .popup-leave-to /* .popup-leave-active in <2.1.8 */ {
    transform: scale(0.9);
    opacity: 0;
  }
  </style>
  