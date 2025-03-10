import { Event } from "@/types";

const EventCard = () => {
  const event: Event = {
    category: "Charity",
    date: new Date(),
    description: "",
    $id: "abc",
    location: "vadodara",
    title: "Charity Event",
    $createdAt: "2021-10-10",
    tags: [],
  };

  return <div>EventCard</div>;
};

export default EventCard;
