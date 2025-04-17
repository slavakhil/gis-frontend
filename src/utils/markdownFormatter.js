export const stripMarkdown = (text, markdowns = ['#', '**', '*', '-', '\r\n']) => {
  let result = text;

  // Убираем заголовки (только в начале строки)
  if (markdowns.includes('#')) {
    result = result.replace(/^#\s?/gm, '');
  }

  // Убираем жирный текст
  if (markdowns.includes('**')) {
    result = result.replace(/\*\*(.*?)\*\*/g, '$1');
  }

  // Убираем курсив
  if (markdowns.includes('*')) {
    result = result.replace(/\*(.*?)\*/g, '$1');
  }

  // Убираем списки (только в начале строки)
  if (markdowns.includes('-')) {
    result = result.replace(/^- /gm, '');
  }

  // Заменяем переносы строк на пробел (или оставляем, если нужно сохранить структуру)
  if (markdowns.includes('\r\n')) {
    result = result.replace(/\r\n/g, ' ');
  }

  return result.trim();
};

export const parseMarkdownToBlocks = (text) => {
  const blocks = [];
  const lines = text.split(/\r\n\r\n/); // Параграфы

  lines.forEach((rawParagraph) => {
    const paragraph = rawParagraph.trim();

    // Заголовок
    if (/^#\s?/.test(paragraph)) {
      const content = paragraph.replace(/^#\s?/, '').trim();
      blocks.push({
        markdown: 'h1',
        text: parseInlineMarkdown(content),
      });
      return;
    }

    // Списки
    if (/^(-\s.+(\r\n)?)+/.test(paragraph)) {
      const listItems = paragraph
        .split(/\r\n/)
        .filter((line) => line.trim().startsWith('- '))
        .map((line) => line.replace(/^- /, '').trim());

      blocks.push({
        markdown: 'ul',
        text: listItems.map((item) => parseInlineMarkdown(item)),
      });
      return;
    }

    // Обычный параграф
    blocks.push({
      markdown: 'p',
      text: parseInlineMarkdown(paragraph),
    });
  });

  return blocks;
}

// Парсинг внутри строки: жирный, курсив, обычный текст
function parseInlineMarkdown(text) {
  const result = [];
  let remaining = text;

  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*)/g;
  let match;
  let lastIndex = 0;

  while ((match = regex.exec(text)) !== null) {
    // Добавляем текст до совпадения
    if (match.index > lastIndex) {
      result.push({
        markdown: 'text',
        text: text.slice(lastIndex, match.index),
      });
    }

    if (match[1].startsWith('**')) {
      result.push({
        markdown: 'strong',
        text: match[2],
      });
    } else if (match[1].startsWith('*')) {
      result.push({
        markdown: 'em',
        text: match[3],
      });
    }

    lastIndex = regex.lastIndex;
  }

  // Добавляем оставшийся текст
  if (lastIndex < text.length) {
    result.push({
      markdown: 'text',
      text: text.slice(lastIndex),
    });
  }

  return result;
}
