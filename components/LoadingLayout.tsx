import React from "react";
import useStyles from "../hooks/useStyles";
import loading from "../public/images/loading.gif";
import Image from "next/image";

function LoadingLayout() {
  const styles = useStyles();
  return (
    <div style={styles.wholeScreen}>
      <div style={styles.vertAndHorizCenter}>
        <Image
          src={loading}
          alt="Loading gif"
          width={"200px"}
          height={"200px"}
        />
      </div>
    </div>
  );
}

export default LoadingLayout;
