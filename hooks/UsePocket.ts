
import PocketBase from 'pocketbase';
import { useMemo } from 'react';

export const usePocket = () => {
  const pb = useMemo(() => {
    return new PocketBase('https://goofy-varahamihira-b7cr8sxp2.liara.run');
  }, []);

  return pb;
};
