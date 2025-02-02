
import PocketBase from 'pocketbase';
import { useMemo } from 'react';

export const pocketbaseUrl = 'http://127.0.0.1:8090'

export const usePocket = () => {
  const pb = useMemo(() => {
    return new PocketBase(pocketbaseUrl);
  }, []);
  return pb;
};
