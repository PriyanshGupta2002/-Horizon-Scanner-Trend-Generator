import Header from "@/components/header";
import ListingTable from "@/components/lisiting-table";
import TrendForm from "@/components/trend-form";
import React from "react";

const page = () => {
  return (
    <div className="p-2 space-y-3">
      <Header />
      <ListingTable />
    </div>
  );
};

export default page;