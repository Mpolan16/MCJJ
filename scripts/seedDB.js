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
  },
  {
    "title": "A Forgotten Asylum",
    "story": "Deep in the Forest of 1___ lies the 2___ castle of 3___. All the people in the city are happy as they 4___ 5___ their breakfasts. All day long people go about making their 6___. Once in a while someone will 7___ and all the sudden 8___ starts falling from the sky. One day a/an 9___ comes to town. Everyone pays 10$___ for a/an 11___ and now they will be able to 12___ enough to create energy enough so the whole town has 13___ falling from the sky for days",
    "prompts": [ "(1)name", "(2)adjective", "(3)name", "(4)adjective", "(5)verb","(6)noun-thing", "(7)verb", "(8)noun-thing", "(9)occupation ending in -ist", "(10)number", "(11)noun-thing", "(12)verb", "(13)noun-thing" ],
    "category": "Scary",
    "language": "English"
},
{
    "title": "A Look Into Your Future",
    "story": "You tell your parents goodnight and the next morning when you wake up you it is the year 1___. Life is not what you expected. If you 2___ too loudly, you will be put in isolation. This room has 3___ oozing from the walls. No light or windows and you are only fed 4___. Otherwise you must spend your day making 5___ to make the Emperor 6___ happy. You join the 7___ warriors to try and take over the throne. Sadly, the 8___ weapons you had were easily destroyed by the Emperor's warriors. You wonder home to make new plans. You fall asleep on your desk and awake the next morning in your bedroom and your mother is calling you down for breakfast.  ",
    "prompts": [ "(1)year in the future", "(2)verb", "(3)noun-thing", "(4)plant", "(5)noun-thing", "(6)name", "(7)name", "(8)adjective",],
    "category": "Scary",
    "language": "English"
},
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

