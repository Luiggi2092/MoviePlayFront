const data = [
    {
      "genres": [
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        }
      ],
      "id": 157336,
      "original_title": "Interstellar",
      "overview": "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
      "popularity": 172.272,
      "actors": ["Matthew McConaughey", "Filmografía de Jessica Chastain", "Anne Hathaway", "Mackenzie Foy"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Christopher Nolan"
    },
    {
      "genres": [
        {
          "id": 35,
          "name": "Comedy"
        }
      ],
      "id": 98765,
      "original_title": "Hilarious Comedy",
      "overview": "A laugh-out-loud comedy that will keep you entertained from start to finish.",
      "popularity": 120.5,
      "actors": ["Comedian 1", "Comedian 2", "Comedian 3"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 2"
    },
    {
      "genres": [
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 53,
          "name": "Thriller"
        }
      ],
      "id": 654331,
      "original_title": "Crime Thriller",
      "overview": "A thrilling crime movie with unexpected plot twists and intense action scenes.",
      "popularity": 135.8,
      "actors": ["Actor A", "Actor B", "Actor C", "Actor D"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 3"
    },
    {
      "genres": [
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        }
      ],
      "id": 456789,
      "original_title": "Fantasy Adventure",
      "overview": "Embark on a magical journey filled with fantastical creatures and enchanting landscapes.",
      "popularity": 150.2,
      "actors": ["Fantasy Actor 1", "Fantasy Actor 2"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 4"
    },
    {
      "genres": [
        {
          "id": 27,
          "name": "Horror"
        }
      ],
      "id": 789012,
      "original_title": "Horror Flick",
      "overview": "A spine-chilling horror movie that will keep you on the edge of your seat.",
      "popularity": 180.3,
      "actors": ["Horror Actor X", "Horror Actor Y"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 5"
    },
    {
      "genres": [
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 10751,
          "name": "Family"
        }
      ],
      "id": 543210,
      "original_title": "Family Comedy",
      "overview": "A heartwarming family comedy that will leave you with a smile on your face.",
      "popularity": 95.7,
      "actors": ["Family Actor 1", "Family Actor 2", "Family Actor 3"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 6"
    },
    {
      "genres": [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 80,
          "name": "Crime"
        }
      ],
      "id": 135791,
      "original_title": "Action Crime",
      "overview": "An action-packed crime movie with high-speed chases and intense gunfights.",
      "popularity": 155.1,
      "actors": ["Action Star 1", "Action Star 2"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 7"
    },
    {
      "genres": [
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 10752,
          "name": "War"
        }
      ],
      "id": 246813,
      "original_title": "War History",
      "overview": "A gripping historical war movie that showcases the bravery and sacrifices of soldiers.",
      "popularity": 140.6,
      "actors": ["War Actor Alpha", "War Actor Beta", "War Actor Gamma"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 8"
    },
    {
      "genres": [
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 12,
          "name": "Adventure"
        }
      ],
      "id": 112233,
      "original_title": "Epic Fantasy Adventure",
      "overview": "An epic fantasy adventure that takes you on a journey through mythical lands and epic battles.",
      "popularity": 165.9,
      "actors": ["Fantasy Hero 1", "Fantasy Heroine 2"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 9"
    },
    {
      "genres": [
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 10751,
          "name": "Family"
        }
      ],
      "id": 789456,
      "original_title": "Animated Comedy",
      "overview": "A delightful animated comedy that will entertain audiences of all ages.",
      "popularity": 120.0,
      "actors": ["Voice Actor 1", "Voice Actor 2"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 10"
    },
    {
      "genres": [
        {
          "id": 99,
          "name": "Documentary"
        }
      ],
      "id": 369258,
      "original_title": "Eye-Opening Documentary",
      "overview": "An eye-opening documentary that sheds light on a compelling real-world issue.",
      "popularity": 95.4,
      "actors": ["Real Person 1", "Real Person 2"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 11"
    },
    {
      "genres": [
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10749,
          "name": "Romance"
        }
      ],
      "id": 987654,
      "original_title": "Romantic Drama",
      "overview": "A heartwrenching romantic drama that explores the complexities of love and relationships.",
      "popularity": 135.6,
      "actors": ["Romantic Actor A", "Romantic Actor B"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 12"
    },
    {
      "genres": [
        {
          "id": 80,
          "name": "Crime"
        }
      ],
      "id": 654321,
      "original_title": "Crime Solving",
      "overview": "A thrilling crime movie that follows a brilliant detective solving a complex case.",
      "popularity": 145.3,
      "actors": ["Detective Star", "Supporting Actor"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 13"
    },
    {
      "genres": [
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 18,
          "name": "Drama"
        }
      ],
      "id": 111222,
      "original_title": "Dramedy",
      "overview": "A heartwarming dramedy that skillfully blends humor with poignant storytelling.",
      "popularity": 130.7,
      "actors": ["Versatile Actor 1", "Versatile Actor 2"],
      "image": "https://es.web.img3.acsta.net/pictures/14/10/02/11/07/341344.jpg",
      "autor": "Director 14"
    }
  ];

export default data