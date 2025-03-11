import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { capitalizeWords, customToast } from "@/lib/utils";
import { createCategory, createEvent } from "@/redux/events/eventSlice";
import { getImage } from "@/services/getImageService";
import { storageServices } from "@/services/storageServices";
import { Loader2, PlusCircle, Upload, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { DatePicker } from "./DatePicker";

const AddEventDrawer = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.event);
  const [date, setDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [eventData, setEventData] = useState({
    title: "",
    date: date,
    time: "",
    location: "",
    category: "",
    description: "",
    thumbnail: null as File | null | string,
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [categoryLoading, setCategoryLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEventData((prev) => ({ ...prev, thumbnail: file }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setEventData((prev) => ({ ...prev, thumbnail: null }));
    setPreviewUrl(null);
    setImageUrl("");
  };

  const handleSubmit = async () => {
    if (!eventData.title.trim()) {
      customToast("Please enter an event title");
      return;
    }

    if (!date) {
      customToast("Please select a date for the event");
      return;
    }

    if (!eventData.time) {
      customToast("Please specify the event time");
      return;
    }

    if (!eventData.location.trim()) {
      customToast("Please enter an event location");
      return;
    }

    if (!eventData.category) {
      customToast("Please select an event category");
      return;
    }

    try {
      setLoading(true);
      if (eventData.thumbnail && typeof eventData.thumbnail !== "string") {
        const url = await storageServices.uploadFile(
          eventData.thumbnail as File
        );
        eventData.thumbnail = url;
      } else if (imageUrl) {
        eventData.thumbnail = imageUrl;
      } else {
        eventData.thumbnail = null;
      }

      const eventWithMetaData = {
        ...eventData,
        thumbnail:
          typeof eventData.thumbnail === "string" ? eventData.thumbnail : null,
      };
      console.log(eventWithMetaData);
      // return;
      await dispatch(createEvent(eventWithMetaData));
      customToast("Event created successfully!");
      setIsDrawerOpen(false);
    } catch (error) {
      console.error("Error creating event:", error);
      customToast("Failed to create event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    if (eventData.title === "") {
      customToast("Please enter an event title");
      return;
    }

    try {
      setImageLoading(true);
      const uploadedImageUrl = await getImage(eventData.title);
      if (uploadedImageUrl) {
        setImageUrl(uploadedImageUrl);
        setEventData((prev) => ({ ...prev, thumbnail: uploadedImageUrl }));
      }
    } catch (error) {
      console.error("Error generating image:", error);
      customToast("Failed to generate image. Please try again.");
    } finally {
      setImageLoading(false);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      customToast("Please enter a category name");
      return;
    }

    try {
      setCategoryLoading(true);
      const newCategory = await dispatch(
        createCategory(newCategoryName.trim())
      ).unwrap();

      handleSelectChange("category", newCategory.$id);

      setTimeout(() => {
        setIsCreatingCategory(false);
        setNewCategoryName("");
      }, 300);
      customToast("Category created successfully!");
    } catch (error) {
      console.error("Error creating category:", error);
      customToast("Failed to create category. Please try again.");
    } finally {
      setCategoryLoading(false);
    }
  };

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 px-5 rounded-md inline-flex items-center transition-all shadow-md hover:shadow-lg hover:translate-y-[-1px]">
        <PlusCircle className="mr-2" size={18} />
        Create New Event
      </DrawerTrigger>
      <DrawerContent className="bg-white backdrop-blur-sm">
        <div className="max-w-6xl mx-auto w-full">
          <DrawerHeader className="pb-2 border-b">
            <DrawerTitle className="text-2xl font-bold text-primary">
              Create New Event
            </DrawerTitle>
            <DrawerDescription className="text-muted-foreground">
              Fill in the details for your new event.
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4 w-full md:px-6 py-4 space-y-6 mx-auto max-h-[60vh] overflow-y-auto md:max-h-none md:overflow-visible custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base font-medium">
                    Event Title <span className="text-primary">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter event title"
                    value={eventData.title}
                    onChange={handleChange}
                    className="focus-visible:ring-primary focus-visible:ring-2 border-muted-foreground/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-base font-medium">
                      Date <span className="text-primary">*</span>
                    </Label>
                    <DatePicker date={date} setDate={setDate} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-base font-medium">
                      Time <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="time"
                      name="time"
                      type="time"
                      value={eventData.time}
                      onChange={handleChange}
                      className="focus-visible:ring-primary focus-visible:ring-2 border-muted-foreground/20"
                    />
                  </div>
                </div>

                {/* Location and Category section - changes based on screen size */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-base font-medium">
                      Location <span className="text-primary">*</span>
                    </Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Enter event location"
                      value={eventData.location}
                      onChange={handleChange}
                      className="focus-visible:ring-primary focus-visible:ring-2 border-muted-foreground/20"
                    />
                  </div>

                  {/* Category field - with create option */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Label
                        htmlFor="category"
                        className="text-base font-medium"
                      >
                        Category <span className="text-primary">*</span>
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (!isCreatingCategory) {
                            setEventData((prev) => ({ ...prev, category: "" }));

                            setIsCreatingCategory(true);
                          } else {
                            setIsCreatingCategory(false);
                          }
                        }}
                        className="h-7 px-2 text-xs hover:bg-muted/80 transition-colors"
                      >
                        {isCreatingCategory ? "Select Existing" : "Create New"}
                      </Button>
                    </div>

                    <div className="relative h-10">
                      <div
                        className={`absolute w-full transition-all duration-300 ease-in-out ${
                          isCreatingCategory
                            ? "opacity-0 pointer-events-none"
                            : "opacity-100"
                        }`}
                      >
                        <Select
                          onValueChange={(value) => {
                            handleSelectChange("category", value);
                          }}
                          value={eventData.category}
                        >
                          <SelectTrigger className="w-full focus-visible:ring-primary focus-visible:ring-2 border-muted-foreground/20">
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem
                                key={category.$id}
                                value={category.$id}
                              >
                                {capitalizeWords(category.name)}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div
                        className={`absolute w-full transition-all duration-300 ease-in-out ${
                          isCreatingCategory
                            ? "opacity-100"
                            : "opacity-0 pointer-events-none"
                        }`}
                      >
                        <div className="flex gap-2">
                          <Input
                            id="new-category"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="Enter new category name"
                            className="focus-visible:ring-primary focus-visible:ring-2 border-muted-foreground/20"
                          />
                          <Button
                            onClick={handleCreateCategory}
                            disabled={
                              categoryLoading || !newCategoryName.trim()
                            }
                            className="bg-primary hover:bg-primary/90 transition-colors"
                          >
                            {categoryLoading ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              "Create"
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="text-base font-medium"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter event description"
                    rows={4}
                    value={eventData.description}
                    onChange={handleChange}
                    className="focus-visible:ring-primary focus-visible:ring-2 resize-none border-muted-foreground/20"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail" className="text-base font-medium">
                  Event Thumbnail
                </Label>
                <div className="border-2 border-dashed border-muted rounded-lg transition-all hover:bg-muted/30 group">
                  {previewUrl || imageUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl ?? imageUrl}
                        alt="Event thumbnail preview"
                        className="w-full h-48 object-cover rounded-md shadow-sm lg:h-64"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 rounded-full shadow-lg opacity-90 hover:opacity-100"
                        onClick={removeImage}
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ) : (
                    <label
                      htmlFor="thumbnail-upload"
                      className="flex flex-col items-center justify-center h-48 lg:h-64 cursor-pointer p-4 transition-all"
                    >
                      <div className="bg-muted/40 p-4 rounded-full mb-3 group-hover:bg-muted/60 transition-colors">
                        <Upload size={32} className="text-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        Click to upload image
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        PNG, JPG, GIF up to 5MB
                      </span>
                      <input
                        id="thumbnail-upload"
                        name="thumbnail"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>
                <Button
                  onClick={generateImage}
                  className="mt-4 bg-gradient-to-r from-primary to-secondary text-white hover:bg-gradient-to-l hover:from-primary hover:to-secondary font-medium shadow-sm w-full cursor-pointer transition-all"
                  disabled={imageLoading}
                >
                  {imageLoading ? (
                    <span className="animate-pulse">Generating...</span>
                  ) : (
                    <span className="animate-bounce">Generate with AI ✨</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
          <DrawerFooter className="border-t bg-muted/30 py-4 mt-2 ">
            <div className="flex flex-row justify-end gap-3 w-full mx-auto px-4 items-center">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="border-muted-foreground/20 hover:bg-background flex-1 ring-primary ring-1 text-primary"
                  disabled={loading}
                >
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                onClick={handleSubmit}
                className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm flex-2"
                disabled={loading || imageLoading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <PlusCircle className="mr-2" size={16} />
                    Create Event
                  </>
                )}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddEventDrawer;
