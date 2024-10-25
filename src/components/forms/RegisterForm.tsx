"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
// import { toNamespacedPath } from "path";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation } from "@/lib/UserFormValidation";
import { useRouter } from "next/navigation";
import { createUser, registerPatient } from "@/lib/actions/patient.actions";
import { formFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Doctors,
  GenderOptions,
  IdentificationTypes,
  PatientFormDefaultValues,
} from "../../../constants";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsloading(true);
    let formData;
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      formData = new FormData();
      formData.append("identificationDocument", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }
    try {
      const patientData = {
        ...values,
        userId: user.$id,
        birthDate: new Date(values.birthDate),
        identificationDocument: formData,
      };

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) {
        router.push(`/patients/${user.$id}/new-appointment`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 lg:space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 🤝</h1>
          <p className="text-dark-700">Tell us more about you</p>
        </section>

        <section className="space-y-4">
          <div className="mb-9 space-y-2">
            <h2 className="sub-header">Personal Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="name"
          type="text"
          placeholder="e.g. John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            type="email"
            placeholder="johndoe@femi.dev"
            iconSrc="/assets/icons/email.svg"
            iconAlt="email"
          />
          <CustomFormField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="phone"
            label="Phone number"
            type="text"
            // placeholder="(555) 123 4567"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <CustomFormField
            fieldType={formFieldType.DATE_PICKER}
            control={form.control}
            name="birthDate"
            label="Date of birth"
          />
          <CustomFormField
            fieldType={formFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => {
              return (
                <FormControl>
                  <RadioGroup
                    className="flex h-11 gap-6 xl:justify-between"
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    {GenderOptions.map((option) => (
                      <div key={option} className="radio-group">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            }}
          />
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="address"
            label="Address"
            type="text"
            placeholder="14th Street, Atlanta Georgia"
          />

          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="occupation"
            label="Occupation"
            type="text"
            placeholder="Software Engineer"
          />
        </div>
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="emergencyContactName"
            label="Emergency contact name"
            type="text"
            placeholder="Guardian's name"
          />
          <CustomFormField
            fieldType={formFieldType.PHONE_INPUT}
            control={form.control}
            name="emergencyContactNumber"
            label="Emergency contact number"
            type="text"
            // placeholder="(555) 123 4567"
          />
        </div>

        <section className="space-y-4">
          <div className="mb-9 space-y-2">
            <h2 className="sub-header">Medical Information</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select a physician"
        >
          {Doctors.map((doctor) => (
            <SelectItem
              value={doctor.name}
              key={doctor.name}
              className="hover:bg-gray-800"
            >
              <div className="flex cursor-pointer items-center gap-2 h-fit">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={32}
                  height={32}
                  className="rounded-full border border-dark-500"
                />
                <p>{doctor.name}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="insuranceProvider"
            label="Insurance provider"
            type="text"
            placeholder="BlueCross BlueShield"
          />
          <CustomFormField
            fieldType={formFieldType.INPUT}
            control={form.control}
            name="insurancePolicyNumber"
            label="Insurance policy number"
            type="text"
            placeholder="ABC123456789"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="allergies"
            label="Allergies (if any)"
            placeholder="Peanuts, Penicillin, Pollen"
          />
          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="currentMedication"
            label="Current Medication"
            placeholder="Ibuprofen 200mg, Paracetamol 500mg"
          />
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="familyMedicalHistory"
            label="Family medical history"
            placeholder="Mother had brain cancer, Father had heart disease"
          />
          <CustomFormField
            fieldType={formFieldType.TEXTAREA}
            control={form.control}
            name="pastMedicalHistory"
            label="Past medical history"
            placeholder="Appendectomy, Tonsillectomy"
          />
        </div>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification type"
          placeholder="Select an identification type"
        >
          {IdentificationTypes.map((type) => (
            <SelectItem value={type} key={type} className="hover:bg-gray-800">
              {type}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification number"
          type="text"
          placeholder="1234567890"
        />

        <CustomFormField
          fieldType={formFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of identification document"
          renderSkeleton={(field) => {
            return (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            );
          }}
        />

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>

        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          name="treatmentConsent"
          label="I consent to treatment"
        />
        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          name="disclosureConsent"
          label="I consent to disclosure of information"
        />
        <CustomFormField
          fieldType={formFieldType.CHECKBOX}
          control={form.control}
          name="privacyConsent"
          label="I consent to privacyPolicy"
        />

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2"></div>
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2"></div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
