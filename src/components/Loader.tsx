import { Grid } from "react-loader-spinner";

export default function Loader() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "ceter",
        alignItems: "center",
        background: "rgba(255, 255, 255, 0.7)",
      }}
    >
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <Grid height={100} width={100} color="rgb(158, 156, 134)" />
      </div>
    </div>
  );
}
