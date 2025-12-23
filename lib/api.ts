import type { FormValues } from "./form-schema";
import axios from "axios";

export interface Country {
  id: number;
  name: string;
}

// Fetch countries from the API
export async function fetchCountries(): Promise<Country[]> {
  try {
    const { data } = await axios.get(
      "https://api.olympcenter.uz/api/countries"
    );
    // Handle paginated response format: { count, next, previous, results: [...] }
    if (data && typeof data === 'object') {
      if (Array.isArray(data.results)) {
        let allCountries = [...data.results];
        // Fetch remaining pages if there are more
        let nextUrl = data.next;
        while (nextUrl) {
          const { data: nextData } = await axios.get(nextUrl);
          if (Array.isArray(nextData.results)) {
            allCountries = [...allCountries, ...nextData.results];
            nextUrl = nextData.next;
          } else {
            break;
          }
        }
        return allCountries;
      }
      // Fallback: check if data is directly an array
      if (Array.isArray(data)) {
        return data;
      }
      // Handle other nested formats
      if (Array.isArray(data.data)) {
        return data.data;
      }
      if (Array.isArray(data.countries)) {
        return data.countries;
      }
    }
    console.warn("Unexpected API response format:", data);
    return [];
  } catch (error) {
    console.error("Error fetching countries:", error);
    return [];
  }
}
// Submit registration form
export async function submitRegistration(formData: FormData): Promise<unknown> {
  try {
    const response = await fetch(
      "https://api.olympcenter.uz/api/detailed-registrations/",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting registration:", error);
    throw error;
  }
}

// Helper function to prepare form data for API submission
export function prepareFormData(values: FormValues): FormData {
  const formData = new FormData();

  // Add basic registration data
  formData.append("country", values.country);
  formData.append("official_delegation_name", values.official_delegation_name);
  formData.append(
    "total_accompanying_persons",
    values.total_accompanying_persons
  );
  formData.append("confirm_information", values.confirm_information.toString());
  formData.append("agree_rules", values.agree_rules.toString());

  // Add team leaders
  values.team_leaders.forEach((leader, index) => {
    formData.append(`team_leaders[${index}][full_name]`, leader.full_name);
    formData.append(`team_leaders[${index}][email]`, leader.email);
    formData.append(
      `team_leaders[${index}][phone_number]`,
      leader.phone_number
    );
    formData.append(`team_leaders[${index}][role]`, leader.role);

    if (leader.passport_scan instanceof File) {
      formData.append(
        `team_leaders[${index}][passport_scan]`,
        leader.passport_scan
      );
    }

    if (leader.id_photo instanceof File) {
      formData.append(`team_leaders[${index}][id_photo]`, leader.id_photo);
    }
  });

  // Add contestants
  values.contestants.forEach((contestant, index) => {
    formData.append(`contestants[${index}][full_name]`, contestant.full_name);

    if (contestant.date_of_birth) {
      formData.append(
        `contestants[${index}][date_of_birth]`,
        contestant.date_of_birth.toISOString().split("T")[0]
      );
    }

    formData.append(`contestants[${index}][gender]`, contestant.gender);
    formData.append(
      `contestants[${index}][competition_subject]`,
      contestant.competition_subject
    );
    formData.append(
      `contestants[${index}][passport_number]`,
      contestant.passport_number
    );

    if (contestant.passport_expiry_date) {
      formData.append(
        `contestants[${index}][passport_expiry_date]`,
        contestant.passport_expiry_date.toISOString().split("T")[0]
      );
    }

    formData.append(
      `contestants[${index}][t_shirt_size]`,
      contestant.t_shirt_size
    );

    if (contestant.special_requirements) {
      formData.append(
        `contestants[${index}][special_requirements]`,
        contestant.special_requirements
      );
    }

    if (contestant.passport_scan instanceof File) {
      formData.append(
        `contestants[${index}][passport_scan]`,
        contestant.passport_scan
      );
    }

    if (contestant.id_photo instanceof File) {
      formData.append(`contestants[${index}][id_photo]`, contestant.id_photo);
    }

    if (contestant.parental_consent_form instanceof File) {
      formData.append(
        `contestants[${index}][parental_consent_form]`,
        contestant.parental_consent_form
      );
    }
  });

  return formData;
}
