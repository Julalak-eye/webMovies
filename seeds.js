const mongoose = require("mongoose"),
    Movie = require("./models/movie"),
    Comment = require("./models/comment"),
    Cinema = require("./models/cinema"),
    Ticket = require( "./models/ticket"),
    Selectseat = require( "./models/ticket"),
    Promotion = require("./models/promotion"),
    User = require( "./models/user"),
    MovieS = require("./models/movieScheduling"),
    commentS = require("./models/commentScheduling");

const data = [
    // nowShowing
    {   
        poster: "/images/nowShowing/Daeng Phra Kanong.jpg",
        trailer: "/images/nowShowing/dang-prakanong .mp4",
        name: "Daeng Phra Kanong",
        date: "31 March 2022",
        genre: "Horror",
        rate: "13",
        time: "100", 
        synopsis: "เรื่องเล่าจากทุ่งพระโขนง ที่ยังไม่เคยถูกพูดถึง ความหลอน ความน่ากลัว และเสียงหัวเราะ กำลังจะนำมาซึ่งความประทับใจ ที่ยากจะลืมเลือน มิตรภาพแห่งวัยเยาว์ที่ไม่อาจมีสิ่งใดมาขวางกั้น กับความสนุกสนาน ที่จะทำให้คุณหัวเราะจนลั่นทุ่ง รอระเบิดความหลอนจนขนหัวลุก พร้อมความฮาจนท้องแข็ง กับ แดง พระโขนง",
        category: true,
    },
    {   
        poster: "/images/nowShowing/Detective Conan 25.jpg",
        trailer: "/images/nowShowing/detective conan the movie 25 .mp4",
        name: "Detective Conan 25 : The Bride of Halloween",
        date: "25 May 2022",
        genre: "Action, Animation",
        rate: "TBC",
        time: "110", 
        synopsis: `Shibuya, Tokyo, is bustling with the Halloween season. A wedding is being held at Shibuya Hikarie, where Miwako Sato is dressed in a wedding dress. While Conan and the other invited guests are watching, an assailant suddenly bursts in, and Wataru Takagi, who was trying to protect Sato, is injured. Takagi survived and the situation was settled, but in Sato's eyes, the image of the grim reaper that she had seen when Jinpei Matsuda, the man she had been in love with, had been killed in a series of bombings three years ago, overlapped with Takagi's.
        At the same time, the perpetrator of the bombings escapes from prison. Is this really a coincidence? Rei Furuya/Toru Amuro, a member of the public safety police, is hunting down the man who killed his classmate, but a mysterious person in disguise suddenly appears and puts a collar bomb on him.`,
        category: true,
    },
    {   
        poster: "/images/nowShowing/Everything Everywhere All at Once.jpg",
        trailer: "/images/nowShowing/everything everywhere all at once.mp4",
        name: "Everything Everywhere All at Once",
        date: "12 May 2022",
        genre: "Action, Adventure, Comedy",
        rate: "G",
        time: "140", 
        synopsis: `An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.`,
        category: true,
    },
    {   
        poster: "/images/nowShowing/Sonic the Hedgehog 2.jpg",
        trailer: "/images/nowShowing/sonic the hedgehog 2.mp4",
        name: "Sonic the Hedgehog 2",
        date: "06 April 2022",
        genre: "Action, Comedy",
        rate: "G",
        time: "120", 
        synopsis: `Sequel to the 2020 live-action feature film 'Sonic the Hedgehog'.`,
        category: true,
    },
    {   
        poster: "/images/nowShowing/Six Minutes to Midnight.jpg",
        trailer: "/images/nowShowing/six minutes to midnight .mp4",
        name: "Six Minutes to Midnight",
        date: "12 May 2022",
        genre: "Drama, Thriller",
        rate: "13",
        time: "100", 
        synopsis: `UK, Aug. 15, 1939: 17 days before WWII, an English teacher and his camera disappear on a coastal boarding school with 20 German teen girls. Miller gets the job 6 days later, secretly trying to find out what happened.`,
        category: true,
    },
    {   
        poster: "/images/nowShowing/doctorStrange.jpg",
        trailer: "/images/nowShowing/marvel-studios-doctor-strange-in-the-multiverse-of-madness-full-trailer-official-chabaithy.mp4",
        name: "Doctor Strange in the Multiverse of Madness",
        date: "04 May 2022",
        genre: "Action, Adventure, Fantasy",
        rate: "13",
        time: "130", 
        synopsis: `Dr. Stephen Strange casts a forbidden spell that opens the doorway to the multiverse, including alternate versions of himself, whose threat to humanity is too great for the combined forces of Strange, Wong, and Wanda Maximoff.`,
        category: true,
    },
    {   
        poster: "/images/nowShowing/The Secrets of Dumbledore.jpg",
        trailer: "/images/nowShowing/fantastic-beasts-the-secrets-of-dumbledore-trailer-2-chabaithy.mp4",
        name: "Fantastic Beasts : The Secrets of Dumbledore",
        date: "13 April 2022",
        genre: "Adventure, Family, Fantasy",
        rate: "G",
        time: "145", 
        synopsis: `The third installment of the 'Fantastic Beasts and Where to Find Them' series which follows the adventures of Newt Scamander.`,
        category: true,
    },
    {   
        poster: "/images/nowShowing/Fireheart.jpg",
        trailer: "/images/nowShowing/fireheart.mp4",
        name: "Fireheart",
        date: "25 May 2022",
        genre: "Adventure, Animation, Comedy",
        rate: "G",
        time: "95", 
        synopsis: `Sixteen-year-old Georgia Nolan dreams of being the world's first-ever female firefighter. When a mysterious arsonist starts burning down Broadway, New York's firemen begin vanishing. Georgia's father, Shawn, is called out of retirement by the Mayor of New York to lead the investigation into the disappearances. Desperate to help her father and save her city, Georgia disguises herself as a young man called "Joe" and joins a small group of misfit firefighters trying to stop the arsonist.`,
        category: true,
    },

    // comingsoon
    {   
        poster: "/images/comingSoon/Jujutsu Kaisen 0.jpg",
        trailer: "/images/comingSoon/jujutsu-kaisen-zero.mp4",
        name: "Jujutsu Kaisen 0: The Movie",
        date: "23 June 2022",
        genre: "Action, Animation, Fiction",
        rate: "TBC",
        time: "0", 
        synopsis: `Yuta Okkotsu, a high schooler who gains control of an extremely powerful Cursed Spirit and gets enrolled in the Tokyo Prefectural Jujutsu High School by Jujutsu Sorcerers to help him control his power and keep an eye on him.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Thor.jpg",
        trailer: "/images/comingSoon/Thor.mp4",
        name: "Thor: Love and Thunder",
        date: "06 July 2022",
        genre: "Action",
        rate: "TBC",
        time: "0", 
        synopsis: `he sequel to Thor: Ragnarok and the fourth movie in the Thor saga.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Nope.jpg",
        trailer: "/images/comingSoon//Nope.mp4",
        name: "Nope",
        date: "21 July 2022",
        genre: "Horror, Sci - Fi",
        rate: "TBC",
        time: "0", 
        synopsis: `The residents of a lonely gulch in inland California bear witness to an uncanny and chilling discovery.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/DC League of Super-Pets.jpg",
        trailer: "/images/comingSoon/DC.mp4",
        name: "DC League of Super-Pets",
        date: "04 August 2022",
        genre: "Action, Adventure, Animation",
        rate: "TBC",
        time: "0", 
        synopsis: `Superman's dog team up with a flying cat to stop crime while Superman is on vacation.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Paw.jpg",
        trailer: "/images/comingSoon/Paw.mp4",
        name: "Paw Of Fury: The Legend of Hank",
        date: "11 August 2022",
        genre: "Action, Animation, Comedy",
        rate: "TBC ",
        time: "0", 
        synopsis: `An action packed animated comedy for all the family inspired by Mel Brooks' timeless classic, Blazing Saddles. Hank, a loveable dog with a head full of dreams about becoming a samurai, sets off in search of his destiny.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Dragon Ball Super.jpg",
        trailer: "/images/comingSoon/Dragon Ball Super.mp4",
        name: "Dragon Ball Super: Super Hero",
        date: "29 September 2022",
        genre: "Action, Adventure, Animation",
        rate: "Action, Adventure, Animation",
        time: "0", 
        synopsis: `The Red Ribbon Army from Goku's past has returned with two new androids to challenge him and his friends.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Puss in Boots 2.jpg",
        trailer: "/images/comingSoon/Puss in Boots 2.mp4",
        name: "Puss in Boots 2: The Last Wish",
        date: "06 October 2022",
        genre: "Adventure, Animation, Comedy",
        rate: "TBC",
        time: "0", 
        synopsis: `Puss in Boots discovers that his passion for adventure has taken its toll: he has burned through eight of his nine lives. Puss sets out on an epic journey to find the mythical Last Wish and restore his nine lives.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Black Panther.jpg",
        trailer: "/images/comingSoon/.mp4",
        name: "Black Panther: Wakanda Forever",
        date: "10 November 2022",
        genre: "Action",
        rate: "TBC",
        time: "0", 
        synopsis: `Follow-up to the 2018 Marvel film 'Black Panther'.`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Avatar.jpg",
        trailer: "/images/comingSoon/Avatar.mp4",
        name: "Avatar: The Way of Water",
        date: "15 December 2022",
        genre: "Action, Adventure, Fantasy",
        rate: "TBC",
        time: "0", 
        synopsis: `A sequel to Avatar (2009).`,
        category: false,
    },
    {   
        poster: "/images/comingSoon/Spider-Man.jpg",
        trailer: "/images/comingSoon/Spider-Man.mp4",
        name: "Spider-Man: Across the Spider-Verse - Part One",
        date: "01 June 2023",
        genre: "Action, Adventure, Animation",
        rate: "TBC",
        time: "0", 
        synopsis: `Sequel to the 2018 film 'Spider-Man: Into the Spider-Verse'.`,
        category: false,
    },
];

function seedDB() {
    // delete all
    // Movie.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Movie remove complete");
    //         //input data
    //         data.forEach(function(seed) {
    //             Movie.create(seed, function(err, print) {
    //                 if (err) {
    //                     console.log(err);
    //                 } else {
    //                 }
    //             });
    //         });
    //     }
    // });

    // Comment.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Comment remove complete");
    //     }
    // });

    // Cinema.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Cinema remove complete");
    //     }
    // });

    // Ticket.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Ticket remove complete");
    //     }
    // });

    // Selectseat.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Selectseat remove complete");
    //     }
    // });

    // Promotion.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("Promotion remove complete");
    //     }
    // });

    // User.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("User remove complete");
    //     }
    // });

    // MovieS.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("User remove complete");
    //     }
    // });

    // commentS.remove({}, function(err) {
    //     if (err) {
    //         console.log(err)
    //     } else {
    //         console.log("User remove complete");
    //     }
    // });

}

module.exports = seedDB;