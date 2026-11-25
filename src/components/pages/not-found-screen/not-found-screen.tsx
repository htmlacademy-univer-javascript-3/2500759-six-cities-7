import { Link } from 'react-router-dom';
import { AppRoute } from '../../../const';

function NotFoundPage(): JSX.Element {
  return(
    <div className='page'>
      <main className='page__main page__main--not-found'>
        <h1>404 Not Found</h1>
        <Link to={AppRoute.Main}>На главную</Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
