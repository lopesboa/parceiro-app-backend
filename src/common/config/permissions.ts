export const ALL_PERMISSIONS = [
  'users:roles:write',
  'users:roles:delete',

  'roles:write',

  'posts:write',
  'posts:read',
  'post:delete',
  'post:edit-own',

  'cars:write',
  'cars:read',
  'cars:delete',
  'cars:edit-own',

  'garage:write',
  'garage:read',
  'garage:delete',
  'garage:edit-own',
] as const;

export const PERMISSIONS = ALL_PERMISSIONS.reduce(
  (acc, permission) => {
    acc[permission] = permission;

    return acc;
  },
  {} as Record<
    (typeof ALL_PERMISSIONS)[number],
    (typeof ALL_PERMISSIONS)[number]
  >,
);

export const USER_ROLE_PERMISSIONS = [
  PERMISSIONS['cars:write'],
  PERMISSIONS['cars:read'],
  PERMISSIONS['cars:delete'],
  PERMISSIONS['cars:edit-own'],
];

export const USER_WITH_GARAGE_ROLE_PERMISSIONS = [
  PERMISSIONS['cars:write'],
  PERMISSIONS['cars:read'],
  PERMISSIONS['cars:delete'],
  PERMISSIONS['cars:edit-own'],

  PERMISSIONS['garage:write'],
  PERMISSIONS['garage:read'],
  PERMISSIONS['garage:delete'],
  PERMISSIONS['garage:edit-own'],
];

export const SYSTEM_ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  CAR_OWNER_USER: 'CAR_OWNER_USER',
  GARAGE_OWNER_USER: 'GARAGE_OWNER_USER',
} as const;

export type SystemRole = (typeof SYSTEM_ROLES)[keyof typeof SYSTEM_ROLES];
