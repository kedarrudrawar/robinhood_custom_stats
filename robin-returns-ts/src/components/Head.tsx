import { Helmet } from "react-helmet";

export const Head = () => {
  return (
    <Helmet>
      <meta name="Robin Returns" charSet="UTF-8" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <title>Robin Returns</title>
    </Helmet>
  );
};
