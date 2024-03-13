import React, { useEffect, useState } from 'react';
import './tableOfContent.css';

import { removeVietnameseTones } from '../../utils/RemoveVietnameseTones';
import { Divider } from 'antd';

const TableOfContent = () => {
  const [headings, setHeadings] = useState([]);

  const convertHeadingToId = (heading) => {
    return removeVietnameseTones(heading).trim().replaceAll(' ', '-');
  };

  useEffect(() => {
    document
      .querySelectorAll('h2, h3, h4')
      .forEach((item) =>
        item.setAttribute('id', convertHeadingToId(item.innerText))
      );
    const elements = Array.from(document.querySelectorAll('h2, h3, h4')).map(
      (elem) => ({
        id: elem.id,
        text: elem.innerText,
        level: Number(elem.nodeName.charAt(1)),
      })
    );
    setHeadings(elements);
  }, []);

  const getClassName = (level) => {
    switch (level) {
      case 2:
        return 'head2';
      case 3:
        return 'head3';
      case 4:
        return 'head4';
      default:
        return null;
    }
  };

  return (
    <nav style={{ width: '100%' }}>
      <Divider orientation='left' plain>
        <p
          style={{
            fontSize: '1.4rem',
            fontWeight: 600,
          }}
        >
          Mục Lục
        </p>
      </Divider>

      <ul className='nav-ul-li'>
        {headings.map((heading) => (
          <li key={heading.id} className={getClassName(heading.level)}>
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(`${heading.id}`).scrollIntoView({
                  behavior: 'smooth',
                });
              }}
              style={{
                fontWeight: 'bold',
                color: '#000',
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContent;
