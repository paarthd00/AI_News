namespace AINews.Models;


public class AIPost
{
  public int Id { get; set; }

  public string Title { get; set; } = "";

  public string Content { get; set; } = "";

  public string Url { get; set; } = "";
  
  public string AuthorId { get; set; } = "";

  public string AuthorName { get; set; } = "";

  public DateTime CreatedAt { get; set; }
}