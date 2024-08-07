const moviesDB = require("../models/moviesDB.js");
const path = require('path');
const download = require('image-downloader');
const https = require('https');
//const oscarsDB= require('../models/oscarsDB.js');

module.exports.getTop10 = async(req,res)=>{
    let movie= await moviesDB.find({}, {'moviefromapi.short.name':1}).limit(10);

    let name = movie.map(e=>({ id: e._id.toString(), name: e.moviefromapi.short.name, img:`${process.env.REACT_APP_BACKEND_URL}/posters/${e._id.toString()}.jpg`}));

   // console.log(name);

   
    res.send(name);
}


module.exports.getMovies = async(req, res)=>{

    
////////////////////////////////////////////////////////////////////////////////////////////////////
    // const URL = 'https://search.imdbot.workers.dev/?tt=tt17351924';
   



    // fetch(URL)
    // .then((res)=>{
    //     return res.json();
    // })
    // .then((moviefromapi)=>{
    //   //  console.log(moviefromapi);

    //                   let newmovie = new moviesDB ({moviefromapi});
    //                   newmovie.save()
    //                   .then((saved)=>{
                        
    //                    const postername = saved._id.toString() 
    //                    const imageurl = saved.moviefromapi.short.image;
    //                   console.log(saved,'movie image link');

                        


    //                             const options = {
    //                          url: `${imageurl}`,
    //                          dest: path.resolve(`./public/posters/${postername}.jpg`),            
    //                             };
      
    //                         download.image(options)
    //                           .then(({ filename }) => {
    //                             console.log('Saved to', filename); 
    //                           })
    //                           .catch((err) => console.error(err));
                        
    //                     })
    //                     .catch(err =>{console.log(err);});
        
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })

    

///////////////////////////////////////////////////////////////////////


// const arr2022=[
//     {
//        "category": "Best Motion Picture of the Year",
//        "nominations": [
//           {
//              "notes": "CODA became the first movie produced by a streaming service to win Best Picture",
//              "won": true,
//              "primary": [
//                 "CODA"
//              ],
//              "secondary": [
//                 "Philippe Rousselet",
//                 "Fabrice Gianfermi",
//                 "Patrick Wachsberger"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Belfast"
//              ],
//              "secondary": [
//                 "Laura Berwick",
//                 "Kenneth Branagh",
//                 "Becca Kovacik",
//                 "Tamar Thomas"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Don't Look Up"
//              ],
//              "secondary": [
//                 "Adam McKay",
//                 "Kevin J. Messick"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Drive My Car"
//              ],
//              "secondary": [
//                 "Teruhisa Yamamoto"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Mary Parent",
//                 "Denis Villeneuve",
//                 "Cale Boyter"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "King Richard"
//              ],
//              "secondary": [
//                 "Tim White",
//                 "Trevor White",
//                 "Will Smith"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Licorice Pizza"
//              ],
//              "secondary": [
//                 "Sara Murphy",
//                 "Adam Somner",
//                 "Paul Thomas Anderson"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Nightmare Alley"
//              ],
//              "secondary": [
//                 "Guillermo del Toro",
//                 "J. Miles Dale",
//                 "Bradley Cooper"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Power of the Dog"
//              ],
//              "secondary": [
//                 "Jane Campion",
//                 "Tanya Seghatchian",
//                 "Emile Sherman",
//                 "Iain Canning",
//                 "Roger Frappier"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "West Side Story"
//              ],
//              "secondary": [
//                 "Steven Spielberg",
//                 "Kristie Macosko Krieger"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Performance by an Actor in a Leading Role",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Will Smith"
//              ],
//              "secondary": [
//                 "King Richard"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Andrew Garfield"
//              ],
//              "secondary": [
//                 "tick, tick... BOOM!"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Benedict Cumberbatch"
//              ],
//              "secondary": [
//                 "The Power of the Dog"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Denzel Washington"
//              ],
//              "secondary": [
//                 "The Tragedy of Macbeth"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Javier Bardem"
//              ],
//              "secondary": [
//                 "Being the Ricardos"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Performance by an Actress in a Leading Role",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Jessica Chastain"
//              ],
//              "secondary": [
//                 "The Eyes of Tammy Faye"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Kristen Stewart"
//              ],
//              "secondary": [
//                 "Spencer"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Nicole Kidman"
//              ],
//              "secondary": [
//                 "Being the Ricardos"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Olivia Colman"
//              ],
//              "secondary": [
//                 "The Lost Daughter"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Pen\u00e9lope Cruz"
//              ],
//              "secondary": [
//                 "Parallel Mothers"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Performance by an Actor in a Supporting Role",
//        "nominations": [
//           {
//              "notes": "Troy Kotsur became the first deaf actor to win an Oscar",
//              "won": true,
//              "primary": [
//                 "Troy Kotsur"
//              ],
//              "secondary": [
//                 "CODA"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Ciar\u00e1n Hinds"
//              ],
//              "secondary": [
//                 "Belfast"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "J.K. Simmons"
//              ],
//              "secondary": [
//                 "Being the Ricardos"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Jesse Plemons"
//              ],
//              "secondary": [
//                 "The Power of the Dog"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Kodi Smit-McPhee"
//              ],
//              "secondary": [
//                 "The Power of the Dog"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Performance by an Actress in a Supporting Role",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Ariana DeBose"
//              ],
//              "secondary": [
//                 "West Side Story"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Aunjanue Ellis"
//              ],
//              "secondary": [
//                 "King Richard"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Jessie Buckley"
//              ],
//              "secondary": [
//                 "The Lost Daughter"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Judi Dench"
//              ],
//              "secondary": [
//                 "Belfast"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Kirsten Dunst"
//              ],
//              "secondary": [
//                 "The Power of the Dog"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Directing",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Jane Campion"
//              ],
//              "secondary": [
//                 "The Power of the Dog"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Kenneth Branagh"
//              ],
//              "secondary": [
//                 "Belfast"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Paul Thomas Anderson"
//              ],
//              "secondary": [
//                 "Licorice Pizza"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Ry\u00fbsuke Hamaguchi"
//              ],
//              "secondary": [
//                 "Drive My Car"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Steven Spielberg"
//              ],
//              "secondary": [
//                 "West Side Story"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Original Screenplay",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Belfast"
//              ],
//              "secondary": [
//                 "Kenneth Branagh"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Don't Look Up"
//              ],
//              "secondary": [
//                 "Adam McKay",
//                 "David Sirota"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "King Richard"
//              ],
//              "secondary": [
//                 "Zach Baylin"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Licorice Pizza"
//              ],
//              "secondary": [
//                 "Paul Thomas Anderson"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Worst Person in the World"
//              ],
//              "secondary": [
//                 "Eskil Vogt",
//                 "Joachim Trier"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Adapted Screenplay",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "CODA"
//              ],
//              "secondary": [
//                 "Sian Heder"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Drive My Car"
//              ],
//              "secondary": [
//                 "Ry\u00fbsuke Hamaguchi",
//                 "Takamasa Oe"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Jon Spaihts",
//                 "Denis Villeneuve",
//                 "Eric Roth"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Lost Daughter"
//              ],
//              "secondary": [
//                 "Maggie Gyllenhaal"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Power of the Dog"
//              ],
//              "secondary": [
//                 "Jane Campion"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Cinematography",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Greig Fraser"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Nightmare Alley"
//              ],
//              "secondary": [
//                 "Dan Laustsen"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Power of the Dog"
//              ],
//              "secondary": [
//                 "Ari Wegner"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Tragedy of Macbeth"
//              ],
//              "secondary": [
//                 "Bruno Delbonnel"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "West Side Story"
//              ],
//              "secondary": [
//                 "Janusz Kaminski"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Film Editing",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Joe Walker"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Don't Look Up"
//              ],
//              "secondary": [
//                 "Hank Corwin"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "King Richard"
//              ],
//              "secondary": [
//                 "Pamela Martin"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Power of the Dog"
//              ],
//              "secondary": [
//                 "Peter Sciberras"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "tick, tick... BOOM!"
//              ],
//              "secondary": [
//                 "Myron Kerstein",
//                 "Andrew Weisblum"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Production Design",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Patrice Vermette",
//                 "Zsuzsanna Sipos"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Nightmare Alley"
//              ],
//              "secondary": [
//                 "Tamara Deverell",
//                 "Shane Vieau"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Power of the Dog"
//              ],
//              "secondary": [
//                 "Grant Major",
//                 "Amber Richards"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Tragedy of Macbeth"
//              ],
//              "secondary": [
//                 "Stefan Dechant",
//                 "Nancy Haigh"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "West Side Story"
//              ],
//              "secondary": [
//                 "Adam Stockhausen",
//                 "Rena DeAngelo"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Costume Design",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Cruella"
//              ],
//              "secondary": [
//                 "Jenny Beavan"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Cyrano"
//              ],
//              "secondary": [
//                 "Massimo Cantini Parrini",
//                 "Jacqueline Durran"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Jacqueline West",
//                 "Bob Morgan"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Nightmare Alley"
//              ],
//              "secondary": [
//                 "Luis Sequeira"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "West Side Story"
//              ],
//              "secondary": [
//                 "Paul Tazewell"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Sound",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Mac Ruth",
//                 "Mark A. Mangini",
//                 "Theo Green",
//                 "Doug Hemphill",
//                 "Ron Bartlett"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Belfast"
//              ],
//              "secondary": [
//                 "Denise Yarde",
//                 "Simon Chase",
//                 "James Mather",
//                 "Niv Adiri"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "No Time to Die"
//              ],
//              "secondary": [
//                 "Simon Hayes",
//                 "Oliver Tarney",
//                 "James Harrison",
//                 "Paul Massey",
//                 "Mark Taylor"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Power of the Dog"
//              ],
//              "secondary": [
//                 "Richard Flynn",
//                 "Robert Mackenzie",
//                 "Tara Webb"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "West Side Story"
//              ],
//              "secondary": [
//                 "Tod A. Maitland",
//                 "Gary Rydstrom",
//                 "Brian Chumney",
//                 "Andy Nelson",
//                 "Shawn Murphy"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Makeup and Hairstyling",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "The Eyes of Tammy Faye"
//              ],
//              "secondary": [
//                 "Stephanie Ingram",
//                 "Linda Dowds",
//                 "Justin Raleigh"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Coming 2 America"
//              ],
//              "secondary": [
//                 "Michael Marino",
//                 "Stacey Morris",
//                 "Carla Farmer"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Cruella"
//              ],
//              "secondary": [
//                 "Nadia Stacey",
//                 "Naomi Donne",
//                 "Julia Vernon"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Donald Mowat",
//                 "Love Larson",
//                 "Eva Von Bahr"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "House of Gucci"
//              ],
//              "secondary": [
//                 "G\u00f6ran Lundstr\u00f6m",
//                 "AnnaCarin Lock",
//                 "Frederic Aspiras"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Music Written for Motion Pictures (Original Score)",
//        "nominations": [
//           {
//              "notes": "Hans Zimmer was not presented at the awards ceremony. Presenter Jason Momoa accepted the award on Zimmer's behalf.",
//              "won": true,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Hans Zimmer"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Don't Look Up"
//              ],
//              "secondary": [
//                 "Nicholas Britell"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Encanto"
//              ],
//              "secondary": [
//                 "Germaine Franco"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Parallel Mothers"
//              ],
//              "secondary": [
//                 "Alberto Iglesias"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Power of the Dog"
//              ],
//              "secondary": [
//                 "Jonny Greenwood"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Music Written for Motion Pictures (Original Song)",
//        "nominations": [
//           {
//              "notes": "For song \"No Time to Die\"",
//              "won": true,
//              "primary": [
//                 "No Time to Die"
//              ],
//              "secondary": [
//                 "Billie Eilish",
//                 "Finneas O'Connell"
//              ]
//           },
//           {
//              "notes": "For song \"Down to Joy\"",
//              "won": false,
//              "primary": [
//                 "Belfast"
//              ],
//              "secondary": [
//                 "Van Morrison"
//              ]
//           },
//           {
//              "notes": "For song \"Dos Oruguitas\"",
//              "won": false,
//              "primary": [
//                 "Encanto"
//              ],
//              "secondary": [
//                 "Lin-Manuel Miranda"
//              ]
//           },
//           {
//              "notes": "For song \"Somehow You Do\"",
//              "won": false,
//              "primary": [
//                 "Four Good Days"
//              ],
//              "secondary": [
//                 "Diane Warren"
//              ]
//           },
//           {
//              "notes": "For song \"Be Alive\"",
//              "won": false,
//              "primary": [
//                 "King Richard"
//              ],
//              "secondary": [
//                 "Beyonc\u00e9",
//                 "Dixson"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Achievement in Visual Effects",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Dune"
//              ],
//              "secondary": [
//                 "Paul Lambert",
//                 "Tristan Myles",
//                 "Brian Connor",
//                 "Gerd Nefzer"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Free Guy"
//              ],
//              "secondary": [
//                 "Swen Gillberg",
//                 "Bryan Grill",
//                 "Nikos Kalaitzidis",
//                 "Daniel Sudick"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "No Time to Die"
//              ],
//              "secondary": [
//                 "Charlie Noble",
//                 "Joel Green",
//                 "Jonathan Fawkner",
//                 "Chris Corbould"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Shang-Chi and the Legend of the Ten Rings"
//              ],
//              "secondary": [
//                 "Christopher Townsend",
//                 "Joe Farrell",
//                 "Sean Noel Walker",
//                 "Dan Oliver"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Spider-Man: No Way Home"
//              ],
//              "secondary": [
//                 "Kelly Port",
//                 "Chris Waegner",
//                 "Scott Edelstein",
//                 "Daniel Sudick"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Documentary Feature",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Summer of Soul (...Or, When the Revolution Could Not Be Televised)"
//              ],
//              "secondary": [
//                 "Questlove",
//                 "Joseph Patel",
//                 "Robert Fyvolent",
//                 "David Dinerstein"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Ascension"
//              ],
//              "secondary": [
//                 "Jessica Kingdon",
//                 "Kira Simon-Kennedy",
//                 "Nathan Truesdell"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Attica"
//              ],
//              "secondary": [
//                 "Stanley Nelson",
//                 "Traci Curry"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Flee"
//              ],
//              "secondary": [
//                 "Jonas Poher Rasmussen",
//                 "Monica Hellstr\u00f8m",
//                 "Signe Byrge S\u00f8rensen",
//                 "Charlotte de La Gournerie"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Writing with Fire"
//              ],
//              "secondary": [
//                 "Rintu Thomas",
//                 "Sushmit Ghosh"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Documentary Short Subject",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "The Queen of Basketball"
//              ],
//              "secondary": [
//                 "Ben Proudfoot"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Audible"
//              ],
//              "secondary": [
//                 "Matthew Ogens",
//                 "Geoff McLean"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Lead Me Home"
//              ],
//              "secondary": [
//                 "Pedro Kos",
//                 "Jon Shenk"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Three Songs for Benazir"
//              ],
//              "secondary": [
//                 "Elizabeth Mirzaei",
//                 "Gulistan Mirzaei"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "When We Were Bullies"
//              ],
//              "secondary": [
//                 "Jay Rosenblatt"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Animated Feature Film",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "Encanto"
//              ],
//              "secondary": [
//                 "Jared Bush",
//                 "Byron Howard",
//                 "Yvett Merino",
//                 "Clark Spencer"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Flee"
//              ],
//              "secondary": [
//                 "Jonas Poher Rasmussen",
//                 "Monica Hellstr\u00f8m",
//                 "Signe Byrge S\u00f8rensen",
//                 "Charlotte de La Gournerie"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Luca"
//              ],
//              "secondary": [
//                 "Enrico Casarosa",
//                 "Andrea Warren"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Raya and the Last Dragon"
//              ],
//              "secondary": [
//                 "Don Hall",
//                 "Carlos L\u00f3pez Estrada",
//                 "Osnat Shurer",
//                 "Peter Del Vecho"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Mitchells vs the Machines"
//              ],
//              "secondary": [
//                 "Michael Rianda",
//                 "Phil Lord",
//                 "Christopher Miller",
//                 "Kurt Albrecht"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Animated Short Film",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "The Windshield Wiper"
//              ],
//              "secondary": [
//                 "Alberto Mielgo",
//                 "Leo Sanchez Barbosa"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Affairs of the Art"
//              ],
//              "secondary": [
//                 "Joanna Quinn",
//                 "Les Mills"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Beast"
//              ],
//              "secondary": [
//                 "Hugo Covarrubias",
//                 "Tevo D\u00edaz"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Boxballet"
//              ],
//              "secondary": [
//                 "Anton Dyakov"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Robin Robin"
//              ],
//              "secondary": [
//                 "Daniel Ojari",
//                 "Michael Please"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best Live Action Short Film",
//        "nominations": [
//           {
//              "notes": null,
//              "won": true,
//              "primary": [
//                 "The Long Goodbye"
//              ],
//              "secondary": [
//                 "Aneil Karia",
//                 "Riz Ahmed"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Ala Kachuu - Take and Run"
//              ],
//              "secondary": [
//                 "Maria Brendle",
//                 "Nadine L\u00fcchinger"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "On My Mind"
//              ],
//              "secondary": [
//                 "Martin Strange-Hansen",
//                 "Kim Magnusson"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "Please Hold"
//              ],
//              "secondary": [
//                 "K.D. D\u00e1vila",
//                 "Omer Levin Menekse"
//              ]
//           },
//           {
//              "notes": null,
//              "won": false,
//              "primary": [
//                 "The Dress"
//              ],
//              "secondary": [
//                 "Tadeusz Lysiak",
//                 "Maciej Slesicki"
//              ]
//           }
//        ]
//     },
//     {
//        "category": "Best International Feature Film",
//        "nominations": [
//           {
//              "notes": "Japan",
//              "won": true,
//              "primary": [
//                 "Drive My Car"
//              ],
//              "secondary": []
//           },
//           {
//              "notes": "Denmark",
//              "won": false,
//              "primary": [
//                 "Flee"
//              ],
//              "secondary": []
//           },
//           {
//              "notes": "Bhutan",
//              "won": false,
//              "primary": [
//                 "Lunana: A Yak in the Classroom"
//              ],
//              "secondary": []
//           },
//           {
//              "notes": "Italy",
//              "won": false,
//              "primary": [
//                 "The Hand of God"
//              ],
//              "secondary": []
//           },
//           {
//              "notes": "Norway",
//              "won": false,
//              "primary": [
//                 "The Worst Person in the World"
//              ],
//              "secondary": []
//           }
//        ]
//     }
//  ];

//  let newyear = new oscarsDB({year:arr2022});
//                       newyear.save()
//                       .then((saved)=>{})
//                  .catch(err =>{console.log(err);});



    let movie= await moviesDB.find({}, {'moviefromapi.short.name':1})

    let name = movie.map(e=>({ id: e._id.toString(), name: e.moviefromapi.short.name, img:`${process.env.REACT_APP_BACKEND_URL}/posters/${e._id.toString()}.jpg`}));

    //  ,e.moviefromapi.short.name
    // console.log(name);

   
    res.send(name);


}

module.exports.getMovie=async(req,res)=>{

const {id} = req.query
console.log('req.session.Username',req.session.Username)
// console.log('req')


// const SUBSCRIPTION_KEY = '05490cd5747c46dca9afff0183e9a92f';

// function bingWebSearch(query,bingdata) {
//   https.get({
//     hostname: 'api.bing.microsoft.com',
//     path:     '/v7.0/search?q=' + encodeURIComponent(query),
//     headers:  { 'Ocp-Apim-Subscription-Key': SUBSCRIPTION_KEY },
//   }, res => {
//     let body = ''
//     res.on('data', part => body += part)
//     res.on('end', () => {
//       for (var header in res.headers) {
//         if (header.startsWith("bingapis-") || header.startsWith("x-msedge-")) {
//          // console.log(header + ": " + res.headers[header])
//         }
//       }
//     //  console.log('\nJSON Response:\n')
//      bingdata=body;
//       //console.dir(JSON.parse(body), { colors: false, depth: null })
//       console.log(bingdata,'bindata')

//     })
//     res.on('error', e => {
//       console.log('Error: ' + e.message)
//       throw e
//     })
//   })
// }

// const query = 'hollywood'
// bingWebSearch(query);





try{

    if(!req.session.Username){
        let movie= await moviesDB.find({_id:id})
  
        const release_date=movie[0].moviefromapi.top.releaseDate;
        const name = movie[0].moviefromapi.top.titleText;
        const runtime = movie[0].moviefromapi.top.runtime.displayableProperty.value.plainText;
        const plot = movie[0].moviefromapi.top.plot.plotText;
        const actors = movie[0].moviefromapi.short.actor;
        const allcast = movie[0].moviefromapi.main.cast.edges;
        const director= movie[0].moviefromapi.short.director;
        const genres = movie[0].moviefromapi.top.genres;
        const url = `${process.env.REACT_APP_BACKEND_URL}/posters/${id}.jpg`
    
        const movierating = movie[0].totalMovieRatings;
        const totalwatched= movie[0].totalWatched;

    //let short = movie.moviefromapi.short
    res.send({release_date,name,runtime,plot, actors, director,genres,allcast, url,auth:false, movierating, totalwatched})}


        else if(req.session.Username){

            let movie= await moviesDB.find({_id:id})
            // console.log(movie[0])
                 // console.log(movie[0].moviefromapi.top.releaseDate)
                 // //console.log(movie[0].moviefromapi.runtime)
                 // console.log(movie[0].moviefromapi.top.titleText)
                 // console.log(movie[0].moviefromapi.top.genres)
                 // console.log(movie[0].moviefromapi.top.plot.plotText)
                 // console.log(movie[0].moviefromapi.short.actor)
                 // console.log(movie[0].moviefromapi.short.director)
                 req.session.CurrentmovieID = id; 
                 const release_date=movie[0].moviefromapi.top.releaseDate;
                 const name = movie[0].moviefromapi.top.titleText;
                 const runtime = movie[0].moviefromapi.top.runtime.displayableProperty.value.plainText;
                 const plot = movie[0].moviefromapi.top.plot.plotText;
                 const actors = movie[0].moviefromapi.short.actor;
                 const allcast = movie[0].moviefromapi.main.cast.edges;
                 const director= movie[0].moviefromapi.short.director;
                 const genres = movie[0].moviefromapi.top.genres;
                 const url = `${process.env.REACT_APP_BACKEND_URL}/posters/${id}.jpg`
             
                const movierating = movie[0].totalMovieRatings;
                const totalwatched= movie[0].totalWatched;
         
             //let short = movie.moviefromapi.short
             res.send({release_date,name,runtime,plot, actors, director,genres,allcast, url,auth:req.session.Username, movierating, totalwatched})}


        }


        catch(e){console.log(e)}

}



module.exports.postMovie = async(req,res) =>{
    const {moviefromapi} = req.body;
    
// console.log(moviefromapi, 'hereeeeeee')

//   async function downloadImage(url, filepath) {
//         return download.image({
//            url,
//            dest: filepath 
//         });
//     }

    const movie = await moviesDB.findOne({moviefromapi});
    // console.log(movie);
 
     

    if(!movie){
      //  console.log('inside')
      const addedDate = new Date();
      //const datenow = Date.now();
          console.log('datessss',addedDate);
                     
          let newmovie = new moviesDB ({moviefromapi,addedDate});
                      newmovie.save()
                      .then((saved)=>{
                        
                            const postername = saved._id.toString() 
                            const imageurl = saved.moviefromapi.short.image;
                           // console.log(saved,'movie image link');
                    
                                            
                    
                    
                            const options = {
                            url: `${imageurl}`,
                            dest: path.resolve(`./public/posters/${postername}.jpg`),  
                            
                            
                             };
                             res.send(postername)
                          
                            download.image(options)

                           

                          .then(({ filename }) => {
                            console.log('Saved to', filename); 
                                                  })
                         .catch((err) => console.error(err));
                                            
                                            })
                 .catch(err =>{console.log(err);});
        
        }
                    
    else{
        console.log('movie already in DB')
    res.send(movie._id.toString());
    }   
    
                   
}


module.exports.getBoxOffice = async(req,res)=>{

    // console.log('jei wala',req.query.id)
    const id = req.query.id

    try{
        
        let movie= await moviesDB.find({_id:id})
        
        // console.log(movie[0].moviefromapi.main)
        // const lifetimeGross = movie[0].moviefromapi.main.lifetimeGross.total.amount;
        const worldwideGross =movie[0].moviefromapi.main.worldwideGross.total.amount;
        const productionBudget = movie[0].moviefromapi.main.productionBudget.budget.amount;
        const addedDate = movie[0].addedDate;
        const seconds =addedDate.getTime()
        // console.log(seconds)

        res.send({ worldwideGross, productionBudget, addedDate, seconds});
    }
    catch(err){console.log(err)}
}


module.exports.updateBoxOffice = async(req,res)=>{
    const id = req.query.id;
    try{
        const todaysdate = new Date();
        const todaymillisec = todaysdate.getTime();

        const find = await moviesDB.findOne({_id:id},{addedDate:1, 'moviefromapi.imdbId':1, 'moviefromapi.top.releaseDate':1})
        const addeddate= (find.addedDate)
        const imdbId = (find.moviefromapi.imdbId);
        const releasedateDB = find.moviefromapi.top.releaseDate;

        const releasedate = Date.parse(`${releasedateDB.year}/${releasedateDB.month}/${releasedateDB.day}`);
        // var releasedateobj = new Date(releasedate);
        // milisecondsdiff = (todaysdate.getTime()-releasedateobj.getTime());
        // daysdiff=(secondsdiff/3600*24);
        // var d = Math.floor(milisecondsdiff / (1000*3600*24));
        // var sixmonthsago = todaysdate.setMonth(todaysdate.getMonth()- 6);
        const sixmonthsago = todaymillisec - 15724800000
        // const threedaysago = todaysdate.setDate(todaysdate.getDate()- 3)
        const threedaysago = todaymillisec - 259200000
        console.log(todaysdate)
        
        if(sixmonthsago < releasedate){
            // console.log(addeddate.getTime());

            if(addeddate>threedaysago){//testing for ulta sign rn
                console.log('here');

                    const URL = `https://search.imdbot.workers.dev/?tt=${imdbId}`;

                    fetch(URL)
                    .then((res)=>{
                        return res.json();
                    })
                    .then(async(boxoffice)=>{
                        const update= boxoffice.main.worldwideGross.total.amount;
                        // console.log(update, todaysdate)
                            
                        // await moviesDB.findOneAndUpdate({_id:id},{'moviefromapi.main.worldwideGross.total.amount': update, addedDate: todaysdate}, {returnDocument: 'after'})

                        // .then((saved)=>{res.send(saved.moviefromapi.main.worldwideGross.total.amount)})
                        // .catch((e)=>{console.log(e)})
                        })  
                    .catch((err)=> {console.log(err)})

            }

        }
        else{
            console.log('movie older than 6 months')
        }
    }
    catch(err){console.log(err)}
}