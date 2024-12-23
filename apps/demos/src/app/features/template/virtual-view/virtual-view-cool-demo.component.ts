import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  RxVirtualView,
  RxVirtualViewContent,
  RxVirtualViewObserver,
  RxVirtualViewPlaceholder,
} from '@rx-angular/template/virtual-view';

@Component({
  selector: 'virtual-view-cool-demo',
  template: `
    <div class="container" rxVirtualViewObserver>
      <h2>Movies</h2>
      <div class="item-wrapper">
        @for (movie of movies; track movie.id) {
          <div rxVirtualView class="item">
            <div *rxVirtualViewContent class="movie-card">
              <img
                [src]="'https://image.tmdb.org/t/p/w300' + movie.poster_path"
                loading="lazy"
                alt="{{ movie.title }}"
              />
              <div class="card-details">
                <h2 class="movie-title">{{ movie.title }}</h2>
                <div class="movie-info">
                  <span class="release-date">{{ movie.release_date }}</span>
                </div>
                <p class="overview">{{ movie.overview.slice(0, 100) }}...</p>
              </div>
            </div>
            <div *rxVirtualViewPlaceholder class="placeholder">
              {{ movie.title }}
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        padding: 20px;
        height: 100%;
        max-height: 100%;
        overflow-y: scroll;
      }

      .item-wrapper {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        grid-gap: 20px;
      }

      .movie-card {
        background-color: #242333;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s ease;
        color: white;
        height: 680px;
      }

      .movie-card img {
        width: 100%;
        height: 505px;
        object-fit: cover;
      }

      .card-details {
        padding: 15px;
      }

      .movie-title {
        margin: 0;
        font-size: 1.2rem;
        margin-bottom: 10px;
      }

      .movie-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
        font-size: 0.9rem;
      }

      .overview {
        font-size: 0.9rem;
        line-height: 1.4;
      }

      .placeholder {
        background-color: #242333;
        height: 680px;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
})
export class VirtualViewCoolDemoComponent {
  movies = movies;
}

const movies = [
  {
    adult: false,
    backdrop_path: '/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
    genre_ids: [28, 14, 878],
    id: 436270,
    original_language: 'en',
    original_title: 'Black Adam',
    overview:
      'Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods—and imprisoned just as quickly—Black Adam is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world.',
    popularity: 6579.615,
    poster_path: '/pFlaoHTZeyNkG83vxsAJiGzfSsa.jpg',
    release_date: '2022-10-19',
    title: 'Black Adam',
    video: false,
    vote_average: 7.3,
    vote_count: 2508,
  },
  {
    adult: false,
    backdrop_path: '/7zQJYV02yehWrQN6NjKsBorqUUS.jpg',
    genre_ids: [28, 18, 36],
    id: 724495,
    original_language: 'en',
    original_title: 'The Woman King',
    overview:
      'The story of the Agojie, the all-female unit of warriors who protected the African Kingdom of Dahomey in the 1800s with skills and a fierceness unlike anything the world has ever seen, and General Nanisca as she trains the next generation of recruits and readies them for battle against an enemy determined to destroy their way of life.',
    popularity: 3881.892,
    poster_path: '/438QXt1E3WJWb3PqNniK0tAE5c1.jpg',
    release_date: '2022-09-15',
    title: 'The Woman King',
    video: false,
    vote_average: 7.9,
    vote_count: 615,
  },
  {
    adult: false,
    backdrop_path: '/au4HUSWDRadIcl9CqySlw1kJMfo.jpg',
    genre_ids: [80, 28, 53],
    id: 829799,
    original_language: 'en',
    original_title: 'Paradise City',
    overview:
      'Renegade bounty hunter Ryan Swan must carve his way through the Hawaiian crime world to wreak vengeance on the kingpin who murdered his father.',
    popularity: 1796.896,
    poster_path: '/xdmmd437QdjcCls8yCQxrH5YYM4.jpg',
    release_date: '2022-11-11',
    title: 'Paradise City',
    video: false,
    vote_average: 6.3,
    vote_count: 40,
  },
  {
    adult: false,
    backdrop_path: '/sUuzl04qNIYsnwCLQpZ2RSvXA1V.jpg',
    genre_ids: [35, 28, 53],
    id: 792775,
    original_language: 'is',
    original_title: 'Leynilögga',
    overview:
      "When Bússi, Iceland's toughest cop, is forced to work with a new partner to solve a series of bank robberies, the pressure to close the case as soon as possible proves too much for him.",
    popularity: 1405.479,
    poster_path: '/jnWyZsaCl3Ke6u6ReSmBRO8S1rX.jpg',
    release_date: '2022-05-23',
    title: 'Cop Secret',
    video: false,
    vote_average: 6.3,
    vote_count: 33,
  },
  {
    adult: false,
    backdrop_path: '/kmzppWh7ljL6K9fXW72bPN3gKwu.jpg',
    genre_ids: [14, 28, 35, 80],
    id: 1013860,
    original_language: 'en',
    original_title: 'R.I.P.D. 2: Rise of the Damned',
    overview:
      'When Sheriff Roy Pulsipher finds himself in the afterlife, he joins a special police force and returns to Earth to save humanity from the undead.',
    popularity: 2530.599,
    poster_path: '/g4yJTzMtOBUTAR2Qnmj8TYIcFVq.jpg',
    release_date: '2022-11-15',
    title: 'R.I.P.D. 2: Rise of the Damned',
    video: false,
    vote_average: 6.7,
    vote_count: 207,
  },
  {
    adult: false,
    backdrop_path: '/707thQazLJiYLBhCrZlRoV05NNL.jpg',
    genre_ids: [28, 18, 53],
    id: 948276,
    original_language: 'fr',
    original_title: 'Balle perdue 2',
    overview:
      'Having cleared his name, genius mechanic Lino has only one goal in mind: getting revenge on the corrupt cops who killed his brother and his mentor.',
    popularity: 1277.701,
    poster_path: '/uAeZI1JJbLPq7Bu5dziH7emHeu7.jpg',
    release_date: '2022-11-10',
    title: 'Lost Bullet 2',
    video: false,
    vote_average: 6.6,
    vote_count: 148,
  },
  {
    adult: false,
    backdrop_path: '/90ZZIoWQLLEXSVm0ik3eEQBinul.jpg',
    genre_ids: [28, 27, 53],
    id: 988233,
    original_language: 'en',
    original_title: 'Hex',
    overview:
      'Following a mysterious disappearance on a jump, a group of skydivers experience paranormal occurrences that leave them fighting for their lives.',
    popularity: 1977.125,
    poster_path: '/xFJHb43ZAnnuiDztxZYsmyopweb.jpg',
    release_date: '2022-11-01',
    title: 'Hex',
    video: false,
    vote_average: 5.1,
    vote_count: 13,
  },
  {
    adult: false,
    backdrop_path: '/jCY35GkjwWUmoPO9EV1lWL6kuyj.jpg',
    genre_ids: [28, 12, 53],
    id: 855440,
    original_language: 'es',
    original_title: 'Polar',
    overview:
      'MG, a policewoman who has been expelled from the Corps due to the problems with alcohol and drugs that she has had since the loss of her son, receives a call from a man asking her to look for Macarena Gómez, a popular TV actress.',
    popularity: 1881.197,
    poster_path: '/efuKHH9LqBZB67AS87kprLgaYO8.jpg',
    release_date: '2022-10-26',
    title: 'Polar',
    video: false,
    vote_average: 7.5,
    vote_count: 2,
  },
  {
    adult: false,
    backdrop_path: '/vmDa8HijINCAFYKqsMz0YM3sVyE.jpg',
    genre_ids: [80, 28, 53],
    id: 747803,
    original_language: 'en',
    original_title: 'One Way',
    overview:
      'On the run with a bag full of cash after a robbing his former crime boss—and a potentially fatal wound—Freddy slips onto a bus headed into the unrelenting California desert. With his life slipping through his fingers, Freddy is left with very few choices to survive.',
    popularity: 1875.044,
    poster_path: '/uQCxOziq79P3wDsRwQhhkhQyDsJ.jpg',
    release_date: '2022-09-02',
    title: 'One Way',
    video: false,
    vote_average: 6.5,
    vote_count: 22,
  },
  {
    adult: false,
    backdrop_path: '/8Tr79lfoCkOYRg8SYwWit4OoQLi.jpg',
    genre_ids: [878, 28],
    id: 872177,
    original_language: 'en',
    original_title: 'Corrective Measures',
    overview:
      "Set in San Tiburon, the world's most dangerous maximum-security penitentiary and home to the world's most treacherous superpowered criminals, where tensions among the inmates and staff heighten, leading to anarchy that engulfs the prison and order is turned upside down.",
    popularity: 1196.661,
    poster_path: '/aHFq9NMhavOL0jtQvmHQ1c5e0ya.jpg',
    release_date: '2022-04-29',
    title: 'Corrective Measures',
    video: false,
    vote_average: 5.1,
    vote_count: 35,
  },
  {
    adult: false,
    backdrop_path: '/sP1ShE4BGLkHSRqG9ZeGHg6C76t.jpg',
    genre_ids: [53, 80],
    id: 934641,
    original_language: 'en',
    original_title: 'The Minute You Wake Up Dead',
    overview:
      'A stockbroker in a small southern town gets embroiled in an insurance scam with a next-door neighbor that leads to multiple murders when a host of other people want in on the plot. Sheriff Thurmond Fowler, the by-the-book town sheriff for over four decades, works earnestly to try and unravel the town’s mystery and winds up getting more than he bargained for.',
    popularity: 1785.183,
    poster_path: '/pUPwTbnAqfm95BZjNBnMMf39ChT.jpg',
    release_date: '2022-11-04',
    title: 'The Minute You Wake Up Dead',
    video: false,
    vote_average: 4.9,
    vote_count: 21,
  },
  {
    adult: false,
    backdrop_path: '/rfnmMYuZ6EKOBvQLp2wqP21v7sI.jpg',
    genre_ids: [35, 878, 12],
    id: 774752,
    original_language: 'en',
    original_title: 'The Guardians of the Galaxy Holiday Special',
    overview:
      'On a mission to make Christmas unforgettable for Quill, the Guardians head to Earth in search of the perfect present.',
    popularity: 1329.347,
    poster_path: '/8dqXyslZ2hv49Oiob9UjlGSHSTR.jpg',
    release_date: '2022-11-25',
    title: 'The Guardians of the Galaxy Holiday Special',
    video: false,
    vote_average: 7.5,
    vote_count: 607,
  },
  {
    adult: false,
    backdrop_path: '/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg',
    genre_ids: [28, 12, 878],
    id: 505642,
    original_language: 'en',
    original_title: 'Black Panther: Wakanda Forever',
    overview:
      'Queen Ramonda, Shuri, M’Baku, Okoye and the Dora Milaje fight to protect their nation from intervening world powers in the wake of King T’Challa’s death. As the Wakandans strive to embrace their next chapter, the heroes must band together with the help of War Dog Nakia and Everett Ross and forge a new path for the kingdom of Wakanda.',
    popularity: 1798.687,
    poster_path: '/ps2oKfhY6DL3alynlSqY97gHSsg.jpg',
    release_date: '2022-11-09',
    title: 'Black Panther: Wakanda Forever',
    video: false,
    vote_average: 7.5,
    vote_count: 1213,
  },
  {
    adult: false,
    backdrop_path: '/c1bz69r0v065TGFA5nqBiKzPDys.jpg',
    genre_ids: [35, 10751, 10402],
    id: 830784,
    original_language: 'en',
    original_title: 'Lyle, Lyle, Crocodile',
    overview:
      'When the Primm family moves to New York City, their young son Josh struggles to adapt to his new school and new friends. All of that changes when he discovers Lyle — a singing crocodile who loves baths, caviar and great music — living in the attic of his new home. But when Lyle’s existence is threatened by evil neighbor Mr. Grumps, the Primms must band together to show the world that family can come from the most unexpected places.',
    popularity: 1131.919,
    poster_path: '/irIS5Tn3TXjNi1R9BpWvGAN4CZ1.jpg',
    release_date: '2022-10-07',
    title: 'Lyle, Lyle, Crocodile',
    video: false,
    vote_average: 7.8,
    vote_count: 137,
  },
  {
    adult: false,
    backdrop_path: '/kpUre8wWSXn3D5RhrMttBZa6w1v.jpg',
    genre_ids: [35, 10751, 14],
    id: 338958,
    original_language: 'en',
    original_title: 'Disenchanted',
    overview:
      'Disillusioned with life in the city, feeling out of place in suburbia, and frustrated that her happily ever after hasn’t been so easy to find, Giselle turns to the magic of Andalasia for help. Accidentally transforming the entire town into a real-life fairy tale and placing her family’s future happiness in jeopardy, she must race against time to reverse the spell and determine what happily ever after truly means to her and her family.',
    popularity: 1120.736,
    poster_path: '/4x3pt6hoLblBeHebUa4OyiVXFiM.jpg',
    release_date: '2022-11-16',
    title: 'Disenchanted',
    video: false,
    vote_average: 7.3,
    vote_count: 492,
  },
  {
    adult: false,
    backdrop_path: '/olPXihyFeeNvnaD6IOBltgIV1FU.jpg',
    genre_ids: [27, 9648, 53],
    id: 882598,
    original_language: 'en',
    original_title: 'Smile',
    overview:
      "After witnessing a bizarre, traumatic incident involving a patient, Dr. Rose Cotter starts experiencing frightening occurrences that she can't explain. As an overwhelming terror begins taking over her life, Rose must confront her troubling past in order to survive and escape her horrifying new reality.",
    popularity: 1120.904,
    poster_path: '/aPqcQwu4VGEewPhagWNncDbJ9Xp.jpg',
    release_date: '2022-09-23',
    title: 'Smile',
    video: false,
    vote_average: 6.8,
    vote_count: 1043,
  },
  {
    adult: false,
    backdrop_path: '/5aSvzECXrtABcIh7fZYkH2K6ttC.jpg',
    genre_ids: [28, 53, 80],
    id: 972313,
    original_language: 'en',
    original_title: 'Blowback',
    overview:
      "When a master thief is sabotaged during a bank heist and left for dead, he seeks revenge on his former crew one target at a time. Now, with the cops and the mob closing in, he's in the race of his life to reclaim an untold fortune in cryptocurrency from those who double-crossed him.",
    popularity: 1324.392,
    poster_path: '/fHQHC32dhom8u0OxC2hs2gYQh0M.jpg',
    release_date: '2022-06-17',
    title: 'Blowback',
    video: false,
    vote_average: 6,
    vote_count: 21,
  },
  {
    adult: false,
    backdrop_path: null,
    genre_ids: [10749],
    id: 485470,
    original_language: 'ko',
    original_title: '착한 형수2',
    overview:
      "If you give it once, a good brother-in-law who gives everything generously will come!  At the house of her girlfriend Jin-kyung, who lives with pumice stone, her brother and his wife suddenly visit and the four of them live together. At first, Kyung-seok, who was burdened by his girlfriend's brother, began to keep his eyes on his wife, Yeon-su. A bold brother-in-law who walks around in no-bra and panties without hesitation even at his sister-in-law's house. Besides, from a certain moment, he starts to send a hand of temptation to Pyeong-seok first...",
    popularity: 545.569,
    poster_path: '/3pEs4hmeHvTAsmx09whEaPDOQpq.jpg',
    release_date: '2017-10-08',
    title: 'Nice Sister-In-Law 2',
    video: false,
    vote_average: 6,
    vote_count: 2,
  },
  {
    adult: false,
    backdrop_path: '/eyiSLRh44SKKWIJ6bxWq8z1sscB.jpg',
    genre_ids: [53, 27, 80],
    id: 899294,
    original_language: 'en',
    original_title: 'Frank and Penelope',
    overview:
      'A tale of love and violence when a man on his emotional last legs finds a savior seductively dancing in a run-down strip club. And a life most certainly headed off a cliff suddenly becomes redirected - as everything is now worth dying for.',
    popularity: 879.196,
    poster_path: '/5NpXoAi3nEQkEgLO09nmotPfyNa.jpg',
    release_date: '2022-06-03',
    title: 'Frank and Penelope',
    video: false,
    vote_average: 7.8,
    vote_count: 44,
  },
  {
    adult: false,
    backdrop_path: '/yNib9QAiyaopUJbaayKQ2xK7mYf.jpg',
    genre_ids: [18, 28, 10752],
    id: 966220,
    original_language: 'uk',
    original_title: 'Снайпер. Білий ворон',
    overview:
      'Mykola is an eccentric pacifist who wants to be useful to humanity. When the war begins at Donbass, Mykola’s naive world is collapsing as the militants kill his pregnant wife and burn his home to the ground. Recovered, he makes a cardinal decision and gets enlisted in a sniper company. Having met his wife’s killers, he emotionally breaks down and arranges “sniper terror” for the enemy. He’s saved from a senseless death by his instructor who himself gets mortally wounded. The death of a friend leaves a “scar” and Mykola is ready to sacrifice his life.',
    popularity: 960.86,
    poster_path: '/lZOODJzwuQo0etJJyBBZJOSdZcW.jpg',
    release_date: '2022-05-03',
    title: 'Sniper: The White Raven',
    video: false,
    vote_average: 7.7,
    vote_count: 146,
  },
];
