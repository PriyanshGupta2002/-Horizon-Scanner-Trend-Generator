"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { BASE_URL, trends } from "@/lib/constants";
import axios from "axios";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
const formSchema = z.object({
  geography: z.string({
    required_error: "Geography is required",
  }),
  dept: z.string({
    required_error: "Department name is required",
  }),
  dept_invloved_in: z.string({
    required_error: "Work Department Involved in is required.",
  }),
  Trends: z.string({
    required_error: "Trend is required",
  }),

  additional_details: z.string().optional(),
  no_of_gen: z.number().min(2).optional(),
  email: z.string().email(),
  filename: z.string().optional(),
  attachments: z.array(z.instanceof(File)).optional(),
});

const TrendForm = () => {
  const router = useRouter();

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      no_of_gen: 2,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const apiData = {
        Trends: values.Trends,
        filename:
          values.filename ||
          `${values.geography}_${values.dept}_${values.Trends}`,
        no_of_gen: values.no_of_gen || 2,
        email: values.email,
        dept: values.dept,
        additional_details: values.additional_details,
        geography: values.geography,
      };
      await axios.post(`${BASE_URL}/limited_generate`, apiData);
      form.reset();
      form.resetField("Trends", { defaultValue: "" });
      toast({
        title:
          "We will email you shortly. Once the processing is completed, you can either click the link in the email or download it directly from the listing to retrieve the trend.",
        variant: "success",
      });
      form.reset();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title: "Some error occured! Please try again",
        variant: "destructive",
      });
    }
  }

  const [fileLength, setFileLength] = useState<string>("");

  return (
    <Form {...form}>
      <div className="text-darkBlack700 pl-5 w-1/3 font-semibold text-2xl mt-3">
        Just a Few Inputs Away From Generating Your Strategy Hub
      </div>
      <div className="p-6 mt-7 rounded-md space-y-4 bg-[#F4F6FC] w-full max-w-4xl">
        <h1 className="text-sm font-medium">
          To generate a Trend, provide us with some basic details:
        </h1>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 rounded-lg p-4 text-sm bg-[#FFFFFF] shadow-md"
        >
          <FormField
            control={form.control}
            name="geography"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 relative text-[#808080] ">
                  What Geography are you looking for?
                  <span className="text-rose-500 absolute -top-1 -right-2">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dept"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 relative text-[#808080]">
                  Your Department
                  <span className="text-rose-500 absolute -top-1 -right-2">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dept_invloved_in"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 relative text-[#808080]">
                  Work Department Involved In
                  <span className="text-rose-500 absolute -top-1 -right-2">
                    *
                  </span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Trends"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 text-[#808080]">
                  Select a trend
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  dir="ltr"
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a trend" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={"none"}>{"None"}</SelectItem>
                    {trends.map((item, idx) => (
                      <SelectItem key={idx} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="additional_details"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 text-[#808080]">
                  Any other details
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="attachments"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  htmlFor="files"
                  className="text-sm pl-1 flex flex-col text-[#808080]"
                >
                  Provide attachments if any
                  <div className="w-32 mt-3 bg-lightWhite400 p-2 text-center rounded-md">
                    + Attach {fileLength?.length}
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf"
                    multiple
                    id="files"
                    className="h-0 w-0 p-0"
                    onChange={(e) => {
                      if (!e.target.files) {
                        return;
                      }
                      const files = Array.from(e.target.files);
                      const oldFiles = form.getValues("attachments");
                      const newFiles = [...files, ...(oldFiles || [])];
                      console.log(newFiles.length.toString());
                      setFileLength(newFiles.length.toString());

                      field.onChange(newFiles);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_of_gen"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 text-[#808080]">
                  No of generations
                </FormLabel>
                <FormControl>
                  <Input min={2} type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 text-[#808080]">
                  Receipent Email Id
                </FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="filename"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm pl-1 text-[#808080]">
                  Preferred File Name
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" variant={"primary"}>
            Generate
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default TrendForm;
