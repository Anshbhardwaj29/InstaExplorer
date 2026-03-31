def generate_insights(profile_data: dict) -> dict:
    """
    Simulates an Explainable AI (XAI) engine.
    It takes the raw data (scraped or mocked) and generates natural language explanations.
    In real life, this would hook into a LLM (like Gemini) or SHAP output from a model.
    """
    metrics = profile_data.get("metrics", {})
    recent_posts = profile_data.get("recent_posts", [])
    handle = profile_data.get("handle", "User")
    
    avg_likes = metrics.get("average_likes", 0)
    followers = metrics.get("followers", 1)
    
    # 1. Analyze post types
    video_count = sum(1 for p in recent_posts if p.get("is_video"))
    photo_count = len(recent_posts) - video_count
    
    best_post = None
    if recent_posts:
        best_post = max(recent_posts, key=lambda p: p.get("likes", 0))
    
    # 2. Build Retention AI Insight
    retention_insight = ""
    if video_count > photo_count:
        retention_insight = (
            "You are posting a lot of Reels, which is excellent for reach! "
            "However, our AI model suggests your viewer retention drops near the 6-second mark. "
            "To increase retention, add a fast visual transition or text hook exactly at 5 seconds."
        )
    else:
        retention_insight = (
            "You currently post more static carousels/photos. To increase average retention and page visits, "
            "our model heavily recommends increasing your Reel-to-Photo ratio to at least 2:1."
        )
        
    # 3. Build Virality AI Insight
    virality_insight = ""
    if best_post:
        post_type = best_post.get("type", "post")
        virality_insight = (
            f"Your most viral recent {post_type.lower()} got {best_post.get('likes')} likes! "
            f"Our SHAP analysis shows that using trending audio between 18:00 and 20:00 on Fridays "
            f"increases your viral probability by 42%. Try replicating this setup!"
        )
    else:
        virality_insight = "Post more consistently to trigger the algorithm's virality threshold."
        
    return {
        "overall_health_score": min(100, int((avg_likes / max(1, followers)) * 2000)),
        "xai_retention_advice": retention_insight,
        "xai_virality_advice": virality_insight,
        "best_day_recommendation": "Thursday or Friday",
        "best_time_recommendation": "18:00 - 20:00 UTC"
    }
