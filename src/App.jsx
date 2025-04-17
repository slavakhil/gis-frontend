import { useState } from 'react';
import './App.scss';
import HomePage from '@pages/HomePage/HomePage';
import Topbar from '@components/Topbar/Topbar';
import NewsModal from './components/NewsBox/NewsModal/NewsModal';

function App() {
  const [modalNews, setModalNews] = useState({
    isActive: false,
    newsElement: null,
  });

  const onCloseModal = () => {
    setModalNews({
      isActive: false,
      newsElement: null,
    });
  };

  const onOpenModal = (newsElement) => {
    if (newsElement) {
      setModalNews({
        isActive: true,
        newsElement: newsElement,
      });
    }
  };

  return (
    <div className='app-container'>
      <Topbar />
      <HomePage onOpenModal={onOpenModal} />
      {modalNews.isActive && <NewsModal modal={modalNews} onCloseModal={onCloseModal} />}
    </div>
  );
}

export default App;
