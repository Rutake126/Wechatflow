
export interface ThemeStyles {
  container: Record<string, string>;
  h1: Record<string, string>;
  h2: Record<string, string>;
  h3: Record<string, string>;
  p: Record<string, string>;
  blockquote: Record<string, string>;
  code: Record<string, string>;
  pre: Record<string, string>;
  ul: Record<string, string>;
  ol: Record<string, string>;
  li: Record<string, string>;
  strong: Record<string, string>;
  hr: Record<string, string>;
  image: Record<string, string>;
}

export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    bg: string;
    text: string;
  };
  styles: ThemeStyles;
}
