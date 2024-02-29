namespace AINews.Models;

public class AIPost
{
  public string Id { get; set; } = "";

  public string Title { get; set; } = "";

  public string Content { get; set; } = "";

  public string ?Url { get; set; } = "";

  public string UserId { get; set; } = "";
  public User? User { get; set; }
  public DateTime CreatedAt { get; set; }
  public ICollection<PostUser>? PostUsers { get; set; }
}