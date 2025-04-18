import React, { useEffect, useRef, useState, useCallback } from 'react';
import './NewsBox.scss';
import NewsElement from './NewsElement/NewsElement';
import { getAllNews } from '@api/news.api';

function NewsBox({ onOpenModal }) {
  const [news, setNews] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);
  const observer = useRef();

  // const scrollRef = useHorizontalScroll()

  const loadData = async (page) => {
    const data = await getAllNews(page, 5); // предполагаем, что API принимает такие параметры
    if (data.length < 5) setHasMore(false);
    setNews((prev) => [...prev, ...data]);
  };

  useEffect(() => {
    loadData(page);
  }, [page]);

  // горизонтальный скролл колесом
  useEffect(() => {
    const container = listRef.current;
    if (!container) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      console.log(e.deltaY);
      const scrollSpeed = 1;
      container.scrollLeft += e.deltaY * scrollSpeed;
      // container.scrollLeft += e.deltaY;
    };

    container.addEventListener('wheel', onWheel, { passive: false });
    return () => container.removeEventListener('wheel', onWheel);
  }, []);

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
    <div className='news-box'>
      <div className='news-box__title'>НОВОСТИ</div>
      <div className='news-box__list' ref={listRef}>
        {news.map((element, index) => {
          const isLast = index === news.length - 1;
          return (
            <NewsElement
              key={`${element.id}-news`}
              element={element}
              onOpenModal={onOpenModal}
              ref={isLast ? lastNewsRef : null}
            />
          );
        })}
      </div>
    </div>
  );
}

export default NewsBox;

// const useHorizontalScroll = () => {
//   const ref = useRef(null);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;

//     const onWheel = (e) => {
//       if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
//         // Только если вертикальный скролл преобладает
//         e.preventDefault(); // блокируем вертикаль
//         el.scrollBy({
//           left: e.deltaY, // направляем в горизонталь
//           behavior: 'auto', // можно 'smooth', но авто быстрее
//         });
//       }
//     };

//     el.addEventListener('wheel', onWheel, { passive: false });

//     return () => {
//       el.removeEventListener('wheel', onWheel);
//     };
//   }, []);

//   return ref;
// };
