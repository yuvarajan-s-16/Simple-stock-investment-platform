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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { sendResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});
const ForgotPasswordForm = () => {
  const [verificationType, setVerificationType] = useState("EMAIL");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(
      sendResetPassowrdOTP({ 
        sendTo: data.email, navigate, verificationType })
    );
    console.log("login form", data);
  };
  return (
    <div className="space-y-5">
      <h1 className="text-center text-xl">
        Where do you want to get the code?
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="enter your email"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full bg-slate-400 py-5">
            Send OTP
          </Button>
        </form>
      </Form>

      
    </div>
  );
};

export default ForgotPasswordForm;
