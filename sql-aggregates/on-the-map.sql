select "countries"."name",
       count("cities".*) as "numberOfCities"
  from "countries"
  join "cities" using ("countryId")
 group by "countries"."name"
