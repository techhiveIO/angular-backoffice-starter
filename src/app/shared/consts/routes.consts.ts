export enum ROUTES_GENERAL {
  AUTH = 'auth',
  DASHBOARD = 'dashboard',
  USERS = 'users',
}

export enum ROUTES_AUTH {
  LOGIN = 'login',
  SIGN_UP = 'sign-up',
  RESET_PASSWORD = 'reset-password',
  CONFIRM_EMAIL = 'confirm-email/:token',
  VERIFY_ACCOUNT = 'verify',
  ACCEPT_INVITATIONS = 'invitation',
}
