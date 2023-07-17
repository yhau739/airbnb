<!-- Home Page -->
<template>
    <!-- <nav class="navbar">
    <div class="navbar__left">
      <router-link to="/" @click="displayAllListings">
        <img :src="logoSrc" alt="Airbnb-Logo" class="logo-img">
      </router-link>
    </div>
    <div class="navbar__center">
      <ul>
        <li><router-link to="/create" class="">Create a new listing</router-link></li>
        <li><router-link :to="editUrl" class="hide-element">Edit your listing</router-link></li>
      </ul>
    </div>
    <div class="navbar__right">
      <ul>
        <li v-if="sessionUserId"><router-link to="/create">Airbnb your Home</router-link></li>
        <li><router-link to="/login">{{ sessionUserId ? 'Profile' : 'Login/Signup'}}</router-link></li>
      </ul>
    </div>
  </nav> -->
  <nav class="second-navbar">
    <ul>
      <li v-for="data in categories" :key="data.type">
        <a href="#" @click="handleClick(data)" :class="{ 'active-link': data.isActive }">
          <img :src="data.icon" alt="data.type" class="Icons" :class="{ 'active-img': data.isActive }">
          <span>{{ data.type }}</span>
        </a>
      </li>
    </ul>
  </nav>
  <div v-if="showWelcomeMsg">
    <div id="popup1" class="overlay">
      <div class="popup">
        <h2>Welcome Mr Lee !</h2>
        <a @click="closePopup" class="close" href="#">&times;</a>
        <!-- &times represents the "x" cross -->
        <div class="content">
          This is the home page where all listings lies.
          <br>
          Look around !
        </div>
      </div>
    </div>
    <!-- Find user with this ID, then insert welcome message -->
    <!-- {{ sessionUserId }} -->
  </div>
  <div class="listings" v-if="listings.length">
    <div v-for="listing in filteredListings" :key="listing.id" class="card">
      <router-link class="card__link" :to="{ name: 'ListingDetail', params: { id: listing.id } }">
        <div class="card__image">
          <img :src="listing.imageSrc" alt="Listing Image">
        </div>
        <div class="card__content">
          <h2>{{ listing.title }}</h2>
          <p>RM {{ listing.rent }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import getCategories from '../composables/getCategories'
import getListings from '../composables/getListings'
import { onMounted, onUnmounted, onUpdated } from 'vue'
import { ref } from 'vue'

export default {
  props: {
    sessionUserId: {
      type: Number,
      default: null,
    }
  },
  setup(props) {
    const { categories, errorCategories, loadCategories } = getCategories();
    const { listings, error, loadListings } = getListings();
    const sessionUserId = ref(props.sessionUserId);
    const showWelcomeMsg = ref(false);

    // debug
    if (sessionUserId.value) {
      showWelcomeMsg.value = true;
      console.log(sessionUserId);
    }

    // mounted
    loadCategories();
    loadListings();

    const closePopup = () => {
      showWelcomeMsg.value = false;
    }

    // return value to render on UI
    return { closePopup, sessionUserId, listings, categories, showWelcomeMsg }
  },
  data() {
    return {
      selectedCategory: null,
      // categories: [],
      // listings: [],
    }
  },
  computed: {
    filteredListings() {
      if (!this.selectedCategory) {
        return this.listings; // Show all listings if no category is selected
      }

      return this.listings.filter((listing) => listing.type === this.selectedCategory);
    },
  },
  methods: {
    handleClick(data) {
      this.filterListings(data.type);
      this.setActive(data);
    },
    setActive(clickedLink) {
      this.categories.forEach(link => {
        link.isActive = link.type === clickedLink.type;
      });
    },
    filterListings(category) {
      this.selectedCategory = category;
    },
    displayAllListings() {
      this.selectedCategory = null;
    },
  },
  name: 'SecondNav',
}
</script>

<style scoped>
/* Welcome message */
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


/* Second Navbar */
.second-navbar {
  background-color: #ffffff;
  padding: 1% 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -2px;
  z-index: 100;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;
  /* Adjust the thickness and color as needed */
  margin-top: 1px;
  /* Adjust the spacing between the navbars */
}

.second-navbar ul {
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.second-navbar li {
  margin: 0 10px;
}

.second-navbar li a {
  text-decoration: none;
  color: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: brightness(100%);
}

.second-navbar li a img {
  opacity: 0.7;
}

.Icons {
  width: 50px;
}

.second-navbar li a span {
  margin-top: 5px;
  padding-bottom: 10%;
}

/* Hover effects */
.second-navbar li a:hover {
  filter: brightness(10%);
  border-bottom: 1px solid #ccc;
  /* font-weight: bold; */
  /* Change the color when hovered */
}

.second-navbar li a:hover img {
  opacity: 1;
}

/* Active effects */
.active-link {
  filter: brightness(10%) !important;
  border-bottom: 1px solid #ccc;
}

/* Active effects */
.active-img {
  opacity: 1 !important;
}

/* Listings cards */
.listings {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 3%;
  padding: 1 5%;
  margin: 1% 0;
}

.card {
  flex: 0 0 22%;
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 1%;
  background: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}

.card:hover {
  transform: translateY(-2px);
}

.card:active {
  transform: translateY(2px);
}

.card__image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  /* maintain aspect ratio and crop */
  border-radius: 5px;
  margin-bottom: 10px;
}

.card__content {
  text-align: left;
}

.card__content h2 {
  font-size: 18px;
  margin-bottom: 5px;
  text-align: left;
  color: #333333;
}

.card__link {
  text-decoration: none;
  color: #333333;
}

.card__content p {
  font-size: 16px;
  text-align: left;
}
</style>

<!-- <template>
  <SecondNav/>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import SecondNav from '@/components/SecondNav.vue';

export default {
  name: 'HomeView',
  components: {
    SecondNav
  }
}
</script> -->