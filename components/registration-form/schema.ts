import { z } from "zod"

// Define the contestant schema
export const contestantSchema = z.object({
  name: z.string().min(1, "Contestant name is required"),
  dob: z.date({ required_error: "Date of birth is required" }),
  gender: z.string().min(1, "Gender is required"),
  subject: z.string().min(1, "Subject is required"),
  passportNumber: z.string().min(1, "Passport number is required"),
  passportExpiry: z.date({
    required_error: "Passport expiry date is required",
  }),
  tshirtSize: z.string().min(1, "T-shirt size is required"),
  specialRequirements: z.string().optional(),
})

// Define the form schema
export const formSchema = z.object({
  country: z.string().min(1, "Country is required"),
  delegationName: z.string().min(1, "Delegation name is required"),
  leaderName: z.string().min(1, "Team leader name is required"),
  leaderEmail: z.string().email("Invalid email address"),
  leaderPhone: z.string().min(1, "Phone number is required"),
  accompanyingPersons: z.string().min(1, "Number of persons is required"),
  contestantsCount: z.string().min(1, "Number of contestants is required"),
  contestants: z.array(contestantSchema),
  confirmAccuracy: z.boolean().refine((val) => val === true, {
    message: "You must confirm the information is accurate",
  }),
  agreeToRules: z.boolean().refine((val) => val === true, {
    message: "You must agree to the rules",
  }),
})

