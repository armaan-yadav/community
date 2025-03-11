import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  capitalizeWords,
  convertTo12HourFormat,
  formatDate,
} from "@/lib/utils";
import { Event } from "@/types";
import { CalendarIcon, ChevronRight, ClockIcon, MapPin } from "lucide-react";
import thumbnailImg from "../../../public/images/thumbnail.webp";
import { Link } from "react-router-dom";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const { category, date, location, title, thumbnail, time } = event;
  const eventDate = new Date(date);
  const month = eventDate.toLocaleString("default", { month: "short" });
  const day = eventDate.getDate();

  return (
    <Card className="w-[340px] overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg border border-gray-200 hover:border-gray-300 py-0">
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={thumbnail ?? thumbnailImg}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute right-3 top-3 rounded-lg bg-white/90 backdrop-blur-sm p-2 shadow-md border border-gray-100">
          <div className="text-center text-xs font-semibold uppercase text-gray-600">
            {month}
          </div>
          <div className="text-center text-xl font-bold text-gray-800">
            {day}
          </div>
        </div>
      </div>

      <CardContent className="pt-5 pb-2">
        {category && (
          <Badge className="font-medium">
            {capitalizeWords(category.name ?? "lala")}
          </Badge>
        )}

        <div className="my-3 flex flex-col gap-2 ">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <CalendarIcon className="h-4 w-4 text-primary" strokeWidth="2" />
          <span className="text-sm">{formatDate(eventDate)}</span>
        </div>

        {location && (
          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <MapPin className="h-4 w-4 text-primary" strokeWidth="2" />
            <span className="text-sm line-clamp-1">
              {capitalizeWords(location)}
            </span>
          </div>
        )}
        <div className="mt-2 flex items-center gap-2 text-gray-600">
          <ClockIcon className="h-4 w-4 text-primary" strokeWidth="2" />
          <span className="text-sm line-clamp-1">
            {`${convertTo12HourFormat(time ?? "11:11")} at IST`}
          </span>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t border-gray-100 px-6 py-6">
        <Button
          variant="outline"
          className="flex items-center gap-1 rounded-md border-gray-200  text-white  cursor-pointer hover:text-bright-white w-full bg-gradient-to-r from-primary to-secondary"
        >
          <Link to={`/events/${event.$id}`} className="flex-c" state={event}>
            Event Details
            <ChevronRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
