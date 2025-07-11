erDiagram
users {
UUID pk_id
VARCHAR(255) email
VARCHAR(255) password_hash
BOOLEAN verified
UUID verification_token
}

    user_types {
        UUID pk_id
        VARCHAR(100) name
        TEXT description
    }

    user_accounts {
        UUID pk_id
        VARCHAR(255) name
        UUID fk_user_type_id
        BOOLEAN kyc_status
        BOOLEAN membership_active
        TIMESTAMP membership_start_date
        TIMESTAMP membership_end_date
        UUID fk_language_id
        UUID fk_country_id
        UUID fk_country_state_id
        DATE birth_date
        TEXT profile_picture_url
        TEXT bio
        VARCHAR(64) solana_wallet_address
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    kyc_verifications {
        UUID pk_id
        UUID fk_user_id
        VARCHAR(50) document_type
        VARCHAR(100) document_number
        TEXT document_front_url
        TEXT document_back_url
        TEXT selfie_url
        VARCHAR(50) status
        TEXT rejection_reason
        TIMESTAMP requested_at
        TIMESTAMP processed_at
    }

    languages {
        UUID pk_id
        VARCHAR(100) name
        VARCHAR(10) iso_code
    }

    countries {
        UUID pk_id
        VARCHAR(100) name
        VARCHAR(5) iso_code
    }

    country_states {
        UUID pk_id
        UUID fk_country_id
        VARCHAR(100) name
    }

    preference_categories {
        UUID pk_id
        VARCHAR(100) name
        TEXT description
    }

    preferences {
        UUID pk_id
        UUID fk_preference_category_id
        VARCHAR(100) name
    }

    user_preferences {
        UUID pk_id
        UUID fk_user_id
        UUID fk_preference_id
    }

    genres {
        UUID pk_id
        VARCHAR(100) name
        TEXT description
    }

    books {
        UUID pk_id
        UUID fk_author_id
        VARCHAR(255) title
        TEXT synopsis
        TEXT cover_url
        DECIMAL price
        UUID fk_language_id
        TIMESTAMP created_at
        TIMESTAMP updated_at
        TEXT file_url
        VARCHAR(50) status
    }

    music {
        UUID pk_id
        UUID fk_artist_id
        VARCHAR(255) title
        VARCHAR(255) album
        TEXT cover_url
        DECIMAL price
        UUID fk_language_id
        TIMESTAMP created_at
        TIMESTAMP updated_at
        TEXT file_url
        VARCHAR(50) type
        VARCHAR(50) status
    }

    content_genres {
        UUID pk_id
        UUID fk_content_id
        VARCHAR(50) content_type
        UUID fk_genre_id
    }

    copy_rights {
        UUID pk_id
        UUID fk_content_id
        VARCHAR(50) content_type
        UUID fk_country_id
        VARCHAR(100) registration_number
        DATE registration_date
        DECIMAL price_for_registration
        VARCHAR(50) status
        TEXT registration_file_url
    }

    memberships {
        UUID pk_id
        VARCHAR(100) name
        TEXT description
        DECIMAL price_monthly
        DECIMAL price_yearly
        BOOLEAN no_ads
        DECIMAL book_discount_percentage
        DECIMAL nft_discount_percentage
    }

    user_memberships {
        UUID pk_id
        UUID fk_user_id
        UUID fk_membership_id
        TIMESTAMP start_date
        TIMESTAMP end_date
        VARCHAR(50) status
        DECIMAL price_paid
        VARCHAR(50) payment_method
    }

    ads {
        UUID pk_id
        UUID fk_advertiser_user_id
        VARCHAR(255) title
        TEXT target_url
        TEXT file_url
        TIMESTAMP active_from
        TIMESTAMP active_to
        TIMESTAMP created_at
        TIMESTAMP updated_at
        BIGINT clicks
        BIGINT views
    }

    ad_targeting_countries {
        UUID pk_id
        UUID fk_ad_id
        UUID fk_country_id
    }

    ad_targeting_genres {
        UUID pk_id
        UUID fk_ad_id
        UUID fk_genre_id
    }

    ad_targeting_preferences {
        UUID pk_id
        UUID fk_ad_id
        UUID fk_preference_id
    }

    followers {
        UUID pk_id
        UUID fk_follower_user_id
        UUID fk_followed_user_id
        TIMESTAMP created_at
    }

    posts {
        UUID pk_id
        UUID fk_user_id
        TEXT content_text
        TEXT content_media_url
        VARCHAR(50) content_type
        TIMESTAMP created_at
        TIMESTAMP updated_at
        BIGINT likes_count
        BIGINT comments_count
    }

    comments {
        UUID pk_id
        UUID fk_post_id
        UUID fk_user_id
        TEXT comment_text
        TIMESTAMP created_at
    }

    likes {
        UUID pk_id
        UUID fk_post_id
        UUID fk_user_id
        TIMESTAMP created_at
    }

    chats {
        UUID pk_id
        TIMESTAMP created_at
        TIMESTAMP updated_at
    }

    chat_participants {
        UUID pk_id
        UUID fk_chat_id
        UUID fk_user_id
        TIMESTAMP joined_at
    }

    messages {
        UUID pk_id
        UUID fk_chat_id
        UUID fk_sender_id
        TEXT message_text
        TIMESTAMP sent_at
        BOOLEAN is_read
    }

    transactions {
        UUID pk_id
        UUID fk_user_id
        VARCHAR(50) transaction_type
        DECIMAL amount
        VARCHAR(10) currency
        VARCHAR(50) status
        TIMESTAMP transaction_date
        VARCHAR(50) payment_method
        VARCHAR(255) transaction_id_external
        UUID fk_purchased_book_id
        UUID fk_purchased_music_id
        UUID fk_purchased_nft_id
        UUID fk_membership_purchase_id
        UUID fk_donation_id
        UUID fk_ad_payment_id
    }

    donations {
        UUID pk_id
        UUID fk_donator_user_id
        UUID fk_creator_user_id
        DECIMAL amount
        VARCHAR(10) currency
        TIMESTAMP donation_date
        TEXT message
        VARCHAR(50) payment_status
    }

    partner_agreements {
        UUID pk_id
        UUID fk_partner_user_id
        UUID fk_creator_user_id
        UUID fk_content_id
        VARCHAR(50) content_type
        TEXT agreement_details
        VARCHAR(50) status
        TIMESTAMP initiated_at
        TIMESTAMP signed_at
        TIMESTAMP end_date
    }

    blockchain_transactions_log {
        UUID pk_id
        UUID fk_user_id
        VARCHAR(100) transaction_hash
        VARCHAR(50) transaction_type
        VARCHAR(64) token_address
        VARCHAR(64) nft_mint_address
        DECIMAL amount
        VARCHAR(10) currency
        TIMESTAMP transaction_date_onchain
        VARCHAR(50) status
        TEXT error_message
        VARCHAR(50) related_content_type
        UUID fk_related_content_id
    }

    nfts {
        UUID pk_id
        UUID fk_creator_user_id
        VARCHAR(64) nft_mint_address
        VARCHAR(255) nft_name
        TEXT nft_description
        TEXT ipfs_metadata_url
        TEXT ipfs_image_url
        DECIMAL initial_price_usd
        VARCHAR(50) rarity
        TIMESTAMP minted_at
        UUID fk_content_id
        VARCHAR(50) content_type
        BOOLEAN royalty_enabled
    }

    nft_sales_log {
        UUID pk_id
        UUID fk_nft_id
        VARCHAR(100) transaction_hash
        UUID fk_seller_user_id
        UUID fk_buyer_user_id
        DECIMAL price_sol
        DECIMAL price_crea
        TIMESTAMP sale_date
    }

    nft_benefits {
        UUID pk_id
        UUID fk_nft_id
        VARCHAR(100) benefit_type
        TEXT benefit_details
        VARCHAR(100) redemption_code
        BOOLEAN is_redeemed
        TIMESTAMP redeemed_at
        UUID fk_redeeming_user_id
    }

    notification_types {
        UUID pk_id
        VARCHAR(100) name
        TEXT description
    }

    notifications {
        UUID pk_id
        UUID fk_user_id
        UUID fk_notification_type_id
        VARCHAR(255) title
        TEXT body
        BOOLEAN is_read
        TIMESTAMP created_at
        UUID source_user_id
        UUID target_resource_id
        VARCHAR(50) target_resource_type
    }

    users ||--o{ user_accounts : "has profile"
    user_accounts ||--o{ user_types : "has a"
    user_accounts ||--o{ languages : "speaks"
    user_accounts ||--o{ countries : "lives in"
    user_accounts ||--o{ country_states : "lives in"
    user_accounts ||--o{ kyc_verifications : "completes"
    user_accounts ||--o{ user_preferences : "sets"
    preferences ||--o{ user_preferences : "is part of"
    preference_categories ||--o{ preferences : "categorizes"
    user_accounts ||--o{ books : "authors"
    user_accounts ||--o{ music : "artists"
    genres ||--o{ content_genres : "assigned to"
    books ||--o{ content_genres : "has genre"
    music ||--o{ content_genres : "has genre"
    books ||--o{ languages : "is written in"
    music ||--o{ languages : "is composed in"
    copy_rights ||--o{ countries : "registered in"
    user_accounts ||--o{ user_memberships : "purchases"
    memberships ||--o{ user_memberships : "defines"
    user_accounts ||--o{ ads : "advertises"
    ads ||--o{ ad_targeting_countries : "targets"
    ads ||--o{ ad_targeting_genres : "targets"
    ads ||--o{ ad_targeting_preferences : "targets"
    countries ||--o{ ad_targeting_countries : "is targeted by"
    genres ||--o{ ad_targeting_genres : "is targeted by"
    preferences ||--o{ ad_targeting_preferences : "is targeted by"
    user_accounts ||--o{ followers : "follows"
    user_accounts ||--o{ posts : "creates"
    posts ||--o{ comments : "has"
    posts ||--o{ likes : "receives"
    user_accounts ||--o{ comments : "makes"
    user_accounts ||--o{ likes : "gives"
    user_accounts ||--o{ chat_participants : "participates in"
    chats ||--o{ chat_participants : "has"
    chats ||--o{ messages : "contains"
    user_accounts ||--o{ messages : "sends"
    user_accounts ||--o{ transactions : "is involved in"
    user_accounts ||--o{ donations : "donates/receives"
    user_accounts ||--o{ partner_agreements : "is partner/creator in"
    user_accounts ||--o{ blockchain_transactions_log : "performs blockchain transaction"
    user_accounts ||--o{ nfts : "creates"
    nfts ||--o{ nft_sales_log : "is sold in"
    user_accounts ||--o{ nft_sales_log : "participates in sale"
    nfts ||--o{ nft_benefits : "grants"
    user_accounts ||--o{ nft_benefits : "redeems benefit"
    user_accounts ||--o{ notifications : "receives"
    notification_types ||--o{ notifications : "is of type"
