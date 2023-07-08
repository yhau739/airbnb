import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// createApp(App).use(router).mount('#app')

const firstNav = createApp(App);

// Creating an app
// 
firstNav.mixin({
    // data, functions to react to events

    // Function
    data() {
        return {
            categories: [
                { type: 'Rooms', icon: 'assets/Icons/bed.png' },
                { type: 'Camping', icon: 'assets/Icons/camping.png' },
                { type: 'Treehouses', icon: 'assets/Icons/treehouse.png' }
            ],
            listings: [
                { id: 1, title: '4 rooms 3 bed', type: 'Rooms', imageSrc: 'url', rent: '2500', description: 'Description 1', isAvailable: true },
                { id: 2, title: '3 tents', type: 'Camping', imageSrc: 'url', rent: '3500', description: 'Description 1', isAvailable: true },
                { id: 3, title: '10ft treehouse', type: 'Treehouses', imageSrc: 'url', rent: '4500', description: 'Description 1', isAvailable: true },
            ],
            selectedCategory: null,
            logoSrc: require('@/assets/airbnbLogo.png'),
            createUrl: 'https://www.airbnb.com/',
            editUrl: 'test',
            profileUrl: 'test'
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
        filterListings(category) {
            this.selectedCategory = category;
        },
        displayAllListings(){
            this.selectedCategory = null;
        },
    }
})

// mount the app element in the dom
firstNav.use(router).mount('#app')