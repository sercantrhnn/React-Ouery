import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";

export function useCheckin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate: checkin, isLoading: isCheckinIn} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
            status: "checked-in",
            isPaid: true,
            ...breakfast,
        }),

        onSuccess: (data) => {
            toast.success(`Booking ${data.id} checked in`);
            queryClient.invalidateQueries({active:true});
            navigate("/")
        },

        onError: (error) => {
            toast.error("An error occurred");
        },
    })
    return {checkin, isCheckinIn};
}