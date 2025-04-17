export const getAllModules = async () => {
  return await fetch(`${import.meta.env.VITE_SERVER}/api/modules`, {
    method: 'GET',
  }).then((res) => res.json());
};
