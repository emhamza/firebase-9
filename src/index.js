import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    //query and where function can used to run the different qurries on firebase
    //while running the query we also orderd the data by importing orderBy function
    //we also orderd the data using createdAt funciton while adding new doc into the data like so
    serverTimestamp,
    orderBy
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

//query runing
const q = query(colRef, orderBy('createdAt'))

//real time collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data(), id: doc.id})
    })
    console.log(books)
})


//adding doc
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
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