import React, { useRef } from "react";
import ReactSignatureCanvas from "react-signature-canvas";

export const Terms = () => {
  const signaturePadRef = useRef<ReactSignatureCanvas>(null);

  const handleClear = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    signaturePadRef.current?.clear();
  };

  const handleSave = () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const signatureDataUrl = signaturePadRef.current?.toDataURL();
    console.log("Signature Data URL:", signatureDataUrl);
  };
  return (
    <>
      <ReactSignatureCanvas
        ref={signaturePadRef}
        penColor="green"
        canvasProps={{
          width: 400,
          height: 200,
          className: "sigCanvas border-black border-2",
        }}
      />
      <div className="mb-72 flex justify-around">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSave} className="">
          Save
        </button>
      </div>
    </>
  );
};
