import axios from "axios";
import { GetServerSideProps } from "next";
import LayoutAppBar from "../../../../layout";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Card from "../../../../components/card";
import Head from "next/head";

export default function ComplexGrid({ data }) {
  if (data.message) {
    return (
      <LayoutAppBar>
        <div
          style={{
            textAlign: "center",
          }}
        >
          <Typography variant="h5">{data.message}</Typography>
        </div>
      </LayoutAppBar>
    );
  }

  return (
    <LayoutAppBar>
      <Head>
        <title>{data[0].make + " " + data[0].model}</title>
      </Head>
      <Card data={data[0]} showDetails={true} />
    </LayoutAppBar>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const id = ctx.params.id;
  const { data } = await axios(`/car/make/model/${id}`);

  return { props: { data } };
};
