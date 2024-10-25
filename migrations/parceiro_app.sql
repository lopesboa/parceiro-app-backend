CREATE TABLE IF NOT EXISTS "realms" (
  "application_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" varchar(255) NOT NULL,
  "description" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
);

CREATE TABLE IF NOT EXISTS "users" (
  "user_id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "first_name" varchar(255) NOT NULL,
  "last_name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "password" varchar(255) NOT NULL,
  "application_id" uuid,
  "token_id" uuid,
  "is_verified" boolean DEFAULT false NOT NULL,
  "last_access" timestamp DEFAULT now() NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  KEY "User_email_application_id" ("email"),
  CONSTRAINT "User_email_application_id" PRIMARY KEY("email","application_id")
);


CREATE TABLE IF NOT EXISTS "User" (
	"user_id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"last_name" varchar(256) NOT NULL,
	"application_id" uuid,
	"password" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"login_cookie" varchar(256),
	"access_token" varchar(256),
	"refresh_token" varchar(256),
	"is_email_verified" boolean DEFAULT false NOT NULL
);

CREATE TABLE if not exists "User_Realm" (
    "user_id" uuid NOT NULL,
    "realm_id" uuid NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL,
    PRIMARY KEY ("user_id", "realm_id"),
    CONSTRAINT "User_Realm_user_id" FOREIGN KEY("user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT "User_Realm_realm_id" FOREIGN KEY("realm_id") REFERENCES "realms"("application_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS "user_garage" (
  "garage_id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
   "user_id" uuid NOT NULL,
   "garage_key" int DEFAULT NULL,
   "garage_name" varchar(255) DEFAULT NULL,
   "garage_zip_code" varchar(255) DEFAULT NULL,
   "garage_street" varchar(255) DEFAULT NULL,
   "garage_number" varchar(255) DEFAULT NULL,
   "garage_complement" varchar(255) DEFAULT NULL,
   "garage_district" varchar(255) DEFAULT NULL,
   "garage_city" varchar(255) DEFAULT NULL,
   "garage_state" varchar(2) DEFAULT NULL,
   "garage_country" varchar(255) DEFAULT NULL,
   "garage_thumb" varchar(255) DEFAULT NULL,
   "garage_description" text,
   "garage_status" boolean DEFAULT false NOT NULL,,
   "created_at" timestamp DEFAULT now() NOT NULL,
   "updated_at" timestamp DEFAULT now() NOT NULL,
   CONSTRAINT "User_id_garage" FOREIGN KEY("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
   );

   create table if not exists "roles" (
	"role_id" uuid default gen_random_uuid() not null unique,
	"name" varchar(256) not null,
	"application_id" uuid,
	"permissions" text[],
	"created_at" timestamp default now() not null,
	"updated_at" timestamp default now() not null,
	constraint "Roles_name_application_id" primary key("name", "application_id"),
	constraint "Roles_application_id_Applications_application_id_fk" foreign key ("application_id") references "realms"("application_id") on delete cascade on update no action
);

create table if not exists "users_to_roles" (
	"application_id" uuid not null,
	"role_id" uuid not null,
	"user_id" uuid not null,
	constraint "UsersToRoles_application_id_role_id_user_id" primary key("application_id","role_id","user_id"),
	constraint "UsersToRoles_application_id_Applications_application_id_fk" foreign key ("application_id") references "realms"("application_id") on delete cascade on update no action,
	constraint "UsersToRoles_role_id_Roles_role_id_fk" foreign key("role_id") references "roles"("role_id") on delete cascade on update no action,
	constraint "UsersToRoles_user_id_User_user_id_fk" foreign key ("user_id") references "users"("user_id") on delete cascade on update no action
);





CREATE TABLE IF NOT EXISTS "profile" (
  "profile_id" uuid DEFAULT gen_random_uuid() NOT NULL,
  "user_id" uuid NOT NULL,
  "birth_date" date DEFAULT NULL,
  "gender" varchar(255) DEFAULT NULL,
  "phone" varchar(255) DEFAULT NULL,
  "thumb" varchar(255) DEFAULT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  " updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "Profile_user_id" PRIMARY KEY("profile_id", "user_id"),
  CONSTRAINT "Profile_user_id" FOREIGN KEY("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS "user_address" (
  "user_id" uuid NOT NULL,
  "address_id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  "address_key" int(11) DEFAULT NULL,
  "address_name" varchar(255) DEFAULT NULL,
  "address_zip_code" varchar(255) DEFAULT NULL,
  "address_street" varchar(255) DEFAULT NULL,
  "address_number" varchar(255) DEFAULT NULL,
  "address_complement" varchar(255) DEFAULT NULL,
  "address_district" varchar(255) DEFAULT NULL,
  "address_city" varchar(255) DEFAULT NULL,
  "address_state" varchar(2) DEFAULT NULL,
  "address_country" varchar(255) DEFAULT NULL,
  CONSTRAINT "User_id_address" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS "user_cars" (
  "car_id" uuid DEFAULT gen_random_uuid() NOT NULL  PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "car_key" int DEFAULT NULL,
  "car_brand" varchar(255) DEFAULT NULL,
  "car_name" varchar(255) DEFAULT NULL,
  "car_model" varchar(255) DEFAULT NULL,
  "car_year" varchar(255) DEFAULT NULL,
  "car_color" varchar(255) DEFAULT NULL,
  "car_plate" varchar(255) DEFAULT NULL,
  "car_fuel" varchar(255) DEFAULT NULL,
  "car_image" varchar(255) DEFAULT NULL,
  "car_km" varchar(255) DEFAULT NULL,
  "car_price" varchar(255) DEFAULT NULL,
  "car_status" varchar(255) DEFAULT NULL,
  "car_created_at" timestamp DEFAULT now() NOT NULL,
  "car_updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "User_id_car" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
);

-- Add token to the table when user verify his email
CREATE TABLE IF NOT EXISTS "user_token" (
  "token_id" uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
  "user_id" uuid NOT NULL,
  "refresh_token" varchar(255) NOT NULL,
  "access_token" varchar(255) NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "is_active" boolean DEFAULT true NOT NULL,
  CONSTRAINT "User_access_and_refresh_token" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE ON UPDATE NO ACTION
);
