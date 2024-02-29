namespace AINews.Models;


public class PostUser
{
    public string Id { get; set; } = "";

    public PostUserValue Value { get; set; } = PostUserValue.NEUTRAL;

    public required string UserId { get; set; }

    public User? User { get; set; }

    public required string AIPostId { get; set; }

    public AIPost? AIPost { get; set; }

}

public enum PostUserValue
{
    DISLIKE = -1,
    NEUTRAL = 0,
    LIKE = 1
}
