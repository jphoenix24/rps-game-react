import React from "react";
import Button from "@material-ui/core/Button";

const AppButton = ({ disabled = false, label, onClick, startIcon }) => {
  return (
    <Button
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      startIcon={startIcon}
    >
      {label}
    </Button>
  );
};

export default AppButton;