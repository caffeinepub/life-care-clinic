import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetAllAppointments() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAppointments();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitAppointment() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      patientName: string;
      phoneNumber: string;
      preferredDate: string;
      preferredTime: string;
      reasonForVisit: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitAppointment(
        data.patientName,
        data.phoneNumber,
        data.preferredDate,
        data.preferredTime,
        data.reasonForVisit,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
    },
  });
}
