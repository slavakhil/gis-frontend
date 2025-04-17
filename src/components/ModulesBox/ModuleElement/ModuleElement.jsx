import React from 'react';
import './ModuleElement.scss';

import ArrowSvg from '@assets/icons/arrow.svg?react';

function ModuleElement({ module }) {
  return (
    <div onClick={() => window.open(module.link, '_blank')} className='module-element'>
      <div className='module-element__name'>{module.name}</div>
      <div className='module-element__arrow'>
        <ArrowSvg />
      </div>
    </div>
  );
}

export default ModuleElement;
