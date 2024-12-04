import cloudscraper
from bs4 import BeautifulSoup
import json
import sys

def get_user_data(username):
    try:
        scraper = cloudscraper.create_scraper()
        response = scraper.get(f"https://e-z.bio/{username}")
        soup = BeautifulSoup(response.text, "html.parser")

        script_tag = soup.find("script", id="__NEXT_DATA__")
        if not script_tag:
            return {"error": "User not found"}

        data = json.loads(script_tag.string)
        bio_data = data["props"]["pageProps"]["bio"]

        user_info = {
            "username": username,
            "name": bio_data.get("name", username),
            "views": bio_data.get("views", 0),
            "description": bio_data.get("description", ""),
            "title": bio_data.get("title", ""),
            "ranks": bio_data.get("ranks", []),
            "presence": {
                "status": bio_data.get("bio_presence", {}).get("status", "offline"),
                "custom_status": bio_data.get("bio_presence", {}).get("customStatus", None),
                "platform": bio_data.get("bio_presence", {}).get("platform", {}),
                "discord_badges": bio_data.get("bio_presence", {}).get("badges", []),
                "discord_tag": bio_data.get("bio_presence", {}).get("tag", None),
            },
            "profile": {
                "pfp_url": bio_data.get("pfp", {}).get("url", ""),
                "banner_url": bio_data.get("banner", {}).get("url", ""),
                "background_url": bio_data.get("background", {}).get("url", ""),
                "background_type": bio_data.get("background", {}).get("type", ""),
            },
            "socials": [
                {
                    "name": social.get("name", ""),
                    "url": social.get("url", "")
                }
                for social in bio_data.get("socials", [])
            ],
            "custom_links": [
                {
                    "name": link.get("name", ""),
                    "url": link.get("url", ""),
                    "icon": link.get("icon", "")
                }
                for link in bio_data.get("customLinks", [])
            ],
            "songs": [
                {
                    "name": song.get("name", ""),
                    "url": song.get("url", "")
                }
                for song in bio_data.get("songs", [])
            ],
            "theme": {
                "primary_color": bio_data.get("primarycolor", ""),
                "secondary_color": bio_data.get("secondarycolor", ""),
                "accent_color": bio_data.get("accentcolor", ""),
                "text_color": bio_data.get("textcolor", ""),
                "background_color": bio_data.get("backgroundcolor", ""),
                "icon_color": bio_data.get("iconcolor", ""),
                "font": bio_data.get("font", ""),
            },
            "features": {
                "animated_title": bio_data.get("animatedTitle", False),
                "presence_enabled": bio_data.get("presence", False),
                "show_views": bio_data.get("showViews", False),
                "show_badges": bio_data.get("showBadges", False),
                "typewriter": bio_data.get("typewriter", False),
                "glow": bio_data.get("glow", False),
            }
        }

        return user_info
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Username required"}))
        sys.exit(1)

    username = sys.argv[1]
    result = get_user_data(username)
    print(json.dumps(result))
