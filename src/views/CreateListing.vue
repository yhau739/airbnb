<template>
  <div class="">
    <div v-if="showSuccessMessage" id="popup1" class="overlay">
      <div class="popup">
        <h2>Successful Creation !</h2>
        <a @click="closePopup" class="close" href="#">&times;</a>
        <!-- &times represents the "x" cross -->
        <div class="content">
          Listing has been created Successfully !
          <br>
          Heading back to home page.
        </div>
      </div>
    </div>
    <form class="container" @submit="submitForm">
      <div class="card">
        <a class="createListing">Create Listing</a>
        <div class="inputBox1">
          <input type="text" required v-model="title">
          <span class="user">Title</span>
        </div>

        <div class="inputBox">
          <input type="text" required v-model="rent">
          <span>Rent</span>
        </div>

        <div class="inputBox">
          <input type="text" required v-model="description">
          <span>Description</span>
        </div>

        <div class="selectType">
          <label class="typeLabel">
            Type:
          </label>
          <select v-model="type">
            <option value="Rooms">Rooms</option>
            <option value="Camping">Camping</option>
            <option value="Treehouses">Treehouses</option>
          </select>
        </div>

        <label for="file-input" class="drop-container">
          <span class="drop-title">Drop image here</span>
          or
          <input type="file" accept="image/*" required="" id="file-input" @change="handleFileChange">
        </label>

        <button class="enter">Enter</button>
      </div>
    </form>
  </div>
</template>

<script>
import router from '@/router'

export default {
  data() {
    return {
      showSuccessMessage: false, // success msg for listing creation
      listings: [],
      title: '',
      type: '',
      imageSrc: '',
      rent: '',
      description: '',
      isAvailable: true,
    }
  },
  // mounted() {
  //   console.log(this.showSuccessMessage);
  // },
  methods: {
    closePopup() {
      // close popup
      this.showSuccessMessage = false;

      // reroute to home page
      router.push({ name: 'home' });
    },
    handleFileChange(event) {
      // Create a new FileReader
      const reader = new FileReader();

      // Read the file as Data URL
      reader.readAsDataURL(event.target.files[0]);

      // Set up a callback function when the file is loaded
      reader.onload = () => {
        const imageSrc = reader.result; // Base64 data or URL of the image

        this.imageSrc = imageSrc;
      };


    },
    submitForm(event) {
      event.preventDefault(); // Prevent default form submission behavior

      // Create a FormData object to send the image file to the server
      const formData = new FormData();

      // append values into form
      formData.append('title', this.title);
      formData.append('type', this.type);
      formData.append('imageSrc', this.imageSrc);
      formData.append('rent', this.rent);
      formData.append('description', this.description);
      formData.append('isAvailable', this.isAvailable);

      // convert the formdata into an Object
      const data = Object.fromEntries(formData);


      // Send the FormData to your server using AJAX or fetch API
      // Example using fetch API
      fetch('http://localhost:3000/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => response.json())
        .then(data => {
          // if response is success
          console.log(data);

          // Show success message
          this.showSuccessMessage = true;

          // Reset form fields
          this.title = '';
          this.type = '';
          this.imageSrc = '';
          this.rent = '';
          this.description = '';
          this.isAvailable = true;

          // Hide success message after a certain duration
          // setTimeout(() => {
          //   this.showSuccessMessage = false;
          // }, 5000);
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          console.error(error);
        });
    }
  },
}
</script>

<style scoped>
body {
  font-family: 'Varela Round', sans-serif;
}

.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  transition: opacity 500ms;
  z-index: 999;
  /* visibility: hidden; */
  /* opacity: 0; */
  visibility: visible;
  opacity: 1;
}

.overlay:target {
  visibility: visible;
  opacity: 1;
}

.popup {
  margin: 70px auto;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
  transition: all 5s ease-in-out;
}

.popup h2 {
  margin-top: 0;
  color: #333;
  font-family: Tahoma, Arial, sans-serif;
}

.popup .close {
  position: absolute;
  top: 20px;
  right: 30px;
  transition: all 200ms;
  font-size: 30px;
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

.popup .close:hover {
  color: #06D85F;
}

.popup .content {
  max-height: 30%;
  overflow: auto;
}


.typeLabel {
  /* text-transform: uppercase; */
}

.selectType {
  display: flex;
  justify-content: flex-start;
  gap: 5%;
  width: 60%;
}

.container {
  margin: 5% 0%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.createListing {
  color: #000;
  /* text-transform: uppercase; */
  letter-spacing: 2px;
  display: block;
  font-weight: bold;
  font-size: x-large;
  margin-top: 1.5em;
}

.card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 350px;
  width: 40%;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  gap: 35px;
  border-radius: 15px;
  background: #e3e3e3;
  -webkit-box-shadow: 16px 16px 32px #c8c8c8,
    -16px -16px 32px #fefefe;
  box-shadow: 16px 16px 32px #c8c8c8,
    -16px -16px 32px #fefefe;
  border-radius: 8px;
}

.inputBox,
.inputBox1 {
  position: relative;
  width: 60%;
}

.inputBox input,
.inputBox1 input {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  outline: none;
  border: none;
  color: #000;
  font-size: 1em;
  background: transparent;
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  border-bottom-left-radius: 8px;
}

.inputBox span,
.inputBox1 span {
  margin-top: 2%;
  position: absolute;
  left: 0;
  -webkit-transform: translateY(-4px);
  -ms-transform: translateY(-4px);
  transform: translateY(-4px);
  margin-left: 1px;
  padding: 10px;
  pointer-events: none;
  font-size: 12px;
  color: #000;
  /* text-transform: uppercase; */
  -webkit-transition: 0.5s;
  transition: 0.5s;
  letter-spacing: 3px;
  border-radius: 8px;
}

.inputBox input:valid~span,
.inputBox input:focus~span {
  -webkit-transform: translateX(60%) translateY(-70%);
  -ms-transform: translateX(60%) translateY(-70%);
  transform: translateX(60%) translateY(-70%);
  font-size: 0.8em;
  padding: 5px 10px;
  background: #000;
  letter-spacing: 0.2em;
  color: #fff;
  border: 2px;
}

.inputBox1 input:valid~span,
.inputBox1 input:focus~span {
  -webkit-transform: translateX(50%) translateY(-70%);
  -ms-transform: translateX(50%) translateY(-70%);
  transform: translateX(50%) translateY(-70%);
  font-size: 0.8em;
  padding: 5px 10px;
  background: #000;
  letter-spacing: 0.2em;
  color: #fff;
  border: 2px;
}

.inputBox input:valid,
.inputBox input:focus,
.inputBox1 input:valid,
.inputBox1 input:focus {
  border: 2px solid #000;
  border-radius: 8px;
}

.enter {
  height: 45px;
  width: 100px;
  border-radius: 5px;
  border: 2px solid #000;
  cursor: pointer;
  background-color: transparent;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 2px;
  margin-bottom: 3em;
}

.enter:hover {
  background-color: rgb(0, 0, 0);
  color: white;
}

/* Upload img */

.form-title {
  color: #000000;
  font-size: 1.8rem;
  font-weight: 500;
}

.form-paragraph {
  margin-top: 10px;
  font-size: 0.9375rem;
  color: rgb(105, 105, 105);
}

.drop-container {
  background-color: #fff;
  position: relative;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin-top: 2.1875rem;
  border-radius: 10px;
  border: 2px dashed rgb(171, 202, 255);
  color: #444;
  cursor: pointer;
  transition: background .2s ease-in-out, border .2s ease-in-out;
}

.drop-container:hover {
  background: rgba(0, 140, 255, 0.164);
  border-color: rgba(17, 17, 17, 0.616);
}

.drop-container:hover .drop-title {
  color: #222;
}

.drop-title {
  color: #444;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  transition: color .2s ease-in-out;
}

#file-input {
  width: 350px;
  max-width: 100%;
  color: #444;
  padding: 2px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(8, 8, 8, 0.288);
}

#file-input::file-selector-button {
  margin-right: 20px;
  border: none;
  background: #084cdf;
  padding: 10px 20px;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: background .2s ease-in-out;
}

#file-input::file-selector-button:hover {
  background: #0d45a5;
}
</style>