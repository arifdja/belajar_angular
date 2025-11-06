export interface AppConfig {
  apiUrl: string;
  production: boolean;
  appName: string;
}

export interface MenuItem {
  label: string;
  path: string;
  icon?: string;
}