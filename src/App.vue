<!-- <template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/create">Create</router-link>
  </nav>
  <router-view/>
</template> -->
<template>
  <nav class="navbar">
    <div class="navbar__left">
      <router-link to="/" @click="displayAllListings">
        <img :src="logoSrc" alt="Airbnb-Logo" class="logo-img">
      </router-link>
    </div>
    <div class="navbar__center">
      <ul>
        <li><router-link to="/create" class="hide-element">Create a new listing</router-link></li>
        <li><router-link :to="editUrl" class="hide-element">Edit your listing</router-link></li>
      </ul>
    </div>
    <div class="navbar__right">
      <ul>
        <li><router-link to="/create">Airbnb your Home</router-link></li>
        <li><router-link :to="profileUrl">Profile</router-link></li>
      </ul>
    </div>
  </nav>
  <!-- Render router views -->
  <router-view/>
</template>


<script>
// import './Backend/active-link.js';
// import $ from 'jquery';
// $(document).ready(function () {
//   $('.linkClass').on('click', function () {
//     $('.linkClass').removeClass('active-link'); // Remove active-link class from all elements with the active-link class
//     $('.Icons').removeClass('active-img'); // Remove active-link class from all elements with the active-link class
//     $(this).addClass('active-link'); // Add active-link class to the clicked element
//     $(this).find('.Icons').addClass('active-img'); // Add active-link class to the clicked element
//   });
// });
</script>

<style>
body {
    margin: 0;
    padding: 0;
}

.logo-img {
    width: 150px;
    padding: 10% 0%;
}

.hide-element {
    display: none;
}

.navbar+.second-navbar {
    border-top: 1px solid #ccc;
    /* Adjust the thickness and color as needed */
    margin-top: 1px;
    /* Adjust the spacing between the navbars */
}

/* First navbar */
.navbar {
    background-color: #ffffff;
    box-shadow: 0 1px 10px 5px rgba(0, 0, 0, 0.1);
    padding: 1% 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
}

.navbar__left {
    margin-right: auto;
}

.navbar__center {
    display: flex;
    align-items: center;
}

.navbar__center ul {
    display: flex;
    justify-content: center;
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.navbar__center li {
    margin: 0 10px;
}

.navbar__center li a {
    text-decoration: none;
    color: #333333;
}

.navbar__right {
    margin-left: auto;
}

.navbar__right ul {
    display: flex;
    justify-content: flex-end;
    margin: 0;
    padding: 0;
    list-style-type: none;
}

.navbar__right li {
    margin: 0 10px;
}

.navbar__right li a {
    text-decoration: none;
    color: #333333;
}
</style>
