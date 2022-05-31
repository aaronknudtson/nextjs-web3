import { useEffect } from "react";
import useSWR from "swr";

const fetcher = async (url: string) => {
  const r = await fetch(url);
  const data = await r.json();
  return { user: data?.user || null };
};

export function useLiteUser() {
  const { data, error } = useSWR("/api/user", fetcher);

  const user = data?.user;
  const finished = Boolean(data);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (!finished) return;
    if (hasUser) return;
    if (hasUser) return;
  }, [finished, hasUser]);

  return error ? null : user;
}
