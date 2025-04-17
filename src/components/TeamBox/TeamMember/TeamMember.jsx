import React from 'react';
import './TeamMember.scss';

const TeamMember = React.forwardRef(({ element }, ref) => {
  return (
    <div className='team-member' ref={ref}>
      <img className='team-member__photo' src={`${import.meta.env.VITE_SERVER}${element.photo}`} />
      <div className='team-member__info'>
        <div className='main-info'>
          <div className='main-info__fio'>
            <div className='fio-element'>{element.lastName}</div>
            <div className='fio-element'>{element.firstName}</div>
            {element.patronymic && <div className='fio-element'>{element.patronymic}</div>}
          </div>
          <div className='main-info__position'>{element.position}</div>
        </div>

        <div className='info-email'>{element.email}</div>
      </div>
    </div>
  );
});

export default TeamMember;
