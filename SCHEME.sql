-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE user_status AS ENUM ('none', 'pending', 'accepted', 'rejected');
CREATE TYPE user_gender AS ENUM ('male', 'female');
CREATE TYPE user_room AS ENUM ('101', '102');

CREATE TYPE club_type AS ENUM ('자율', '정규');

CREATE TYPE group_member_role AS ENUM ('admin', 'member');
CREATE TYPE group_noti AS ENUM ('없음', '내 게시물 + 댓글', '모든 글');

CREATE TYPE reaction_target_type AS ENUM ('post', 'comment', 'message');

CREATE TYPE gongang_location AS ENUM ('지혼', '2혼', '4공', '10공');

-- ============================================================
-- USERS
-- ============================================================
CREATE TABLE users (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name           text NOT NULL DEFAULT '',
  role           user_role NOT NULL DEFAULT 'user',
  student_number int4,
  class          int2,
  grade          int2,
  gender         user_gender,
  phone_number   text,
  img            text,
  birthday       date,
  status         user_status NOT NULL DEFAULT 'none',
  room           user_room,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- CLUBS
-- ============================================================
CREATE TABLE clubs (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text NOT NULL UNIQUE,
  type       club_type NOT NULL DEFAULT '자율',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE clubs_apply (
  id         int4 PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  club       uuid NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- GROUPS
-- ============================================================
CREATE TABLE groups (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text NOT NULL,
  description text,
  owner_id    uuid NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  is_official boolean NOT NULL DEFAULT false,
  is_personal boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE group_members (
  group_id  uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  user_id   uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role      group_member_role NOT NULL DEFAULT 'member',
  noti      group_noti NOT NULL DEFAULT '내 게시물 + 댓글',
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id, user_id)
);

-- ============================================================
-- POSTS
-- ============================================================
CREATE TABLE posts (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  group_id   uuid NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  author_id  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      text,
  content    text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz,
  CONSTRAINT posts_title_or_content_not_null CHECK (
    title IS NOT NULL OR content IS NOT NULL
  )
);

CREATE TABLE post_images (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  url        text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE post_comments (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id    uuid NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  author_id  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id  uuid REFERENCES post_comments(id) ON DELETE CASCADE,
  content    text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ============================================================
-- REACTIONS
-- ============================================================
CREATE TABLE reactions (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  target_id   uuid NOT NULL,
  target_type reaction_target_type NOT NULL,
  type        text NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, target_id)
);

-- ============================================================
-- CHAT
-- ============================================================
CREATE TABLE chat_rooms (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name       text,
  is_group   boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE chat_room_members (
  room_id   uuid NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  user_id   uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (room_id, user_id)
);

CREATE TABLE messages (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id    uuid NOT NULL REFERENCES chat_rooms(id) ON DELETE CASCADE,
  sender_id  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  parent_id  uuid REFERENCES messages(id) ON DELETE SET NULL,
  content    text NOT NULL,
  is_edited  boolean NOT NULL DEFAULT false,
  edited_at  timestamptz,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE messages_is_read (
  message_id uuid NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (message_id, user_id)
);

-- ============================================================
-- GONGANGS
-- ============================================================
CREATE TABLE gongangs (
  id          int4 PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gongang     gongang_location NOT NULL,
  owner_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  week_start  date NOT NULL,
  day_of_week int2 NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  hour        int2 NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  UNIQUE (gongang, week_start, day_of_week, hour)
);

-- ============================================================
-- GISANGSONG
-- ============================================================
CREATE TABLE gisangsong (
  id     int4 PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  date   date NOT NULL,
  number int2 NOT NULL CHECK (number IN (1, 2)),
  url    text NOT NULL,
  UNIQUE (date, number)
);

-- ============================================================
-- TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_auth_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, name, img)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email, ''),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER trigger_handle_new_auth_user
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_auth_user();

-- auto_set_pending 트리거
CREATE OR REPLACE FUNCTION auto_set_pending()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'none'
    AND NEW.student_number IS NOT NULL
    AND NEW.class IS NOT NULL
    AND NEW.grade IS NOT NULL
    AND NEW.gender IS NOT NULL
    AND NEW.phone_number IS NOT NULL
    AND NEW.birthday IS NOT NULL
  THEN
    NEW.status := 'pending';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_auto_set_pending
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION auto_set_pending();