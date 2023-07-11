import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    subTextColor: string;
    themeColor: string;
    accentColor: string;
    btnBgColor: string;
    cardBgColor: string;
    cardTextColor: string;
    coinBgColor: string;
  }
}
