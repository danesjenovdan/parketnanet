<template>
    <div id="scorekeeper" class="row">
        <div class="col-12">
            <div class="my-5 text-center">
                <h6>
                    Trenutno imaš na Parketnanet {{ user.score }} točk.
                </h6>
            </div>
        </div>
    </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Scorekeeper',

  data() {
    return {
      db: null,
      query: null,
      user: {
        email: '',
        score: 0,
      },
      dbUserId: '',
    };
  },

  props: ['state'],

  methods: {
    incrementScore(amount) {
      if (this.dbUserId.length === 0) {
        return;
      }
      this.user.score += amount;
      this.db.collection('users').doc(this.dbUserId).set(this.user, { merge: true });
    },
  },

  mounted() {
    this.db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;

    this.db.collection('users').where('email', '==', currentUser.email).get().then((querySnapshot) => {
      let i = 0;
      querySnapshot.forEach((doc) => {
        this.user = doc.data();
        this.dbUserId = doc.id;
        i += 1;
      });

      if (i === 0) {
        this.db.collection('users').add({
          email: currentUser.email,
          score: 0,
        }).then((docRef) => {
          this.dbUserId = docRef.id;
        });
      } else {
        // is user
      }
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
