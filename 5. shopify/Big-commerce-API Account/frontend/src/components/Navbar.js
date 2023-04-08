import { Tabs } from "@shopify/polaris";
import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router";

function Navbar() {
  const [selected, setSelected] = useState(0);
  const navigate = useNavigate();
  const [url, setUrl] = useState({
    0: "/admin/dashbord",
    1: "/admin/order",
    2: "/admin/claim-request",
    3: "/admin/insurance-plan-type-list",
  });

  const handleTabChange = useCallback(
    (selectedTabIndex) => {
      setSelected(selectedTabIndex);
      navigate(url[selectedTabIndex]);
    },
    [navigate, url]
  );

  const tabs = [
    {
      id: "dashboard",
      accessibilityLabel: "Dashboard",
      panelID: "dashboard-panel",
      content: "Dashboard",
    },
    {
      id: "orders",
      accessibilityLabel: "Orders",
      panelID: "orders-panel",
      content: "Orders",
    },
    {
      id: "claim",
      accessibilityLabel: "File Claim",
      panelID: "claim-panel",
      content: "File Claim Request",
    },
    {
      id: "protection",
      accessibilityLabel: "File Claim",
      panelID: "protection-panel",
      content: "Protection Fees",
    },
  ];

  return (
    <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
      {/* <LegacyCard.Section title={tabs[selected].content}>
          <p>Tab {selected} selected</p>
        </LegacyCard.Section> */}
    </Tabs>
  );
}

export default Navbar;
