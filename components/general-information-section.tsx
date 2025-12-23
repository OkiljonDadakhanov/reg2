"use client"
import type { UseFormReturn } from "react-hook-form"

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionContainer } from "@/components/section-container"
import type { FormValues } from "@/lib/form-schema"
import type { Country } from "@/lib/api"

interface GeneralInformationSectionProps {
  form: UseFormReturn<FormValues>
  countries: Country[]
}

export function GeneralInformationSection({
  form,
  countries,
}: GeneralInformationSectionProps) {
  return (
    <SectionContainer title="General Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">Country</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white border-slate-300 h-11">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.isArray(countries) && countries.map((country) => (
                    <SelectItem key={country.id} value={country.id.toString()}>
                      {country.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="official_delegation_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-700 font-medium">
                Official Delegation Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter delegation name"
                  className="bg-white border-slate-300 h-11"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
      </div>
    </SectionContainer>
  )
}
