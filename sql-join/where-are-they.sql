select "line1",
        "name",
        "district"
  from "addresses"
  join "cities" using ("cityId");
