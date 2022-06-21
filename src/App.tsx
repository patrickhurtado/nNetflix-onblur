import { Box } from "@material-ui/core";
import { StyleSheet, css } from "aphrodite";
import ToggleBlurElements from "@src/components/ToggleBlurElement";
import Header from "@src/components/Header";

function App() {
  return (
    <Box className={css(styles.component)} component="main">
      <Header />

      <ToggleBlurElements website={"NETFLIX"} borderStyle={styles.netflixBorder} />
      <ToggleBlurElements website={"HULU"} borderStyle={styles.huluBorder} />
    </Box>
  );
}

const styles = StyleSheet.create({
  component: {
    display: "flex",
    flexDirection: "column",
    padding: 2,
  },
  netflixBorder: { borderColor: "#E50914" },
  huluBorder: { borderColor: "#1CE783" },
});

export default App;
