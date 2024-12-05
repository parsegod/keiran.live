import cloudscraper
from bs4 import BeautifulSoup
import json
import sys
from concurrent.futures import ThreadPoolExecutor

def get_user_data(username):
    try:
        with cloudscraper.create_scraper() as scraper:
            response = scraper.get(f"https://e-z.bio/{username}")
            soup = BeautifulSoup(response.text, "html.parser")

        script_tag = soup.find("script", id="__NEXT_DATA__")
        if not script_tag:
            return {"error": "User not found"}

        bio_data = json.loads(script_tag.string)["props"]["pageProps"]["bio"]

        def extract_data(key, default):
            return bio_data.get(key, default)

        with ThreadPoolExecutor() as executor:
            user_info = {
                "username": username,
                "name": extract_data("name", username),
                "views": extract_data("views", 0),
                "description": extract_data("description", ""),
                "title": extract_data("title", ""),
                "ranks": extract_data("ranks", []),
                "presence": extract_data("bio_presence", {
                    "status": "offline", "custom_status": None, "platform": {},
                    "badges": [], "activities": [], "pfp": None, "tag": None, "_id": None
                }),
                "profile": {k: extract_data(k, {}) for k in ["pfp", "banner", "background"]},
                "socials": [{"name": s.get("name", ""), "url": s.get("url", "")} for s in extract_data("socials", [])],
                "custom_links": [{"name": l.get("name", ""), "url": l.get("url", ""), "icon": l.get("icon", "")} for l in extract_data("customLinks", [])],
                "songs": [{"name": s.get("name", ""), "url": s.get("url", "")} for s in extract_data("songs", [])],
                "theme": {f"{k}_color": extract_data(f"{k}color", "") for k in ["primary", "secondary", "accent", "text", "background", "icon"]} | {"font": extract_data("font", "")},
                "features": {k: extract_data(v, False) for k, v in {
                    "animated_title": "animatedTitle", "presence_enabled": "presence",
                    "show_views": "showViews", "show_badges": "showBadges",
                    "typewriter": "typewriter", "glow": "glow"
                }.items()}
            }

        return user_info
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Username required"}))
        sys.exit(1)
    print(json.dumps(get_user_data(sys.argv[1])))
