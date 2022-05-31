import { useState } from "react";
import { loginWeb3Modal } from "../../lib/connectors";
import { useUser } from "../../hooks/useUser";
import Image from "next/image";
import loadingImage from "../../public/images/loading.gif";
import { useRouter } from "next/router";
import { isDev } from "../../lib/config";
import LoadingLayout from "../../components/LoadingLayout";
import lensFlare from "../../public/images/LensFlare.svg";
import loginLogo from "../../public/images/LoginLogo.svg";
import styles from "./login.module.scss";

function Login() {
  const user = useUser({
    redirectTo: "/",
    redirectIfFound: true,
  });
  const [email, setEmail] = useState<string>(
    isDev ? "test+success@magic.link" : ""
  );
  const [loading, setLoading] = useState<Boolean>(false);
  const router = useRouter();
  if (user !== null) {
    return <LoadingLayout />;
  }
  return (
    <>
      <div className={styles["root"]}>
        <div className={styles["img_bg"]}>
          <Image
            src={lensFlare}
            alt="login background lens flare"
            layout="fixed"
            width="1471px"
            height="1226px"
          />
        </div>
      </div>
      <div className={styles["login_group"]}>
        <div className={styles["login_frame"]}>
          <div className={styles["login_logo"]}>
            <div className={styles["centered-logo"]}>
              <Image src={loginLogo} alt="login logo centered" />
            </div>
          </div>
          <div className={styles["login_text"]}>
            Connect your wallet to get started.
          </div>
        </div>
        {!loading ? (
          <>
            <button
              className={styles["connect_button"]}
              onClick={() => {
                setLoading(true);
                loginWeb3Modal(router);
                setLoading(false);
              }}
            >
              Connect Wallet
            </button>
          </>
        ) : (
          <div className={`primary ${styles.login_loading}`}>
            <Image src={loadingImage} alt="loading" />
          </div>
        )}
      </div>
    </>
  );
}

export default Login;
