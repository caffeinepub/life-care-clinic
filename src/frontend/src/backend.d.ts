import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Appointment {
    reasonForVisit: string;
    submissionTimestamp: bigint;
    preferredDate: string;
    preferredTime: string;
    patientName: string;
    phoneNumber: string;
}
export interface backendInterface {
    getAllAppointments(): Promise<Array<Appointment>>;
    submitAppointment(patientName: string, phoneNumber: string, preferredDate: string, preferredTime: string, reasonForVisit: string): Promise<void>;
}
