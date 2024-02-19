namespace AINews.Models;

public class Post
{
  public int Id { get; set; }

  public string Title { get; set; } = "";

  public string Content { get; set; } = "";

  public string Author { get; set; } = "";

  public int UpVotes { get; set; }

  public int DownVotes { get; set; }


  public DateTime CreatedAt { get; set; }
}