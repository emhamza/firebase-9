import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, getDocs,
    addDoc, deleteDoc, doc
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyCQDjHPybVWSZSpy90IU5pnpBjEXumBqH4",
    authDomain: "fir-9-experimental.firebaseapp.com",
    projectId: "fir-9-experimental",
    storageBucket: "fir-9-experimental.appspot.com",
    messagingSenderId: "587326764360",
    appId: "1:587326764360:web:877fa694a4c57dd827ef7d"
};

// init firbease app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

//collection Ref
const colRef = collection(db, 'books')

//get the collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.forEach((doc) => {
            books.push({...doc.data(), id: doc.id})
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })

//adding doc
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
    })
    .then(() => {
        addBookForm.reset()
    })
})

//deleting book
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })

})