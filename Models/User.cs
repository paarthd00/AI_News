namespace AINews.Models;

public class User
{
    public int Id { get; set; }

    public string Name { get; set; } = "";

    public string Email { get; set; } = "";

    public string Password { get; set; } = "";

    public string Description { get; set; } = "";

    public string Image { get; set; } = "";

    public string Interests { get; set; } = "";
}