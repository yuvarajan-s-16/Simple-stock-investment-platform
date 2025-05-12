/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { sendVerificationOtp, verifyOtp } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../Auth/Auth";

const AccountVarificationForm = ({handleSubmit}) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const {auth}=useSelector(store=>store)

  const handleOnChange = (e) => {
    console.log(e.target.value);
  };

  const handleSendOtp = (verificationType) => {
    dispatch(
      sendVerificationOtp({
        verificationType,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  
  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-10 w-full">
        <div className="flex justify-between items-center">
          <p className="">Email :</p>
          <p>{auth.user?.email}</p>
          <Dialog>
            <DialogTrigger>
           
            <Button
              onClick={() => handleSendOtp("EMAIL")}
              >
                Sent OTP
              </Button>
           
              
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader className="">
                <DialogTitle className="px-10 pt-5 text-center">
                  Enter OTP
                </DialogTitle>
              </DialogHeader>
              <div className="py-5 flex gap-10 justify-center items-center">
                <InputOTP
                
                  value={value}
                  onChange={(value) => setValue(value)}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogClose>
                  <Button onClick={()=>handleSubmit(value)} className="w-[10rem]">Submit</Button>
                </DialogClose>
                
              </div>
            </DialogContent>
          </Dialog>
        </div>
        {/* <div className="flex justify-between items-center">
          <p className="">Mobile :</p>
          <p>+918987667899</p>
          
          <Button onClick={() => handleSendOtp("MOBILE")}>Sent OTP</Button>
        </div> */}
      </div>
    </div>
  );
};

export default AccountVarificationForm;
