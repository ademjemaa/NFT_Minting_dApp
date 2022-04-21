import React, { ReactNode } from "react";
import { AuthenticatedRoutesWrapper } from "@elrondnetwork/dapp-core";
import { useLocation } from "react-router-dom";
import routes, { routeNames } from "routes";

import preview from "./preview.png";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: ReactNode }) => {
  const { search } = useLocation();
  return (
    <div className="bg-light d-flex flex-column flex-fill wrapper">
      <Navbar />
      <main
        className="d-flex flex-column flex-grow-1"
        style={{
          backgroundColor: "#2e765e",
          backgroundImage: "url(" + preview + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <AuthenticatedRoutesWrapper
          routes={routes}
          unlockRoute={`${routeNames.unlock}${search}`}
        >
          {children}
        </AuthenticatedRoutesWrapper>
      </main>
    </div>
  );
};

export default Layout;
