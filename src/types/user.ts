export interface UserHealth {
  height: number; // cm
  weight: number; // kg
  age: number;
  bloodType: string;
  allergies: string[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  health: UserHealth;
}