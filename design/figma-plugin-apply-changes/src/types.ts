import { EventHandler } from "@create-figma-plugin/utilities";

export interface CreateRectanglesHandler extends EventHandler {
  name: "CREATE_RECTANGLES";
  handler: (count: number) => void;
}

export interface ApplyTranslateHandler extends EventHandler {
  name: "APPLY_TRANSLATE";
  handler: (filename: string) => void;
}

export interface NodeInfoHandler extends EventHandler {
  name: "NODE_INFO";
  handler: () => void;
}

export interface ScanDocumentHandler extends EventHandler {
  name: "SCAN_DOCUMENT";
  handler: () => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
