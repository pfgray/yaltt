-- Migration: Add LTI 1.1 support
-- Adds consumer_key and shared_secret columns for LTI 1.1 registrations

ALTER TABLE registrations
  ADD COLUMN consumer_key VARCHAR(255),
  ADD COLUMN shared_secret VARCHAR(255);

CREATE INDEX idx_registrations_consumer_key ON registrations(consumer_key);

COMMENT ON COLUMN registrations.consumer_key IS 'LTI 1.1 OAuth consumer key';
COMMENT ON COLUMN registrations.shared_secret IS 'LTI 1.1 OAuth shared secret';
