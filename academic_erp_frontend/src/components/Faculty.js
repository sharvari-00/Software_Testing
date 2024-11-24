import React from "react";
import PageTitleWrapper from "../PageTitleWrapper";
import PageHeader from "../PageHeader";
import { Container } from "@mui/material";

const Faculty = () => {
  return (
    <div>
      <PageTitleWrapper>
        <PageHeader pagename={"Faculty Details"} description={"Coming soon..."} />
      </PageTitleWrapper>
      <Container maxWidth="">
        <p>Faculty page</p>
      </Container>
    </div>
  );
};

export default Faculty;
