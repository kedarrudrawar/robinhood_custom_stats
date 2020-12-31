import { Helmet } from "react-helmet";

export const Head = () => {
  return (
    <Helmet>
      {/* TODO kedar: Change meta's 'content' to Robin-Returns*/}
      <meta charSet="UTF-8" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <title>Robin Returns</title>
    </Helmet>
  );
};
