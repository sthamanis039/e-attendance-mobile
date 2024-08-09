import {useContext} from 'react';
import AppContext from '../contexts/appContext';

export default function useApp() {
  return useContext(AppContext);
}
