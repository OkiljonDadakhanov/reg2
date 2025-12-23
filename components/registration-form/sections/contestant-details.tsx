"use client"

import { useEffect } from "react"
import type { UseFormReturn } from "react-hook-form"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Upload } from "lucide-react"
import { format } from "date-fns"
import { SectionContainer } from "./section-container"
import { Card, CardContent } from "@/components/ui/card"
import type { formSchema } from "../schema"
import type { z } from "zod"

interface ContestantDetailsSectionProps {
  form: UseFormReturn<z.infer<typeof formSchema>>
  contestantsCount: string
  setContestantsCount: (value: string) => void
}

export default function ContestantDetailsSection({
  form,
  contestantsCount,
  setContestantsCount,
}: ContestantDetailsSectionProps) {
  // Update contestants array when contestantsCount changes
  useEffect(() => {
    const count = Number.parseInt(contestantsCount)
    const currentContestants = form.getValues().contestants || []

    // If we need more contestants, add them
    if (currentContestants.length < count) {
      const newContestants = [...currentContestants]
      for (let i = currentContestants.length; i < count; i++) {
        newContestants.push({
          name: "",
          dob: undefined as any,
          gender: "",
          subject: "",
          passportNumber: "",
          passportExpiry: undefined as any,
          tshirtSize: "",
          specialRequirements: "",
        })
      }
      form.setValue("contestants", newContestants)
    }
    // If we need fewer contestants, remove them
    else if (currentContestants.length > count) {
      form.setValue("contestants", currentContestants.slice(0, count))
    }
  }, [contestantsCount, form])

  return (
    <SectionContainer title="Contestant Details">
      <div className="grid grid-cols-1 gap-6">
        <FormField
          control={form.control}
          name="contestantsCount"
          render={({ field }) => (
            <FormItem className="max-w-xs">
              <FormLabel className="text-slate-700 font-medium">Number of contestants from Chemistry</FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value)
                  setContestantsCount(value)
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="bg-white border-slate-300 h-11">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <div>
            <h3 className="text-slate-700 font-medium">Contestant Information</h3>
            <p className="text-slate-500 text-sm mt-1">For each contestant, the following details must be provided:</p>
          </div>

          {/* Dynamic contestant forms based on contestantsCount */}
          {Array.from({
            length: Number.parseInt(contestantsCount),
          }).map((_, index) => (
            <Card key={index} className="border-slate-200 shadow-sm overflow-hidden">
              <div className="bg-slate-50 px-4 py-3 border-b border-slate-200">
                <h3 className="font-medium text-slate-700">Contestant {index + 1}</h3>
              </div>
              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name={`contestants.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Full Name (as in passport)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter full name" className="bg-white border-slate-300 h-11" {...field} />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contestants.${index}.dob`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-700 font-medium">Date of Birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-white border-slate-300 h-11"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                                {field.value ? format(field.value, "PPP") : "Select date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contestants.${index}.gender`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Gender</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-slate-300 h-11">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contestants.${index}.subject`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Competition Subject</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-slate-300 h-11">
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="math">Math</SelectItem>
                            <SelectItem value="informatics">Informatics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contestants.${index}.passportNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">Passport Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter passport number"
                            className="bg-white border-slate-300 h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`contestants.${index}.passportExpiry`}
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-slate-700 font-medium">Passport Expiry Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal bg-white border-slate-300 h-11"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-slate-500" />
                                {field.value ? format(field.value, "PPP") : "Select date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name={`contestants.${index}.tshirtSize`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 font-medium">T-shirt Size</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white border-slate-300 h-11">
                              <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="xs">XS</SelectItem>
                            <SelectItem value="s">S</SelectItem>
                            <SelectItem value="m">M</SelectItem>
                            <SelectItem value="l">L</SelectItem>
                            <SelectItem value="xl">XL</SelectItem>
                            <SelectItem value="xxl">XXL</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name={`contestants.${index}.specialRequirements`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-700 font-medium">Special Requirements</FormLabel>
                      <FormDescription className="text-slate-500 text-sm">
                        If any, e.g., dietary, medical, allergies, etc.
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Enter special requirements"
                          className="bg-white border-slate-300 min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <h3 className="font-medium text-slate-700 mb-3">File Uploads for Contestant</h3>
                  <div className="space-y-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                    >
                      <Upload className="mr-2 h-4 w-4 text-slate-500" />
                      Upload Passport Scan (PDF/JPG)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                    >
                      <Upload className="mr-2 h-4 w-4 text-slate-500" />
                      Upload ID Photo (JPG/PNG, high quality)
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full bg-white border-slate-300 hover:bg-slate-50 text-slate-700"
                    >
                      <Upload className="mr-2 h-4 w-4 text-slate-500" />
                      Upload Signed Parental Consent Form (for minors, PDF)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

