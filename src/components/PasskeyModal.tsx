"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { decryptKey, encryptKey } from "@/lib/utils";

const PasskeyModal = () => {
  const [open, setOpen] = useState(true);
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const path = usePathname();

  const encryptedKey =
    typeof window !== "undefined"
      ? window.localStorage.getItem("accesskey")
      : null;

  useEffect(() => {
    const accesskey = encryptedKey && decryptKey(encryptedKey)
    if (path) {
      if (accesskey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        setOpen(false);
        router.push("/admin");
      } else {
        setOpen(true)
      }
    }
  }, [encryptedKey]);

  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
      setError("");
      const encryptedKey = encryptKey(passkey);
      localStorage.setItem("accesskey", encryptedKey);
      setOpen(false);
    } else {
      setError("Invalid passkey. Please try again.");
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/");
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="shad-alert-dialog">
        <DialogHeader>
          <DialogTitle className="flex items-start justify-between">
            Admin Access Verification
          </DialogTitle>
          <DialogDescription>
            To access the admin page, please enter the passkey.
          </DialogDescription>
        </DialogHeader>

        <div>
          <InputOTP
            maxLength={8}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot className="shad-otp-slot" index={0} />
              <InputOTPSlot className="shad-otp-slot" index={1} />
              <InputOTPSlot className="shad-otp-slot" index={2} />
              <InputOTPSlot className="shad-otp-slot" index={3} />
              <InputOTPSlot className="shad-otp-slot" index={4} />
              <InputOTPSlot className="shad-otp-slot" index={5} />
            </InputOTPGroup>
          </InputOTP>
          {error && (
            <p className="shad-error text-14-regular mt-4 flex justify-center">
              {error}
            </p>
          )}
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="shad-primary-btn w-full"
            onClick={(e) => validatePasskey(e)}
          >
            Enter Admin Passkey
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PasskeyModal;
