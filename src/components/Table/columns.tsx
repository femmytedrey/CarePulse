"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import StatusBadge from "../StatusBadge";
import { formatDateTime } from "@/lib/utils";
import { Doctors } from "../../../constants";
import Image from "next/image";
import AppointmentModal from "../AppointmentModal";

export const columns: ColumnDef<Payment>[] = [
  {
    header: "ID",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.patient.name}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({row}) => {
        return <div className="min-w-[115px]">
            <StatusBadge status={row.original.status}/>
        </div>
    }
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({row}) => (
        <p className="text-14-regular min-w-[100px]">
            {formatDateTime(row.original.schedule).dateTime}
        </p>
    )
  },
  {
    accessorKey: "primaryPhisician",
    header: () => 'Doctor',
    cell: ({ row }) => {
      const doctor = Doctors.find((doc) => doc.name === row.original.primaryPhysician)

      return <div className="flex items-center gap-3">
        <Image
        src={doctor?.image}
        alt={doctor?.name}
        height={100}
        width={100}
        className="size-8"
        />
        <p className="whitespace-nowrap">Dr. {doctor?.name}</p>
      </div>;
    },
  },
  {
    id: "actions",
    header: <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
        return(
            <div className="flex gap-1">
                <AppointmentModal />
            </div>
        )
    },
  },
];