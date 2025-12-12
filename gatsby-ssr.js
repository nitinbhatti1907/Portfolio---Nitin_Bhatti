/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

 // You can delete this file if you're not using it

 import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link
      key="fonts"
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=JetBrains+Mono:wght@400;600&display=swap"
    />,
  ]);
};
