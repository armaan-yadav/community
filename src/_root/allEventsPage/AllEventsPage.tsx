import AddEventDrawer from "@/components/shared/AddEventDrawer";
import EventCard from "@/components/shared/EventCard";
import EventCardShimmer from "@/components/shimmer/EventCardShimmer";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { capitalizeWords } from "@/lib/utils";
import { fetchCategories, fetchEvents } from "@/redux/events/eventSlice";
import { Calendar, RefreshCw, Search } from "lucide-react";
import { useEffect, useState } from "react";

const AllEventsPage = () => {
  const dispatch = useAppDispatch();
  const { events, loading, categories } = useAppSelector(
    (state) => state.event
  );
  const [localEvents, setLocalEvents] = useState(events);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (events.length === 0) {
      dispatch(fetchEvents());
    }

    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, events.length, categories.length]);

  const handleRefresh = () => {
    dispatch(fetchEvents());
    dispatch(fetchCategories());
  };

  useEffect(() => {
    let filteredEvents = events;
    if (activeCategory !== "All") {
      filteredEvents = events.filter(
        (event) => event.category.name === activeCategory
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query)
      );
    }

    setLocalEvents(filteredEvents);
  }, [events, activeCategory, searchQuery]);

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
      <div className="mb-8 sm:mb-12 text-center rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 py-8 sm:py-12 px-3 sm:px-6">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-foreground">
          Bringing Communities Together to{" "}
          <span className="text-primary">Grow</span> &{" "}
          <span className="text-secondary">Thrive</span>
        </h1>
        <p className="text-muted-foreground text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
          Discover and join events that matter to you
        </p>
        <AddEventDrawer />
      </div>

      <div className="mb-6 sm:mb-10">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-5">
          <h2 className="text-xl font-semibold flex items-center text-foreground">
            <Calendar className="mr-2 text-primary" size={22} />
            <span>Upcoming Events</span>
          </h2>
          <button
            onClick={handleRefresh}
            className="flex cursor-pointer items-center justify-center gap-2 px-3 py-1.5 rounded-md bg-muted hover:bg-muted/80 transition-colors text-sm w-fit"
            disabled={loading}
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 mb-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2.5 w-full rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          <div className="overflow-x-auto pb-2 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-hide">
            <div className="flex gap-1.5 sm:gap-2 min-w-min">
              {[{ name: "All" }, ...categories].map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm whitespace-nowrap touch-manipulation ${
                    activeCategory === category.name
                      ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                      : "bg-card text-card-foreground hover:bg-muted"
                  }`}
                >
                  {capitalizeWords(category.name)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mx-auto w-full place-items-center">
        {loading ? (
          Array(3)
            .fill(0)
            .map((_, index) => <EventCardShimmer key={`shimmer-${index}`} />)
        ) : localEvents.length > 0 ? (
          localEvents.map((event) => (
            <EventCard key={event.$id} event={event} />
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-card rounded-xl border border-border w-full">
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
