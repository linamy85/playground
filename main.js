var emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// Setup Firebase
var config = {
    apiKey: "AIzaSyD4HLHITNhKYE4YsbVe4x6P5dR5_UuYmko",
    authDomain: "my-chill-project.firebaseapp.com",
    databaseURL: "https://my-chill-project.firebaseio.com",
    storageBucket: "my-chill-project.appspot.com",
    messagingSenderId: "922758873649"
};



// Window.onload make sure vue.js is loaded first.
window.onload = function() {
    new Vue({
        el: '#app',
        data: {
            head: 'Hello Vue.js!'
        }
    })

    // Initializes firebase.
    firebase.initializeApp(config)

    // 'users' firebase database
    var usersRef = firebase.database().ref('users')

    // create Vue app
    var userlist = new Vue({
        // element to mount to
        el: '#userlist',
        // initial data
        data: {
            newUser: {
                name: '',
                email: ''
            }
        },
        // firebase binding
        // https://github.com/vuejs/vuefire
        firebase: {
            users: usersRef
        },
        // computed property for form validation state
        computed: {
            validation: function() {
                return {
                    name: !!this.newUser.name.trim(),
                    email: emailRE.test(this.newUser.email)
                }
            },
            isValid: function() {
                var validation = this.validation
                return Object.keys(validation).every(function(key) {
                    return validation[key]
                })
            }
        },
        // methods
        methods: {
            addUser: function() {
                if (this.isValid) {
                    console.log("Push: ", this.newUser)
                    usersRef.push(this.newUser)
                    this.newUser.name = ''
                    this.newUser.email = ''
                }
            },
            removeUser: function(user) {
                usersRef.child(user['.key']).remove()
            }
        }
    })

};

function login(str) {

    if (str == 'google') {
    	console.log("hiiiii")
        // Google auth
        var googleAuth = new firebase.auth.GoogleAuthProvider();
        console.log(googleAuth)

        firebase.auth().signInWithPopup(googleAuth).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            console.log(result)
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            // ...
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            console.log("Error login google:", error)
        });
    }
}
