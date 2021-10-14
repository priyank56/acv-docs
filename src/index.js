// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Docs from "./Docs/Docs";
import { Provider, teamsTheme, Loader } from "@fluentui/react-northstar"; //https://fluentsite.z22.web.core.windows.net/quick-start
import * as microsoftTeams from "@microsoft/teams-js";

microsoftTeams.initialize();

ReactDOM.render(
  <Provider theme={teamsTheme}>
    <Suspense fallback={<Loader style={{ marginTop: "48vh" }} />}>
      <Docs />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);
