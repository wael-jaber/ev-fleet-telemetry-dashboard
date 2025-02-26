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
import { MapPanel } from "@containers/Panels";

const getComponent = (component: ComponentPanel) => {
  switch (component) {
    case ComponentPanel.speed:
      return <div>Speed</div>;
    case ComponentPanel.battery:
      return <div>Battery</div>;
    case ComponentPanel.location:
      return <MapPanel />;
    default:
      return <div>Panel not found</div>;
  }
};

export const DashboardGrid: React.FC = () => {
  const dispatch = useDispatch();

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
            component: getComponent(panel.component),
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
            component: getComponent(panel.component),
          }))}
          onLayoutChange={handleDragStopDesk}
          cols={{ lg: 2, md: 2, sm: 2 }}
          rowHeight={300}
        />
      )}
    </div>
  );
};
