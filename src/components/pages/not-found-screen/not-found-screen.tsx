import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return(
    <div className='page'>
      <main className='page__main page__main--not-found'>
        <h1>404 Not Found</h1>
        <Link to="/">На главную</Link>
      </main>
    </div>
  );
}

export default NotFoundPage;
