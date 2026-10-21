import { ReviewType } from '../types/review';


export const reviews: ReviewType[] = [
  {
    id: '1',
    user: { avatarUrl: 'img/avatar-max.jpg', isPro: false, name: 'Max' },
    rating: 4,
    comment:
      'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam.',
    date: '2019-04-24',
  },
  {
    id: '2',
    user: { avatarUrl: 'img/avatar-angelina.jpg', isPro: true, name: 'Angelina' },
    rating: 5,
    comment: 'Great place, would definitely come back again!',
    date: '2019-05-12',
  },
];
