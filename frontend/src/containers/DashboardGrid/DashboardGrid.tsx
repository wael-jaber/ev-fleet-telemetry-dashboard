import { PanelsGrid } from "@components/index";
import { PanelConfig } from "@components/PanelsGrid";
import { useState, useLayoutEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import {
  updateDesktopPanelPositions,
  updateMobilePanelPositions,
} from "@redux/store/slices/configSlice";
import { ComponentPanel } from "@utils/types";
import { BatteryPanel, MapPanel } from "@containers/Panels";
import { useTranslation } from "react-i18next";

interface PanelComponentProps {
  component: ComponentPanel;
  t: (key: string) => string;
}

const getComponent = ({ component, t }: PanelComponentProps) => {
  switch (component) {
    case ComponentPanel.speed:
      return <div>{t("Dashboard.DashboardGrid.Panels.ComingSoon")}</div>;
    case ComponentPanel.battery:
      return <BatteryPanel />;
    case ComponentPanel.location:
      return <MapPanel />;
    default:
      return <div>{t("Dashboard.DashboardGrid.Panels.PanelNotFound")}</div>;
  }
};

export const DashboardGrid: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isMobile = useMediaQuery("(max-width: 960px)");

  const [activePanelSet, setActivePanelSet] = useState<"mobile" | "desktop">(
    isMobile ? "mobile" : "desktop",
  );

  const { desktop, mobile } = useSelector(
    (state: RootState) => state.config.panelPositions,
  );

  useLayoutEffect(() => {
    setActivePanelSet(isMobile ? "mobile" : "desktop");
  }, [isMobile]);

  const handleDragStopMobile = (updatedPanels: PanelConfig[]) => {
    const payload = updatedPanels.map(({ id, layout }) => ({ id, layout }));
    dispatch(updateMobilePanelPositions(payload));
  };
  const handleDragStopDesk = (updatedPanels: PanelConfig[]) => {
    const payload = updatedPanels.map(({ id, layout }) => ({ id, layout }));
    dispatch(updateDesktopPanelPositions(payload));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowY: "auto",
        paddingTop: activePanelSet === "mobile" ? "50px" : "0px",
      }}
    >
      {activePanelSet === "mobile" ? (
        <PanelsGrid
          key={"mobile"}
          panels={mobile.map((panel) => ({
            ...panel,
            title: t(panel.title),
            component: getComponent({ component: panel.component, t }), // Pass t function
          }))}
          onLayoutChange={handleDragStopMobile}
          breakpoints={{ lg: 1024, md: 960, sm: 480 }}
          cols={{ lg: 1, md: 1, sm: 1 }}
          rowHeight={200}
        />
      ) : (
        <PanelsGrid
          key={"desktop"}
          panels={desktop.map((panel) => ({
            ...panel,
            title: t(panel.title),
            component: getComponent({ component: panel.component, t }), // Pass t function
          }))}
          onLayoutChange={handleDragStopDesk}
          cols={{ lg: 2, md: 2, sm: 2 }}
          rowHeight={300}
        />
      )}
    </div>
  );
};
