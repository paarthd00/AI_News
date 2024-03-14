namespace AINews.Models;

public class AIPost
{
  public string Id { get; set; } = "";

  public string ParentId { get; set; } = "";

  public string Title { get; set; } = "";

  public int Likes { get; set; } = 0;
  public string Content { get; set; } = "";

  public string? Url { get; set; } = "";

  public string? UserId { get; set; } = "";
  public User? User { get; set; }
  public DateTime CreatedAt { get; set; }

}
