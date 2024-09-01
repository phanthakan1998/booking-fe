interface ENV {
  version: string;
  API_URL: string;
  API_KEY: string;
  API_VERSION?: string;
  ENV?: string;
  PUBLIC_KEY: string;
}

const pEnv = process.env as Record<string, string>;

export const env: ENV = {
  version: pEnv.REACT_APP_COMMIT_VERSION,
  API_URL: pEnv.REACT_APP_API_URL,
  API_VERSION: pEnv.REACT_APP_API_VERSION,
  ENV: pEnv.REACT_APP_ENV,
  API_KEY: pEnv.REACT_APP_API_KEY,
  PUBLIC_KEY: pEnv.REACT_PUBLIC_KEY,
};

export default env;
