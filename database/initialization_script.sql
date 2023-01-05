
-- Insert settings
insert into "Settings" ("Id", "Name", "Definition", "Type", "DefaultValue")
values
(gen_random_uuid(), 'line-height', 'line height', 0, '1.5'),
(gen_random_uuid(), 'text-color', 'color of texts', 0, 'black'),
(gen_random_uuid(), 'navbar-location', 'location of navbar', 0, 'up'),
(gen_random_uuid(), 'header-color', 'color of headers', 0, 'black'),
(gen_random_uuid(), 'bg-color', 'background color', 0, 'white'),
(gen_random_uuid(), 'word-spacing', 'word spacing', 0, '0em'),
(gen_random_uuid(), 'complementary-color', 'complementary color', 0, '#e5e5e5'),
(gen_random_uuid(), 'font-family', 'font family', 0, 'helvetica'),
(gen_random_uuid(), 'font-size-multiplier', 'multiplier of default font size', 0, '1'),
(gen_random_uuid(), 'letter-spacing', 'letter spacing', 0, '0em'),
(gen_random_uuid(), 'page-selector-type', 'type of page selector', 0, 'numbers')
;

-- Insert settings values
-- Background color
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'black', 'black', (select "Id" from "Settings" as settings where settings."Name" = 'bg-color')),
(gen_random_uuid(), 'white', 'white', (select "Id" from "Settings" as settings where settings."Name" = 'bg-color'));

-- Text color
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'black', 'black', (select "Id" from "Settings" as settings where settings."Name" = 'text-color')),
(gen_random_uuid(), 'white', 'white', (select "Id" from "Settings" as settings where settings."Name" = 'text-color'));

-- Header color
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'black', 'black', (select "Id" from "Settings" as settings where settings."Name" = 'header-color')),
(gen_random_uuid(), 'white', 'white', (select "Id" from "Settings" as settings where settings."Name" = 'header-color'));

-- font family
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'Arial', 'arial', (select "Id" from "Settings" as settings where settings."Name" = 'font-family')),
(gen_random_uuid(), 'Verdana', 'verdana', (select "Id" from "Settings" as settings where settings."Name" = 'font-family')),
(gen_random_uuid(), 'Georgia', 'georgia', (select "Id" from "Settings" as settings where settings."Name" = 'font-family'));

-- navbar location
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'top', 'up', (select "Id" from "Settings" as settings where settings."Name" = 'navbar-location')),
(gen_random_uuid(), 'left', 'left', (select "Id" from "Settings" as settings where settings."Name" = 'navbar-location')),
(gen_random_uuid(), 'right', 'right', (select "Id" from "Settings" as settings where settings."Name" = 'navbar-location'));

-- Font size
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'Smallest', '0.25', (select "Id" from "Settings" as settings where settings."Name" = 'font-size-multiplier')),
(gen_random_uuid(), 'Smaller', '0.5', (select "Id" from "Settings" as settings where settings."Name" = 'font-size-multiplier')),
(gen_random_uuid(), 'Small', '0.75', (select "Id" from "Settings" as settings where settings."Name" = 'font-size-multiplier')),
(gen_random_uuid(), 'Default', '1', (select "Id" from "Settings" as settings where settings."Name" = 'font-size-multiplier')),
(gen_random_uuid(), 'Big', '1.25', (select "Id" from "Settings" as settings where settings."Name" = 'font-size-multiplier')),
(gen_random_uuid(), 'Bigger', '1.5', (select "Id" from "Settings" as settings where settings."Name" = 'font-size-multiplier')),
(gen_random_uuid(), 'Biggest', '1.75', (select "Id" from "Settings" as settings where settings."Name" = 'font-size-multiplier'));

-- Complementary color
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'black', 'black', (select "Id" from "Settings" as settings where settings."Name" = 'complementary-color')),
(gen_random_uuid(), 'white', 'white', (select "Id" from "Settings" as settings where settings."Name" = 'complementary-color'));

-- Letter spacing
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'small', '-0.25em', (select "Id" from "Settings" as settings where settings."Name" = 'letter-spacing')),
(gen_random_uuid(), 'medium', '0em', (select "Id" from "Settings" as settings where settings."Name" = 'letter-spacing')),
(gen_random_uuid(), 'big', '0.25em', (select "Id" from "Settings" as settings where settings."Name" = 'letter-spacing'));

-- Word spacing
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'small', '-0.25em', (select "Id" from "Settings" as settings where settings."Name" = 'word-spacing')),
(gen_random_uuid(), 'medium', '0em', (select "Id" from "Settings" as settings where settings."Name" = 'word-spacing')),
(gen_random_uuid(), 'big', '0.25em', (select "Id" from "Settings" as settings where settings."Name" = 'word-spacing'));

-- Line height
insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
values
(gen_random_uuid(), 'small', '1', (select "Id" from "Settings" as settings where settings."Name" = 'line-height')),
(gen_random_uuid(), 'medium', '1.5', (select "Id" from "Settings" as settings where settings."Name" = 'line-height')),
(gen_random_uuid(), 'big', '2', (select "Id" from "Settings" as settings where settings."Name" = 'line-height'));
