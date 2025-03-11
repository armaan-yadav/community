import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dbServices } from "../../services/dbServices";
import { Category, Event, LocalEvent } from "../../types";

interface EventState {
  events: Event[];
  categories: Category[];
  currentEvent: Event | null;
  loading: boolean;
  error: string | null;
  value: number; // Keeping the original counter for backward compatibility
}

// Async thunk for fetching all events
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const events = await dbServices.getAllEvents();
      return events;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to fetch events"
      );
    }
  }
);

// Async thunk for adding a new event
export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (
    eventData: Omit<LocalEvent, "$id" | "$createdAt">,
    { rejectWithValue }
  ) => {
    try {
      const newEvent = await dbServices.addEvent(eventData);
      return newEvent;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to create event"
      );
    }
  }
);

// Async thunk for fetching events by category
export const fetchEventsByCategory = createAsyncThunk(
  "event/fetchEventsByCategory",
  async (category: string, { rejectWithValue }) => {
    try {
      const events = await dbServices.getAllEventsByCategory({ category });
      return events;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to fetch events by category"
      );
    }
  }
);

// Async thunk for fetching all categories
export const fetchCategories = createAsyncThunk(
  "event/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const categories = await dbServices.getAllCategories();
      return categories;
    } catch (error) {
      return rejectWithValue(
        (error as Error).message || "Failed to fetch categories"
      );
    }
  }
);

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    categories: [], // Add categories array to initial state
    currentEvent: null,
    loading: false,
    error: null,
    value: 0,
  } as EventState,
  reducers: {
    // Event-specific reducers
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
      state.loading = false;
      state.error = null;
    },

    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },

    setCurrentEvent: (state, action: PayloadAction<string>) => {
      state.currentEvent =
        state.events.find((event) => event.$id === action.payload) || null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },

    // Add a reducer for setting categories manually if needed
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchEvents
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle createEvent
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.loading = false;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle fetchEventsByCategory
      .addCase(fetchEventsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventsByCategory.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEventsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setEvents,
  addEvent,
  setCurrentEvent,
  setLoading,
  setError,
  clearError,
  setCategories, // Export the new action
} = eventSlice.actions;

const eventReducer = eventSlice.reducer;
export default eventReducer;
