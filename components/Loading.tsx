'use client';

import {useEffect} from "react";
import {useLoading} from "@/hooks";

export const Loading = () => {
  const loading = useLoading();

  useEffect(() => {
    loading.start();
    return () => {loading.finish()};
  }, []);

  return <div/>;
}
