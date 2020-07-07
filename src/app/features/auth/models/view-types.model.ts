export enum ResetPasswordViewType {
  TYPE_EMAIL_SENT = 'TYPE_EMAIL_SENT',
  TYPE_NEW_REQUEST = 'TYPE_NEW_REQUEST',
  TYPE_RESET_TOKEN = 'TYPE_RESET_TOKEN',
}

export interface ResetPasswordViewInterface {
  viewType: ResetPasswordViewType;
  attemptedEmail?: string;
  resetToken?: string;
}

export enum ConfirmAccountViewType {
  TYPE_CONFIRM_REGISTRATION = 'TYPE_CONFIRM_REGISTRATION',
  TYPE_ACCEPT_INVITATION = 'TYPE_ACCEPT_INVITATION',
  TYPE_ACCOUNT_VERIFIED = 'TYPE_ACCOUNT_VERIFIED',
  TYPE_TOKEN_EXPIRED = 'TYPE_TOKEN_EXPIRED',
}

export interface ConfirmAccountViewInterface {
  viewType: ConfirmAccountViewType;
  token: string;
}
