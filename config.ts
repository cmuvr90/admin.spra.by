const Config = <Config>{
  API_BASE_URL: process?.env?.API_BASE_URL ?? 'http://localhost:3002/api/v1',
  API_TOKEN: process?.env?.NEXTAUTH_SECRET ?? undefined,
};

export type Config = {
  API_BASE_URL: string;
  API_TOKEN?: string;
};

export default Config;
