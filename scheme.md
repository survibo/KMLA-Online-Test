Table users {
  id uuid [pk]
  name text [not null, note: 'initial display name from OAuth profile']
  role text [not null, default: 'user', note: 'CHECK candidate: user/admin']
  student_number int4 [null]
  class_no int2 [null, note: 'class number']
  grade int2 [null, note: 'school year']
  gender text [null, note: 'CHECK candidate: male/female']
  phone_number text [null]
  img text [null, note: 'avatar url']
  birthday date [null]
  description text [null]
  status text [not null, default: 'none', note: 'CHECK candidate: none/pending/accepted/rejected']
  room int2 [null]
  created_at timestamptz [not null, default: `now()`]
}

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

Table groups {
  id uuid [pk]
  name text [not null, note: 'official-only unique vs global unique should be decided']
  description text [null]
  is_official boolean [not null, default: false]
  is_personal boolean [not null, default: false, note: 'personal group can be auto-created when account is created']
  created_at timestamptz [not null, default: `now()`]
}

Table group_members {
  group_id uuid [not null, ref: > groups.id]
  user_id uuid [not null, ref: > users.id]
  role text [not null, default: 'member', note: 'CHECK candidate: owner/admin/member']
  noti text [not null, default: 'all', note: 'CHECK candidate: none/default/all']
  joined_at timestamptz [not null, default: `now()`]

  indexes {
    (group_id, user_id) [pk]
  }
}

Table posts {
  id uuid [pk]
  group_id uuid [not null, ref: > groups.id]
  author_id uuid [not null, ref: > users.id]
  title text [null]
  content text [null]
  comment_count int4 [not null, default: 0, note: 'cached count; API must define whether replies are included']
  reaction_count int4 [not null, default: 0, note: 'cached count from post_reactions']
  created_at timestamptz [not null, default: `now()`]
  updated_at timestamptz [null]
  deleted_at timestamptz [null]

  Note: '''
  Actual DB migration should add:
  1. CHECK (title IS NOT NULL OR content IS NOT NULL)
  2. clear cache update policy for comment_count and reaction_count
  '''

  indexes {
    (group_id, created_at) [name: 'idx_posts_group_created_at']
    (author_id, created_at) [name: 'idx_posts_author_created_at']
  }
}

Table post_images {
  id uuid [pk]
  post_id uuid [not null, ref: > posts.id]
  url text [not null, note: 'Cloudflare R2 URL']
  sort_order int4 [not null, default: 0, note: 'stable image order within a post']
  alt text [null, note: 'accessible alt text']
  width int4 [null, note: 'original image width']
  height int4 [null, note: 'original image height']
  created_at timestamptz [not null, default: `now()`]

  indexes {
    (post_id, sort_order) [unique]
  }
}

Table post_comments {
  id uuid [pk]
  post_id uuid [not null, ref: > posts.id]
  author_id uuid [not null, ref: > users.id]
  parent_id uuid [null, ref: > post_comments.id, note: 'recursive replies allowed']
  content text [not null]
  reply_count int4 [not null, default: 0, note: 'optional cached direct child count']
  created_at timestamptz [not null, default: `now()`]
  updated_at timestamptz [null]
  deleted_at timestamptz [null]

  Note: '''
  dbdiagram cannot fully express these constraints; implement in actual DB/app layer:
  1. CHECK (parent_id IS NULL OR parent_id <> id)
  2. parent comment and child comment must share the same post_id
  3. recursive cycle prevention is required
  4. decide soft-delete policy for comments with children
  '''

  indexes {
    (post_id, parent_id, created_at) [name: 'idx_post_comments_tree']
    (author_id, created_at) [name: 'idx_post_comments_author_created_at']
  }
}

Table post_reactions {
  id uuid [pk]
  post_id uuid [not null, ref: > posts.id]
  user_id uuid [not null, ref: > users.id]
  type text [not null, note: 'CHECK candidate: like/love/laugh/wow/sad/angry']
  created_at timestamptz [not null, default: `now()`]

  Note: '''
  Actual DB migration should add a CHECK constraint for the reaction type.
  '''

  indexes {
    (post_id, user_id) [unique]
    (post_id, created_at) [name: 'idx_post_reactions_post_created_at']
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

Table chat_rooms {
  id uuid [pk]
  name text [null, note: 'null means one-to-one chat']
  is_group boolean [not null, default: false]
  created_at timestamptz [not null, default: `now()`]

  Note: '''
  Duplicate prevention for one-to-one rooms should be designed separately.
  dbdiagram cannot fully express that uniqueness rule.
  '''
}

Table chat_room_members {
  room_id uuid [not null, ref: > chat_rooms.id]
  user_id uuid [not null, ref: > users.id]
  joined_at timestamptz [not null, default: `now()`]
  last_read_message_id uuid [null, ref: > messages.id, note: 'optimized read tracking']
  last_read_at timestamptz [null]

  indexes {
    (room_id, user_id) [pk]
  }
}

Table messages {
  id uuid [pk]
  room_id uuid [not null, ref: > chat_rooms.id]
  sender_id uuid [not null, ref: > users.id]
  parent_id uuid [null, ref: > messages.id]
  content text [not null]
  is_edited boolean [not null, default: false]
  edited_at timestamptz [null]
  deleted_at timestamptz [null, note: 'soft delete']
  created_at timestamptz [not null, default: `now()`]
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

Table message_reads {
  message_id uuid [not null, ref: > messages.id]
  user_id uuid [not null, ref: > users.id]
  created_at timestamptz [not null, default: `now()`]

  indexes {
    (message_id, user_id) [pk]
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
