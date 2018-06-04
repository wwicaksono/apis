create table users
(
	iduser serial not null
		constraint users_pkey
			primary key,
	username varchar(50) not null,
	password varchar(100) not null,
	created_at timestamp not null,
	updated_at timestamp not null
)
;

create unique index users_username_uindex
	on users (username)
;

