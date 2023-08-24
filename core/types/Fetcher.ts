export type FetchResponseType = {
  data: any;
  status: FetchResponseStatus;
  error: string | null;
}

export enum FetchResponseStatus {
  ERROR = 'error',
  SUCCESS = 'success'
}
