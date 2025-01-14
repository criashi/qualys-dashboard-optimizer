import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SettingsLayout } from "@/components/settings/SettingsLayout";

const Settings = () => {
  return (
    <DashboardLayout>
      <SettingsLayout />
    </DashboardLayout>
  );
};

export default Settings;