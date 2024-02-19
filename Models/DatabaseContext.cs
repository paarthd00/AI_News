using Microsoft.EntityFrameworkCore;

namespace AINews.Models;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options)
      : base(options) { }

  public DbSet<Post> Posts => Set<Post>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<Post>()
        .Property(e => e.CreatedAt)
        .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");
  }
}