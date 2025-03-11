import AddEventDrawer from "@/components/shared/AddEventDrawer";
import EventCard from "@/components/shared/EventCard";
import EventCardShimmer from "@/components/shimmer/EventCardShimmer";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { fetchCategories, fetchEvents } from "@/redux/events/eventSlice";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";

const AllEventsPage = () => {
  const dispatch = useAppDispatch();
  const { events, loading, categories } = useAppSelector(
    (state) => state.event
  );

  useEffect(() => {
    dispatch(fetchEvents());
    dispatch(fetchCategories());
  }, [dispatch]);
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 py-12 px-6">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          Bringing Communities Together to{" "}
          <span className="text-primary">Grow</span> &{" "}
          <span className="text-secondary">Thrive</span>
        </h1>
        <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          Discover and join events that matter to you
        </p>
        <AddEventDrawer />
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-5 flex items-center text-foreground">
          <Calendar className="mr-2 text-primary" size={22} />
          <span>Upcoming Events</span>
        </h2>

        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-wrap gap-3">
            {[{ name: "All" }, ...categories].map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  activeCategory === category.name
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                    : "bg-card text-card-foreground hover:bg-muted"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <EventCardShimmer key={`shimmer-${index}`} />)
        ) : events.length > 0 ? (
          events.map((event) => <EventCard key={event.$id} event={event} />)
        ) : (
          <div className="col-span-full text-center py-16 bg-card rounded-xl border border-border">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              No events found
            </h3>
            <p className="text-muted-foreground">
              Try changing your filters or check back later for new events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEventsPage;
