export interface LoginResponse {
  data: UserData;
  token: string;
  success: boolean;
}

export interface UserData {
  id?: number;
  name: string;
  password?: string;
}
