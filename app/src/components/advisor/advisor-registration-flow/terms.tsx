import React, { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export const Terms = () => {
  const signaturePadRef = useRef(null);

  const handleClear = () => {
    signaturePadRef.current?.clear();
  };

  const handleSave = () => {
    const signatureDataUrl = signaturePadRef.current?.toDataURL();
    console.log("Signature Data URL:", signatureDataUrl);
  };
  return (
    <>
      <SignatureCanvas
        ref={signaturePadRef}
        penColor="green"
        canvasProps={{
          border: "1px solid black",
          width: 400,
          height: 200,
          className: "sigCanvas border-black border-2 ",
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
