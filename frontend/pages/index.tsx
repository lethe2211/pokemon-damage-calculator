import Head from "next/head";
import Image from "next/image";
import { ReactElement } from "react";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return <h1 className="text-3xl font-bold underline">Hello, Next.js!</h1>;
};

Home.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};

export default Home;
