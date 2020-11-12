// This file declare global type (for customization)

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface IncomingHttpHeaders {}

  namespace Express {
    interface CustomRequest {
      headers: IncomingHttpHeaders & {
        refresh?: string;
      };
      params?: {
        id?: string;
      };
      body?: any;
    }
  }

  type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export {};
