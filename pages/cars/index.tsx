import React from "react";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { stringify } from "querystring";
import { Box, Grid } from "@material-ui/core";
import deepEqual from "fast-deep-equal";
import getAsString from "../../src/getAsString";
import Search from "../../components/search";
import Card from "../../components/card";
import LayoutAppBar from "../../layout";
import Paginations from "../../components/pagination";
import { Skeleton } from "@material-ui/lab";

export default function CarList({
  makesData,
  modelsData,
  result: { cars, totalPages },
  serverQuery,
}) {
  const { query } = useRouter();
  const { data } = useSWR(`/cars/car?${stringify(query)}`, {
    dedupingInterval: 15000,
    initialData: deepEqual(query, serverQuery)
      ? { cars, totalPages }
      : undefined,
  });

  return (
    <LayoutAppBar>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3} md={3} lg={2}>
          <Search
            makesData={makesData}
            modelsData={modelsData}
            singleColumn={true}
          />
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={10}>
          <Box marginBottom={2}>
            <Paginations data={data} />
          </Box>
          {data ? (
            <Cars data={data} />
          ) : (
            <div>
              <Box marginBottom={3}>
                <Skeleton variant="rect" height={220} />
              </Box>
              <Skeleton variant="rect" height={220} />
            </div>
          )}
        </Grid>
      </Grid>
    </LayoutAppBar>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make);

  const [makes, models, result] = await Promise.all([
    axios("/car/makes"),
    axios(`/car/models/${make}`),
    axios(`/cars${ctx.resolvedUrl}`),
  ]);

  return {
    props: {
      makesData: makes.data,
      modelsData: models.data,
      result: result.data,
      serverQuery: ctx.query,
    },
  };
};

function Cars({ data }) {
  return (
    <Box>
      {data?.cars?.map((car) => (
        <Box marginBottom={3} key={car._id}>
          <Link href={`/car/${car.make}/${car.model}/${car._id}`}>
            <a>
              <Card data={car} showDetails={false} />
            </a>
          </Link>
        </Box>
      ))}
    </Box>
  );
}
