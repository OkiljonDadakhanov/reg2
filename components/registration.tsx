"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GeneralInformationSection from "@/components/general-information";
import TeamLeadersSection from "@/components/team-leaders";
import ContestantDetailsSection from "@/components/contestant-details";
import SubmissionSection from "@/components/submission";
import { formSchema } from "@/lib/schema";

export default function RegistrationForm() {
  const [contestantsCount, setContestantsCount] = useState<string>("1");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      delegationName: "",
      teamLeadersCount: "1",
      leaderName: "",
      leaderEmail: "",
      leaderPhone: "",
      leaderRole: "",
      accompanyingPersons: "",
      contestantsCount: "1",
      contestants: [
        {
          name: "",
          dob: new Date(),
          gender: "",
          subject: "",
          passportNumber: "",
          passportExpiry: new Date(),
          tshirtSize: "",
          specialRequirements: "",
        },
      ],
      confirmAccuracy: true,
      agreeToRules: true,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form submitted with values:", values);
    alert("Form submitted successfully!");
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Card className="border-slate-200 shadow-md overflow-hidden">
        <CardHeader className="text-center bg-slate-50 border-b border-slate-100 py-8">
          <CardTitle className="text-3xl font-bold text-slate-800">
            Official Registration Form
          </CardTitle>
          <p className="text-slate-500 mt-2">
            Please complete all required fields accurately
          </p>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
            <CardContent className="p-0">
              <GeneralInformationSection form={form} />
              <TeamLeadersSection form={form} />
              <ContestantDetailsSection
                form={form}
                contestantsCount={contestantsCount}
                setContestantsCountAction={setContestantsCount}
              />
              <SubmissionSection form={form} />

              <div className="bg-slate-50 p-6 border-t border-slate-100">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-medium cursor-pointer"
                >
                  Submit Registration
                </Button>
              </div>
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
