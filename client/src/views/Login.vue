<template>
  <div id="login">
    <button @click="login">Login with Google!</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Login',

  data() {
    return {
      provider: null,
    };
  },

  methods: {
    login() {
      firebase.auth().signInWithRedirect(this.provider).then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
        console.log(token);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        const credential = error.credential;
        // ...
        console.log(errorCode, errorMessage, email, credential);
      });
    },
  },

  mounted() {
    firebase.auth().useDeviceLanguage();
    this.provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      // var user = result.user;

      this.$router.push('/opponent-selection');
    }).catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // The email of the user's account used.
      // var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      // var credential = error.credential;
      // ...
      console.log(error);
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
