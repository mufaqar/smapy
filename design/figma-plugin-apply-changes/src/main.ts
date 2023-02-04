import { once, showUI } from "@create-figma-plugin/utilities";

import { CloseHandler, CreateRectanglesHandler, RenameHandler } from "./types";

export default function () {
  once<RenameHandler>("RENAME_LAYER", function () {
    // figma.currentPage.selection = nodes
    // figma.viewport.scrollAndZoomIntoView(nodes)
    console.log(`muly:rename`, {
      selection: figma.currentPage.selection,
      name: figma.currentPage.selection[0].name,
    });

    const node = figma.currentPage.selection[0];
    node.name = "MULY";
    node.setRelaunchData({ edit: "Edit this trapezoid with Shaper", open: "" });

    figma.closePlugin();
  });
  once<CreateRectanglesHandler>("CREATE_RECTANGLES", function (count: number) {
    const nodes: Array<SceneNode> = [];
    for (let i = 0; i < count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [
        {
          color: { b: 0, g: 0.5, r: 1 },
          type: "SOLID",
        },
      ];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
    figma.closePlugin();
  });
  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });
  showUI({
    height: 137,
    width: 240,
  });
}
