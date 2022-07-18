import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, orderBy, where, updateDoc } from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import {
    GoogleAuthProvider,
    signInWithPopup
} from 'firebase/auth';
import 'firebase/compat/auth';
import firebase from 'firebase/compat/app';


const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyCWcr7Cwo7-7zEZSpYl7GmcdWnfFAP6bCo",
    authDomain: "fir-micro-blogging-app.firebaseapp.com",
    projectId: "firebase-micro-blogging-app",
    storageBucket: "firebase-micro-blogging-app.appspot.com",
    messagingSenderId: "922228533131",
    appId: "1:922228533131:web:1a893d9a68c6ab38b2b18e"
});

export const auth2 = firebase.auth();
const db = getFirestore();
const TWEETS_DB = collection(db, "tweets");
const USER_DB = collection(db, 'currentUser')
const auth = getAuth();
const provider = new GoogleAuthProvider()

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
}


const APIController = {
    signup: async (email, password, displayName) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    },
    getCurrentUser: () => {
        return auth.currentUser
    },
    login: async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);
        return userCredential.user;
    },
    updateDisplayName: async (displayname) => {
        await updateProfile(auth.currentUser, {
            displayName: displayname,
        })
        console.log(auth.currentUser)

    },
    startObservingTweets: (filters, callback) => {
        const q = query(TWEETS_DB, orderBy('date', 'desc'), ...filters.map((item) => where(item.property, item.operator, item.value)));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const tweets = [];
            querySnapshot.forEach((doc) => {
                tweets.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            callback(tweets);
        });
        return unsubscribe;
    },
    startObservingAuthCheck: (callback) => {
        onAuthStateChanged(auth, (user) => {
            callback(user);
        });
    },
    signOut: async () => {
        await signOut(auth);
    },
    getAllTweets: async () => {
        const querySnapshot = await getDocs(TWEETS_DB);
        const tweets = [];
        querySnapshot.forEach((doc) => {
            tweets.push({
                id: doc.id,
                ...doc.data()
            });
        });
        return tweets;
    },
    addNewTweets: async ({ content, username, userid, date }) => {
        const docRef = await addDoc(TWEETS_DB, {
            content,
            username,
            userid,
            date,
        });
        console.log(docRef, 'created');
    },
    deleteTweetById: async (id) => {
        await deleteDoc(doc(db, "tweets", id));
    },

    addNewUser: async ({ username }) => {
        await addDoc(USER_DB, {
            username
        });
        console.log('username added')
    },
    updateUsername: async (username) => {
        console.log("got here", username)
        await updateDoc(USER_DB, {
            "username": {
                userName: username
            }
        })
    }
}

export default APIController;
