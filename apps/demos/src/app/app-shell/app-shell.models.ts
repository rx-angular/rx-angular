export interface AppShellNavItem {
  label: string;
  link: string;
  icon?: {
    svgIcon?: string;
    matIcon?: string;
  };
  children?: AppShellNavItem[];
}
