import Checkbox from "@mui/material/Checkbox";
import React from "react";
import {
  sendMessageToContentScripts,
  setLocalStorage,
  getLocalStorage,
} from "@src/lib/browerUtils";
import { StyleSheet, css, StyleSheetStatic } from "aphrodite";

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

export default function ToggleBlurElements({
  website,
  name,
  borderStyle,
}: {
  website: string;
  name: string;
  borderStyle: object;
}) {
  const [values, setValues] = React.useState(defaultCheckValues);

  React.useEffect(() => {
    const storedValues = getLocalStorage(website);
    setValues(storedValues || defaultCheckValues);
  }, []);

  React.useEffect(() => {
    setLocalStorage(website, values);
  }, [values]);

  const updateValues = (updatedvalues: any) => {
    const newValues = { ...values, ...updatedvalues };
    setValues(newValues);
    sendMessageToContentScripts(website, newValues);
  };

  const { titles, descriptions, images } = values;
  return (
    <view className={css(styles.component)}>
      <h3 className={css(styles.titleBorder, borderStyle)}>{name}</h3>
      <span className={css(styles.checkboxRow)}>
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
      </span>
    </view>
  );
}
const styles = StyleSheet.create({
  component: {
    padding: 2,
  },
  checkboxRow: { display: "flex", flexDirection: "row" },
  titleBorder: { borderStyle: "solid", borderWidth: 2 },
});
