<template>
    <!-- fetch req is slower than html render -->
    <div v-if="listing" class="ListingDetail">
        <div class="title">
            <h1>{{ listing.title }}</h1>
        </div>

        <div class="row2">
            <h3 class="location">Location</h3>
            <div class="row2-1">
                <router-link :to="{ name: 'EditListing', params: { id: listing.id } }">
                    <button class="editBtn">Edit</button>
                </router-link>
                <button @click="confirmPopup" class="delBtn">Delete</button>
                <!-- <a href="" class="save-link">Save</a> -->
            </div>
        </div>
        <div class="horizontal-space"></div>

        <div class="picture-container">
            <!-- Picture here -->
            <img :src="listing.imageSrc" alt="Listing Image">
        </div>

        <div class="horizontal-space"></div>

        <div class="house-type">
            <p>{{ listing.type }}</p>
        </div>

        <div class="row5">
            <div class="guest-count">
                <p>Guest</p>
            </div>
            <div class="bathrooms-count">
                <p>Bathrooms count</p>
            </div>
        </div>

        <div class="house-description">
            <p>Description</p>
        </div>

        <div class="row6">
            <div>
                <p>
                    {{ listing.description }}
                </p>
            </div>
        </div>
    </div>
    <div v-else>
        <p> {{ error }}</p>
        <p>Loading Listings . . .</p>
    </div>
    <div v-if="deleted" id="popup1" class="overlay">
        <div class="popup">
            <h2>Update Deleted!</h2>
            <a @click="closePopup" class="close" href="#">&times;</a>
            <!-- &times represents the "x" cross -->
            <div class="content">
                Listing has been deleted Successfully !
                <br>
                Heading back to Home page.
            </div>
        </div>
    </div>
</template>
<script>
import { ref, watch } from 'vue'
import getListingById from '@/composables/getListingById'
import deleteListing from '@/composables/deleteListing'
import updateAllIDs from '@/composables/updateAllIDs'
// IDs are not mutable in JSON server
import router from '@/router'

export default {
    // Accept props in router
    props: ['id'],
    setup(props) {
        const { listing, error, loadListing } = getListingById(props.id);
        const { delError, deleteListingByID } = deleteListing(props.id);
        const deleted = ref(false);

        // mounted
        loadListing();

        // Watch for changes in confirmedDelete
        const confirmedDeleteWatcher = ref(false);
        watch(
            () => confirmedDeleteWatcher.value, // value being watched
            // callback func
            (newValue) => {
                if (newValue) {
                    // Call your function here when confirmedDelete becomes true
                    // For example:
                    deleteListingByID();
                }
            }
        );

        // method
        const confirmPopup = () => {
            if (confirm("Are you sure you want to delete this listing?")) {
                confirmedDeleteWatcher.value = true;
                deleted.value = true;
            }
        };

        const closePopup = () => {
            // close popup
            deleted.value = false;

            // reroute to home page
            router.push({ name: 'home' });
        };

        // render UI
        return { listing, error, confirmedDeleteWatcher, delError, confirmPopup, closePopup, deleted }
    },
    data() {
        return {
            // listing: null
        }
    },
    methods: {
        // confirmPopup() {
        //     if(confirm("Are you sure you want to delete this listing ?"))
        //     {
        //         confirmedDeleteWatcher.value = true;
        //     }
        // },
    }
}
</script>

<style scoped>
/* body {
    font-family: 'Varela Round', sans-serif;
} */

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

.ListingDetail {
    padding: 1% 5%;
}

.row2 {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.row2-1 {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 5%;
    width: 15%;
}

.row5 {
    font-size: 20px;
    display: flex;
    align-items: flex-start;
    gap: 1%;
    /* justify-content: space-between; */
}

.row5 p {
    margin: 0 !important;
    padding: 0 !important;
}

/* Title */
.title {
    font-size: 1.2rem;
    font-weight: bold;
}

.horizontal-space {
    margin: 1% 1%;
}

/* Location */
.location {
    text-align: left;
}

/* Save link */
.save-link {
    text-align: right;
}

/* Picture container */
.picture-container {
    width: 50%;
}

.picture-container img {
    width: 100%;
    height: auto;
    object-fit: cover;
}

/* House type */
.house-type,
.house-description {
    text-align: left;
    font-size: larger;
    font-weight: 600;
}

.house-type p {
    font-size: 26px;
    margin: 0 !important;
    padding: 0 !important;
}

/* Guest count */
.guest-count {
    text-align: left;
}

/* Bathrooms count */
.bathrooms-count {
    text-align: left;
}

/* Description */
.house-description p {
    margin-block-end: 0 !important;

}

.row6 p {
    margin-block-start: 0 !important;
    padding: 0 !important;
}

/* Buttons */
.editBtn,
.delBtn {
    align-items: center;
    appearance: none;
    background-color: #FCFCFD;
    border-radius: 4px;
    border-width: 0;
    box-shadow: rgba(45, 35, 66, 0.2) 0 2px 4px, rgba(45, 35, 66, 0.15) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    box-sizing: border-box;
    color: #36395A;
    cursor: pointer;
    display: inline-flex;
    font-family: "JetBrains Mono", monospace;
    height: 48px;
    justify-content: center;
    line-height: 1;
    list-style: none;
    overflow: hidden;
    padding-left: 16px;
    padding-right: 16px;
    position: relative;
    text-align: left;
    text-decoration: none;
    transition: box-shadow .15s, transform .15s;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    will-change: box-shadow, transform;
    font-size: 18px;
}

.editBtn:focus,
.delBtn:focus {
    box-shadow: #D6D6E7 0 0 0 1.5px inset, rgba(45, 35, 66, 0.4) 0 2px 4px, rgba(45, 35, 66, 0.3) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
}

.editBtn:hover,
.delBtn:hover {
    box-shadow: rgba(45, 35, 66, 0.3) 0 4px 8px, rgba(45, 35, 66, 0.2) 0 7px 13px -3px, #D6D6E7 0 -3px 0 inset;
    transform: translateY(-2px);
}

.editBtn:active,
.delBtn:active {
    box-shadow: #D6D6E7 0 3px 7px inset;
    transform: translateY(2px);
}
</style>
