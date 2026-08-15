export type ActionResponse<T> = {
  success: boolean;
  message?: string;
  data?: T | null;
  fieldErrors?: Record<string, string[]>;
};
