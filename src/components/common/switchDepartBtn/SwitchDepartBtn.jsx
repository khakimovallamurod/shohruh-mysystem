import { ExportOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";
import React from "react";

const SwitchDepartBtn = ({ to, title }) => {
  // Handle navigater
  const handleNavigate = () => {
    window.location.href = to;
  };

  return (
    <Tooltip title={title}>
      <Button icon={<ExportOutlined />} onClick={handleNavigate} />
    </Tooltip>
  );
};

export default SwitchDepartBtn;
