use dbPets;

\! echo "Creating table Heroes";

--
-- Heroes
--
create table if not exists tblHeroes (
  `id` int unsigned not null auto_increment,
  `name` varchar(50) not null,

  #
  # keys
  #
  primary key (`id`)
  
) default character set utf8mb4 collate utf8mb4_unicode_ci;

show warnings;
