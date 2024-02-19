namespace TypesOfMilk.Models;

public class Milk
{
  public int Id { get; set; }
  public string Type { get; set; } = "";
  public int Rating { get; set; }
  public DateTime CreatedAt { get; set; }
}