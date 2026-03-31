export type BookingFormState = {
  status: "idle" | "success" | "error";
  message: string;
};

export const initialBookingFormState: BookingFormState = {
  status: "idle",
  message: "",
};
