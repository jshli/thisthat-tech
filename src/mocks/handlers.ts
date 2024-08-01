import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`https://api.themoviedb.org/3/search/movie`, () => {
    return HttpResponse.json({
      results: [
        {
          adult: false,
          backdrop_path: '/m4TUa2ciEWSlk37rOsjiSIvZDXE.jpg',
          genre_ids: [16, 10751, 14],
          id: 129,
          original_language: 'ja',
          original_title: '千と千尋の神隠し',
          overview:
            'A young girl, Chihiro, becomes trapped in a strange new world of spirits. When her parents undergo a mysterious transformation, she must call upon the courage she never knew she had to free her family.',
          popularity: 168.255,
          poster_path: '/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
          release_date: '2001-04-18',
          title: 'Spirited Away',
          video: false,
          vote_average: 8.537,
          vote_count: 16167,
        },
        {
          adult: false,
          backdrop_path: '/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg',
          genre_ids: [16, 28, 12, 878],
          id: 569094,
          original_language: 'en',
          original_title: 'Spider-Man: Across the Spider-Verse',
          overview:
            'After reuniting with Gwen Stacy, Brooklyn’s full-time, friendly neighborhood Spider-Man is catapulted across the Multiverse, where he encounters the Spider Society, a team of Spider-People charged with protecting the Multiverse’s very existence. But when the heroes clash on how to handle a new threat, Miles finds himself pitted against the other Spiders and must set out on his own to save those he loves most.',
          popularity: 264.33,
          poster_path: '/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
          release_date: '2023-05-31',
          title: 'Spider-Man: Across the Spider-Verse',
          video: false,
          vote_average: 8.353,
          vote_count: 6577,
        },
        {
          adult: false,
          backdrop_path: '/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg',
          genre_ids: [28, 12, 878],
          id: 634649,
          original_language: 'en',
          original_title: 'Spider-Man: No Way Home',
          overview:
            'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.',
          popularity: 230.748,
          poster_path: '/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
          release_date: '2021-12-15',
          title: 'Spider-Man: No Way Home',
          video: false,
          vote_average: 7.962,
          vote_count: 19670,
        },
      ],
    });
  }),
];
