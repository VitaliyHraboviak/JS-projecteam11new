// Initialize Firebase
const config = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  databaseURL: 'YOUR_DATABASE_URL',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
};
firebase.initializeApp(config);

// Get elements
const txtEmail = document.querySelector('input[placeholder="EMAIL"]');
const txtPassword = document.querySelector('input[placeholder="PASSWORD"]');
const btnSignUp = document.querySelector('.form_button_style');
const btnLogout = document.querySelector('.btnLogout');

// Add sign up event
btnSignUp.addEventListener('click', e => {
  // Get email and password
  const email = txtEmail.value;
  const password = txtPassword.value;
  const auth = firebase.auth();
  // Sign in
  const promise = auth.createUserWithEmailAndPassword(email, password);
  promise.catch(e => console.log(e.message));
});

// Add a realtime listener
// firebase.auth().onAuthStateChanged(firebaseUser => {
//   if (firebaseUser) {
//     console.log(firebaseUser);
//     btnSignUp.textContent = firebaseUser.displayName;
//     btnLogout.classList.remove('hide');
//   } else {
//     console.log('not logged in');
//     btnSignUp.textContent = 'SIGN UP';
//     btnLogout.classList.add('hide');
//   }
// });

// Add logout event
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});
