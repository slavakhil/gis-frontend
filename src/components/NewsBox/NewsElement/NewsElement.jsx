import React from 'react';
import './NewsElement.scss';
import DefaultNewsPhoto from '@assets/icons/default-news.svg?react';

const NewsElement = React.forwardRef(({ element, onOpenModal }, ref) => {
  return (
    <div className='news-element' onClick={() => onOpenModal(element)} ref={ref}>
      <div className='news-element__info'>
        {element.photo[0] ? (
          <img className='info-photo' src={`${import.meta.env.VITE_SERVER}${element.photo[0]}`} />
        ) : (
          <DefaultNewsPhoto />
        )}

        <div className='info-content'>
          <div className='news-title'>{element.title}</div>
          <div className='news-content-shortcut'>{element.clearText}</div>
        </div>
      </div>

      <div className='news-element__button'>
        <button className='button-details'>Подробнее →</button>
      </div>
    </div>
  );
});

export default NewsElement;
