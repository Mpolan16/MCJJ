const mongoose = require("mongoose");
const db = require("../models");

// This file empties the storytemplates collection and inserts the stories below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

const storySeed = [

  {
    "title": "El Ataque del Zombie",
    "story": "Un día terrible, el Dr.(1)_________, un científico malo, hizo un experimento. Él puso contaminantes tóxicos en el cuerpo de un estudiante muerto, y así creó el primer zombie. El zombie se despertó y salió del laboratorio del Doctor. El zombie (2)________y aterrorizó a millones de personas por (3)___________días. Nadie sabía qué hacer...nadie sino(4)________.Su (5)________fue la primera victima del zombie y por eso él/ella buscaba venganza. (4)__________ siempre llevaba un/a (6)__________ para destruir la criatura horrorosa. Un día, (4)_____________ (7)_____________ por las calles de su ciudad cuando escuchó un grito. Él/Ella miro hacia atrás y vió el zombie que había matado a su (5)____________! Rápidamente, él/ella agarró el/la (6)________ y (8)___________ hacia el zombie. Gritó <<(9)__________!>> y lo pegó con el/la (6)______. El zombie (10)____________. Antes de morir, el zombie dijo, <<(11)__________ (12)____________ >>. (4)_______________ se sentía (13)_____________.",
    "prompts": ["(1)Last name", "(2)preterite verb él/ella form", "(3)Number greater than one", "(4)name of a person", "(5)noun that refers to a person", "(6)singular noun", "(7)imperfect verb, él/ella form", "(8)preterite verb, él/ella form", "(9)Definite article + noun", "(10)preterite verb, él/ella form", "(11)plural noun", "(12)present tense verb, *they form", "(13)emotion"],
    "category": "scary story",
    "language": "Spanish"
  },
  {
    "title": "Vacations",
    "story": "A vacation is when you take a trip to some ___ place with your ___ family. Usually you go to some place that is near a/an ___. A good vacation place is one where you can ride ___ or play ___ or go hunting for ___. I like to spend my time ___ or ___.",
    "prompts": ["(1)adjective", "(2)adjective", "(3)noun", "(4)noun", "(5)plural noun", "(6)game", "(7)plural noun", "(8)verb ending in ING"],
    "category": "funny story",
    "language": "English"
  }
];

db.StoryTemplates.remove({})
  .then(() => db.StoryTemplates.collection.insertMany(storySeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// db.Users.create({userid: "jtest@hotmail.com", password: "test" })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

// db.StoryTemplates.create({story: "this is a test story", prompts: ["adjective","verb"] })
//     .then(({ _id }) => db.Users.findOneAndUpdate({userid: "jtest@hotmail.com"}, { $push: {storytemplates: _id } }, { new: true }))
//     .then(dbUser => {
// //      res.json(dbUser);
//         console.log(dbUser);
//     });
// //     .catch(err => {
// //       res.json(err);
// //     });
