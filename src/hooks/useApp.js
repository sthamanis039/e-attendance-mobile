import {useContext} from 'react';
import AppContext from '../contexts/appContext';

/**
 *
 * @returns {import('../contexts/appContext').AppContext}
 */
export default function useApp() {
  return useContext(AppContext);
}
