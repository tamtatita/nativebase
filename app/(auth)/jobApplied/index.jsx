import React from "react";
import { FlashList } from "@shopify/flash-list";
import JobAppliedHeader from "../../../components/jobApplied/JobAppliedHeader";
import JobAppliedBody from "../../../components/jobApplied/JobAppliedBody";
const JobApplied = () => {
  return (
    <FlashList
      ListHeaderComponent={() => (
        <>
          <JobAppliedHeader />

          <JobAppliedBody />
        </>
      )}
    />
  );
};

export default JobApplied;
