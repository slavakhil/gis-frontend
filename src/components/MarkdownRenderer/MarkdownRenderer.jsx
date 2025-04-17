import React from 'react';
import './MarkdownRenderer.scss';

export default function MarkdownRenderer({ blocks }) {
  console.log(blocks, 'blocks');
  function renderInline(nodes) {
    return nodes.map((node, i) => {
      if (node.markdown === 'strong') {
        return (
          <span key={i} className='bold'>
            {node.text}
          </span>
        );
      }

      if (node.markdown === 'em') {
        return (
          <span key={i} className='cursive'>
            {node.text}
          </span>
        );
      }

      return (
        <span className='text' key={i}>
          {node.text}
        </span>
      );
    });
  }

  return (
    <div className='markdown-content'>
      {blocks.map((block, i) => {
        if (block.markdown === 'h1') {
          return (
            <div key={i} className='title'>
              {renderInline(block.text)}
            </div>
          );
        }

        if (block.markdown === 'p') {
          return (
            <div key={i} className='paragraph'>
              {renderInline(block.text)}
            </div>
          );
        }

        if (block.markdown === 'ul') {
          return (
            <div key={i} className='list'>
              {block.text.map((item, j) => (
                <div key={j} className='list__item'>
                  {renderInline(item)}
                </div>
              ))}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
