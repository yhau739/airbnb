<template>
    <!DOCTYPE html>
    <html>

    <head>
        <title>Profile Page</title>
        <link rel="stylesheet" type="text/css" href="styles.css">
    </head>

    <body>
        <div class="profile-container">
            <div class="profile-header">
                <h1>User Profile</h1>
            </div>
            <div class="profile-content">
                <div class="profile-section">
                    <h2 class="profile-section-title">Personal Information</h2>
                    <div class="profile-field">
                        <label for="username">Username:</label>
                        <input type="text" id="username" value="johndoe" readonly>
                    </div>
                    <div class="profile-field">
                        <label for="password">Password:</label>
                        <input type="password" id="password" value="********" readonly>
                    </div>
                    <div class="profile-field">
                        <label for="age">Age:</label>
                        <input type="number" id="age" value="30" readonly>
                    </div>
                </div>
                <div class="profile-section">
                    <h2 class="profile-section-title">Payment Information</h2>
                    <div class="profile-field">
                        <label for="creditcard">Credit Card Number:</label>
                        <input type="text" id="creditcard" value="1234 5678 9012 3456" readonly>
                    </div>
                </div>
            </div>
        </div>
    </body>

    </html>
</template>
<script>
import { store } from '@/data/store';
export default {
    setup() {
        const sessionUserId = store.sessionUserId;

        // get user detail with api call
    },
}
</script>

<style scoped>
/* Body styles */
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
}

/* Profile container */
.profile-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
}

/* Profile header */
.profile-header {
    text-align: center;
    margin-bottom: 20px;
}

/* Profile content */
.profile-content {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 5px;
}

/* Profile section */
.profile-section {
    margin-bottom: 20px;
}

/* Profile section title */
.profile-section-title {
    margin-top: 0;
}

/* Profile field */
.profile-field {
    margin-bottom: 10px;
}

.profile-field label {
    display: inline-block;
    width: 150px;
    font-weight: bold;
}

.profile-field input {
    width: 300px;
    padding: 5px;
    border-radius: 3px;
    border: 1px solid #ccc;
    background-color: #fff;
}
</style>