Table clubs {
  id uuid [pk]
  name text [not null, unique]
  type text [not null, default: 'major', note: 'CHECK candidate: major/general']
  created_at timestamptz [not null, default: `now()`]
}

Table clubs_apply {
  id uuid [pk]
  user_id uuid [not null, ref: > users.id]
  club_id uuid [not null, ref: > clubs.id]
  created_at timestamptz [not null, default: `now()`]

  indexes {
    (user_id, club_id) [unique]
  }
}




Table comment_reactions {
  id uuid [pk]
  comment_id uuid [not null, ref: > post_comments.id]
  user_id uuid [not null, ref: > users.id]
  type text [not null, note: 'CHECK candidate: like/love/laugh/wow/sad/angry']
  created_at timestamptz [not null, default: `now()`]

  Note: '''
  Actual DB migration should add a CHECK constraint for the reaction type.
  '''

  indexes {
    (comment_id, user_id) [unique]
    (comment_id, created_at) [name: 'idx_comment_reactions_comment_created_at']
  }
}

Table message_reactions {
  id uuid [pk]
  message_id uuid [not null, ref: > messages.id]
  user_id uuid [not null, ref: > users.id]
  type text [not null, note: 'CHECK candidate: like/love/laugh/wow/sad/angry']
  created_at timestamptz [not null, default: `now()`]

  indexes {
    (message_id, user_id) [unique]
  }
}


Table gongangs {
  id uuid [pk]
  gongang text [not null, note: 'space identifier']
  owner_id uuid [not null, ref: > users.id]
  week_start date [not null, note: 'week start date']
  day_of_week int2 [not null, note: '0-6']
  hour int2 [not null, note: 'integer hour slot']
  created_at timestamptz [not null, default: `now()`]

  indexes {
    (gongang, week_start, day_of_week, hour) [unique]
  }
}

Table gisangsong {
  id uuid [pk]
  date date [not null]
  number int2 [not null, note: '1 or 2']
  url text [not null]
}