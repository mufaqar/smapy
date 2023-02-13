import { once, showUI } from "@create-figma-plugin/utilities";
import json from "./cleaned.json"; // This import style requires "esModuleInterop", see "side notes"

import {
  ApplyTranslateHandler,
  CloseHandler,
  CreateRectanglesHandler,
  NodeInfoHandler,
  ScanDocumentHandler,
} from "./types";

const scanS = (node: SceneNode) => {
  console.log(`muly:scanS ${node.name}`, {
    id: node.id,
    node,
  });

  const all = figma.currentPage.findAll((n) => n.characters);
  all.forEach((n) => {
    console.log(`TEXT ${n.characters}`, { n });
  });
  // console.log(`muly:scanS ${}`, { all });
};

const scanP = (node: PageNode) => {
  console.log(`muly:scanP ${node.name}`, {
    id: node.id,
    count: node.children.length,
  });

  for (const n of node.children) {
    scanS(n);
  }
};

const scan = (node: DocumentNode) => {
  console.log(`muly:scan ${node.name}`, {
    id: node.id,
    count: node.children.length,
  });

  for (const n of node.children) {
    scanP(n);
  }
};

export default function () {
  once<ApplyTranslateHandler>(
    "APPLY_TRANSLATE",
    async function (fileName: string) {
      console.log(`muly:load founts v1`, {});
      await figma.loadFontAsync({ family: "Rubik", style: "Regular" });
      await figma.loadFontAsync({ family: "Rubik", style: "Light" });
      await figma.loadFontAsync({ family: "Rubik", style: "Bold" });
      await figma.loadFontAsync({ family: "Assistant", style: "ExtraBold" });
      await figma.loadFontAsync({ family: "Rubik", style: "Medium" });
      await figma.loadFontAsync({ family: "Assistant", style: "SemiBold" });

      const all = figma.currentPage.findAll((n) => true);
      console.log(`muly:APPLY ${fileName}`, {
        c: all.length,
        keys: Object.keys(json).length,
      });

      // const data = {};
      // json.nodeChanges.forEach((node: any) => {
      //   data[`${node.guid.sessionID}:${node.guid.localID}`] = node;
      // });

      console.log(`muly:translate data`, {
        // data,
        all,
      });

      all.forEach((node) => {
        const guid = node.id;
        const translate = json[guid];
        if (translate) {
          console.log(`TRANS ${guid}`, { node, translate });
          if (node.name !== translate.newName) {
            console.log(`change name ${node.name} => ${translate.newName}`);
            node.name = translate.newName;
          }
          // if (
          //   node.characters &&
          //   translate.textOld &&
          //   node.characters !== translate.textOld
          // ) {
          //   console.log(
          //     `change text ${node.characters} => ${translate.textOld}`
          //   );
          //
          //   node.characters = translate.textOld;
          // }
        } else {
          // console.log(`Translation for ${guid} MISSING`, { node });
        }
      });

      console.log(`DONE APPLY`);
    }
  );
  once<ScanDocumentHandler>("SCAN_DOCUMENT", function () {
    // figma.currentPage.selection = nodes
    // figma.viewport.scrollAndZoomIntoView(nodes)
    // console.log(`muly:rename`, {
    //   selection: figma.currentPage?.selection,
    //   name: figma.currentPage?.selection[0].name,
    // });
    //
    // const node = figma.currentPage.selection[0];
    // node.name = "MULY";
    // node.setRelaunchData({ edit: "Edit this trapezoid with Shaper", open: "" });
    console.log(`muly:`, { r: figma.root, f: figma.root.parent });
    scan(figma.root);
    // for (const node of figma.root) {
    // }

    figma.closePlugin();
  });
  once<NodeInfoHandler>("NODE_INFO", function () {
    // figma.currentPage.selection = nodes
    // figma.viewport.scrollAndZoomIntoView(nodes)
    // console.log(`muly:rename`, {
    //   selection: figma.currentPage?.selection,
    //   name: figma.currentPage?.selection[0].name,
    // });
    //
    // const node = figma.currentPage.selection[0];
    // node.name = "MULY";
    // node.setRelaunchData({ edit: "Edit this trapezoid with Shaper", open: "" });
    console.log(`muly:`, { node: figma.currentPage.selection });
  });
  once<ScanDocumentHandler>("SCAN_DOCUMENT", function () {
    console.log(`muly:`, { seelction: figma.currentPage.selection });
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
    height: 160,
    width: 360,
  });
}
