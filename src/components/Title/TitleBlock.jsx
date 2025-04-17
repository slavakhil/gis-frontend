import React from 'react';
import './TitleBlock.scss';
import ModulesBox from '../ModulesBox/ModulesBox';
import Image1 from '@assets/images/image1.png';
import Image2 from '@assets/images/image2.png';
import Image3 from '@assets/images/image3.png';

function TitleBlock() {
  return (
    <div className='title-block'>
      <div className='title-block-main'>
        <div className='title-block-main__name'>
          ГЕОИНФОРМАЦИОННАЯ СИСТЕМА ПРОИЗВОДСТВЕННЫХ ОБЪЕКТОВ <br />
          ООО «ГАЗПРОМ ПРОЕКТИРОВАНИЕ»
        </div>
        <div className='title-block-main__photos'>
          <img className='photo-element' src={Image1} />
          <img className='photo-element' src={Image2} />
          <img className='photo-element' src={Image3} />
        </div>
      </div>
      <ModulesBox />
    </div>
  );
}

export default TitleBlock;
