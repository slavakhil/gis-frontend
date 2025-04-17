import { parseMarkdownToBlocks, stripMarkdown } from '../utils/markdownFormatter';

export const getAllNews = async (page, limit) => {
  let data = await fetch(`${import.meta.env.VITE_SERVER}/api/news?page=${page}&limit=${limit}`, {
    method: 'GET',
  }).then((res) => res.json());
  data = data.map((item) => ({
    ...item,
    blockText: parseMarkdownToBlocks(item.content),
    clearText: stripMarkdown(item.content),
  }));
  return data;
};
