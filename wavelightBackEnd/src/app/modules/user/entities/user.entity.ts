export interface User {
  id?: number;
  email: string;
  createdat?: Date | null;
  updatedat?: Date | null;
  canceledat?: Date | null;
  name: string;
  password?: string | undefined;
}
