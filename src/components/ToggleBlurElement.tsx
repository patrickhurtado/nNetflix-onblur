import Checkbox from "@mui/material/Checkbox";
import React from "react";
import {
  sendMessageToContentScripts,
  setLocalStorage,
  getLocalStorage,
} from "../lib/browerUtils";

const NETFLIX = "NETFLIX";

const defaultCheckValues: any = {
  titles: true,
  descriptions: true,
  images: true,
};

const LabeledCheckbox = ({ label, onChange, initialValue }: any) => {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onCheckChange = () => {
    const newValue = !value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      <text>{label}</text>
      <Checkbox onChange={onCheckChange} checked={value} />
    </>
  );
};

export default function ToggleBlurElements() {
  const [values, setValues] = React.useState(defaultCheckValues);

  React.useEffect(() => {
    const storedValues = getLocalStorage(NETFLIX);
    setValues(storedValues);
  }, []);

  React.useEffect(() => {
    setLocalStorage(NETFLIX, values);
  }, [values]);

  const updateValues = (updatedvalues: any) => {
    const newValues = { ...values, ...updatedvalues };
    setValues(newValues);
    sendMessageToContentScripts(newValues);
  };

  const { titles, descriptions, images } = values;
  return (
    <>
      <LabeledCheckbox
        label="Titles"
        initialValue={titles}
        onChange={(newValue: boolean) => updateValues({ titles: newValue })}
      />
      <LabeledCheckbox
        label="Descriptions"
        initialValue={descriptions}
        onChange={(newValue: boolean) =>
          updateValues({ descriptions: newValue })
        }
      />
      <LabeledCheckbox
        label="Images"
        initialValue={images}
        onChange={(newValue: boolean) => updateValues({ images: newValue })}
      />
    </>
  );
}
