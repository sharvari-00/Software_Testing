import PropTypes from "prop-types";
import { Box, Container, styled } from "@mui/material";

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding-top: ${theme.spacing(3)};
        padding-bottom: ${theme.spacing(2)};
        margin-bottom: 10px;
        background: #ffffff80;
        box-shadow: 0px 2px 4px -3px rgba(34, 51, 84, 0.1), 0px 5px 12px -4px rgba(34, 51, 84, 0.05);
`
);

const PageTitleWrapper = ({ children }) => {
  return (
    <PageTitle className="MuiPageTitle-wrapper">
      <Container maxWidth="">{children}</Container>
    </PageTitle>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTitleWrapper;
