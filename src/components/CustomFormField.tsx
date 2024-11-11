"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Form } from "react-hook-form";
import { formFieldType } from "./forms/PatientForm";
import React from "react";
import Image from "next/image";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

interface CustomProps {
  control: Control<any>;
  fieldType: formFieldType;
  name: string;
  type?: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  description?: string;
  message?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    fieldType,
    type,
    placeholder,
    iconSrc,
    iconAlt,
    description,
    message,
    disabled,
    dateFormat,
    showTimeSelect,
    children,
    renderSkeleton,
  } = props;
  switch (fieldType) {
    case formFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case formFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            className="shad-textArea border-0"
            disabled={props.disabled}
            {...field}
          />
        </FormControl>
      );
    case formFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="US"
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case formFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            alt="calendar"
            width={24}
            height={24}
            className="ml-2"
          />
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)}
            dateFormat={dateFormat ?? "MM/dd/yyyy"}
            showTimeSelect={showTimeSelect ?? false}
            showYearDropdown={true}
            scrollableYearDropdown={true}    
            minDate={new Date(1950)}
            timeInputLabel="Time:"
            wrapperClassName="date-picker"
          />
        </div>
      );
    case formFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case formFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="shad-select-trigger">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="shad-select-content">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case formFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center space-x-2">
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} onClick={() => {
              field.onChange(!field.value);
            }}/>
            <label htmlFor={props.name}  className="checkbox-label">{props.label}</label>
          </div>
        </FormControl>
      )

    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {fieldType !== formFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} props={props} />
          <FormDescription>{props.description}</FormDescription>
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
