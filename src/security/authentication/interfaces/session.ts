export interface Session {
  strategy: string;
  email?: string;
  password?: string;
  token?: string;
  code?: string;
}
