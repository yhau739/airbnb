<!--  <template>
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
  <div class="listings">
    <div v-for="listing in filteredListings" :key="listing.id" class="card">
      <div class="card__image">
        <img :src="listing.imageSrc" alt="Listing Image">
      </div>
      <div class="card__content">
        <h2>{{ listing.title }}</h2>
        <p>RM {{ listing.rent }}</p>
      </div>
    </div>
  </div>
</template>-->
  
<script>
export default {
  name: 'SecondNav',
}
</script> 
