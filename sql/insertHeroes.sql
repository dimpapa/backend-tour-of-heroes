use dbPets;

\! echo "Inserting data into table Heroes";

--
-- Insert data in table Heroes
--
insert into tblHeroes (`id`, `name`) values
    ( 12, 'Dr. Nice' ),
    ( 13, 'Bombasto' ),
    ( 14, 'Celeritas' ),
    ( 15, 'Magneta' ),
    ( 16, 'RubberMan' ),
    ( 17, 'Dynama' ),
    ( 18, 'Dr. IQ' ),
    ( 19, 'Magma' ),
    ( 20, 'Tornado' );

\! echo "Data in tblHeroes"
select `id`, `name` from tblHeroes;
