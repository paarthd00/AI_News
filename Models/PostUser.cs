namespace AINews.Models;

public class PostUser
{
    public string Id { get; set; } = "";

    public  PostUserValue Value { get; set; } = PostUserValue.NEUTRAL;

    public int UserId { get; set; } = 0;

    public int PostId { get; set; } = 0;
}

public enum PostUserValue
{
    DISLIKE = -1,
    NEUTRAL = 0,
    LIKE = 1
}