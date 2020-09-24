export interface AppShellNavItem {
  label: string;
  link: any[] | string;
  icon?: {
    svgIcon?: string;
    matIcon?: string;
  };
  children?: AppShellNavItem[];
}
