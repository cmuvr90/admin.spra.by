const Config = <Config>{
  API_BASE_URL: process?.env?.API_BASE_URL ?? 'http://localhost:3002/api/v1',
};

export type Config = {
  API_BASE_URL: string;
};

export default Config;
