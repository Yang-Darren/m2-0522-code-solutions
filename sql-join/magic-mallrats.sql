select "firstName",
        "lastName"
  from "customers"
  join "stores" using ("storeId")
  join "inventory" using ("storeId")
  join "films" using ("filmId")
  where "films"."title" = 'Magic Mallrats';
