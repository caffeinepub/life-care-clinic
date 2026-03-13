import List "mo:core/List";
import Time "mo:core/Time";

actor {
  type Appointment = {
    patientName : Text;
    phoneNumber : Text;
    preferredDate : Text;
    preferredTime : Text;
    reasonForVisit : Text;
    submissionTimestamp : Int;
  };

  let appointments = List.empty<Appointment>();

  public shared ({ caller }) func submitAppointment(patientName : Text, phoneNumber : Text, preferredDate : Text, preferredTime : Text, reasonForVisit : Text) : async () {
    let newAppointment : Appointment = {
      patientName;
      phoneNumber;
      preferredDate;
      preferredTime;
      reasonForVisit;
      submissionTimestamp = Time.now();
    };
    appointments.add(newAppointment);
  };

  public query ({ caller }) func getAllAppointments() : async [Appointment] {
    appointments.toArray();
  };
};
