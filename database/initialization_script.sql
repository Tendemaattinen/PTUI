
-- SETTINGS --
insert into "Settings" ("Id", "Name", "Definition", "Type", "DefaultValue")
values
(gen_random_uuid(), 'line-height', 'line height', 0, '1.5'),
(gen_random_uuid(), 'text-color', 'color of texts', 0, 'black'),
(gen_random_uuid(), 'navbar-location', 'location of navbar', 0, 'up'),
(gen_random_uuid(), 'header-color', 'color of headers', 0, 'black'),
(gen_random_uuid(), 'bg-color', 'background color', 0, 'white'),
(gen_random_uuid(), 'word-spacing', 'word spacing', 0, '0em'),
(gen_random_uuid(), 'complementary-color', 'complementary color', 0, '#e5e5e5'),
(gen_random_uuid(), 'font-family', 'font family', 0, 'arial'),
(gen_random_uuid(), 'font-size-multiplier', 'multiplier of default font size', 0, '1'),
(gen_random_uuid(), 'letter-spacing', 'letter spacing', 0, '0em'),
(gen_random_uuid(), 'page-selector-type', 'type of page selector', 0, 'numbers')
;

-- SETTING VALUES --
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

-- QUESTIONS --

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'color', 'Color');

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'saturation', 'Saturation');

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'font', 'Font');

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'font-size', 'Font size');

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'navbar-location', 'Location of the navigation bar');

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'page-selector-type', 'Type of the page selector');

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'text-color', 'Color of the text');


-- QUESTION ANSWERS --

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'color'), 'blue', 'Blue', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'color'), 'red', 'Red', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'color'), 'green', 'Green', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'saturation'), 'colorful', 'Colorful', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'saturation'), 'medium', 'Medium', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'saturation'), 'colorless', 'Colorless', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'font'), 'arial', 'Arial', 'data:image/png;base64,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');

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'font'), 'times', 'Times New Roman', 'data:image/png;base64,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');

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'font'), 'calibri', 'Calibri', 'data:image/png;base64,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');

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'font-size'), 'small', 'Small', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'font-size'), 'default', 'Default', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'font-size'), 'big', 'Big', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'navbar-location'), 'top', 'Top', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'navbar-location'), 'left', 'Left', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'navbar-location'), 'right', 'Right', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'page-selector-type'), 'command-line', 'Command line', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'page-selector-type'), 'numbers', 'Numbers', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'page-selector-type'), 'arrows', 'Arrows', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'text-color'), 'black', 'Black', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'text-color'), 'white', 'White', null);


-- Dynamic Personalization

-- bg-color hue
insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'blue' AND PQ."Name" = 'color'),
    'css', 'color', 'hue', 'bg-color', '240', '120', '0');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'red' AND PQ."Name" = 'color'),
    'css', 'color', 'hue', 'bg-color', '0', '120', '240');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'green' AND PQ."Name" = 'color'),
    'css', 'color', 'hue', 'bg-color', '120', '240', '0');

-- bg-color saturation
insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'colorful' AND PQ."Name" = 'saturation'),
    'css', 'color', 'saturation', 'bg-color', '50', '70', '80');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'medium' AND PQ."Name" = 'saturation'),
    'css', 'color', 'saturation', 'bg-color', '70', '80', '50');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'colorless' AND PQ."Name" = 'saturation'),
    'css', 'color', 'saturation', 'bg-color', '80', '70', '50');


-- nav-bar
insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'top' AND PQ."Name" = 'navbar-location'),
    'navbar', null, null, null, 'top', 'left', 'right');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'left' AND PQ."Name" = 'navbar-location'),
    'navbar', null, null, null, 'left', 'right', 'top');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'right' AND PQ."Name" = 'navbar-location'),
    'navbar', null, null, null, 'right', 'left', 'top');

-- page selector
insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'command-line' AND PQ."Name" = 'page-selector-type'),
    'pageSelector', null, null, null, 'command-line', 'arrows', 'numbers');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'numbers' AND PQ."Name" = 'page-selector-type'),
    'pageSelector', null, null, null, 'numbers', 'arrows', 'command-line');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'arrows' AND PQ."Name" = 'page-selector-type'),
    'pageSelector', null, null, null, 'arrows', 'numbers', 'command-line');

-- font
insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'arial' AND PQ."Name" = 'font'),
    'css', 'font-family', null, 'font-family', 'arial', 'times', 'calibri');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'calibri' AND PQ."Name" = 'font'),
    'css', 'font-family', null, 'font-family', 'calibri', 'arial', 'times');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'times' AND PQ."Name" = 'font'),
    'css', 'font-family', null, 'font-family', 'times', 'calibri', 'arial');

-- font size
insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'small' AND PQ."Name" = 'font-size'),
    'css', 'font-size-multiplier', null, 'font-size-multiplier' , '0.75', '1', '1.25');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'default' AND PQ."Name" = 'font-size'),
    'css', 'font-size-multiplier', null, 'font-size-multiplier', '1', '1.25', '0.75');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'big' AND PQ."Name" = 'font-size'),
    'css', 'font-size-multiplier', null, 'font-size-multiplier', '1.25', '1', '0.75');


-- text color
insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'white' AND PQ."Name" = 'text-color'),
    'css', 'text-color', null, 'text-color', 'white', 'white', 'black');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'black' AND PQ."Name" = 'text-color'),
    'css', 'text-color', null, 'text-color', 'black', 'black', 'white');


-- Letter spacing
insert into "Settings" ("Id", "Name", "Definition", "Type", "DefaultValue")
values
(gen_random_uuid(), 'letter-spacing', 'letter spacing', 0, '0');

-- insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
-- values
-- (gen_random_uuid(), 'black', 'black', (select "Id" from "Settings" as settings where settings."Name" = 'bg-color')),
-- (gen_random_uuid(), 'white', 'white', (select "Id" from "Settings" as settings where settings."Name" = 'bg-color'));

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'letter-spacing', 'Letter spacing');

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'letter-spacing'), 'default', 'Default', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'letter-spacing'), 'big', 'Big', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'letter-spacing'), 'bigger', 'Bigger', null);

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'default' AND PQ."Name" = 'letter-spacing'),
    'css', 'letter-spacing', null, 'letter-spacing-var', '0', '0.1', '0.2');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'big' AND PQ."Name" = 'letter-spacing'),
    'css', 'letter-spacing', null, 'letter-spacing-var', '0.1', '0', '0.2');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'bigger' AND PQ."Name" = 'letter-spacing'),
    'css', 'letter-spacing', null, 'letter-spacing-var', '0.2', '0.1', '0');


-- Word spacing
insert into "Settings" ("Id", "Name", "Definition", "Type", "DefaultValue")
values
(gen_random_uuid(), 'word-spacing', 'word spacing', 0, '0');

-- insert into "SettingValues" ("Id", "Name", "Value", "SettingId")
-- values
-- (gen_random_uuid(), 'black', 'black', (select "Id" from "Settings" as settings where settings."Name" = 'bg-color')),
-- (gen_random_uuid(), 'white', 'white', (select "Id" from "Settings" as settings where settings."Name" = 'bg-color'));

insert into "PersonalizationQuestions" ("Id", "Name", "Text")
values (gen_random_uuid(), 'word-spacing', 'Word spacing');

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'word-spacing'), 'default', 'Default', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'word-spacing'), 'big', 'Big', null);

insert into "PersonalizationQuestionAnswers" ("Id", "QuestionId", "Name", "Text", "Image")
values (gen_random_uuid(), (SELECT "Id" FROM "PersonalizationQuestions" AS PQ WHERE PQ."Name" = 'word-spacing'), 'bigger', 'Bigger', null);

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'default' AND PQ."Name" = 'word-spacing'),
    'css', 'word-spacing', null, 'word-spacing-var', '0', '0.1', '0.2');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'big' AND PQ."Name" = 'word-spacing'),
    'css', 'word-spacing', null, 'word-spacing-var', '0.1', '0', '0.2');

insert into "DynamicPersonalizations" ("Id", "AnswerId", "Type", "SubType", "SubSubType", "Target", "BestValue", "AverageValue", "WorstValue")
values 
    (gen_random_uuid(), 
    (SELECT PQA."Id" FROM "PersonalizationQuestionAnswers" AS PQA 
        INNER JOIN "PersonalizationQuestions" AS PQ ON PQA."QuestionId" = PQ."Id" 
        WHERE PQA."Name" = 'bigger' AND PQ."Name" = 'word-spacing'),
    'css', 'word-spacing', null, 'word-spacing-var', '0.2', '0.1', '0');
