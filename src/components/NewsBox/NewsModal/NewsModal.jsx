import React, { useEffect, useRef, useState } from 'react';
import './NewsModal.scss';
import Modal from '../../Modal/Modal';
import CloseSvg from '@assets/icons/cross.svg?react';
import MarkdownRenderer from '../../MarkdownRenderer/MarkdownRenderer';
import { formatDate } from '../../../utils/dateFormatter';

function NewsModal({ modal, onCloseModal }) {
  return (
    <Modal active={modal.isActive} setActive={onCloseModal}>
      <div className='news-modal-content'>
        <div className='news-modal-content__header'>
          <div className='header-title'>{modal.newsElement.title}</div>
          <div className='header-close-modal' onClick={onCloseModal}>
            <CloseSvg />
          </div>
        </div>
        <div className='news-modal-content__content'>
          <MarkdownRenderer blocks={modal.newsElement.blockText} />
          <div className='content-photos'>
            {modal.newsElement.photo &&
              modal.newsElement.photo.map((url) => (
                <img className='content-photos__photo' src={import.meta.env.VITE_SERVER + url} />
              ))}
          </div>
          <div className='content-info'>
            <div className='content-info__date'>{formatDate(modal.newsElement.date)}</div>
            <div className='content-info__author-name'>Автор: {modal.newsElement.author}</div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default NewsModal;
