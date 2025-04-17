import React from 'react';
import './Topbar.scss';

function Topbar() {
  return (
    <div className='topbar-wrapper'>
      <a href='mailto:info@example.com' className='topbar-info'>
        Техподдержка: info@.........ru
      </a>
    </div>
  );
}

export default Topbar;
