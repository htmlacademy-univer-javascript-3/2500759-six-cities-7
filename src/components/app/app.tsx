import MainPage from '../../components/pages/main-screen/main-screen';

type AppProps = {
  cardsCount: number;
}

function App({cardsCount}: AppProps): JSX.Element {
  return (
    <MainPage cardsCount={cardsCount}/>
  );
}

export default App;
