create table towns (
    id SERIAL PRIMARY KEY,
    town text unique,
    town_code text unique
);

create table reg_numbers (
    id SERIAL PRIMARY KEY,
    reg_number text,
    town_code text,
    FOREIGN KEY (town_code) references towns(town_code)
);

insert into towns (town, town_code) values ('Cape Town', 'CA');
insert into towns (town, town_code) values ('Stellenbosch', 'CL');
insert into towns (town, town_code) values ('paarl', 'CJ');