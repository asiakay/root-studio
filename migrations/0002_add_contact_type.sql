-- Recreate table to add contact_type and make project_type nullable
-- (SQLite does not support ALTER COLUMN to drop NOT NULL constraints)
CREATE TABLE contact_submissions_new (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  name         TEXT     NOT NULL,
  email        TEXT     NOT NULL,
  project_type TEXT,
  contact_type TEXT     DEFAULT 'research',
  message      TEXT     NOT NULL,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  status       TEXT     DEFAULT 'new'
);

INSERT INTO contact_submissions_new (id, name, email, project_type, message, created_at, status)
SELECT id, name, email, project_type, message, created_at, status
FROM contact_submissions;

DROP TABLE contact_submissions;
ALTER TABLE contact_submissions_new RENAME TO contact_submissions;
