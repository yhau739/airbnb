<template>
    <div class="container">
        <div v-if="showSuccessMessage || showErrorMessage" id="popup1" class="overlay">
            <div class="popup">
                <h2 v-if="showSuccessMessage">Successful Login !</h2>
                <h2 v-if="showErrorMessage">Login Failed !</h2>
                <a @click="closePopup" class="close" href="#">&times;</a>
                <!-- &times represents the "x" cross -->
                <div class="content" v-if="showSuccessMessage">
                    You have login Successfully !
                    <br>
                    Heading back to Home page.
                </div>
                <div class="content" v-if="showErrorMessage">
                    You failed to login !
                    <br>
                    Please Try again.
                </div>
            </div>
        </div>
        <div class="wrapper">
            <div class="card-switch">
                <label class="switch">
                    <input type="checkbox" class="toggle">
                    <span class="slider"></span>
                    <span class="card-side"></span>
                    <div class="flip-card__inner">
                        <div class="flip-card__front">
                            <div class="title">Log in</div>
                            <form class="flip-card__form" @submit.prevent="logInSubmit">
                                <input class="flip-card__input" v-model="usernameInput" placeholder="Username"
                                    type="username">
                                <input class="flip-card__input" v-model="passwordInput" placeholder="Password"
                                    type="password">
                                <button class="flip-card__btn">Let`s go!</button>
                            </form>
                        </div>
                        <div class="flip-card__back">
                            <div class="title">Sign up</div>
                            <form class="flip-card__form" @submit="signUpSubmit">
                                <input class="flip-card__input" placeholder="Name" type="name">
                                <input class="flip-card__input" name="email" placeholder="Email" type="email">
                                <input class="flip-card__input" name="password" placeholder="Password" type="password">
                                <button class="flip-card__btn">Confirm!</button>
                            </form>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import getUsers from '@/composables/getUsers';
import router from '@/router';

export default {
    setup() {
        const usernameInput = ref('');
        const passwordInput = ref('');
        const showSuccessMessage = ref(false);
        const showErrorMessage = ref(false);
        const sessionUser = ref(null);

        const { users, error, loadUsers, authenticateUser } = getUsers();

        //mounted
        loadUsers();

        const logInSubmit = () => {
            sessionUser.value = authenticateUser(usernameInput.value, passwordInput.value);
            // failed authentication
            if (!sessionUser) {
                showErrorMessage.value = true;
            }
            else {
                showSuccessMessage.value = true;
            }
        };

        const closePopup = () => {
            if (showSuccessMessage.value) {
                //route to home
                router.push({ name: 'home', params: { sessionUserId: sessionUser.value.id } });
            } else {
                // refresh form inputs
                usernameInput.value = '';
                passwordInput.value = '';
            }
            showSuccessMessage.value = false;
            showErrorMessage.value = false;
        }

        // UI render
        return { closePopup, showErrorMessage, showSuccessMessage, usernameInput, passwordInput, users, error, logInSubmit };
    }
}
</script>

<style scoped>
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

.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
    display: flex;
    justify-content: center;
    align-items: center;
}

/* switch card */
.switch {
    -webkit-transform: translateY(600%);
    -ms-transform: translateY(600%);
    transform: translateY(600%);
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
}

.card-side::before {
    position: absolute;
    content: 'Log in';
    left: -70px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: var(--font-color);
    font-weight: 600;
}

.card-side::after {
    position: absolute;
    content: 'Sign up';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: var(--font-color);
    font-weight: 600;
}

.toggle {
    opacity: 0;
    width: 0;
    height: 0;
}

.slider {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    -webkit-box-shadow: 4px 4px var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-colorcolor);
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

.slider:before {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    -webkit-box-shadow: 0 3px 0 var(--main-color);
    box-shadow: 0 3px 0 var(--main-color);
    -webkit-transition: 0.3s;
    transition: 0.3s;
}

.toggle:checked+.slider {
    background-color: var(--input-focus);
}

.toggle:checked+.slider:before {
    -webkit-transform: translateX(30px);
    -ms-transform: translateX(30px);
    transform: translateX(30px);
}

.toggle:checked~.card-side:before {
    text-decoration: none;
}

.toggle:checked~.card-side:after {
    text-decoration: underline;
}

/* card */

.flip-card__inner {
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    -webkit-perspective: 1000px;
    perspective: 1000px;
    /* width: 100%;
    height: 100%; */
    text-align: center;
    -webkit-transition: -webkit-transform 0.8s;
    transition: -webkit-transform 0.8s;
    transition: transform 0.8s;
    transition: transform 0.8s, -webkit-transform 0.8s;
    -webkit-transform-style: preserve-3d;
    transform-style: preserve-3d;
}

.toggle:checked~.flip-card__inner {
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.toggle:checked~.flip-card__front {
    -webkit-box-shadow: none;
    box-shadow: none;
}

.flip-card__front,
.flip-card__back {
    padding: 20px;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    -webkit-box-shadow: 4px 4px var(--main-color);
    box-shadow: 4px 4px var(--main-color);
}

.flip-card__back {
    width: 100%;
    -webkit-transform: rotateY(180deg);
    transform: rotateY(180deg);
}

.flip-card__form {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    gap: 20px;
}

.title {
    margin: 20px 0 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
}

.flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    -webkit-box-shadow: 4px 4px var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
}

.flip-card__input::-webkit-input-placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
}

.flip-card__input::-moz-placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
}

.flip-card__input:-ms-input-placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
}

.flip-card__input::-ms-input-placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
}

.flip-card__input::placeholder {
    color: var(--font-color-sub);
    opacity: 0.8;
}

.flip-card__input:focus {
    border: 2px solid var(--input-focus);
}

.flip-card__btn:active,
.button-confirm:active {
    -webkit-box-shadow: 0px 0px var(--main-color);
    box-shadow: 0px 0px var(--main-color);
    -webkit-transform: translate(3px, 3px);
    -ms-transform: translate(3px, 3px);
    transform: translate(3px, 3px);
}

.flip-card__btn {
    margin: 20px 0 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    -webkit-box-shadow: 4px 4px var(--main-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
}
</style>