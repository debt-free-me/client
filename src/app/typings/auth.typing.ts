export enum AuthDBConnection {
  UsernamePassword = 'Username-Password-Authentication',
}

export interface AuthUser {
  '_id': string;
  'email_verified': boolean;
  'email': string;
  'username': string;
  'given_name': string;
  'family_name': string;
  'name': string;
  'nickname': string;
  'picture': string;
}
