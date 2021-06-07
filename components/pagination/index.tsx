import React, { forwardRef } from "react";
import PaginationItem from "@material-ui/lab/PaginationItem";
import getAsString from "../../src/getAsString";
import Pagination, {
  PaginationRenderItemParams,
} from "@material-ui/lab/Pagination";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Link from "next/link";

export default function Paginations({ data }) {
  const { query } = useRouter();
  return (
    <div>
      <Pagination
        page={parseInt(getAsString(query.page) || "1")}
        count={data?.totalPages}
        renderItem={(item) => (
          <PaginationItem
            component={MaterialUILink}
            query={query}
            item={item}
            {...item}
          />
        )}
        color="primary"
      />
    </div>
  );
}

export interface MaterialUILinkProps {
  item: PaginationRenderItemParams;
  query: ParsedUrlQuery;
}

const MaterialUILink = forwardRef<HTMLAnchorElement, MaterialUILinkProps>(
  ({ item, query, ...props }, ref) => (
    <Link
      href={{
        pathname: "/cars",
        query: { ...query, page: item.page },
      }}
      shallow
    >
      <a {...props} ref={ref}></a>
    </Link>
  )
);
