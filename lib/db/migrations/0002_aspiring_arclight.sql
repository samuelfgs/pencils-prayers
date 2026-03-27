CREATE TABLE "downloads" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"asset_key" varchar(255) NOT NULL,
	"session_id" varchar(255),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "idx_downloads_asset_key" ON "downloads" USING btree ("asset_key");--> statement-breakpoint
CREATE INDEX "idx_downloads_session_id" ON "downloads" USING btree ("session_id");