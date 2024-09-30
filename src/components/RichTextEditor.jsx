import React, { useState, useEffect } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const RichTextEditor = ({ defaultValue, onRichTextEditorChange, keyProp }) => {
  const [value, setValue] = useState(defaultValue);

  // Ensure the editor resets when the parent changes defaultValue
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <div className="editor-container">
      <EditorProvider>
        <Editor
          key={keyProp} // Ensure the key changes to force re-render on form reset
          className="editor"
          value={value}
          onChange={(e) => {
            onRichTextEditorChange(e);
            setValue(e.target.value); // Update the local state
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnClearFormatting />
            <HtmlButton />
            <Separator />
            <BtnStyles />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
