import React from 'react';
import './HomePage.scss';
import TitleBlock from '@components/Title/TitleBlock';
import NewsBlock from '@components/NewsBox/NewsBox';
import TeamBox from '@components/TeamBox/TeamBox';

function HomePage({ onOpenModal }) {
  return (
    <div className='home-page'>
      <div className='home-page__title'>
        <TitleBlock />
      </div>
      <div className='home-page__news'>
        <NewsBlock onOpenModal={onOpenModal} />
      </div>
      <div className='home-page__team'>
        <TeamBox />
      </div>
    </div>
  );
}

export default HomePage;
