import React, { useCallback, useEffect, useRef, useState } from 'react';
import './TeamBox.scss';
import ToggleSvg from '@assets/icons/toggle-list.svg?react';
import TeamMember from './TeamMember/TeamMember';
import { getAllTeamMembers } from '@api/team.api';

function TeamBox() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const listRef = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const loadData = async (page) => {
    const data = await getAllTeamMembers(page, 10); // предполагаем, что API принимает такие параметры
    if (data.length < 10) setHasMore(false);
    setMembers((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, [isBoxOpen]);

  const lastNewsRef = useCallback(
    (node) => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setPage((prev) => prev + 1);
          }
        },
        {
          root: listRef.current,
          threshold: 1.0,
        }
      );

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  return (
    <div className='team-box'>
      <div className='team-box__title' onClick={() => setIsBoxOpen(!isBoxOpen)}>
        <div className='title-name'>КОМАНДА</div>
        <div className={`title-toggle ${isBoxOpen ? 'open' : ''}`}>
          <ToggleSvg />
        </div>
      </div>
      {isBoxOpen && (
        <div className='team-box__list' ref={listRef}>
          {members.map((element) => (
            <TeamMember key={`${element.id}-team`} element={element} ref={lastNewsRef} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TeamBox;
