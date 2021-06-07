import { GetStaticProps } from "next";
import React from "react";
import SimpleAccordion from "../../components/accordion";
import LayoutAppBar from "../../layout";
import axios from "axios";
import { FaqModel } from "../../models/faq";

export interface FaqProps {
  faq: FaqModel[];
}

export default function FAQ({ faq }: FaqProps) {
  return (
    <LayoutAppBar>
      <SimpleAccordion arrayOfFaq={faq} />
    </LayoutAppBar>
  );
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await axios("/faq");
  return {
    props: {
      faq: data,
    },
  };
};
