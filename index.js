import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { credentials } from "./credentials.js";

initializeApp({
  credential: cert(credentials),
});

const db = getFirestore();

//const car = {make:'Ferrari', mopdel:'GTO', year: 2008, color:'red'}

// db.collection('cars')
//     .add({make:'Ferrari', mopdel:'GTO', year: 2008, color:'red'}) //add n time the doc
//     .then(doc => {
//         console.log('Doc added: ', doc.id)
//     })
//     .catch(err => console.error(err)
//     )

// db.collection('cars').doc('lambo') //doc named lambo
// .set({make: 'Lamborghini', model: 'Diablo', year: 2020, color: 'yellow'}) //add 1 doc

// db.collection('cars').doc('lambo')
// .update({model: 'Diablo', color: 'hot pink'})

//get a single document
db.collection("cars")
  .doc("lambo")
  .get()
  .then((doc) => {
    console.log(doc.id);
    console.log(doc.data());
  })
  .catch(console.error);

//get a whole collection
db.collection("cars")
  .get()
  .then((collection) => {
    collection.docs.forEach((doc) => console.log(doc.id, doc.data()));
  })
  .catch(console.error);

//Query docs from collection:
db.collection("cars")
  .where("year", ">=", 2015)
  .get()
    .then(collection => {
        const cars = collection.docs.map(doc => {
            let car = doc.data() //{make, model, color, year}
            car.id = doc.id //{make, model, color, year, id}
            return car
        })
        //  const cars2 = (collection.docs.map(doc => {
        //  return {...doc.data(), id: doc.id}
        //         {make, model, color, year, id}
        //})

        console.log(cars)
    })
    .catch(console.error)
