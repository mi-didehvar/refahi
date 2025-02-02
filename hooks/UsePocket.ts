
import PocketBase from 'pocketbase';
import { useMemo } from 'react';

export const pocketbaseUrl = 'https://refahi-db.liara.run'

export const usePocket = () => {
  const pb = useMemo(() => {
    return new PocketBase(pocketbaseUrl);
  }, []);
  return pb;
};
