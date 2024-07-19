export interface User {
  id?: string;
  username: string;
  password: string;
  shared_blogs?: string[];
}

export interface Blog {
  id?: string;
  title: string;
  content: string;
  author: string;
  shared_with?: string;
}

export interface AuthResponse {
  access_token: string;
}
