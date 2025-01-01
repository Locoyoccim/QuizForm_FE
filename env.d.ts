interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_TOKEN_NAME: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}