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
import { Card } from "./ui/card";
const formSchema = z.object({
  geography: z.string({}),
  dept: z.string(),
  Trends: z.string(),
  additional_details: z.string().optional(),
  no_of_gen: z.number().min(2).optional(),
  email: z.string().email(),
  filename: z.string().optional(),
});
const TrendForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      geography: "",
      additional_details: "",
      dept: "",
      email: "",
      filename: "",
      no_of_gen: 2,
      Trends: "",
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

  return (
    <div className="w-full p-5">
      <h2 className="my-8 text-2xl font-bold w-[30%]">Just Few Inputs Away From Generating your Strategy Hub</h2>
      <Form {...form}>
        <div className="p-6 rounded-md space-y-4 bg-[#e9eefd]">
          <h1 className="text-md font-semibold">
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
                  <FormLabel className="text-smpl-1 font-semibold">
                    What Geography Are You Looking After?
                  </FormLabel>
                  <FormControl className="bg-gray-100 hover:bg-gray-200">
                    <Input placeholder="Input" {...field} />
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
                  <FormLabel className="text-smpl-1 font-semibold">
                    Your Department
                  </FormLabel>
                  <FormControl className="bg-gray-100 hover:bg-gray-200">
                    <Input placeholder="Input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-smpl-1 font-semibold">
                    Any Other Details
                  </FormLabel>
                  <FormControl className="bg-gray-100 hover:bg-gray-200">
                    <Input placeholder="Provide Details" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="additional_details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-smpl-1 font-semibold">
                    Preferred Filename
                  </FormLabel>
                  <FormControl className="bg-gray-100 hover:bg-gray-200">
                    <Input placeholder="Provide Preferred Filename" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="Trends"
              render={({ field }) => (
                <div className="flex flex-col">
                  <FormLabel className="text-smpl-1 font-semibold">
                    Select Data To Be Generated
                  </FormLabel>
                  <div className="flex pt-3">
                    <Card className="w-[50%] p-8">
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl className="bg-gray-100 hover:text-blue-600 hover:border-blue-600 hover:font-bold">
                            <SelectTrigger>
                              <SelectValue placeholder="Choose Generate Trend" />
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
                    </Card>
                  </div>
                </div>
              )}
            />
            {/* <FormField
              control={form.control}
              name="no_of_gen"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-smpl-1 text-[#808080]">
                    No of generations
                  </FormLabel>
                  <FormControl>
                    <Input min={2} type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-smpl-1 text-[#808080]">
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
                  <FormLabel className="text-smpl-1 text-[#808080]">
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
    </div>
  );
};

export default TrendForm;
