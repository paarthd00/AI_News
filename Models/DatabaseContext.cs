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
    base.OnModelCreating(modelBuilder);
    modelBuilder.HasPostgresExtension("uuid-ossp");

    modelBuilder.Entity<AIPost>()
      .Property(e => e.CreatedAt)
      .HasDefaultValueSql("CURRENT_TIMESTAMP(6)");

    modelBuilder.Entity<AIPost>()
      .Property(e => e.Id)
      .HasDefaultValueSql("uuid_generate_v4()");

    modelBuilder.Entity<User>()
      .Property(e => e.Id)
      .HasDefaultValueSql("uuid_generate_v4()");

    modelBuilder.Entity<PostUser>()
      .Property(e => e.Id)
      .HasDefaultValueSql("uuid_generate_v4()");

    modelBuilder.Entity<PostUser>()
      .HasOne(pu => pu.User)
      .WithMany(u => u.PostUsers)
      .HasForeignKey(pu => pu.UserId);

    modelBuilder.Entity<PostUser>()
      .HasOne(pu => pu.AIPost)
      .WithMany(p => p.PostUsers)
      .HasForeignKey(pu => pu.PostId);

    modelBuilder.Entity<AIPost>()
      .HasOne(pu => pu.User)
      .WithMany(p => p.AIPost)
      .HasForeignKey(pu => pu.UserId);

  }
}
