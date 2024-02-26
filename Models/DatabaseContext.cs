using Microsoft.EntityFrameworkCore;

namespace AINews.Models;

public class DatabaseContext : DbContext
{
  public DatabaseContext(DbContextOptions<DatabaseContext> options)
      : base(options) { }

  public DbSet<AIPost> AIPosts => Set<AIPost>();
  public DbSet<User> Users => Set<User>();

  public DbSet<PostUser> PostUsers => Set<PostUser>();

  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<AIPost>()
        .Property(e => e.CreatedAt)
        .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");
  }
}