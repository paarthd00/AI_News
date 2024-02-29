namespace AINews.Models;


public class PostUser
{
    public string Id { get; set; } = "";

    public PostUserValue Value { get; set; } = PostUserValue.NEUTRAL;
    public required string UserId { get; set; }
    public required User User { get; set; }

    public string PostId { get; set; } = "";

    public AIPost? AIPost { get; set; }

}

public enum PostUserValue
{
    DISLIKE = -1,
    NEUTRAL = 0,
    LIKE = 1
}