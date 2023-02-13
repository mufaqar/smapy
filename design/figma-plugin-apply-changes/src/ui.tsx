import {
  Button,
  Columns,
  Container,
  Muted,
  render,
  Text,
  TextboxNumeric,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useState } from "preact/hooks";

import {
  ApplyTranslateHandler,
  CloseHandler,
  CreateRectanglesHandler,
  NodeInfoHandler,
  ScanDocumentHandler,
} from "./types";

function Plugin() {
  const [count, setCount] = useState<number | null>(5);
  const [fileName, setFileName] = useState<string | null>(
    "C:\\smapy\\design\\figma-translated\\manual-change.json"
  );
  const [countString, setCountString] = useState("5");
  const handleCreateRectanglesButtonClick = useCallback(
    function () {
      if (count !== null) {
        emit<CreateRectanglesHandler>("CREATE_RECTANGLES", count);
      }
    },
    [count]
  );
  const handleScanDocumentButtonClick = useCallback(
    function () {
      console.log(`muly:handleRenameButtonClick ${count}`, {});
      if (count !== null) {
        emit<ScanDocumentHandler>("SCAN_DOCUMENT");
      }
    },
    [count]
  );
  const handleNodeInfoButtonClick = useCallback(
    function () {
      console.log(`muly:handleNodeInfoButtonClick ${count}`, {});
      if (count !== null) {
        emit<NodeInfoHandler>("NODE_INFO");
      }
    },
    [count]
  );
  const handleApplyTranslateButtonClick = useCallback(
    function () {
      console.log(`muly:handleApplyTranslateButtonClick ${fileName}`);
      if (fileName !== null) {
        emit<ApplyTranslateHandler>("APPLY_TRANSLATE", fileName);
      }
    },
    [fileName]
  );
  const handleCloseButtonClick = useCallback(function () {
    emit<CloseHandler>("CLOSE");
  }, []);
  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Count</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        onNumericValueInput={setCount}
        onValueInput={setCountString}
        value={countString}
        variant="border"
      />
      <VerticalSpace space="extraLarge" />
      <Columns space="extraSmall">
        {/*<Button fullWidth onClick={handleCreateRectanglesButtonClick}>*/}
        {/*  Create*/}
        {/*</Button>*/}
        <Button fullWidth onClick={handleNodeInfoButtonClick}>
          NODE INFO
        </Button>
        <Button fullWidth onClick={handleScanDocumentButtonClick}>
          SCAN
        </Button>
        <Button fullWidth onClick={handleApplyTranslateButtonClick}>
          APPLY
        </Button>
        <Button fullWidth onClick={handleCloseButtonClick} secondary>
          Close
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}

export default render(Plugin);
