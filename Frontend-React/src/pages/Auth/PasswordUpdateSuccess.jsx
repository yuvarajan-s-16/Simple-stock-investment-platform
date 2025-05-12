import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCheckIcon, CheckCircle, CheckIcon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const PasswordUpdateSuccess = () => {
    const navigate=useNavigate();
  return (
    <div className=" h-screen flex flex-col justify-center items-center">
      <Card className="p-10 flex flex-col justify-center items-center w-[20rem] h-[20rem]">
        <CheckCircle className="text-green-600 h-20 w-20" />
        <p className="pt-5 text-xl font-semibold">Password Changed !</p>
        <p className="py-2 pb-5 text-gray-400 text-center">your password has been changed successfully</p>
        <Button onClick={()=>navigate("/")} className="w-full">
            Go To Login
        </Button>
      </Card>
    </div>
  );
};

export default PasswordUpdateSuccess;
