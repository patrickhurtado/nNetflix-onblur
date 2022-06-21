import { StyleSheet, css } from "aphrodite";

export const Header = (_: any) => {
  return <h1 className={css(styles.component)}>Stream Spoiler Free</h1>;
};

const styles = StyleSheet.create({
  component: { display: "flex", alignItems: "center" }
});
export default Header;
