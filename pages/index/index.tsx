import Image from "next/image";
import Link from "next/link";
import { useUser } from "../../hooks/useUser";
import LoadingLayout from "../../components/LoadingLayout";
import styles from "./index.module.scss";

export default function Dashboard({ sclrBought, usersBought }) {
  const user = useUser({ redirectTo: "/login" });

  if (!user) {
    return <LoadingLayout />;
  }
  return <div className={styles.root}></div>;
}
