const mongoose = require("mongoose");
const db = require("../models");

// This file empties the storytemplates collection and inserts the stories below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/project3");

const storySeed = [
  {
    "title": "El Ataque del Zombie",
    "story": "Un día terrible, el Dr.(1)___, un científico malo, hizo un experimento. Él puso contaminantes tóxicos en el cuerpo de un estudiante muerto, y así creó el primer zombie. El zombie se despertó y salió del laboratorio del Doctor. El zombie (2)___y aterrorizó a millones de personas por (3)___días. Nadie sabía qué hacer...nadie sino(4)___.Su (5)___fue la primera victima del zombie y por eso él/ella buscaba venganza. (6)___ siempre llevaba un/a (7)___ para destruir la criatura horrorosa. Un día, (8)___ (9)___por las calles de su ciudad cuando escuchó un grito. Él/Ella miro hacia atrás y vió el zombie que había matado a su (10)___! Rápidamente, él/ella agarró el/la (11)___ y (12)___ hacia el zombie. Gritó <<(13)___!>> y lo pegó con el/la (14)___. El zombie (15)___. Antes de morir, el zombie dijo, <<(16)___ (17)___ >>. (18)___ se sentía (19)___.",

    "prompts": ["(1)Last name", "(2)preterite verb él/ella form", "(3)Number greater than one", "(4)name of a person", "(5)noun that refers to a person", "(6)name of a person", "(7)singular noun", "(8)name of a person","(9)imperfect verb, él/ella form", "(10)noun that refers to a person", "(11) singular noun", "(12)preterite verb, él/ella form", "(13)Definite article + noun", "(14)singular noun","(15)preterite verb, él/ella form", "(16)plural noun", "(17)present tense verb, *they form", "(18)name of a person","(19)emotion"],
    "category": "Scary",
    "language": "Spanish"
  },
  {
    "title": "Vacations",
    "story": "A vacation is when you take a trip to some ___ place with your ___ family. Usually you go to some place that is near a/an ___. A good vacation place is one where you can ride ___ or play ___ or go hunting for ___. I like to spend my time ___ or ___.",
    "prompts": ["(1)adjective", "(2)adjective", "(3)noun", "(4)noun", "(5)plural noun", "(6)game", "(7)plural noun", "(8)verb ending in ING"],
    "category": "Funny",
    "language": "English"
  }
];

db.StoryTemplates.remove({})
  .then(() => db.StoryTemplates.collection.insertMany(storySeed))
  .then(data => {
    console.log(data.result.n + " story records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });




//PartsOfSpeech
const partsOfSpeechSeed = [
  {
    "partOfSpeech": "Noun"
  },
  {
    "partOfSpeech": "Adjective"
  },
  {
    "partOfSpeech": "Adverb"
  },
  {
    "partOfSpeech": "Verb"
  }    
];

db.PartsOfSpeech.remove({})
  .then(() => db.PartsOfSpeech.collection.insertMany(partsOfSpeechSeed))
  .then(data => {
    console.log(data.result.n + " parts of speech records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });


db.Users.create({userid: "jtest@hotmail.com", password: "test" })
  .then(dbUser => {
    console.log(dbUser);
  })
  .catch(({ message }) => {
    console.log(message);
  });

// db.StoryTemplates.create({story: "this is a test story", prompts: ["adjective","verb"] })
//     .then(({ _id }) => db.Users.findOneAndUpdate({userid: "jtest@hotmail.com"}, { $push: {storytemplates: _id } }, { new: true }))
//     .then(dbUser => {
// //      res.json(dbUser);
//         console.log(dbUser);
//     });
// //     .catch(err => {
// //       res.json(err);
// //     });

