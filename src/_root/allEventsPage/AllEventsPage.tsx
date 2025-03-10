import EventCard from "@/components/shared/EventCard";
import { dbServices } from "@/services/dbServices";
import React, { useEffect } from "react";

const AllEventsPage = () => {
  const fetch = async () => {
    console.log("first");
    const events = await dbServices.getAllEventsByCategory({ category: "" });
    console.log(events);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="h-screen flex-c">
      <EventCard />
    </div>
  );
};

export default AllEventsPage;
