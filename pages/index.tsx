import axios from "axios";
import { GetServerSideProps } from "next";
import LayoutAppBar from "../layout";
import getAsString from "../src/getAsString";
import Search from "../components/search";

export default function Home({ makesData, modelsData }) {
  return (
    <LayoutAppBar>
      <Search
        makesData={makesData}
        modelsData={modelsData}
        singleColumn={false}
      />
    </LayoutAppBar>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const make = getAsString(ctx.query.make);
  const [makes, models] = await Promise.all([
    axios("/car/makes"),
    axios(`/car/models/${make}`),
  ]);

  return {
    props: {
      makesData: makes.data,
      modelsData: models.data,
      url: ctx.resolvedUrl,
    },
  };
};
