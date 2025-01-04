\c scheduler_db;
-- SELECT table_name
-- FROM information_schema.tables
-- WHERE table_schema = 'public';

-- SELECT serviceables.*
-- FROM serviceables
-- JOIN user_types ON serviceables.serviceable_id = user_types.id
-- WHERE serviceables.serviceable_type = 'user_type';

SELECT "user_types"."id", "user_types"."name", "user_types"."icon", 
       "user_types"."description", "user_types"."visibility", 
       "user_type_services"."id" AS "user_type_services.id", 
       "user_type_services"."name" AS "user_type_services.name", 
       "user_type_services"."description" AS "user_type_services.description"
FROM "public"."user_types" AS "user_types" 
LEFT OUTER JOIN (
  "public"."serviceables" AS "user_type_services->serviceables" 
  INNER JOIN "public"."services" AS "user_type_services" 
  ON "user_type_services"."id" = "user_type_services->serviceables"."service_id" 
  AND "user_type_services->serviceables"."serviceable_type" = 'user_type'
) 
ON "user_types"."id" = "user_type_services->serviceables"."serviceable_id" 
WHERE "user_types"."id" = '1';
