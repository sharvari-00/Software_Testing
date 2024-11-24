import React from "react";
import PageTitleWrapper from "../PageTitleWrapper";
import PageHeader from "../PageHeader";
import { Container } from "@mui/material";

const Department = () => {
  return (
    <div>
      <PageTitleWrapper>
        <PageHeader pagename={"Department Details"} description={"Coming soon..."}/>
      </PageTitleWrapper>
      <Container maxWidth="">
        <p>Department page</p>
      </Container>
    </div>
  );
};

export default Department;
