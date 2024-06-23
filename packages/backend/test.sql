
select
  users.id,
  user_logins._tag as login_type,
  user_logins.picture,
  user_logins.display_name,
  user_logins.email,
  user_logins.username,
  users.created,
  users.role

from (

  select
    user_id,
    'google' as _tag,
    profile -> 'picture' as picture,
    profile -> 'displayName' as display_name,
    profile -> 'email' as email,
    null as username
  from google_logins

  union

  select
    user_id,
    'password' as _tag,
    null as picture,
    null as display_name,
    null as email,
    username
  from password_logins

) as user_logins
join users on user_logins.user_id = users.id;