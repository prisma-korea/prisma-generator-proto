import type { ErrorBoundaryComponent, LinksFunction } from "@remix-run/node";
import { Links, LiveReload, Meta, Outlet } from "@remix-run/react";

import type { ReactNode } from "react";

export const links: LinksFunction = () => {};
export const meta: MetaFunction = () => {};

export default function App() {
  return (
    <Document title="CMS">
      <Layout>
        <Outlet />
      </Layout>
    </Document>
  );
}

type DocumentProps = {
  children: ReactNode;
  title: string;
};

function Document({ children, title }: DocumentProps) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <title>{title}</title>
      </head>
      <body>
        {children}
        {process.env.NODE_ENV === "development" ? <LiveReload /> : null}
      </body>
    </html>
  );
}

type LayoutProps = {
  children: ReactNode;
};

function Layout({ children }: LayoutProps) {
  return children;
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <Document>
      <Layout>
        <h1>Error</h1>
        <p>{error.message}</p>
      </Layout>
    </Document>
  );
};
