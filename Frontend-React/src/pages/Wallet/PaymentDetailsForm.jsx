import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { addPaymentDetails } from "@/Redux/Withdrawal/Action";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
  accountHolderName: yup.string().required("Account holder name is required"),
  ifscCode: yup.string().length(11, "IFSC code must be 11 characters"),
  accountNumber: yup.string().required("Account number is required"),
  confirmAccountNumber: yup.string().test({
    name: "match",
    message: "Account numbers do not match",
    test: function (value) {
      return value === this.parent.accountNumber;
    },
  }),
  bankName: yup.string().required("Bank name is required"),
});

const PaymentDetailsForm = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      bankName: "",
    },
  });
  const onSubmit = (data) => {
    dispatch(
      addPaymentDetails({
        paymentDetails: data,
        jwt: localStorage.getItem("jwt"),
      })
    );
    console.log("payment details form", data);
  };
  return (
    <div className="px-10 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <Label>Account holder name</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Kaluru Anirudh"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <Label>IFSC Code</Label>
                <FormControl>
                  <Input
                    {...field}
                    name="ifsc"
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="YESB0000009"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            type="password"
            render={({ field }) => (
              <FormItem>
                <Label>Account Number</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="*********5602"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <Label>Confirm Account Number</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="Confirm Account Number"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <Label>Bank Name</Label>
                <FormControl>
                  <Input
                    {...field}
                    className="border w-full border-gray-700 py-5 px-5"
                    placeholder="YES Bank"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {!auth.loading ? (
            <Button type="submit" className="w-full  py-5">
              SUBMIT
            </Button>
          ) : (
            <Skeleton className="w-full py-5" />
          )}
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
