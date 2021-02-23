import { StyledLayout } from "./Layout.styles";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return <StyledLayout>{children}</StyledLayout>;
}

export { Layout };
