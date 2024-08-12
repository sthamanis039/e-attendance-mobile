import {getFromStorage} from './storage';

const permissions = {
  admin: ['*'],
  student: [],
};

function getPermissions(role) {
  return permissions[role];
}

export async function hasPermissions(allowedPermissions = [], role = null) {
  if (!role) {
    role = await getFromStorage('user').role;
  }
  const aps = [].concat(allowedPermissions).flat();
  let canAccess = false;
  if (aps.length === 0) return true;

  for (let i = 0; i < aps.length; i++) {
    canAccess = getPermissions(role)?.includes(aps[i]);
    if (getPermissions(role)?.includes('!' + aps[i])) return false;
    if (permissions[role]?.includes('*')) {
      return true;
    }
    if (!canAccess) break;
  }

  return canAccess;
}
