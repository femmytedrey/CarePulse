import AppointmentForm from "@/components/forms/AppointmentForm";
import PatientForm from "@/components/forms/PatientForm";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { getPatient } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";

export default async function NewAppointment({
  params: { userId },
}: SearchParamProps) {
  const patient = await getPatient(userId);
  //   if (patient) {
  //     console.log(patient);
  //   } else {
  //     console.log("no patient");
  //   }
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
          <Logo />
          <AppointmentForm type="create" userId={userId} patientId={patient.$id} />

          <p className="copyright mt-10 py-12">
            © 2024 CarePulse
          </p>
        </div>
      </section>

      <Image
        src="/assets/images/appointment-img.png"
        width={1000}
        height={1000}
        alt="appointment"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
