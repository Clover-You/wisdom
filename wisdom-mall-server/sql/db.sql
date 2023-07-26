create database wisdom_mall;

drop table sys_user;
create table sys_user
(
    user_id       bigserial primary key,
    user_name     varchar(30) not null,
    user_account  int         not null unique,
    phone         char(11)    not null,
    user_password char(128)   not null,
    banned        bool      default false,
    avatar        varchar(512),
    create_at     timestamp default current_timestamp,
    update_at     timestamp
);

comment on table sys_user is '用户表';

comment on column sys_user.user_id is '用户id';
comment on column sys_user.user_name is '用户名';
comment on column sys_user.phone is '用户绑定的手机号';
comment on column sys_user.user_account is '系统账户';
comment on column sys_user.user_password is '用户密码';
comment on column sys_user.banned is '是否封号';
comment on column sys_user.avatar is '用户头像';
comment on column sys_user.create_at is '创建时间';
comment on column sys_user.update_at is '修改时间';

create index sys_user_phone_index on sys_user(phone)