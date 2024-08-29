export interface CheckUserResponseData {
  isAvailable: boolean
}

export interface UserModel {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  userType: 'Admin' | 'Driver' | null;
  password: string | null;
}
