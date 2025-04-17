import React, { useEffect, useState } from 'react';
import './ModulesBox.scss';
import ModuleElement from './ModuleElement/ModuleElement';
import { getAllModules } from '@api/modules.api';

function ModulesBox() {
  const [modules, setModules] = useState([]);
  const loadData = async () => {
    const data = await getAllModules();
    setModules(data);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='modules-box'>
      <div className='modules-box__title'>РАЗДЕЛЫ</div>
      <div className='modules-box__list'>
        {modules && modules.map((module) => <ModuleElement key={`${module.id}-module.id`} module={module} />)}
      </div>
    </div>
  );
}

export default ModulesBox;
