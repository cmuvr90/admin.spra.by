export type FetchResponseType = {
  data: any;
  status: FetchResponseStatus;
  error: string | null;
}

export enum FetchResponseStatus {
  ERROR = 'error',
  SUCCESS = 'success'
}

export enum FetcherMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
}

export type FetcherParams = {
  baseUrl: string,
  userId?: string,
  token?: string
}
