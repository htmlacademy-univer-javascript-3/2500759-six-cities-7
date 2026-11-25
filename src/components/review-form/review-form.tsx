import { ChangeEvent, useState } from 'react';
import type { FormEvent } from 'react';
import { MIN_COMMENT_LENGTH, MAX_COMMENT_LENGTH } from '../../const';
import { useAppDispatch } from '../../store/hooks';
import { postReview } from '../../store/api-actions';

type ReviewFormProps = {
  offerId: string;
};

function ReviewForm({offerId}: ReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    rating: 0,
    review: '',
  });

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, rating: Number(evt.target.value) }));
  };

  const handleReviewChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, review: evt.target.value }));
  };

  const handleSubmit = async (evt: FormEvent) => {
    evt.preventDefault();
    setError(null);

    const success = await dispatch(
      postReview({
        offerId,
        comment: formData.review,
        rating: formData.rating,
      })
    );

    if (success) {
      setFormData({ rating: 0, review: '' });
    } else {
      setError('Не удалось отправить комментарий');
    }
  };

  const isValid =
    formData.rating > 0 &&
    formData.review.length >= MIN_COMMENT_LENGTH &&
    formData.review.length <= MAX_COMMENT_LENGTH;

  return (
    <form className="reviews__form form" onSubmit={(evt) => void handleSubmit(evt)}>
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <div key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={formData.rating === value}
              onChange={handleRatingChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title="rating"
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </div>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleReviewChange}
      />
      <div className="reviews__button-wrapper">
        {error && <p className="reviews__error">{error}</p>}
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">{MIN_COMMENT_LENGTH} characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValid}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewForm;

