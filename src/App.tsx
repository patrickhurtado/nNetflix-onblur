import { Box } from "@material-ui/core";
import { StyleSheet, css } from "aphrodite";
import ToggleBlurElements from "@src/components/ToggleBlurElement";

function App() {
  console.log("App");

  return (
    <Box className={css(styles.component)} component="main">
      <ToggleBlurElements />
    </Box>
  );
}

const styles = StyleSheet.create({
  component: {
    display: "flex",
    padding: 2,
  },
});

export default App;
