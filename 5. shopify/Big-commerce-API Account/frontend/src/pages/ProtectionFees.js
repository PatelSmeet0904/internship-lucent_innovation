import {
  Columns,
  Inline,
  Layout,
  LegacyStack,
  Page,
  Text,
} from "@shopify/polaris";
import React from "react";
import { AlphaCard, Button, AlphaStack, RadioButton } from "@shopify/polaris";
// import fixedIcon from "../images/fixed.png";
// import percentageIcon from "../images/percentage.png";

const ProtectionFees = () => {
  const [selectedPlan, setSelectedPlan] = React.useState("fixed");

  const handlePlanChange = (value) => {
    setSelectedPlan(value);
  };

  const fixedPlanDescription =
    "Select for adding fixed price based protection fees.";
  const percentagePlanDescription =
    "Select for adding percentage based protection fees.";
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Text alignment="center" variant="heading4xl" as="h1">
            Protection fees
          </Text>
        </Layout.Section>
        <Layout.Section>
          <Text alignment="center" variant="headingMd" as="h6">
            You can select only one from the given protection fees
          </Text>
        </Layout.Section>
        <Layout.Section>
          <Columns gap="5" columns={2}>
            {/* <LegacyStack distribution="fill" alignment="center"> */}
            <AlphaCard>
              <AlphaStack gap="3" inlineAlign="center">
                <img alt="" src="/images/fixed.png" />
                <Text alignment="center" variant="heading4xl" as="h1">
                  Fixed
                </Text>
                <Text alignment="center" variant="headingMd" as="h6">
                  {fixedPlanDescription}
                </Text>
                <AlphaStack distribution="trailing">
                  <RadioButton
                    label="Select"
                    checked={selectedPlan === "fixed"}
                    onChange={() => handlePlanChange("fixed")}
                  />
                  <Button> Edit </Button>
                </AlphaStack>
              </AlphaStack>
            </AlphaCard>
            <AlphaCard>
              <AlphaStack gap="3" inlineAlign="center">
                <img alt="" src="/images/percentage.png" />
                <Text alignment="center" variant="heading4xl" as="h1">
                  Percentage
                </Text>
                <Text alignment="center" variant="headingMd" as="h6">
                  {fixedPlanDescription}
                </Text>
                <AlphaStack distribution="trailing">
                  <RadioButton
                    label="Select"
                    checked={selectedPlan === "percentage"}
                    onChange={() => handlePlanChange("percentage")}
                  />
                </AlphaStack>
              </AlphaStack>
            </AlphaCard>
            {/* </LegacyStack> */}
          </Columns>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ProtectionFees;
