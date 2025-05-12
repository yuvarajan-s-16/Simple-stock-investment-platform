import { Input } from "@/components/ui/input";
// import "./Login.css";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
import { yupResolver } from "@hookform/resolvers/yup";
// import { z } from "zod";
import { useDispatch } from "react-redux";
import { verifyResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import * as yup from "yup";

const formSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords & Confirm Password must match")
    .min(8, "Password must be at least 8 characters long")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .required("OTP is required"),
});
const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useParams();
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      otp: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(
      verifyResetPassowrdOTP({ otp: data.otp, password: data.password,session , navigate})
    );
    console.log("login form", data);
  };
  return (
    <div className={`loginContainer h-screen flex justify-center items-center `}>
      <Card
        className={`box flex flex-col items-center justify-center p-10 h-[35rem] w-[30rem] border `}
      >
        <div className="space-y-5 w-full">
          <h1 className="text-center text-xl pb-5">Reset Your Password</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <h1 className="pb-2">Verify OTP</h1>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP {...field} maxLength={6}>
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
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <h1 className="pt-7 pb-2">Change Password</h1>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="border w-full border-gray-700 py-5 px-5"
                        placeholder="new password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        className="border w-full border-gray-700 py-5 px-5"
                        placeholder="confirm password..."
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full py-5">
                Change Password
              </Button>
            </form>
          </Form>

          {/* <div className="flex items-center justify-center">
              <span>already have account ? </span>
              <Button variant="ghost">signup</Button>
            </div> */}
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
