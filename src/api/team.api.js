export const getAllTeamMembers = async (page, limit) => {
  return await fetch(`${import.meta.env.VITE_SERVER}/api/team?page=${page}&limit=${limit}`, {
    method: 'GET',
  }).then((res) => res.json());
};
