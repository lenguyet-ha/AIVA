import React, { useEffect } from "react";
import { useStyles } from "./PageLayout.styles";
import useTranslation from "next-translate/useTranslation";
import { Navigation } from "@/src/components/Navigation";
import { Header } from "@/src/components/Header";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className="app-container">
      {/* Main content area */}
      <div className="app-component-page">
        <div className="app-component-page-header">
          <Header />
        </div>

        <div className="app-content">
          <div className="app-navigation">
            <Navigation />
          </div>
          {/* Render the page-specific content */}
          <div className="app-component-page-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export { PageLayout };
